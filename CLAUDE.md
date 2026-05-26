# Contexto del proyecto — Maroru's Assistance Web

Este archivo mantiene el contexto compartido entre distintas instancias de Claude Code (alternancia entre máquinas Mac y Windows del desarrollador). Lee este archivo siempre al iniciar una sesión nueva.

## Qué es este proyecto

Web de portfolio profesional para Manuel Romero, freelance GenAI Engineer. Dos audiencias objetivo:
1. Cliente IT (CTOs, Project Managers) que buscan subcontratación freelance senior — tarifa 350€/jornada
2. Cliente supply chain / operaciones que necesitan IA aplicada a procesos internos — a presupuesto

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
- **URL temporal**: marorus-assistance-web.marorusassistance.workers.dev
- **Dominio final**: marorusassistance.com (DNS en Cloudflare apuntando a GitHub Pages actualmente — se migrará en Sesión 9)

## Branding y diseño

### Colores (variables CSS y clases Tailwind)
- `--color-primary`: #b80000 (rojo granate, CTAs y acentos)
- `--color-primary-dark`: #8a0000 (hover de CTAs)
- `--color-bg`: #e6e1d9 (beige claro, fondo principal)
- `--color-bg-light`: #f0ece5 (beige más claro, fondos alternos)
- `--color-bg-dark`: #1a1a1a (casi negro, secciones oscuras)
- `--color-text`: #0a0a0a (texto principal)
- `--color-text-muted`: #5a5550 (texto secundario)
- `--color-border-soft`: #d4cfc5 (bordes sutiles)

### Tipografías (Google Fonts)
- **Space Grotesk** (font-display): titulares h1/h2, logo, texto destacado. Pesos: 400, 500, 700
- **Inter** (font-body): cuerpo de texto, UI, párrafos. Pesos: 400, 500, 600
- **JetBrains Mono** (font-mono): stack técnico, badges, código. Pesos: 400, 500
- **Bebas Neue** (font-accent): números de stats, detalles de impacto. Pesos: 400

### Filosofía visual
- Anti-marketing: nada de palabrería, frases vacías o claims grandilocuentes
- Profesional B2B con personalidad, no genérico tipo template
- Diferenciado del freelance medio: paleta cálida (granate + beige), no la típica web tech oscura con neón
- Diseño con respiración: espacios generosos, jerarquía clara, sin saturar
- Sin gradientes en CTAs (colores planos)
- Microinteracciones sutiles permitidas (fade-in, slide-up, hover suave)

## Tono de contenido

- Directo, técnico cuando habla al cliente IT, claro cuando habla a operaciones
- Honesto: si algo es demo se dice; si es producción se dice
- Cifras reales y defendibles (nada inflado)
- Cero buzzwords vacías ("transformación digital", "revoluciona tu negocio", "soluciones innovadoras")
- Referencias de tono: vercel.com, anthropic.com, langchain.com

## Estructura de la web

Una sola landing principal con secciones bifurcadas para cada audiencia. Anclas internas:

1. **Hero** (#inicio) — bifurca con dos CTAs (cliente IT y operaciones)
2. **Banda de stats** — 3 métricas de impacto sobre fondo oscuro
3. **Servicios IT** (#servicios-it) — 3 cards técnicas + tarifa 350€/jornada
4. **Operaciones IA** (#operaciones) — 3 bloques dolor→solución→resultado
5. **Proyectos** (#proyectos) — En producción (Wembley) + Labs (proyectos propios)
6. **Sobre mí** (#sobre-mi) — bio, skills agrupados, certificaciones (AI-102, DP-100, AZ-204)
7. **Cómo trabajo** (#como-trabajo) — Conecta. Desconecta. Reconecta.
8. **Contacto** (#contacto) — Calendly + formulario

## Decisiones de contenido importantes

- LOLO es proyecto personal en investigación, NO producto comercial. Se muestra en Labs como visión arquitectónica.
- No se nombran clientes finales (Roca, Gesvalt). Se describen por sector ("retail / sanitarios y baño", "tasación y valoración").
- Wembley Studios sí se nombra como empleador anterior.
- Las certificaciones NO van en banda de stats. Van en sección "Sobre mí" como credenciales de autoridad.
- Proyectos Lab que NO van con vídeo (porque están a medias): solo arquitectura + GitHub. Lead manager y n8n local NO se enlazan a su GitHub individual (se mencionan como "frentes activos" sin link).
- Bot conversacional en la web (idea de meta-demo): pospuesto a fase 2.

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
| 6 | ⏳ | Proyectos (Wembley + Labs) |
| 7 | ⏳ | Sobre mí + Cómo trabajo + Contacto |
| 8 | ⏳ | SEO, performance, sitemap, OG image |
| 9 | ⏳ | Deploy a producción + DNS swap |

## Cómo trabajar en este proyecto

- **Rama de desarrollo**: `feat/astro-migration`. NO mergear a `main` hasta sesión 9.
- **Antes de cada sesión**: lee este CLAUDE.md y luego `git log --oneline -10` para ver el último estado.
- **Después de cada sesión**: actualiza la tabla de "Plan de sesiones" marcando completada, y haz commit en la rama de desarrollo.
- **Cualquier decisión técnica no especificada**: documéntala al final de este archivo en la sección "Decisiones técnicas tomadas".
- **NO instalar dependencias innecesarias**: pensar bien si hace falta antes de añadir paquetes.
- **NO mergear a main automáticamente**: el push a la rama de desarrollo dispara preview deploy en Cloudflare. Eso es suficiente.

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
