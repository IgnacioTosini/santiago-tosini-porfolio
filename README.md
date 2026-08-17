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
APIFY_API_TOKEN=
APIFY_TIKTOK_USERNAME=santiagotosini
APIFY_TIKTOK_ACTOR_ID=clockworks~tiktok-profile-scraper
CRON_SECRET=
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
- TikTok se sincroniza con Apify cada lunes a las 09:00 UTC. La ejecución está limitada a un perfil y un resultado para minimizar el uso del crédito gratuito. Configurá `APIFY_API_TOKEN` y `CRON_SECRET` en Vercel; las variables `APIFY_TIKTOK_USERNAME` y `APIFY_TIKTOK_ACTOR_ID` son opcionales.
- La ruta protegida `src/app/api/tiktok/sync/route.ts` permite iniciar una sincronización manual enviando `Authorization: Bearer <CRON_SECRET>`.
- La activación paso a paso está documentada en `APIFY_SETUP.md`.
- El botón de email de contacto depende de `NEXT_PUBLIC_CONTACT_EMAIL`.
- Los datos de audiencia usan React Query y muestran fallback cuando una API externa no está disponible.
