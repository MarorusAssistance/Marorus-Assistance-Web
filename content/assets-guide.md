# Guía de assets pendientes — Maroru's Assistance Web

Referencia rápida para añadir los assets que faltan al proyecto.

---

## Miniaturas y arquitecturas de los casos

**Dónde van:** `src/assets/projects/` (Astro las convierte a WebP en el build).

| Caso | Miniatura | Arquitectura | Estado |
|---|---|---|---|
| Indra Group | `indra-thumb.png` | `indra-architecture.png` | ⚠️ Enlazadas, pero pendientes de corregir: contienen "legacy" y tamaños de muestra |
| Datatón de Turing | `turing-thumb.png` | `turing-architecture.png` | ✅ |
| Wembley · catálogo | `catalog-thumb.png` | `catalog-architecture.png` | ✅ |
| Wembley · facturas | `invoices-thumb.png` | `invoices-architecture.png` | ✅ |
| Wembley · bot Teams | `teams-thumb.png` | `teams-architecture.png` | ✅ |

**Para sustituir una imagen:** reemplaza el PNG con el mismo nombre. **Para enlazar un caso nuevo**: en `Projects.astro`, importa los dos PNG y añade `thumb` y `archSrc: await archUrl(...)` a la entrada del array `productionProjects`.

Formato de origen: miniatura 2400×1500, arquitectura ~3264 px de ancho (exportadas @2x).

Los diagramas técnicos anteriores están archivados en `src/assets/diagrams/older/`.

---

## Vídeo del Lab 1 (autoalojado)

**Decisión:** vídeo propio servido como archivo estático, no Vimeo/YouTube. Es un vídeo corto y básico (el visitante puede probar la demo por su cuenta), así que no compensa un tercero: sin cookies de terceros (simplifica RGPD), sin branding ajeno, sin dependencia externa.

**Formato recomendado:** MP4 (H.264 + AAC), 1080p o 720p, `-movflags +faststart` para que empiece a reproducir antes de descargarse entero. Ejemplo:

```bash
ffmpeg -i demo-original.mov -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 128k -movflags +faststart demo-lab1.mp4
```

**Dónde va:**
- **< 25 MB** (límite por archivo de static assets en Cloudflare Workers): `public/videos/demo-lab1.mp4` → URL `/videos/demo-lab1.mp4`
- **≥ 25 MB**: subirlo a un bucket de Cloudflare R2 con acceso público (egress gratis) y usar su URL pública.

**Qué cambiar:** en `src/i18n/es.json` y `src/i18n/en.json`, `projects.lab1.videoUrl`:

```json
"videoUrl": "/videos/demo-lab1.mp4"
```

**Efecto:** el botón "Ver vídeo" en la card del Lab 1 aparece automáticamente (con `"PENDING"` queda oculto).

**Cómo está implementado:** `<video controls autoplay playsinline>` inyectado en el `<dialog>` nativo al pulsar el botón; no se descarga nada hasta entonces. Al cerrar el modal se vacía el body, lo que detiene la reproducción.

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
| lab-internal-assistant.png | ⏳ Pendiente | Placeholder SVG activo |
| Lab 1 vídeo (autoalojado) | ⏳ Pendiente | Botón oculto hasta añadir `videoUrl` |
| Lab 1 demoUrl | ⏳ Pendiente | Botón oculto hasta añadir URL |
