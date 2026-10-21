import type { ImageMetadata } from 'astro';
import type { Locale } from '../i18n/utils';
import esData from '../i18n/es.json';
import enData from '../i18n/en.json';

import indraThumb from '../assets/projects/indra-thumb.png';
import indraArch from '../assets/projects/indra-architecture.png';
import turingThumb from '../assets/projects/turing-thumb.png';
import turingArch from '../assets/projects/turing-architecture.png';
import catalogThumb from '../assets/projects/catalog-thumb.png';
import catalogArch from '../assets/projects/catalog-architecture.png';
import invoicesThumb from '../assets/projects/invoices-thumb.png';
import invoicesArch from '../assets/projects/invoices-architecture.png';
import teamsThumb from '../assets/projects/teams-thumb.png';
import teamsArch from '../assets/projects/teams-architecture.png';

type ProjectKey = 'case1' | 'case2' | 'production1' | 'production2' | 'production3';
type OpsKey = 'block1' | 'block2' | 'block3' | 'block4';

// Order = most recent first. Same slug in both languages; only the route prefix changes.
const CASES: Array<{ slug: string; key: ProjectKey; thumb: ImageMetadata; arch: ImageMetadata; ops?: OpsKey }> = [
  { slug: 'chat-rag-multiagente',  key: 'case1',       thumb: indraThumb,    arch: indraArch },
  { slug: 'qa-financiero-voz',     key: 'case2',       thumb: turingThumb,   arch: turingArch,   ops: 'block4' },
  { slug: 'asistente-catalogo',    key: 'production1', thumb: catalogThumb,  arch: catalogArch,  ops: 'block1' },
  { slug: 'verificacion-facturas', key: 'production2', thumb: invoicesThumb, arch: invoicesArch, ops: 'block2' },
  { slug: 'bot-soporte-teams',     key: 'production3', thumb: teamsThumb,    arch: teamsArch,    ops: 'block3' },
];

export interface CaseEntry {
  slug: string;
  href: string;
  thumb: ImageMetadata;
  arch: ImageMetadata;
  title: string;
  meta: string;
  summary: string;
  decisions: string[];
  stack: string[];
  deliverables?: string;
  ops?: { title: string; pain: { label: string; text: string }; solution: { label: string; text: string }; result: { label: string; text: string } };
}

export function caseHref(slug: string, lang: Locale) {
  return lang === 'es' ? `/casos/${slug}` : `/en/cases/${slug}`;
}

export function getCases(lang: Locale): CaseEntry[] {
  const dict = lang === 'es' ? esData : enData;
  return CASES.map(({ slug, key, thumb, arch, ops }) => {
    const p = dict.projects[key] as {
      title: string; meta: string; summary: string; decisions: string[]; stack: string[]; deliverables?: string;
    };
    return {
      slug,
      href: caseHref(slug, lang),
      thumb,
      arch,
      title: p.title,
      meta: p.meta,
      summary: p.summary,
      decisions: p.decisions,
      stack: p.stack,
      deliverables: p.deliverables,
      ops: ops ? dict.operations[ops] : undefined,
    };
  });
}

export const caseSlugs = CASES.map((c) => c.slug);
export const opsCaseSlug: Record<OpsKey, string> = Object.fromEntries(
  CASES.filter((c) => c.ops).map((c) => [c.ops!, c.slug]),
) as Record<OpsKey, string>;
