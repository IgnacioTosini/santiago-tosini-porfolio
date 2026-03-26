# YouTube Integration Setup Guide

## Overview
Esta integración te permite obtener datos en tiempo real de YouTube (suscriptores, vistas, videos recientes) mostrándolos en tu portafolio y sincronizándolos automáticamente 2 veces al día.

## 1. Obtener las credenciales de YouTube API

### Paso 1: Crear un proyecto en Google Cloud Console
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **APIs & Services** > **Library**
4. Busca "YouTube Data API v3"
5. Haz click en "Enable"

### Paso 2: Crear una API Key
1. Vuelve a **APIs & Services** > **Credentials**
2. Haz click en "Create Credentials"
3. Selecciona "API Key"
4. Copia la API Key

### Paso 3: Obtener tu Channel ID
1. Ve a [YouTube Studio](https://studio.youtube.com/)
2. En la barra lateral, haz click en "Settings"
3. Selecciona "Channel"
4. En la sección "Basic info", encontrarás tu Channel ID

## 2. Configurar las variables de entorno

En `.env.local`, actualiza:

```env
YOUTUBE_API_KEY=your_actual_api_key_here
YOUTUBE_CHANNEL_ID=your_actual_channel_id_here
YOUTUBE_CHANNEL_CUSTOM_URL=@santiago_tosini

# Cron schedule (por defecto: 8 AM y 8 PM)
# Formato: "0 8,20 * * *"
# Para testing: "*/5 * * * *" (cada 5 minutos)
YOUTUBE_SYNC_CRON=0 8,20 * * *

# Opcional: Secret key para proteger la ruta de sincronización
YOUTUBE_SYNC_SECRET=your_secret_key_here
```

## 3. Instalar dependencias

```bash
npm install node-cron
```

## 4. Inicializar el servidor

En tu `src/app/layout.tsx` o `src/app/page.tsx`, importa y llama a `initializeServer()`:

```typescript
import { initializeServer } from '@/lib/server-init';

async function RootLayout({ children }) {
  // Inicializar servicios del servidor
  if (typeof window === 'undefined') {
    await initializeServer();
  }

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

## 5. APIs disponibles

### `GET /api/youtube/insights` (Recomendado)
- Retorna datos cacheados de YouTube
- Se actualiza automáticamente si el caché tiene más de 1 hora
- **Uso en componentes:**

```typescript
'use client';

import { useYoutubeData } from '@/hooks/useYoutubeData';

export function MyComponent() {
  const { 
    subscriberCount, 
    totalViews, 
    videoCount,
    recentVideos,
    loading, 
    error 
  } = useYoutubeData();

  return (
    <div>
      <p>Suscriptores: {subscriberCount.toLocaleString()}</p>
      <p>Vistas totales: {totalViews.toLocaleString()}</p>
    </div>
  );
}
```

### `GET /api/youtube/sync` (Para sincronización manual)
- Obtiene datos frescos de YouTube API
- Requiere autenticación si `YOUTUBE_SYNC_SECRET` está configurado
- **Uso:**

```bash
# Sin autenticación
curl http://localhost:3000/api/youtube/sync

# Con autenticación
curl -H "Authorization: Bearer YOUR_SECRET_KEY" http://localhost:3000/api/youtube/sync
```

## 6. Sincronización automática (Cron Job)

El cron job se ejecuta automáticamente según el schedule en `YOUTUBE_SYNC_CRON`:

- **Default:** `0 8,20 * * *` (8 AM y 8 PM todos los días)
- **Para testing:** Cambia a `*/5 * * * *` (cada 5 minutos)

### Logs
Los logs de sincronización aparecen en la consola del servidor:

```
✅ YouTube cron job initialized (Schedule: 0 8,20 * * *)
[2025-03-26T10:00:00.000Z] Starting YouTube data sync...
[2025-03-26T10:00:05.123Z] ✅ YouTube data synced successfully
   Subscribers: 425,000
   Total Views: 45,230,123
   Recent Videos: 5
```

## 7. Almacenamiento de datos

Los datos se guardan en `.cache/youtube-data.json` (ignorado por git):

```json
{
  "channelId": "UCxxxxxx",
  "channelTitle": "Santiago Tosini",
  "metrics": {
    "subscriberCount": 425000,
    "viewCount": 45230123,
    "videoCount": 45
  },
  "recentVideos": [...],
  "lastSyncedAt": "2025-03-26T10:00:05.123Z"
}
```

## 8. Migrar a Prisma (Futuro)

Para guardar datos en una base de datos, puedes actualizar `youtube.service.ts`:

```typescript
// Reemplazar cacheYoutubeData con:
export async function cacheYoutubeData(data: YoutubeChannelData): Promise<void> {
  await prisma.youtubeData.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data }
  });
}

// Reemplazar getCachedYoutubeData con:
export async function getCachedYoutubeData(): Promise<YoutubeChannelData | null> {
  return await prisma.youtubeData.findUnique({
    where: { id: 1 }
  });
}
```

## 9. Troubleshooting

### ❌ "API Key not found"
- Verifica que `YOUTUBE_API_KEY` esté en `.env.local`
- Reinicia el servidor (`npm run dev`)

### ❌ "Channel not found"
- Verifica que `YOUTUBE_CHANNEL_ID` sea correcta
- Asegúrate de que el canal sea público

### ❌ Los datos no se actualizan
- Verifica que `node-cron` esté instalado (`npm list node-cron`)
- Revisa los logs en la consola del servidor
- Prueba manualmente: `curl http://localhost:3000/api/youtube/sync`

### ❌ Error 401 en /api/youtube/sync
- Si tienes `YOUTUBE_SYNC_SECRET` configurado, incluye el header:
  ```bash
  curl -H "Authorization: Bearer YOUR_SECRET_KEY" http://localhost:3000/api/youtube/sync
  ```

## 10. Límites de la API de YouTube

- **Rate limit:** 10,000 cuotas por día
- Cada solicitud usa ~100 cuotas
- 2 sincronizaciones diarias = ~200 cuotas (dentro del límite)

Para detalle, ver: [YouTube API Quotas](https://developers.google.com/youtube/v3/getting-started#quota)
