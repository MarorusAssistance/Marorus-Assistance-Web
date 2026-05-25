# Maroru's Assistance — Web

Portfolio profesional para freelance de ingeniería de IA.

## Stack

- [Astro 6](https://astro.build) con TypeScript strict
- [Tailwind CSS 4](https://tailwindcss.com) vía `@tailwindcss/vite`
- i18n nativo de Astro (`es` default, `/en` prefix)
- Deploy en [Cloudflare Workers](https://workers.cloudflare.com) con static assets

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build

```bash
npm run build      # genera /dist
npm run preview    # previsualiza el build local
```

## Deploy

```bash
npx wrangler deploy
```

El proyecto se despliega en Cloudflare Workers sirviendo los assets estáticos desde `/dist`. La configuración está en `wrangler.jsonc`.

URL de producción: `marorus-assistance-web.marorusassistance.workers.dev`
