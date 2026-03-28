# Santiago Tosini Portfolio

Portfolio en Next.js con App Router para mostrar contenido, métricas sociales y endpoints de integración con YouTube, Instagram y TikTok.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run type-check
```

## Variables de entorno

Definí estas variables en tu entorno local antes de usar las integraciones:

```bash
NEXT_PUBLIC_CONTACT_EMAIL=
YOUTUBE_API_KEY=
YOUTUBE_CHANNEL_ID=
YOUTUBE_SYNC_SECRET=
YOUTUBE_SYNC_CRON=
YOUTUBE_SYNC_TIMEZONE=
YOUTUBE_OAUTH_CLIENT_ID=
YOUTUBE_OAUTH_CLIENT_SECRET=
YOUTUBE_OAUTH_REFRESH_TOKEN=
YOUTUBE_ANALYTICS_DAYS=
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_AUTO_REFRESH=
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
TIKTOK_REFRESH_TOKEN=
```

## Desarrollo

1. Instalá dependencias con `npm install`.
2. Configurá las variables de entorno necesarias.
3. Levantá el proyecto con `npm run dev`.
4. Abrí `http://localhost:3000`.

## Estructura relevante

- `src/app`: páginas App Router y endpoints API.
- `src/components`: secciones visuales, layout y UI reusable.
- `src/hooks`: hooks de carga de datos para redes sociales.
- `src/lib`: servicios de analytics, sincronización y utilidades server-side.
- `src/mocks`: datos fallback usados cuando una API externa no responde.

## Notas operativas

- Las métricas de YouTube tienen una ruta de sync manual en `src/app/api/youtube/sync/route.ts` protegida por `YOUTUBE_SYNC_SECRET`.
- El botón de email de contacto depende de `NEXT_PUBLIC_CONTACT_EMAIL`.
- Los datos de audiencia usan React Query y muestran fallback cuando una API externa no está disponible.
