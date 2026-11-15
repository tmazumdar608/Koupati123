# Koupati — DESIGN.md

Design rules for [koupati.vercel.app](https://koupati.vercel.app/). Read this before changing any page.

**Status:** The spacing scale, shared stylesheet direction, and service sourcing/last-checked requirements were explicitly approved by the site owner on 2026-11-15. Other values labelled **(from index.html)** describe the homepage design as originally extracted and should be checked against the current code when implementing.

## 1. Purpose and tone

An independent local guide to Koupati, Udalguri, Assam. It is not an official government or tea-estate site. The design should feel calm, green, trustworthy and plain-spoken. Content honesty matters more than polish.

## 2. Stack constraint

Plain static HTML, vanilla JS, and CSS, hosted on Vercel. There is no build step, React or Tailwind. Do not introduce shadcn/ui or any framework without an explicit decision to migrate. Reuse existing tokens and components instead of adding new ones.

**Current implementation:** The homepage uses the external `styles-home.css` stylesheet (introduced in PR #17), not an inline `<style>` block. Some other pages may still have inline styles. New work should move toward shared external CSS without changing the site's stack or forcing a site-wide migration in an unrelated PR.

## 3. Colour tokens (from index.html / styles-home.css)

```css
:root{
  --forest:#173f2b;   /* primary: headings, buttons, footer */
  --forest2:#24583c;  /* primary hover */
  --leaf:#486c3e;     /* eyebrows, link hover */
  --cream:#f4f1e8;    /* intro band */
  --paper:#fbfaf6;    /* page background */
  --gold:#c49a56;     /* accent lines only */
  --ink:#202820;      /* body text */
  --muted:#687269;    /* secondary text */
  --line:#e5e5dc;     /* borders */
  --white:#fff;
  --shadow:0 18px 55px rgba(25,48,33,.10);
}
```

Rules:
- One accent colour only: gold, used for thin rules and underlines, never for large fills or body text.
- Section backgrounds alternate between `--paper`, `--cream`, `#eef0e8` and `--forest`. Do not add new background colours.
- Keep body text at AA contrast or better (4.5:1). Check any new colour pair.
- Many pages repeat hard-coded hex values (`#173f2b`, `#edf3eb`). When touching those, replace them with the variables above where a matching existing token is appropriate; do not silently invent new tokens.

## 4. Typography (from index.html)

| Role | Font | Notes |
|---|---|---|
| Headings, brand, big numbers | Playfair Display 500/600/700 | `clamp()` sizes, tight line-height |
| Body, UI, buttons | DM Sans 400/500/600/700 | line-height 1.65 |
| Assamese text | Noto Sans Assamese 400–700 | fallback after DM Sans |

Rules:
- Wrap Assamese text in `<span lang="as">`; the page itself stays `lang="en"`.
- Load fonts non-blocking, as the homepage does (`media="print" onload`).
- Eyebrow labels: `.72rem`, uppercase, `.18em` letter-spacing, `--leaf`.
- One `<h1>` per page. Do not skip heading levels.

## 5. Layout and spacing

- Container: `width:min(1160px, calc(100% - 40px))`, centred. **(from index.html)**
- Section padding: `92px` top and bottom on desktop. **(from index.html)**
- **Approved spacing scale:** use multiples of 4px, with preferred steps **4, 8, 12, 16, 24, 32, 48, 92px** for new or revised layouts. Existing exceptions need not be changed unless the component is being edited.
- Breakpoints in use: 1180, 980, 760, 700, 600, 390px. **(from index.html)** Prefer 980 and 760 for new work; do not add new breakpoints.
- Sticky header height: `78px`. `scroll-padding-top:88px` is the base homepage value. Check actual responsive sticky offsets before changing anchor positioning.

## 6. Components (from index.html)

- **Buttons:** pill shape (`border-radius:999px`), `13px 21px` padding, weight 700. `.btn-primary` = forest fill, white text. `.btn-light` = frosted outline for use on photos only.
- **Cards:** white, `6px` radius, soft shadow, lift 5px on hover; image height 235px with `object-fit:cover`.
- **Hero:** full-width photo, dark green gradient overlay, left-aligned text.
- **Photo labels and shapes:** one large rounded corner (`90px`) on feature photos; others stay at `5px`.
- **FAQ:** native `<details>` / `<summary>`.
- **Map:** Leaflet loaded on scroll only, with integrity hashes. Keep it that way.
- **Navigation:** the same header and mobile menu on every page. Gallery and directory pages currently differ; bring them in line in focused PRs.

## 7. Content rules

1. Use **Udalguri** as the district. Where useful, note that the postal division is Darrang so visitors understand older records.
2. Never invent history, etymology, population or dates. Cite an official or named source, or leave it out.
3. Every photo not confirmed as Koupati keeps honest alt text (`Representative … exact location not verified`) and appears under the gallery disclaimer. Replace with original, permission-approved photos when possible.
4. Do not present the site as official. Keep the "independent local guide" note.
5. Tea estates are private property. Always advise visitors to get permission.
6. **Approved requirement — services:** Every factual listing or claim about **hospitals, schools and transport** must include an identifiable source and a visible **"Last checked"** date on the relevant page. Use the actual date the information was checked; never invent or automatically stamp a date without verification. If the information has not been verified, explicitly label it **"Not yet verified"** and do not imply it is current. Prefer official provider or government sources, or name the local source and its context. Recheck time-sensitive contact details, opening hours and routes before publishing them as current.

## 8. Accessibility baseline

- Skip link, visible `:focus-visible`, and `prefers-reduced-motion` support must stay on every page.
- Modals (lightbox, About) must move focus in on open and return it on close.
- Touch targets at least 44×44px on mobile.
- Images need `width` and `height`; use `loading="lazy"` except the hero.

## 9. Performance

- Images: WebP; provide a `-mobile` variant for large hero images.
- Only the hero image gets `fetchpriority="high"`. Do not set it on the logo.
- Social preview images: 1200×630 landscape, optimized.
- Avoid adding third-party scripts.
- **Approved shared stylesheet direction:** Prefer a shared external `styles.css` for site-wide tokens and common components instead of duplicating the same CSS on every page. **Current homepage stylesheet is `styles-home.css`**; do not rename it or alter references without a coordinated, tested migration. Page-specific CSS may remain separate. This is a future implementation direction, not a claim that all pages already use `styles.css`.

## 10. Do not

- Add new fonts, colours, shadows or border radii.
- Add animations beyond the existing hero zoom and hover lifts.
- Use emoji as the only label for an action.
- Change copy about location, history or facts without a source.
- Merge several unrelated changes into one PR; Vercel's free plan limits daily deployments.

## 11. Change checklist

Before opening a PR:
- [ ] Uses only tokens from section 3
- [ ] Uses approved spacing steps for new or modified layout
- [ ] Reuses existing external/shared CSS where appropriate, without breaking current stylesheet references
- [ ] Header, menu and footer match `index.html`
- [ ] Mobile checked at 390px and 760px
- [ ] Alt text and photo disclaimers kept
- [ ] New facts have sources
- [ ] Hospital, school and transport information has a named source and a truthful visible "Last checked" date, or is explicitly marked unverified
- [ ] `sitemap.xml` updated if a page was added
