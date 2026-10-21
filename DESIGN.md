---
name: Maroru's Assistance
description: A bound folio of measured AI engineering work, read in chapters.
colors:
  maroon-ink: "#b80000"
  maroon-deep: "#8a0000"
  maroon-on-charcoal: "#e8a9a0"
  paper: "#f6f3ee"
  bone: "#ebe5dc"
  charcoal: "#2f2b28"
  ink: "#1f1c1a"
  ink-muted: "#5f5852"
  on-dark: "#efe9e1"
  on-dark-muted: "#b8ada1"
  rule: "#d6cec3"
  rule-dark: "#4a443f"
typography:
  display:
    fontFamily: "Instrument Serif, Times New Roman, serif"
    fontSize: "clamp(4.2rem, 15.5vw, 15rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Instrument Serif, Times New Roman, serif"
    fontSize: "clamp(3.2rem, 7.5vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "-0.02em"
  section-head:
    fontFamily: "Instrument Serif, Times New Roman, serif"
    fontSize: "3.75rem"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "-0.02em"
  running-head:
    fontFamily: "Instrument Serif, Times New Roman, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.333
  title:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 350
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 350
    lineHeight: 1.625
  label:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 350
    lineHeight: 1.43
rounded:
  none: "0px"
spacing:
  gutter-mobile: "20px"
  gutter: "48px"
  chapter-top-mobile: "64px"
  chapter-top: "96px"
  chapter-end-mobile: "96px"
  chapter-end: "144px"
  spine: "64px"
  mobile-bar: "56px"
components:
  button-primary:
    backgroundColor: "{colors.maroon-ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.maroon-deep}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-ink-hover:
    backgroundColor: "{colors.maroon-ink}"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 0"
  spine:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.on-dark}"
    width: "{spacing.spine}"
  running-head:
    textColor: "{colors.ink-muted}"
    typography: "{typography.running-head}"
---

# Design System: Maroru's Assistance

## Overview

**Creative North Star: "The Bound Folio"**

The site is read like a book of measured work, not scanned like a SaaS landing page. Each chapter is a full-bleed ground (paper, bone or charcoal) that changes as the reader turns the page; proof is set as typography (names, figures, decisions) rather than packaged into cards, badges or stat bands. Enormous, light Instrument Serif carries titles and names; Hanken Grotesk carries everything read or operated. A fixed charcoal spine on the left holds the menu, the vertical name and a maroon reading-progress line.

Density is low and deliberate: wide gutters, long vertical rests between chapters, content hung on a 12-column grid with a narrow left column for the heading and a wide right column for the matter. Maroon is ink, not paint: it marks the motto, the primary action, links on hover and the active state, and almost nothing else. Motion is a single staggered rise on the cover; the only other moving thing is the chapter II gallery, where vertical scroll drives the case plates sideways. The folio follows the user-pinned reference khanhnguyen.design.

**Key Characteristics:**
- Alternating full-bleed chapter grounds: paper, bone, charcoal.
- Display serif at poster scale, set tight (0.86 line height, -0.02em).
- Hairline rules as the only structure; no cards, no shadows, no radii.
- One accent, maroon, used as ink.
- Fixed left spine with vertical name and scroll progress.
- One orchestrated entrance (the cover); nothing else animates on entry.

## Colors

A warm, near-neutral paper-and-charcoal palette with a single saturated maroon from the logo.

### Primary
- **Maroon Ink** (`maroon-ink`): the brand colour. Primary action fill ("Reservar llamada", form submit, service CTA), link and title hover on light grounds, text selection, focus ring on light grounds, the spine progress line, form errors, and the final step of the method ("Reconecta.").
- **Deep Maroon** (`maroon-deep`): hover state of the maroon fill only.
- **Maroon on Charcoal** (`maroon-on-charcoal`): the readable form of maroon on dark grounds (about 6.4:1 on charcoal). The cover motto, hover on dark grounds, the active language, and the focus ring inside `.on-dark` regions.

### Neutral
- **Paper** (`paper`): default page ground and text on maroon or ink fills.
- **Bone** (`bone`): the alternate light chapter ground (track record, architecture figures, business blocks); also the backing behind case plates.
- **Charcoal** (`charcoal`): dark chapter ground for the cover, services, contact, case and about headers, the spine, the menu and the video dialog.
- **Ink** (`ink`): primary text on light grounds; the secondary button fill.
- **Ink Muted** (`ink-muted`): secondary text, meta lines and labels on light grounds (about 6.4:1 on paper).
- **On Dark** (`on-dark`): primary text on charcoal.
- **On Dark Muted** (`on-dark-muted`): secondary text on charcoal (about 6.1:1).
- **Rule** (`rule`) / **Rule Dark** (`rule-dark`): hairline dividers on light and dark grounds respectively.

### Named Rules
**The Single Ink Rule.** Maroon is the only accent. It marks action, state and the motto; it never fills a section, a background panel or a decorative shape.

**The Two Maroons Rule.** On charcoal, maroon text is always `maroon-on-charcoal`, never `maroon-ink`. A maroon fill (button) may sit on charcoal because its text is paper.

**The Tone-Pair Rule.** Every ground has its own text pair: paper and bone take ink and ink-muted; charcoal takes on-dark and on-dark-muted. Every pair in the build is at least 4.5:1; new pairs must meet the same floor.

## Typography

**Display Font:** Instrument Serif (with Times New Roman, serif); roman and italic.
**Body Font:** Hanken Grotesk (with ui-sans-serif, system-ui, sans-serif), variable 300 to 600, base weight 350.

**Character:** A light, high-contrast book serif at poster scale against a quiet, slightly light grotesk. The serif is the voice of titles and names; the grotesk is the voice of sentences and controls. Instrument Serif is kept deliberately (user-pinned reference) even though it is a commonly used display face.

### Hierarchy
- **Display** (400, `clamp(4.2rem, 15.5vw, 15rem)`, 0.86): the cover name, the contact chapter title and the about title, uppercase, two lines at most. Chapter II's title uses the same treatment at `clamp(4rem, 11vw, 10rem)`.
- **Headline** (400, `clamp(3.2rem, 7.5vw, 7rem)`, 0.86): chapter titles inside the home and case-page titles (up to `8.5rem`), sentence case. Track-record names and method steps push to `6.5rem`–`12.5rem` because the name is the proof.
- **Section head** (400, 3rem mobile / 3.75rem desktop): the left-column heads of a two-column block ("Decisiones", "Stack", "Habilidades", list titles).
- **Running head** (400, 1.25rem mobile / 1.5rem desktop): the folio header of each chapter, chapter numeral at left, chapter name at right, muted.
- **Title** (350, 1.5rem–2.25rem, about 1.25, -0.02em): sans statements that are read rather than displayed: case list rows, business problems, the intro lead (`clamp(1.75rem, 3.4vw, 3.1rem)`), the email address in the contact chapter.
- **Body** (350, 1.125rem for lead prose, 1rem elsewhere, 1.625): prose, capped at 68ch.
- **Label** (350, 0.875rem): meta lines, stack lists joined with " · ", field labels, figure captions. Sentence case, no tracking, no uppercase.

### Named Rules
**The Serif Names, Sans Speaks Rule.** Instrument Serif sets titles, names, certification codes and the motto. Anything that is a sentence to read, or a control to operate, is Hanken Grotesk.

**The No-Eyebrow Rule.** Nothing sits above a title as a small uppercase tracked label. Context comes from the running head and the left-column structure.

**The Motto Italic Rule.** Italic serif is reserved for the motto "Conecta. Desconecta. Reconecta." in maroon. Elsewhere italic appears only as the grotesk's inline emphasis (for example a transparency note).

**The Tabular Figures Rule.** Times, years and other aligned figures use tabular numerals.

## Layout

A fixed 64px charcoal spine on the left from 768px up; below that, a 56px charcoal top bar. Main content is offset by the spine width (or the bar height) and runs full bleed to the right.

Inside each chapter, content sits on a 12-column grid with 20px side gutters on mobile and 48px from 768px. The recurring arrangement is a narrow head column (4 of 12, often sticky at the top) and a wide matter column (7 of 12, starting at column 6), with a 40px column gap. Chapters open with 64px (96px desktop) of space under the running head and close with 96px (144px desktop). Breakpoints are Tailwind's defaults (640, 768, 1024, 1280); the layout collapses to a single column below 1024px.

The chapter II gallery is the signature layout: from 768px with motion allowed, the gallery pins to the viewport and vertical scroll translates the plate track horizontally; on mobile and with reduced motion it is a plain horizontal scroll-snap row. Plates are about 85vw on mobile, 62vw on tablet, 54vw on desktop, capped at 48rem.

**The Chapter Ground Rule.** Every chapter is one full-bleed ground. Grounds alternate so adjacent chapters never share a tone; there are no boxed panels inside a chapter.

**The Hung Matter Rule.** Long-form content hangs in the 7-column right block with its head in the 4-column left block; the gap between them is the white space of the page, not a divider.

## Elevation & Depth

The system is flat. There are no shadows anywhere; depth is carried entirely by tonal grounds (paper, bone, charcoal) and hairline rules. The only overlay is the full-screen charcoal menu and the video dialog, which sits on an ink backdrop at 88% opacity.

**The Flat Folio Rule.** No box-shadow, no blur, no glass. If something needs separation, change the ground or draw a 1px rule.

## Shapes

Every edge is square. Buttons, inputs, images, the dialog and the plates have a 0px radius. Structure comes from 1px horizontal rules (`rule` on light grounds, `rule-dark` on charcoal) that open and close lists: a top rule on the list and a bottom rule on every row. Vertical rules appear only between the three service columns and the contact chapter's two halves. The portrait is a colour cut-out (transparent PNG) standing on the light ground, never boxed or cropped square. Its cut bottom edge always sits flush on a section boundary (a closing rule or the next ground), never floating mid-space. Keep it off charcoal (faint white halo in the hair).

**The Hairline Rule.** Lists are rows between 1px rules, never cards. A row gets a rule, not a background, a border box or a radius.

## Components

### Buttons
Plain rectangles, confident and quiet.
- **Shape:** square corners (0px), 48px tall, 24px horizontal padding (32px on the form submit).
- **Primary:** maroon fill, paper text, body size. Used for the main booking action and form submit.
- **Hover / Focus:** fill deepens to deep maroon over the default colour transition; focus shows the global 2px maroon outline at 3px offset (maroon-on-charcoal inside dark regions).
- **Ink (secondary):** ink fill with paper text; hover turns the fill maroon. Used where a second solid action sits on a light ground (business chapter).
- **Text link:** underlined (1px, 0.22em offset) in the current text colour; hover changes colour to maroon on light grounds, maroon-on-charcoal on dark. This is the default secondary action ("Malt", "Ver caso", "Verificar").

### Inputs / Fields
- **Style:** underline only. Transparent background, no side or top border, 0px radius, 12px vertical padding, body size in ink. Label above in label size, ink-muted.
- **Focus:** the underline turns maroon.
- **Error:** message below the field in label size, maroon.
- **Disabled:** the submit drops to 60% opacity with a not-allowed cursor.

### Navigation
- **Spine (desktop):** 64px charcoal column with a hairline right edge. A three-line menu button at the top, the name set vertically in the display serif at centre, the year in tabular label size at the foot. A 2px maroon progress line runs down the spine's right edge and scales with scroll.
- **Mobile bar:** 56px charcoal bar with "Maroru's" in display serif and the menu button.
- **Menu:** full-screen charcoal overlay. Chapter names in display serif at `clamp(3rem, 7.5vh, 4.5rem)` as rows between dark rules; hover turns them maroon-on-charcoal. Language links at the top (active language in maroon-on-charcoal), booking link and email at the foot.

### Running Head
The folio header at the top of each home chapter: chapter numeral at left ("Capítulo II"), chapter name at right, in the display serif at running-head size, muted, hidden from assistive technology. It is the book's running head, not a label above a title.

### Case Plate
A gallery item: the case thumbnail on a bone backing, scaling to 1.025 over 900ms on hover; below it the case title in serif (turns maroon on hover) with an underlined "read" link, then the meta line in label size. Thumbnails are the user's own raster plates and carry their own deck typography; that typography is not part of this system.

### Hairline List Row
The workhorse of every chapter: a row between 1px rules holding a title in the sans title size or the serif headline, a muted meta or body line, and an optional text link. Rows breathe with 16px–40px vertical padding depending on content weight.

## Do's and Don'ts

### Do:
- **Do** give every chapter a single full-bleed ground (paper, bone or charcoal) and its matching text pair.
- **Do** set titles and names in Instrument Serif at 400 with 0.86 line height and -0.02em tracking.
- **Do** keep prose in Hanken Grotesk at weight 350, capped at 68ch.
- **Do** separate list items with 1px rules and nothing else.
- **Do** use maroon-on-charcoal for any maroon text on a dark ground.
- **Do** provide the reduced-motion fallback for any scroll-driven or entrance motion, as the cover and gallery do.

### Don't:
- **Don't** use cards, boxed panels, shadows or rounded corners.
- **Don't** add a second accent colour or fill a section with maroon.
- **Don't** put small uppercase eyebrows or kickers above titles.
- **Don't** animate content on entry outside the cover's single staggered rise.
- **Don't** set body copy or controls in the display serif.
- **Don't** reproduce the case thumbnails' deck typography on new surfaces.
