# Этап 03 — P1 Page Spec (Top 10)

## Page set

1. `/`
2. `/contatti`
3. `/recensioni`
4. `/servizi`
5. `/servizi/riparazione-macbook`
6. `/servizi/data-recovery`
7. `/servizi/display-macbook`
8. `/servizi/riparazione-imac`
9. `/servizi/batteria-macbook`
10. `/chi-siamo`

## Shared block order (mobile-first)

1. Header (logo + compact nav + CTA)
2. Hero (H1 + short value prop + CTA pair)
3. Proof/trust section (reviews/experience/legal-safe claims)
4. Core content section (service specifics)
5. CTA strip (call + WhatsApp + form anchor)
6. Footer (contacts + legal links)

## Per-page notes

### `/`
- Hero: primary conversion orientation.
- Service teasers: cards to top service pages.
- Reviews preview (with fallback text).

### `/contatti`
- Dual location cards (Lab/Store) from centralized config.
- Contact form with required consent.
- Map block with safe fallback.

### `/recensioni`
- Google Reviews embed container.
- Explicit fallback state if widget unavailable.

### `/servizi/*`
- Service-specific H1 + lead.
- Structured sections: symptoms, what we do, timing, CTA.
- FAQ-ready layout slot (no heavy accordions by default).

### `/chi-siamo`
- Company story and trust positioning.
- No risky legal wording; neutral claims only.
