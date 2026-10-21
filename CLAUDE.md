# Contexto del proyecto — Maroru's Assistance Web

Este archivo mantiene el contexto compartido entre distintas instancias de Claude Code (alternancia entre máquinas Mac y Windows del desarrollador). Lee este archivo siempre al iniciar una sesión nueva.

## Qué es este proyecto

Web de portfolio profesional para Manuel Romero, freelance GenAI Engineer.

**Posicionamiento (oct 2026):** "Agentes y RAG en producción, con calidad y coste medidos. Azure y AWS." El diferencial es la evaluación sistemática (calificación a ciegas, harness, coste frente a calidad), respaldada por Indra Group, el datatón con Turing Challenge y LILT. Sustituye al enfoque inicial "IA para operaciones B2B sobre Azure".

Dos audiencias, en este orden de prioridad:
1. **Equipos técnicos** (CTOs, consultoras, equipos de producto) que necesitan llevar agentes/RAG a producción con garantías — tarifa 350€/jornada
2. **Negocio / operaciones** (no solo supply chain): IA aplicada a procesos reales — catálogos, documentos, soporte, comunicación financiera — a presupuesto

No presentar la web como "solo Azure" ni con pruebas solo de Wembley: cada bloque de prueba debe mezclar experiencia AWS/2026 y Azure/Wembley.

La web sustituye una landing previa de HTML plano con React por CDN. Se construye desde cero con Astro 5.

## Stack técnico

- **Framework**: Astro 5
- **Estilos**: Tailwind CSS 4 (integración oficial de Astro)
- **Tipado**: TypeScript estricto
- **i18n**: nativo de Astro, locales `es` (default, sin prefijo) y `en` (prefijo `/en`)
- **Componentes interactivos**: React solo donde es estrictamente necesario (formulario de contacto principalmente)
- **Validación de formularios**: Zod
- **Envío de formularios**: Formspree (endpoint: https://formspree.io/f/xwvveolo)
- **Calendario**: Calendly embed (URL: https://calendly.com/marorusassistance/30min)
- **Hosting**: Cloudflare Workers con static assets (no Pages — usamos el nuevo sistema de Workers)
- **Repo**: https://github.com/MarorusAssistance/Marorus-Assistance-Web
- **Producción**: https://marorusassistance.com (y www), dominio personalizado del Worker `marorus-assistance-web` desde el 21 oct 2026. También responde en marorus-assistance-web.marorusassistance.workers.dev
- **Despliegue**: Cloudflare Workers Builds conectado al repo. Rama de producción `main`; cualquier otra rama genera una vista previa en `<rama>-marorus-assistance-web.marorusassistance.workers.dev`
- **DNS**: zona en Cloudflare. Los registros MX y el TXT de SPF son del reenvío de correo de Cloudflare: no tocarlos. GitHub Pages está desactivado

## Branding y diseño

### Colores y tipografía (folio, oct 2026) — tokens en `src/styles/global.css`
- `paper` #f6f3ee, `bone` #ebe5dc, `charcoal` #2f2b28 (fondos que alternan por capítulo)
- `ink` #1f1c1a, `ink-muted` #5f5852; sobre oscuro `on-dark` #efe9e1, `on-dark-muted` #b8ada1
- `primary` #b80000 (granate de marca, único acento), `primary-dark` #8a0000, `primary-soft` #e8a9a0 (granate legible sobre carbón)
- Todos los pares de texto ≥ 4.5:1 (comprobado)
- **Instrument Serif** (`font-display`, clase `.display`) para títulos y nombres a tamaño enorme; **Hanken Grotesk** (`font-body`) para todo lo demás. Sin mono, sin Space Grotesk/Inter/Bebas.
- Sin tarjetas, sin sombras, sin etiquetas tipo "eyebrow", sin numeración 01/02/03: reglas finas y tipografía.

### Filosofía visual
- Anti-marketing: nada de palabrería, frases vacías o claims grandilocuentes
- Profesional B2B con personalidad, no genérico tipo template
- Diferenciado del freelance medio: paleta cálida (granate + beige), no la típica web tech oscura con neón
- Diseño con respiración: espacios generosos, jerarquía clara, sin saturar
- Sin gradientes en CTAs (colores planos)
- Microinteracciones sutiles permitidas (fade-in, slide-up, hover suave)

## Brief de rediseño visual (oct 2026) — ejecutado como "folio" (ver Estructura de la web)

El contenido está casi cerrado; el siguiente bloque de trabajo es estético. La web actual está bien construida pero es predecible: cae en casi todos los clichés de "web hecha por IA" que lista el skill oficial `frontend-design` de Anthropic.

**Herramientas instaladas en el proyecto** (usarlas para cualquier trabajo visual):
- `frontend-design` (plugin oficial de Anthropic, `.claude/settings.json`): obliga a hacer un plan de diseño antes de escribir UI y lista los clichés a evitar.
- `impeccable` (`.claude/skills/impeccable/`, de pbakaus, Apache 2.0): `/impeccable critique`, `audit`, `polish`, `bolder`, `typeset`, `layout`, `animate`… Esta web es modo **Persuade** (landing) con la sección de Proyectos en modo **Experience**. Su `init` escribe `PRODUCT.md`/`DESIGN.md` en la raíz.
- Referencia: [Prompting for frontend aesthetics](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics) (cookbook de Anthropic).

**Se mantiene (marca):**
- Granate `#b80000` como color dominante y el beige como base, salvo que el usuario diga lo contrario (pendiente de confirmar si se pueden ajustar tonos).
- Logo y lema **Conecta. Desconecta. Reconecta.**
- Tono anti-marketing, cifras defendibles, todo el contenido actual.

**Se cambia — clichés detectados en la web actual:**

| Cliché | Dónde está hoy |
|---|---|
| Space Grotesk + Inter (las fuentes por defecto de la IA) | Toda la web |
| Fondo crema + acento terracota/rojo ejecutado de forma genérica | Toda la web |
| Etiquetas pequeñas en mayúsculas con mucho tracking | "TRAYECTORIA", "DECISIONES TÉCNICAS", "EL DOLOR"… |
| Resaltar una palabra del titular en color | "No demos." |
| Metadatos con puntos medios | Línea meta de cada caso |
| Flechas añadidas a los enlaces | "Ver arquitectura →", "Cuéntame tu caso →" |
| Numeración sin secuencia real | 01/02/03 en Servicios IT y en IA para negocio |
| Número grande + etiqueta pequeña como gancho | Banda de stats |
| Rejilla de tarjetas iguales tipo SaaS | Servicios IT |

**Dirección:**
- **Alinear la web con el lenguaje visual de las miniaturas y arquitecturas de proyectos** (`src/assets/projects/`): sans geométrica (por identificar la fuente exacta), números condensados enormes en granate, "píldoras" de flujo conectadas con `>` y cajas de diagrama. Hoy la web y las imágenes hablan idiomas distintos.
- **Un único elemento memorable**: candidato principal, el hero construido con ese lenguaje de flujo/diagrama (cómo trabaja un sistema de IA: pregunta → agentes → respuesta medida) en lugar de titular + número. El resto, disciplinado.
- Tipografía con contraste extremo de pesos (200 frente a 800) y saltos de tamaño de 3× o más.
- Fondos con profundidad (capas, patrón) en lugar de planos.
- Movimiento: una carga de página bien orquestada + animaciones ligadas al scroll con CSS nativo (scroll-driven animations), respetando `prefers-reduced-motion`. Nada de microanimaciones repartidas.

**Pendiente del usuario:** 2-3 webs de referencia que le gusten (Awwwards portfolio, etc.) y confirmar si los tonos de marca se pueden ajustar.

**Proceso:** plan de diseño corto → revisión contra clichés → hero primero → resto por secciones, con capturas en escritorio (1280) y móvil (390) en cada iteración.

## Tono de contenido

- Directo, técnico cuando habla al cliente IT, claro cuando habla a operaciones
- Honesto: si algo es demo se dice; si es producción se dice
- Cifras reales y defendibles (nada inflado)
- Cero buzzwords vacías ("transformación digital", "revoluciona tu negocio", "soluciones innovadoras")
- Referencias de tono: vercel.com, anthropic.com, langchain.com

## Estructura de la web

**Rediseño "folio" (oct 2026)**, inspirado en khanhnguyen.design (referencia elegida por el usuario). La web se lee como un libro por capítulos. Componentes en `src/components/folio/`; dirección y contrato de diseño en `.impeccable/surfaces/src-pages-index-astro.md`; contexto de producto en `PRODUCT.md`.

Home (`/`, `/en/`), con lomo fijo a la izquierda (`Spine.astro`: menú a pantalla completa, nombre en vertical, barra de progreso; barra superior en móvil):
- **Portada** (`Cover`) — "MARORU'S ASSISTANCE" gigante, posicionamiento, lema, hora local, "Reservar llamada" + Malt
- **Capítulo I · Quién** (`Intro`, #quien) — presentación + foto + enlace a /sobre-mi
- **Capítulo II · Los casos** (`Work`, #casos) — galería horizontal de miniaturas (se fija y avanza con el scroll vertical en escritorio; carrusel con snap en móvil y con movimiento reducido), lista de casos y Labs
- **Capítulo III · Servicios** (`Services`, #servicios) — 3 columnas + tarifa
- **Capítulo IV · Para negocio** (`Business`, #negocio) — 4 problemas, cada uno enlaza a su caso
- **Capítulo V · Trayectoria** (`Record`, #trayectoria) — Indra, LILT, Turing, Maroru's Assistance, Wembley con su prueba medida + certificaciones
- **Capítulo VI · Cómo trabajo** (`Method`, #como-trabajo) — Conecta. Desconecta. Reconecta.
- **Siguiente capítulo** (`NextChapter`, #contacto) — email grande, Calendly, formulario, pie

Páginas nuevas:
- **Casos** `/casos/<slug>` · `/en/cases/<slug>` (`CasePage`): título, resumen, arquitectura a tamaño grande, decisiones, stack, entregables, bloque "Para negocio" (dolor/solución/resultado) y siguiente caso. Datos en `src/data/cases.ts`.
- **Sobre mí** `/sobre-mi` · `/en/about` (`AboutPage`): bio completa, skills y certificaciones.

Ya no se usan (borrados): Hero, Stats, ServicesIT, Operations, Projects, About, HowIWork, Contact, Nav, Footer, LanguageSwitcher. La banda de stats desaparece como bloque: sus cifras viven en la Trayectoria y en el texto.

## Decisiones de contenido importantes

- LOLO es proyecto personal en investigación, NO producto comercial. Se muestra en Labs como visión arquitectónica.
- No se nombran clientes finales (Roca, Gesvalt). Se describen por sector ("retail / sanitarios y baño", "tasación y valoración").
- Wembley Studios sí se nombra como empleador anterior.
- Las certificaciones NO van en banda de stats. Van en sección "Sobre mí" como credenciales de autoridad.
- Proyectos Lab que NO van con vídeo (porque están a medias): solo arquitectura + GitHub. Lead manager y n8n local NO se enlazan a su GitHub individual (se mencionan como "frentes activos" sin link).
- Bot conversacional en la web (idea de meta-demo): pospuesto a fase 2.

- **Datatón (jul 2026):** fue en colaboración con la empresa **Turing Challenge**. Escribir "datatón con Turing Challenge" (EN "datathon with Turing Challenge"), nunca "Datatón de Turing".
- **Lab 1 = Logiassist** (antes "Asistente Interno para Microsoft Teams"): asistente RAG para una empresa de logística ficticia, demo y portfolio técnico. Teams está descartado; no volver a presentarlo como bot de Teams. Repo: https://github.com/MarorusAssistance/Logiassist. Solo modelos con datos en la UE.
- **Foto:** la web usa `src/assets/photo-cutout.png` (retrato recortado sin fondo, PNG transparente 2714×2528, sacado del original 4176×2784 `src/assets/photo.jpeg` con el recorte de sujetos de macOS/Vision). Se muestra entera, sin recorte cuadrado, sobre fondo claro, con el borde inferior apoyado en el final de la sección (si flota en medio parece un pegote). Ojo: sobre fondo oscuro aparece un leve halo blanco en el pelo; no usarla sobre carbón sin limpiar ese borde. La versión antigua de 1024×687 sigue en `legacy/src/`.

- **Logos de terceros: ninguno** (decisión del usuario, por prudencia contractual). Ni Indra, ni Turing Challenge, ni LILT, ni Wembley, ni Malt. Los contratos de Indra (vía Malt, cl. 11.3-11.4 y 10) y de Turing Challenge (cl. Tercera y Sexta) exigen consentimiento para usar su marca o publicitar la relación; el usuario va a pedir permiso para nombrarlos. **Nunca nombrar a los clientes finales** de Indra ni de Turing Challenge.
- **Fecha del datatón:** se mantiene "jul 2026" a propósito (duró una semana; la fecha exacta no es relevante para el usuario).
- **Favicon:** la esferita de Maroru's Assistance (`public/favicon-32.png`, `favicon-512.png`, `apple-touch-icon.png`), recortada de `legacy/src/Logo_Marorus_Assistance.png`.

## URLs y assets externos

- LinkedIn: https://www.linkedin.com/in/manuel-pedro-romero-ruiz/
- GitHub usuario: https://github.com/MarorusAssistance
- Email: marorusassistance@gmail.com
- Teléfono: +34 628 503 214
- Malt: https://www.malt.es/profile/manuelromero?origin=dashboard_profile_name

## Plan de sesiones

| Sesión | Estado | Qué construye |
|---|---|---|
| 1 | ✅ | Scaffolding Astro + Tailwind + i18n |
| 2 | ✅ | Nav, Footer, Layout, selector idioma |
| 3 | ✅ | Hero + banda de stats (3 stats) |
| 3.5 | ✅ | CLAUDE.md + mejoras visuales hero (Opción C) |
| 4 | ✅ | Servicios IT (3 cards) |
| 5 | ✅ | Operaciones IA (3 bloques) |
| 6 | ✅ | Proyectos (Wembley + Labs) |
| 7 | ✅ | Sobre mí + Cómo trabajo + Contacto |
| 8 | ✅ | SEO, performance, sitemap, OG image |
| 8.5 | ✅ | Proyectos 2026 (Indra, Turing, LILT), visuales nuevos, reposicionamiento Azure + AWS |
| 8.6 | ✅ | Rediseño "folio" (capítulos, páginas de caso, sobre mí) |
| 9 | ✅ | Deploy a producción + DNS swap (21 oct 2026) |

## Cómo trabajar en este proyecto

- **Ramas**: trabajar en una rama nueva desde `main` y fusionar por PR; fusionar en `main` publica en producción.
- **Antes de cada sesión**: lee este CLAUDE.md y luego `git log --oneline -10` para ver el último estado.
- **Después de cada sesión**: actualiza la tabla de "Plan de sesiones" marcando completada, y haz commit en la rama de desarrollo.
- **Cualquier decisión técnica no especificada**: documéntala al final de este archivo en la sección "Decisiones técnicas tomadas".
- **NO instalar dependencias innecesarias**: pensar bien si hace falta antes de añadir paquetes.
- **NO mergear a main sin el OK del usuario**: `main` es producción. El push a otra rama dispara una vista previa en Cloudflare.
- **Commits y PRs sin marcas de Claude**: ni `Co-Authored-By` ni "Generated with Claude Code" (petición del usuario).

## Decisiones técnicas tomadas

- **Astro 6.3.7 en lugar de Astro 5**: `create-astro@latest` instala la versión más reciente (6.x). Funcionalmente equivalente para todo el stack descrito.
- **Tailwind CSS 4 con `@tailwindcss/vite`**: integración vía plugin Vite, no `@astrojs/tailwind`. El tema se define en `@theme {}` dentro de `src/styles/global.css`. No existe `tailwind.config.js`.
- **Animaciones de entrada con CSS puro**: keyframes definidos en `global.css`, clases `.animate-fade-slide-up`, `.animate-fade-slide-down`, `.animate-fade-in`. Delays aplicados via `style="animation-delay: Xms"`. Sin librerías externas (no framer-motion, no GSAP).
- **Stats IntersectionObserver con degradación elegante**: los stats son visibles por defecto (sin JS o sin animación). El script añade la clase `.stats-animate` al contenedor solo si el navegador soporta IntersectionObserver y no tiene `prefers-reduced-motion`. Al entrar en viewport, añade `.stat-visible` a cada item con delay escalonado.
- **Dot pattern como CSS radial-gradient**: `background-image: radial-gradient(circle, var(--color-text) 1px, transparent 1px)` con `background-size: 28px 28px` y `opacity: 0.065`. Aplicado en un `<div>` absolutamente posicionado dentro del hero, no como SVG inline separado (más simple y sin request extra).
- **Scroll indicator oculto en móvil**: se muestra solo en `md:` breakpoint para no saturar pantallas pequeñas.
- **`data/projects.ts` y `data/services.ts`** usan `unknown[]` como placeholder tipado hasta que se definan las interfaces en sesión 6.
- **ServicesIT stack chips hardcodeados en frontmatter**: los chips de tecnologías son términos técnicos idénticos en ES/EN, no requieren i18n.
- **ServicesIT IntersectionObserver**: threshold `0.15` (más bajo que stats ya que las cards son más altas), stagger `150ms` por card.
- **Card background**: `bg-bg-light` (#f0ece5) sobre sección `bg-bg` (#e6e1d9) para contraste visual.
- **Fix JSON inválido en i18n**: es.json y en.json tenían claves `"hero"` y `"stats"` duplicadas (legacy del merge). Limpiadas en sesión 4.
- **Operations layout**: `grid-cols-[2fr_3fr]` (~40/60), fondo sección `bg-bg-light`, sub-bloque result con `bg-bg` (inversión de contraste dentro de sección más clara).
- **Operations números**: `font-accent text-8xl md:text-9xl text-primary` (Bebas Neue) — contraste visual con font-display de ServicesIT.
- **Operations IntersectionObserver**: threshold `0.1`, stagger `200ms` por bloque (bloques más altos = threshold más bajo y stagger más amplio que cards).
- **Operations nota de transparencia**: `border-l-2 border-primary pl-4 italic text-sm` — visible pero discreta.
- **Projects modal**: elemento nativo `<dialog>` + vanilla JS. Sin librerías externas. `dialog::backdrop` para overlay, `showModal()` / `close()` API. El evento `close` limpia el innerHTML del body (cubre Escape nativo).
- **Projects visuales (oct 2026)**: cada caso tiene miniatura + arquitectura en `src/assets/projects/<caso>-thumb.png` y `<caso>-architecture.png`, importadas en `Projects.astro` y optimizadas a WebP por Astro (miniatura con `<Image>`, arquitectura con `getImage()` para el modal). La columna derecha de la tarjeta es solo la miniatura clicable + botón "Ver arquitectura", sticky en escritorio. Se probó poner métricas en texto bajo la miniatura y se descartó: repetía lo que ya dice la imagen. Los diagramas técnicos anteriores de Wembley están archivados en `src/assets/diagrams/older/` (fuera de `public/`, no se publican). El del Lab 1 sigue en `public/diagrams/`. Las imágenes solo existen en español.
- **⚠️ Imágenes de Indra pendientes de corregir**: `indra-thumb.png` dice "aplicaciones legacy" e `indra-architecture.png` incluye tamaños de muestra ("45 preguntas reales", "19 consultas") y la errata "aplicacione". Enlazadas igualmente por decisión del usuario; sustituir los PNG (mismo nombre) cuando haya versiones corregidas.
- **Projects arrays en i18n**: `decisions` y `stack` como arrays nativos en JSON. Accedidos mediante import directo del JSON en el frontmatter (`esData.projects.production1.decisions`), no vía `t()` helper (que solo retorna strings).
- **Projects layout producción**: `grid-cols-[3fr_2fr]` (~60/40), cards horizontales apiladas una bajo otra.
- **Casos 2026 (Indra Group, Datatón con Turing Challenge)**: en i18n como `projects.case1` y `projects.case2`, en la misma lista de tarjetas que Wembley, antes que ellos (más reciente primero). La subsección "En producción" pasó a llamarse "Casos". Campo opcional `deliverables`. LILT va solo como línea en la bio de "Sobre mí", no como tarjeta. Reglas de contenido en `content/copy-es.md` §5.
- **Inicio freelance**: marzo de 2025 (confirmado por el usuario; sustituye a "abril" en la bio).
- **Projects video**: autoalojado (no Vimeo/YouTube) — vídeo corto y básico, se evitan cookies de terceros y dependencias externas. `<video>` nativo en el modal. `videoUrl` `"PENDING"` en i18n = botón oculto. MP4 < 25 MB en `public/videos/`; si es mayor, Cloudflare R2. Ver `content/assets-guide.md`.
- **Projects demoUrl**: mismo patrón — `"PENDING"` = botón oculto.
- **Sitemap**: `@astrojs/sitemap` con i18n (`es-ES`, `en-US`). Excluye `/privacidad` y `/en/privacy` via `filter`. Requiere `site` en `astro.config.mjs`.
- **OG image**: SVG en `public/og-image.svg` + PNG generado con `sharp` via `npm run generate:og`. El PNG se commitea al repo. Layout.astro usa `.png` como default.
- **JSON-LD**: dos bloques en `<head>` de Layout.astro — `Person` (Manuel Romero, certificaciones, sameAs) y `ProfessionalService` (Maroru's Assistance).
- **Calendly lazy load**: script de Calendly se inyecta via `IntersectionObserver` en Contact.astro cuando el widget entra en viewport (`rootMargin: 200px`). Elimina el peso de Calendly del tiempo de carga inicial.
- **Modal accesibilidad**: `lastFocused` tracking — al cerrar el modal, el foco vuelve al botón que lo abrió. Al abrir, el foco va al botón de cerrar.
- **React instalado en sesión 7**: `@astrojs/react` + `react` + `react-dom` + `@types/react` + `@types/react-dom`. Integración añadida en `astro.config.mjs`.
- **Zod instalado en sesión 7**: validación de formulario en cliente desde `ContactForm.tsx`.
- **ContactForm.tsx**: React island con `client:load`. Props de i18n pasadas desde `Contact.astro`. Validación con Zod, POST a Formspree `https://formspree.io/f/xwvveolo`. Estado: 'idle' | 'submitting' | 'success' | 'error'.
- **Foto**: `src/assets/photo.jpeg` — Astro la optimiza a WebP en build (350kB → 23kB). Usar `<Image>` de `astro:assets`.
- **HowIWork step body**: texto con `\n\n` en JSON, spliteado en frontmatter/template para renderizar como párrafos `<p>` separados.
- **Contact sección**: `bg-bg-dark` — cierra la web en oscuro. Cards Calendly y formulario en `bg-bg-light` para contraste.
- **Aviso legal y privacidad**: una sola página por idioma (`/privacidad`, `/en/privacy`) generada por `src/components/folio/LegalPage.astro`, con los datos del titular (LSSI art. 10: Manuel Pedro Romero Ruiz, NIF, domicilio de notificaciones en la gestoría Atrio Consultores, Salamanca) y la política RGPD (Formspree, Calendly, Cloudflare, Gmail). Si se añade analítica, otro proveedor o un campo al formulario, actualizar esa página.
- **Fuentes autoalojadas** en `public/fonts/` (subconjunto latin de Google Fonts, licencia OFL), declaradas con `@font-face` en `global.css`: la web no hace ninguna petición a Google.
- **Calendly con carga al pulsar** ("Ver disponibilidad"): nada de Calendly se descarga hasta que el visitante lo pide, porque pone cookies de terceros. Sustituye a la carga por IntersectionObserver.
