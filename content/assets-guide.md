# Guía de assets pendientes — Maroru's Assistance Web

Referencia rápida para añadir los assets que faltan al proyecto.

---

## Diagramas de arquitectura (PNG)

**Dónde van:** `public/diagrams/`

**Nombres exactos:**
```
public/diagrams/wembley-catalog.png
public/diagrams/wembley-invoices.png
public/diagrams/wembley-teams-bot.png
public/diagrams/lab-internal-assistant.png
```

**Qué cambiar en el código:**  
En `src/components/Projects.astro`, objeto `DIAGRAMS` (líneas ~20-25):

```ts
const DIAGRAMS = {
  catalog:  '/diagrams/wembley-catalog.png',
  invoices: '/diagrams/wembley-invoices.png',
  teams:    '/diagrams/wembley-teams-bot.png',
  lab1:     '/diagrams/lab-internal-assistant.png',
} as const;
```

Solo cambiar `.svg` → `.png`. Los SVG placeholder se pueden borrar después.

**Optimización avanzada (opcional, Sesión 8):**  
Mover los PNG a `src/assets/diagrams/` y cambiar a imports estáticos con `<Image>` de `astro:assets` para conversión automática a WebP en el build.

---

## Vídeo del Lab 1 (Vimeo)

**Plataforma elegida:** Vimeo (no listado)

**Pasos:**
1. Sube el vídeo a [vimeo.com](https://vimeo.com) como "solo con enlace" (no listado)
2. Copia el ID numérico de la URL (ej: `vimeo.com/123456789` → ID es `123456789`)
3. En `src/i18n/es.json` y `src/i18n/en.json`, busca `"videoId": "PENDING"` en `projects.lab1` y reemplaza:

```json
"videoId": "123456789"
```

**Efecto:** el botón "Ver vídeo" en la card del Lab 1 aparece automáticamente.

**Cómo está implementado:** embed de Vimeo en `<dialog>` nativo vía `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`.

---

## URL de demo del Lab 1

**Dónde se configura:** `src/i18n/es.json` y `src/i18n/en.json`, clave `projects.lab1.demoUrl`

```json
"demoUrl": "https://tu-demo-url.com"
```

**Efecto:** el botón "Probar demo" aparece automáticamente cuando el valor no es `"PENDING"`.

---

## Diagramas de Labs 2 y 3 (cuando estén listos)

Actualmente Lab 2 y Lab 3 usan un patrón de puntos SVG inline como fondo de la card. No requieren archivo externo.

Si en el futuro quieres añadir diagramas reales para estos labs:
1. Coloca el PNG en `public/diagrams/` (ej. `lab-document-processor.png`)
2. En `Projects.astro`, en el array `labs`, cambia `hasDiagram: false` → `true` y añade `diagramSrc` para ese lab
3. El modal de arquitectura y la imagen de fondo en la card se activan solos

---

## Estado actual de assets (actualizar al ir añadiendo)

| Asset | Estado | Notas |
|---|---|---|
| wembley-catalog.png | ⏳ Pendiente | Placeholder SVG activo |
| wembley-invoices.png | ⏳ Pendiente | Placeholder SVG activo |
| wembley-teams-bot.png | ⏳ Pendiente | Placeholder SVG activo |
| lab-internal-assistant.png | ⏳ Pendiente | Placeholder SVG activo |
| Lab 1 videoId (Vimeo) | ⏳ Pendiente | Botón oculto hasta añadir ID |
| Lab 1 demoUrl | ⏳ Pendiente | Botón oculto hasta añadir URL |
