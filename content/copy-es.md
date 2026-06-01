# Contenido web — Manuel Romero · Freelance GenAI Engineer

Documento de contenido en español para las 8 secciones de la web de portfolio profesional. Listo para implementar por el equipo de desarrollo / diseño.

---

## ⚠️ Verificaciones antes de publicar

Antes de poner la web en producción, conviene revisar:

1. **NDA / confidencialidad con Wembley Studios y clientes finales.** En el contenido se ha optado por NO nombrar a Roca ni Gesvalt (se describen por sector). Aun así, si existe cláusula de confidencialidad activa respecto a Wembley, conviene confirmar que mencionar a Wembley como empleador anterior y describir los proyectos a nivel sectorial no infringe nada.
2. **Política de privacidad y aviso legal.** El formulario de contacto recoge datos personales. Se necesita política de privacidad accesible enlazada desde el formulario y desde el footer, además de aviso legal acorde a normativa española.
3. **Blindaje de la demo pública.** Antes de hacer pública la demo del Lab 1, configurar tope de presupuesto duro en Azure, rate limit por IP y por sesión, tope de `max_tokens` por petición, filtro de input fuera de scope y logging. (Tratado en otro chat según indicación del usuario.)

---

## 1. HERO

**Tagline (H1):**

Freelance GenAI Engineer. Sistemas de IA en producción, no demos.

**Subtítulo:**

Ingeniero freelance especializado en agentes, RAG y automatización con LLMs sobre Azure. He llevado a producción asistentes sobre 19.000 productos y automatizado 500 facturas/mes. Certificado AI-102, DP-100, AZ-204.

**CTAs:**

- CTA primario: **Soy CTO / IT Lead** → ancla a sección Servicios IT
- CTA secundario: **Soy de operaciones** → ancla a sección Operaciones IA

---

## 2. BANDA DE STATS

Cuatro números grandes, en línea horizontal (desktop) o grid 2x2 (móvil). Cada stat = número grande + descriptor corto debajo.

**Stat 1**
- Número: **19.000**
- Descriptor: *productos indexados en asistente de compras en producción*

**Stat 2**
- Número: **500/mes**
- Descriptor: *facturas en sistema de loyalty B2B*

**Stat 3**
- Número: **85-90%**
- Descriptor: *precisión en matching de facturas con datos ruidosos*

**Stat 4**
- Número: **3**
- Descriptor: *certificaciones Microsoft Azure: AI-102, DP-100, AZ-204*

---

## 3. SERVICIOS IT

Sección dirigida a CTOs, Project Managers y Business Development Managers que buscan refuerzo freelance senior. Tres cards.

**Intro corta de sección (opcional, antes de las cards):**

Servicios técnicos para equipos IT. Refuerzo de equipo o proyectos cerrados.

---

### Card 1 — Agentes y sistemas RAG

**Título:** Agentes IA y sistemas RAG

**Cuerpo:**

Diseño e implemento sistemas de Retrieval-Augmented Generation y agentes con tool-calling sobre LangChain y LangGraph. Hybrid search, semantic ranking, multi-query retrieval, routing. Stack probado: Azure OpenAI, AI Search, pgvector, FastAPI.

**Pie / prueba:**

*En producción: asistente de compras sobre 19.000 productos.*

---

### Card 2 — Automatización con LLMs e ingesta documental

**Título:** Automatización documental con IA

**Cuerpo:**

Pipelines de extracción e ingesta de documentos no estructurados (PDFs, facturas, contratos) hacia ERPs o bases de datos. Azure Document Intelligence, Functions, Service Bus, embeddings y fuzzy matching para datos ruidosos.

**Pie / prueba:**

*En producción: 500 facturas/mes en sistema de loyalty B2B, 85-90% de precisión de matching.*

---

### Card 3 — Arquitectura GenAI en Azure

**Título:** Arquitectura GenAI en Azure

**Cuerpo:**

Diseño de arquitecturas para LLMs en producción: orquestación de servicios, gestión de secretos, observabilidad, control de costes. Integración con sistemas existentes (Teams, CRMs, ERPs). Certificado AZ-204, DP-100, AI-102.

**Pie / prueba:**

*Bot de soporte en Teams con creación de tickets desplegado en cliente B2B.*

---

### Línea de cierre de sección

Discreta, al final de las tres cards, alineación a elegir:

> *Refuerzo de equipo: 350€/jornada · Proyectos cerrados: a presupuesto · Disponibilidad: remoto, UTC+1*

---

## 4. OPERACIONES IA

Sección dirigida a responsables de operaciones, compras o supply chain. Tres bloques estructurados como dolor → solución → resultado.

### Nota de transparencia al inicio de la sección

> *Casos desarrollados durante mi etapa como AI Engineer en Wembley Studios (2023-2025), hoy ofrecidos como servicio freelance.*

---

### Bloque 1 — Búsqueda de productos y catálogos

**El dolor:**

Tu equipo de compras o ventas pierde tiempo buscando productos en catálogos PDF, hojas de cálculo dispersas o ERPs lentos. Cada consulta a proveedor son minutos perdidos, errores de referencia y clientes esperando.

**La solución:**

Un asistente conversacional que entiende lenguaje natural ("necesito un repuesto compatible con el modelo X") y busca a la vez en todos tus catálogos, fichas técnicas y bases de datos de producto. Integrado donde tu equipo ya trabaja: Teams, web interna o ERP.

**El resultado en cliente real:**

Asistente desplegado para un cliente del sector retail / sanitarios y baño con 19.000 productos y 5.000 repuestos indexados sobre 20 catálogos PDF. Aunque se desplegó en canal B2C, la arquitectura de recuperación es la misma que necesitarías para un buscador interno de compras o ventas.

---

### Bloque 2 — Facturas, albaranes y documentos hacia ERP

**El dolor:**

Tu equipo administrativo dedica horas a meter facturas y albaranes en el ERP. Los datos llegan en formatos distintos según el proveedor, hay errores de transcripción, y el cuello de botella siempre es el mismo: una persona copiando campos a mano.

**La solución:**

Un pipeline que recibe los documentos por email o carpeta, extrae los datos relevantes con IA, los contrasta con tus maestros de proveedores y productos, y los prepara para volcado al ERP. Los casos ambiguos se marcan para revisión humana antes de cargar.

**El resultado en cliente real:**

He construido un sistema de verificación de facturas en producción para un cliente del sector retail / sanitarios y baño, dentro de un programa de loyalty para profesionales instaladores. El sistema procesa 500 facturas/mes, extrae los productos vendidos y matchea contra el maestro de catálogo con 85-90% de precisión sobre datos ruidosos (OCR imperfecto, abreviaturas, referencias parciales). La misma arquitectura sirve para volcado a ERP.

---

### Bloque 3 — Soporte interno y gestión de incidencias

**El dolor:**

Tu equipo de IT o de soporte interno responde una y otra vez a las mismas preguntas: "¿cómo accedo a X?", "¿dónde está el procedimiento de Y?", "necesito permisos para Z". Las consultas repetitivas consumen al equipo y las que sí necesitan atención esperan.

**La solución:**

Un bot integrado en Teams que responde dudas frecuentes a partir de tu documentación interna y, cuando no puede resolver, crea automáticamente el ticket en tu sistema con la información ya recogida del usuario. El equipo de soporte recibe casos limpios, no preguntas en bruto.

**El resultado en cliente real:**

Bot de soporte desplegado en Microsoft Teams para un cliente del sector tasación y valoración, con creación automática de tickets a partir de la conversación. Las preguntas frecuentes dejan de llegar al equipo humano; los casos reales llegan con contexto.

---

### Cierre de sección

> *Si reconoces alguno de estos dolores en tu operación, hablemos. Cada caso parte de un análisis del proceso real, no de una plantilla.*

CTA secundario hacia el formulario de contacto.

---

## 5. PROYECTOS

Sección dividida en dos sub-secciones: **En producción** y **Labs**.

### EN PRODUCCIÓN

---

#### Proyecto 1 — Asistente conversacional sobre catálogo de producto

*Sector: Retail / Sanitarios y baño · Desarrollado en Wembley Studios · 2024*

Sistema conversacional sobre ~20 catálogos PDF de proveedores, ~19.000 productos y ~5.000 repuestos. El reto principal no era la generación, era la recuperación: los catálogos tenían estructuras dispares, referencias inconsistentes y datos técnicos en tablas mal escaneadas.

**Decisiones técnicas:**

- Hybrid search (búsqueda léxica + vectorial) para combinar coincidencias exactas de referencia con búsqueda semántica
- Semantic ranking sobre los resultados para priorizar relevancia real
- Multi-query retrieval para descomponer preguntas complejas
- Tool-calling routing para evitar invocar al LLM cuando una consulta determinista bastaba

**Stack:** Azure OpenAI, Azure AI Search, LangChain, FastAPI, Python.

---

#### Proyecto 2 — Verificación automática de facturas en programa de loyalty para instaladores

*Sector: Retail / Sanitarios y baño · Desarrollado en Wembley Studios · 2024*

Sistema de loyalty B2B donde instaladores profesionales suben las facturas de sus distribuidores y reciben puntos por los productos de la marca vendidos. El reto técnico no era la extracción genérica, era la **identificación fiable**: en una factura de un distribuidor multimarca, hay que distinguir qué productos son de la marca cliente, qué referencias se corresponden con qué SKU del catálogo, y todo esto con datos de entrada ruidosos (OCR imperfecto, abreviaturas, referencias parciales del distribuidor).

**Decisiones técnicas:**

- Azure Document Intelligence para extracción estructurada de líneas de factura
- Embeddings + fuzzy matching + heurísticas en capas para matching de productos contra el maestro de catálogo con datos ruidosos
- Precisión medida del 85-90% en matching contra maestros
- Arquitectura asíncrona con Azure Functions y Service Bus para tolerancia a picos de volumen (500 facturas/mes)
- Validación humana antes de acreditar puntos sobre todos los casos procesados

**Stack:** Azure Functions, Document Intelligence, Service Bus, Key Vault, PostgreSQL, Python.

---

#### Proyecto 3 — Bot de soporte interno en Teams

*Sector: Tasación y valoración · Desarrollado en Wembley Studios · 2024*

Bot conversacional integrado en Microsoft Teams que responde sobre documentación interna y, cuando no puede resolver, abre ticket en el sistema de gestión con el contexto ya recogido del usuario.

**Decisiones técnicas:**

- RAG sobre base documental interna con control de acceso por usuario
- Detección de intención para distinguir consulta resoluble vs. incidencia que requiere ticket
- Creación de tickets enriquecida: el bot extrae datos de la conversación (sistema afectado, descripción del problema, urgencia) y los estructura antes de crear la incidencia

**Stack:** Azure OpenAI, Microsoft Bot Framework, Teams SDK, Python.

---

### LABS

*Proyectos propios en desarrollo. Algunos tienen demo, otros están en fase de arquitectura. La transparencia sobre el estado de cada uno es deliberada.*

---

#### Lab 1 — Asistente Interno para Microsoft Teams

FAQ-bot conectado a documentación interna con escalado automático a incidencias cuando la consulta supera lo que el bot puede resolver. Iteración propia sobre el patrón del Proyecto 3, generalizado para ser desplegable en distinto cliente.

**Estado:** funcional · demo pública, vídeo y diagrama de arquitectura disponibles.

**Enlaces:** [Probar demo] · [Ver vídeo] · [Ver arquitectura] · [Ver en GitHub]

---

#### Lab 2 — Document Intelligent Processor

Extracción automática de datos de documentos no estructurados (facturas, albaranes, contratos) hacia ERP, con capa de matching contra maestros y revisión humana para casos ambiguos. Generalización del patrón usado en el Proyecto 2, reorientado al caso de uso de volcado a ERP.

**Estado:** demo en desarrollo · sin demo visual pública (es un pipeline backend).

**Enlaces:** [Ver en GitHub]

---

#### Lab 3 — Orquestador de agentes

Gateway que enruta peticiones a múltiples agentes especializados según intención: agente de compras, agente de soporte, agente documental. Pensado para clientes que ya tienen varios casos de uso y necesitan una capa común de orquestación, autenticación y observabilidad.

**Estado:** visión arquitectónica · sin implementación todavía.

---

#### Otros frentes activos

- Agente de lead management integrado con CRM (Notion)
- Asistente sobre n8n con LLMs locales para escenarios on-premise

---

## 6. SOBRE MÍ

### Bio

Soy Manuel Romero. Construyo sistemas de IA generativa para B2B desde 2023.

Empecé como AI Engineer en Wembley Studios, una consultora técnica B2B, donde durante año y medio diseñé y desplegué sistemas en producción para clientes reales: un asistente conversacional sobre catálogos de producto con 19.000 referencias en el sector retail, un sistema de loyalty con verificación automática de facturas para profesionales del mismo sector, y un bot de soporte interno integrado en Teams para una empresa del sector de tasación y valoración. No fueron POCs ni demos: son sistemas que siguen funcionando hoy.

Desde marzo de 2025 trabajo como freelance. Mi enfoque actual son tres servicios concretos donde puedo entregar valor profundo: agentes y sistemas RAG, automatización documental con IA, y arquitectura GenAI sobre Azure. Prefiero ir despacio y especializarme antes que ofrecer un catálogo amplio sin profundidad.

Trabajo principalmente sobre Azure (con tres certificaciones oficiales: AI-102, DP-100, AZ-204) y el ecosistema Python para IA: LangChain, LangGraph, FastAPI, PostgreSQL con pgvector. Pero la tecnología es la herramienta; lo que vendo es criterio para decidir qué construir, cómo, y qué no construir.

*Más sobre cómo trabajo y qué busco entregar a mis clientes, más abajo.*

---

### Skills

Agrupados en cinco categorías. Sugerencia visual: tags agrupados por categoría (no nube indiscriminada). Cada categoría con su título y los tags debajo.

**Lenguajes y frameworks IA**
Python · LangChain · LangGraph · FastAPI · prompt engineering · tool calling · multi-agent systems

**Cloud y servicios Azure**
Azure OpenAI · Azure AI Foundry · Azure AI Search · Azure Functions · Document Intelligence · Service Bus · Key Vault

**Datos, búsqueda y almacenamiento**
PostgreSQL · pgvector · SQL · embeddings · hybrid search · semantic search · OCR

**Calidad y evaluación de LLMs**
LangSmith · LLM-as-judge · evals heurísticos · observabilidad de LLMs

**Integración y operación**
Docker · CI/CD · arquitecturas asíncronas · API integration · Microsoft Teams

**Entornos alternativos**
n8n · LLMs locales / on-premise

---

### Certificaciones

Sugerencia visual: cada certificación con su badge oficial de Microsoft a la derecha.

**Microsoft Certified: Azure AI Engineer Associate (AI-102)**
Diseño e implementación de soluciones de IA sobre Azure.

**Microsoft Certified: Azure Data Scientist Associate (DP-100)**
Diseño y operación de soluciones de machine learning en Azure.

**Microsoft Certified: Azure Developer Associate (AZ-204)**
Desarrollo de aplicaciones y servicios sobre la plataforma Azure.

---

## 7. CÓMO TRABAJO

### Intro

*Construir un sistema de IA en una empresa no es solo desplegar código. Es entender el proceso real, integrarlo en la operativa, y hacer que el equipo lo adopte. Mi forma de trabajar se resume en tres palabras.*

---

### Sugerencia visual

Tres tarjetas en horizontal (apiladas en móvil). Cada tarjeta con la letra grande C / D / R (o icono) arriba, título debajo y texto.

---

### Tarjeta 1 — Conecta

**Subtítulo:** *Antes de proponer arquitectura, entiendo el proceso.*

Cada empresa tiene su forma de funcionar, sus herramientas, sus cuellos de botella reales (que casi nunca son los que aparecen en el brief inicial). El primer trabajo es identificar dónde la IA aporta valor de verdad y dónde es más eficiente no usarla. No todo proceso necesita un LLM detrás; algunos necesitan una query SQL bien escrita o un cambio de procedimiento.

Esta fase es conversación, observación y mucho preguntar. El objetivo es salir con un mapa claro de qué construir, qué no construir, y por qué.

---

### Tarjeta 2 — Desconecta

**Subtítulo:** *El sistema funciona para que tu equipo no tenga que estar encima.*

Una vez identificado el caso, lo construyo para que el trabajo repetitivo deje de pasar por personas. Las facturas se procesan solas, las consultas frecuentes se resuelven sin intervención, los datos están centralizados y consultables. Lo que antes consumía horas, ahora ocurre en segundo plano.

La meta no es solo automatizar tareas, es **liberar atención**. Que tu equipo deje de gastar energía en lo mecánico para poder gastarla en lo que requiere criterio.

---

### Tarjeta 3 — Reconecta

**Subtítulo:** *Menos ruido operativo, más espacio para lo que importa.*

Cuando el sistema funciona, pasa algo que va más allá del ROI: las personas dejan de ir corriendo todo el día. El responsable de operaciones sale a las 18:00 en vez de a las 21:00. El CTO deja de apagar fuegos y vuelve a pensar a tres meses vista. El equipo deja de estar disperso y empieza a tener espacio mental.

Suena blando para un servicio técnico, pero es el resultado que veo una y otra vez. Un sistema bien construido no solo ahorra costes; devuelve tiempo y baja la temperatura de la operativa. Y ese tiempo es lo que tú decides cómo usar: en estrategia, en el equipo, o en tu vida fuera del trabajo.

---

### CTA al final de la sección

Sutil, alineación a elegir:

> *¿Reconoces el patrón? Hablemos →*

Enlace a ancla del formulario de contacto (no a Calendly directo).

---

## 8. CONTACTO

### Intro

**Hablemos**

*Si tienes un proyecto en mente, un problema operativo que crees que la IA puede resolver, o simplemente quieres validar una idea técnica, escríbeme. Respondo en menos de 48 horas laborables.*

---

### Formulario

Campos:

- **Nombre*** (texto)
- **Empresa** (texto, opcional)
- **Email*** (email)
- **¿Cómo te llego?*** (select): opciones
  - Refuerzo de equipo IT
  - Proyecto cerrado
  - Consulta general
  - Otro
- **Cuéntame brevemente*** (textarea)

Botón:

**Enviar**

Microcopy debajo del botón:

*Tus datos solo se usan para responderte. No los comparto ni los uso para marketing.*

Enlace pequeño debajo (cuando exista la página):

*Más detalles en la política de privacidad.*

---

### Enlaces sociales / profesionales

Debajo del formulario, en línea:

> *También en: LinkedIn · GitHub · Malt*

Enlace Malt: https://www.malt.es/profile/manuelromero?origin=dashboard_profile_name

---

# Resumen de decisiones de contenido cerradas

Pequeño anexo para referencia rápida del equipo de desarrollo:

- **Audiencias:** dos (cliente IT y cliente operaciones), bifurcadas vía CTAs del hero.
- **Tarifa:** visible en línea sobria al final de Servicios IT. No en cards.
- **Nombres de cliente final:** NO se nombran (Roca, Gesvalt). Se describen por sector.
- **Wembley Studios:** sí se nombra como empleador anterior. Pendiente verificar NDA antes de publicar.
- **Stats inflados:** descartados. Solo cifras defendibles.
- **Disclaimer de "ofrezco más servicios":** descartado por defensivo. La amplitud la comunica la sub-sección Labs.
- **Política de privacidad y aviso legal:** pendientes de creación e integración.
- **Blindaje de demo pública (Lab 1):** pendiente, tratado en otro chat.
- **Traducción al inglés:** pendiente, posterior al cierre del español.