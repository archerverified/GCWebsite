# Google Ads landing page at /free-quote

Date: 2026-08-20
Branch: `feat/reinstate-booking-form`
Status: implemented, uncommitted

## Goal

A dedicated, conversion-focused landing page for Google Ads traffic, carrying the booking
form, with no site navigation to leak paid clicks. Bookings from it are attributable to the
ad channel, and the submission is measurable in Google Ads.

## Decisions

| Decision | Choice | Why |
|---|---|---|
| Page shape | Dedicated LP, no nav | Every nav link is an exit on a click you paid for |
| URL | `/free-quote` | Visible in the address bar; reinforces the offer. `contactgoogle` reads as "contacting Google" and leaks the channel |
| Measurement | Lead tagging **and** conversion event | Tagging identifies the lead afterward; the event lets Ads bid on bookings rather than clicks |
| Indexing | `noindex,nofollow`, out of sitemap, **in** prerender | Avoids competing with `/contact` organically while staying fast, which Ads quality score rewards |
| robots.txt | Untouched | Disallowing would block Google's ad crawler and risk ad disapproval. `noindex` is the correct tool |

## Design

### 1. Escaping the site chrome

Every route mounts inside `MainLayout` (Header, Navigation, Footer, StickyCallBar, plus a
shell wrapper with its own background and padding). The landing page needs none of it.

`MainLayout` gains a bare-route check rather than restructuring the router:

```tsx
const BARE_ROUTES = ["/free-quote"];
if (BARE_ROUTES.includes(pathname)) {
  return <><Toaster position="top-center" richColors /><ScrollToTop />{children}</>;
}
```

Rejected alternative: nested `<Routes>` with landing pages outside `MainLayout`. More
architecturally pure, but it changes how all 53 routes mount, risking Suspense and lazy
regressions against a live site for no visible gain. Six lines beats that.

`Toaster` is retained because the booking form depends on it for success and error toasts.
`ScrollToTop` is retained so a returning visitor lands at the top.

### 2. Page structure

`src/pages/FreeQuote.tsx`, top to bottom:

1. **Minimal header** — logo, and a click-to-call phone as the only other element. No links.
2. **Hero** — headline, subhead, three proof chips (24/7, same-day, free inspection).
3. **Booking form** — `AppointmentBookingSection` with `includeTestimonials={false}`,
   immediately below the hero.
4. **Trust band** — 5.0 from 24 reviews (matching the `aggregateRating` in `schemas.ts`),
   licensed and insured, DFW-wide, no hidden fees.
5. **Minimal footer** — phone, service line, and the
   "AAA Organization LLC DBA Garage Cowboy" legal line with Terms and Privacy links. Those
   two links are required: the SMS consent text references them, so they cannot be dropped.
6. **Mobile sticky call bar** — LP-local, call-only. The site-wide `StickyCallBar` is
   deliberately excluded because its second button points at `/contact`, which would leak
   the visitor off the landing page.

### 3. Source attribution

`AppointmentBookingSection` gains a `source` prop, defaulting to `"website"`. The landing
page passes `"google-ads"`.

```
form submit
  -> POST /api/booking/create   { ...booking, source }
  -> calendar event description  "Source: google-ads"
  -> admin email                 (unchanged shape, source visible in the event)
  -> forwardToGoHighLevel()      source field, replacing the previously hardcoded string
```

The GHL payload's `source` field already existed but was hardcoded to
`'garagecowboy.com booking form'`. It now carries the real value, falling back to that
string when absent so existing behavior is unchanged for the main site.

Server-side the field is optional and sanitized to a short slug, so a malformed or
oversized value cannot corrupt the calendar description or the CRM record.

### 4. Conversion measurement

The Google Ads tag (`AW-17367077872`) is loaded **through GTM** (`GTM-W7MW64K9`), not
directly in `index.html`. So the page pushes a dataLayer event rather than calling a
hardcoded conversion:

```ts
window.dataLayer?.push({
  event: 'booking_submitted',
  booking_source: source,
});
```

GTM then fires the Ads conversion tag off a trigger on `booking_submitted`. This means **no
conversion label is needed in the code**, and whoever manages GTM can wire or rewire the
conversion without a deploy.

For the case where someone prefers a direct conversion call, an optional
`VITE_ADS_CONVERSION_LABEL` env var is supported: when set, a `gtag('event', 'conversion')`
also fires. Unset means no-op. Same inert-seam pattern as `GHL_WEBHOOK_URL`.

Both calls are optional-chained, so a blocked or failed GTM load can never break the form.

### 5. SEO and route registration

- `noindex` via the existing `Seo` prop, emitting `<meta name="robots" content="noindex,nofollow">`.
- **Added** to `STATIC_ROUTES` in `scripts/seo/all-routes.mjs` so it prerenders.
- **Not added** to `staticPages` in `scripts/seo/generate-sitemap.mjs`, keeping it out of the sitemap.
- `robots.txt` untouched.

## Out of scope

No A/B variant and no separate form endpoint. Both are cheap to add once there is real
traffic data; guessing at either now is waste.

## Testing

1. `tsc --noEmit` clean for `src`.
2. `vite build` plus prerender, expecting 54 routes (53 plus `/free-quote`).
3. Built HTML assertions: `/free-quote` carries `noindex,nofollow`; contains exactly one
   `<form>` and the consent checkbox; contains **no** site nav links; the sitemap does
   **not** contain `/free-quote`.
4. Playwright at 390px and 1280px: no header nav, form present, consent unchecked, no
   horizontal overflow, no console errors.
5. Preview deploy for a real end-to-end booking.
