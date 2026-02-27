# Analytics Architecture

## Data flow

```
ConsentBanner (Accept/Reject)
    → consent-updated event
    → SiteScripts.pushConsentUpdate(granted, { sendPageView })
    → gtag consent update + optional page_view

AnalyticsPageTracker (SPA route change)
    → GeniusAnalytics.track("virtual_page_view", { page_path, page_title })
    → dataLayer.push + gtag("event", "page_view", ...)

ContactForm, CTA links (data-track)
    → GeniusAnalytics.track(eventName, payload)
    → dataLayer.push + gtag("event", eventName, payload)
```

## Components

| Component | Role |
|-----------|------|
| **gtag** | Direct GA4; loaded from index.html (injected by Vite plugin). Sends page_view, custom events. |
| **dataLayer** | Shared with GTM; events pushed for GTM tags (if configured). |
| **GeniusAnalytics.track** | Single entry point for all analytics events. Checks consent, pushes to dataLayer, sends to gtag for GA4. |

## Events sent to GA4 via gtag

- `page_view` — initial page (on Accept) or SPA navigation (virtual_page_view)
- `form_submit_attempt`, `form_submit_success`, `form_submit_fail`, `form_submit_click`
- `cta_click_call`, `cta_click_whatsapp`, `cta_click_contact`

## Adding new events

1. Call `window.GeniusAnalytics?.track(eventName, payload)` from your component.
2. Add `eventName` to `GA4_EVENTS` in `SiteScripts.tsx` if it should reach GA4.
3. For CTA links, use `data-track="event_name"` and `data-track-label="..."` — event delegation in SiteScripts captures it.

## Environment variables

- `VITE_PUBLIC_GA4_ID` — GA4 Measurement ID; injected into HTML at build. Fallback: `G-GYDPMQ4R49`.
- `VITE_PUBLIC_GTM_ID` — GTM Container ID; loads gtm.js for dataLayer/GTM tags.

## Consent

- Default: `analytics_storage: denied` (Consent Mode).
- On Accept: `pushConsentUpdate(true, { sendPageView: true })` — sends page_view for current page.
- On initial load with stored consent: `pushConsentUpdate(true)` — no page_view; AnalyticsPageTracker sends virtual_page_view.
