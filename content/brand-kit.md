# Kit de marca — Maroru's Assistance (para proyectos satélite: Logiassist, demos, labs)

Fuente de verdad: `DESIGN.md` y `src/styles/global.css` del repo de la web (Marorus-Assistance-Web). Este documento traduce ese sistema a **interfaces de producto** (un chat, una demo, un panel), donde el visitante *usa* algo en lugar de *leerlo*. La web es un "folio" editorial; un chat necesita la misma identidad con más contención: **misma paleta, mismas fuentes, mismas reglas de forma, menos tamaño de display**.

Copia este archivo al otro repo (por ejemplo `docs/brand-kit.md`) y el bloque CSS de abajo a su hoja de estilos.

---

## 1. La identidad en una frase

Papel cálido y carbón, una sola tinta granate, tipografía serif fina para nombres y títulos, grotesca ligera para todo lo que se lee u opera, reglas finas de 1 px en lugar de tarjetas. **Plano, cuadrado, sobrio.**

## 2. Colores

| Token | Hex | Uso |
|---|---|---|
| `--paper` | `#f6f3ee` | Fondo principal |
| `--bone` | `#ebe5dc` | Fondo alterno (paneles laterales, bloques de fuentes/citas, mensajes del usuario) |
| `--charcoal` | `#2f2b28` | Fondo oscuro: barra superior, cabeceras, overlays |
| `--ink` | `#1f1c1a` | Texto principal sobre papel/hueso |
| `--ink-muted` | `#5f5852` | Texto secundario, metadatos, etiquetas (6,3:1 sobre papel) |
| `--on-dark` | `#efe9e1` | Texto principal sobre carbón |
| `--on-dark-muted` | `#b8ada1` | Texto secundario sobre carbón (6,4:1) |
| `--maroon` | `#b80000` | **Único acento**: acción principal, enlaces en hover, foco, selección, errores |
| `--maroon-deep` | `#8a0000` | Hover del botón granate |
| `--maroon-on-dark` | `#e8a9a0` | Granate legible sobre carbón (7:1). Nunca uses `#b80000` como texto sobre carbón |
| `--rule` | `#d6cec3` | Líneas finas sobre fondos claros |
| `--rule-dark` | `#4a443f` | Líneas finas sobre carbón |

Reglas:
- **Una sola tinta.** El granate marca acción y estado; nunca rellena una sección ni un panel. Nada de segundo color de acento (ni azul de enlaces, ni verde de "ok").
- **Cada fondo con su par de texto**: papel/hueso → `ink`/`ink-muted`; carbón → `on-dark`/`on-dark-muted`. Todos los pares cumplen ≥ 4,5:1.
- **Estados sin colores nuevos**: éxito = texto `ink` + icono/línea; aviso = `ink-muted` en cursiva; error o bloqueo = granate. Si necesitas distinguir más, usa peso, forma o una línea, no otro color.

## 3. Tipografía

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Hanken+Grotesk:wght@300..600&display=swap" rel="stylesheet">
```

- **Instrument Serif** (400, normal e itálica): **nombres y títulos**. El nombre del producto ("Logiassist"), títulos de pantalla, cabeceras de bloque. Siempre con `line-height: 0.9–1` y `letter-spacing: -0.02em`.
- **Hanken Grotesk** (variable 300–600, base **350**): **todo lo que se lee u opera**: mensajes del chat, botones, inputs, etiquetas, tablas.
- **Monoespaciada** (`ui-monospace`): solo para código, IDs, rutas o JSON reales. Nunca como "decoración técnica".

Escala para una interfaz de producto (más contenida que la web):

| Rol | Fuente | Tamaño | Peso |
|---|---|---|---|
| Nombre del producto (barra) | Instrument Serif | 1.75rem | 400 |
| Título de pantalla / estado vacío | Instrument Serif | clamp(2.5rem, 5vw, 4rem) | 400 |
| Cabecera de bloque ("Fuentes", "Historial") | Instrument Serif | 1.5–2rem | 400 |
| Texto de mensaje | Hanken Grotesk | 1.0625rem, line-height 1.6 | 350 |
| UI, botones, inputs | Hanken Grotesk | 1rem | 400 |
| Etiquetas, metadatos | Hanken Grotesk | 0.875rem | 350 |

Reglas:
- El serif **nunca** se usa para párrafos ni controles.
- **Nada de "eyebrows"**: ninguna etiqueta pequeña en mayúsculas con mucho tracking encima de un título. Etiquetas en minúscula normal (sentence case).
- Ancho de lectura máximo **68ch** en las respuestas.
- Cifras alineadas (tiempos, costes, puntuaciones) con `font-variant-numeric: tabular-nums`.
- La cursiva serif está reservada al lema "Conecta. Desconecta. Reconecta.".

## 4. Forma

- **Radio 0 en todo**: botones, inputs, mensajes, imágenes, modales.
- **Sin sombras, sin blur, sin glass, sin degradados.** La separación se hace cambiando de fondo (papel → hueso → carbón) o con **una línea de 1 px**.
- **Listas = filas entre líneas finas**, no tarjetas: línea arriba de la lista y línea abajo de cada fila.
- Espaciado en múltiplos de 4 px; márgenes laterales 20 px en móvil, 48 px en escritorio.
- Movimiento mínimo: transiciones de color de 150–200 ms. Lo único que "se mueve" en un chat es el streaming del texto. Respeta `prefers-reduced-motion`.

## 5. Cómo se ve un chat con esta identidad (Logiassist)

- **Barra superior** carbón, 56 px: "Logiassist" en Instrument Serif (`--on-dark`) a la izquierda; a la derecha, en Hanken pequeño `--on-dark-muted`, "por Maroru's Assistance" enlazando a la web. Nada más.
- **Fondo de conversación** papel. Columna central de máx. ~760 px.
- **Mensajes**:
  - *Usuario*: bloque en `--bone`, alineado a la derecha, sin radio, padding 12×16.
  - *Asistente*: sin fondo, texto `--ink` directo sobre papel, alineado a la izquierda. Entre turnos, una línea `--rule`.
  - Una etiqueta pequeña `--ink-muted` encima de cada mensaje ("Tú" / "Logiassist"), en minúscula normal, no en mayúsculas.
- **Citas / fuentes**: referencias numeradas en el texto (`[1]`) como enlaces subrayados; debajo de la respuesta, bloque "Fuentes" con cabecera en serif y filas entre líneas finas (título del documento + fragmento en `--ink-muted`).
- **Nivel de evidencia / confianza**: texto, no un color nuevo: "Evidencia suficiente" en `--ink`, "Evidencia débil" en `--ink-muted` cursiva, "Sin evidencia" en granate.
- **Respuesta bloqueada (prompt injection, fuera de ámbito)**: fila con línea izquierda **de 1 px** granate como máximo (nunca más gruesa) o simplemente el texto en granate; mensaje claro de qué se bloqueó y qué puede preguntar en su lugar.
- **Streaming**: el texto aparece tal cual; como indicador, un cursor/bloque fino granate al final de la línea. Nada de puntos que botan.
- **Input**: textarea con borde inferior de 1 px `--ink-muted` (pasa a granate con foco), sin caja ni radio; botón "Enviar" granate cuadrado de 48 px de alto a la derecha. `Enter` envía, `Shift+Enter` salto de línea.
- **Estado vacío**: título en serif grande ("¿En qué te ayudo con la operación?"), una línea de contexto en `--ink-muted` y 3–4 preguntas de ejemplo como **filas entre líneas finas** clicables (no chips ni tarjetas).
- **Panel de métricas / coste** (si lo hay): fondo `--bone`, cifras en Hanken tabular, etiquetas en `--ink-muted`; títulos de bloque en serif.
- **Aviso de demo**: una fila fina arriba o abajo: "Demo con datos ficticios de una empresa de logística. Modelos con datos en la UE." en `--ink-muted`.

## 6. CSS listo para pegar

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Hanken+Grotesk:wght@300..600&display=swap');

:root {
  --paper: #f6f3ee;
  --bone: #ebe5dc;
  --charcoal: #2f2b28;
  --ink: #1f1c1a;
  --ink-muted: #5f5852;
  --on-dark: #efe9e1;
  --on-dark-muted: #b8ada1;
  --maroon: #b80000;
  --maroon-deep: #8a0000;
  --maroon-on-dark: #e8a9a0;
  --rule: #d6cec3;
  --rule-dark: #4a443f;

  --font-display: "Instrument Serif", "Times New Roman", serif;
  --font-body: "Hanken Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, monospace;
}

*, *::before, *::after { box-sizing: border-box; border-radius: 0; }

html { -webkit-text-size-adjust: 100%; scrollbar-color: var(--ink-muted) var(--paper); scrollbar-width: thin; }
body {
  margin: 0;
  font-family: var(--font-body);
  font-weight: 350;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--ink);
  background: var(--paper);
  -webkit-font-smoothing: antialiased;
}

::selection { background: var(--maroon); color: var(--paper); }
:focus-visible { outline: 2px solid var(--maroon); outline-offset: 3px; }
.on-dark :focus-visible { outline-color: var(--maroon-on-dark); }

a { color: inherit; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 0.22em; transition: color .15s; }
a:hover { color: var(--maroon); }
.on-dark a:hover { color: var(--maroon-on-dark); }

.display {
  font-family: var(--font-display);
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
.muted { color: var(--ink-muted); }
.tabular { font-variant-numeric: tabular-nums; }
code, pre, kbd { font-family: var(--font-mono); font-size: 0.9em; }

/* Superficies */
.on-dark { background: var(--charcoal); color: var(--on-dark); }
.on-dark .muted { color: var(--on-dark-muted); }
.panel { background: var(--bone); }

/* Barra superior */
.topbar {
  height: 56px; display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; background: var(--charcoal); color: var(--on-dark);
  border-bottom: 1px solid var(--rule-dark);
}
.topbar .brand { font-family: var(--font-display); font-size: 1.75rem; line-height: 1; }
@media (min-width: 768px) { .topbar { padding: 0 48px; } }

/* Botones */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  height: 48px; padding: 0 24px; border: 0; cursor: pointer;
  font: 400 1rem/1 var(--font-body); color: var(--paper); background: var(--maroon);
  transition: background-color .15s;
}
.btn:hover { background: var(--maroon-deep); }
.btn:disabled { opacity: .6; cursor: not-allowed; }
.btn--ink { background: var(--ink); }
.btn--ink:hover { background: var(--maroon); }

/* Inputs */
.field { display: block; }
.field label { display: block; font-size: .875rem; color: var(--ink-muted); }
.input, .textarea {
  width: 100%; padding: 12px 0; background: transparent; color: var(--ink);
  font: 350 1.0625rem/1.5 var(--font-body);
  border: 0; border-bottom: 1px solid var(--ink-muted);
}
.input:focus, .textarea:focus { outline: none; border-bottom-color: var(--maroon); }
.textarea { resize: vertical; min-height: 48px; }

/* Listas de filas entre líneas */
.rows { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--rule); }
.rows > li { border-bottom: 1px solid var(--rule); padding: 16px 0; }
.on-dark .rows, .on-dark .rows > li { border-color: var(--rule-dark); }

/* Chat */
.chat { max-width: 760px; margin: 0 auto; padding: 32px 20px; }
.msg { padding: 20px 0; border-bottom: 1px solid var(--rule); }
.msg__who { font-size: .875rem; color: var(--ink-muted); margin-bottom: 6px; }
.msg--user { display: flex; flex-direction: column; align-items: flex-end; }
.msg--user .msg__body { background: var(--bone); padding: 12px 16px; max-width: 85%; }
.msg--assistant .msg__body { max-width: 68ch; }
.msg--blocked .msg__body { color: var(--maroon); }
.msg__sources { margin-top: 16px; }
.msg__sources h4 { font-family: var(--font-display); font-weight: 400; font-size: 1.5rem; margin: 0 0 8px; }
.cite { font-size: .8em; vertical-align: super; line-height: 0; }
.stream-caret { display: inline-block; width: .5em; height: 1.1em; background: var(--maroon); vertical-align: text-bottom; animation: caret 1s steps(1) infinite; }
@keyframes caret { 50% { opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
```

## 7. Qué no hacer

- Ni tarjetas con sombra, ni esquinas redondeadas, ni burbujas de chat redondeadas.
- Ni degradados, ni glassmorphism, ni fondos oscuros con neón.
- Ni Inter, Roboto, Space Grotesk o la fuente del sistema como voz principal.
- Ni un segundo color de acento (azul, verde, morado…).
- Ni etiquetas pequeñas en mayúsculas encima de los títulos, ni numeración 01/02/03 decorativa.
- Ni emojis como iconos. Si hacen falta iconos, una sola librería de trazo fino y del mismo grosor (p. ej. Lucide a 1.5 px).
- Ni el logo de ninguna empresa cliente.

## 8. Recursos de marca

- Logo esfera (PNG transparente, 2360×1640): `legacy/src/Logo_Marorus_Assistance.png` del repo de la web. Favicon recortado: `public/favicon-512.png`.
- Banner "MARORU'S ASSISTANCE · Conecta. Desconecta. Reconecta.": `legacy/src/Title_Marorus_Assistance.png` (solo 1050×600 y con fondo beige; pendiente una versión vectorial).
- Para Logiassist, el nombre del producto va en Instrument Serif como logotipo de texto; la esfera de Maroru's Assistance puede ir como favicon o pequeña en el pie ("por Maroru's Assistance").
