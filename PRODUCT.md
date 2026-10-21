# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: technical buyers** (CTOs, IT leads, technology consultancies, product teams) who need a senior freelance GenAI engineer to take agents/RAG from prototype to measured production. Typical situation: they arrive from Malt or LinkedIn, having already seen Manuel's profile or a proposal, and use the site to validate who he is before contacting. They decide in a few minutes.
- **Secondary: business / operations owners** (not only supply chain) looking for applied AI on real processes: catalogs, documents to ERP, internal support, financial communication.

## Product Purpose

Personal portfolio and contact point for Manuel Romero (brand: Maroru's Assistance), freelance AI Engineer. Success is either outcome, weighted equally: the visitor books the 30-minute Calendly call / writes through the contact form, or proceeds to hire him via Malt.

## Positioning

"Agents and RAG in production, with measured quality and cost — Azure and AWS." The differentiator is systematic evaluation (blind grading, evaluation harness with repetitions, cost-versus-quality configurations), backed by real 2026 work (Indra Group via Malt, 2nd place at the datathon with Turing Challenge, LILT task design for leading AI labs) and production systems on Azure since 2023 (Wembley Studios).

## Operating Context

- Visitors come mostly from Malt or LinkedIn, often on a laptop during evaluation, sometimes on mobile.
- Contact paths: Calendly (https://calendly.com/marorusassistance/30min), own contact form (Cloudflare Worker + Queue + Email Routing), email, LinkedIn, GitHub, Malt.
- Pricing shown: team reinforcement 350 €/day; closed projects quoted.

## Capabilities and Constraints

- Astro 6 + Tailwind 4 static site on Cloudflare Workers; React only for the contact form.
- **Bilingual ES (default, no prefix) / EN (`/en`)**: both versions complete, with identical figures. This is the only hard requirement confirmed by the user.
- Accessibility level and performance budget: not specified by the user (undecided).

## Brand Commitments

- Name **Maroru's Assistance**, logo, and motto **Conecta. Desconecta. Reconecta.**
- Maroon `#b80000` is the brand color (from the logo).
- Voice: direct, technical, anti-marketing; honest about demo vs. production; only defensible figures; no empty buzzwords.
- Content rules in `CLAUDE.md` and `content/copy-es.md` §5 (e.g. Indra described as "aplicaciones empresariales"; never name internal Indra projects or the AI labs LILT works for).

## Evidence on Hand

- Five case studies with thumbnail + architecture images in `src/assets/projects/` (Indra, Turing, Wembley ×3); text in `src/i18n/*.json` (`projects.*`).
- Lab projects with GitHub links (`projects.lab1–3`); Lab 1 video and demo URL still pending.
- Professional photo `src/assets/photo.jpeg`; three Microsoft certifications with verify URLs (AI-102, DP-100, AZ-204).
- No client testimonials or logos exist: do not fabricate them. Wembley's end clients (and Indra's internal clients) are never named.

## Product Principles

1. Proof over claims: every promise points to a real, measured case.
2. Honest status: production, prototype, datathon and lab are labelled as what they are.
3. Two audiences, technical first: the site must work for a CTO validating in minutes and still speak plainly to business owners.
4. Cloud-agnostic: no section may present the work as Azure-only or Wembley-only.
