# Koupati Website

Independent local information and destination guide for Koupati, Udalguri, Assam.

## Pages
- `/` — Homepage
- `/about-koupati.html` — About Koupati
- `/tea-garden.html` — Tea garden heritage
- `/local-life.html` — Sunday market and local life
- `/culture-food.html` — Culture and food
- `/travel-guide.html` — Travel guide
- `/education.html` — Schools and education
- `/nearby-villages-hospitals.html` — Nearby villages, hospitals and services

## Phase 2 development
- Improved homepage navigation, accessibility and mobile-friendly community contribution prompts.
- Added clear notes wherever temporary representative photographs are used.
- Removed unrelated Orang National Park vehicle/signboard images from the homepage gallery.
- Kept the existing forest-green and cream visual identity and the five dedicated guide pages.

## Photography
Some current photographs are temporary representative images from the existing project collection. Their exact locations have not all been verified as Koupati, the Sunday Market or a specific cultural/food event. Replace them with original, permission-approved local photographs when available. Do not label representative images as verified local scenes.

## SEO files
- `sitemap.xml` lists the homepage and seven secondary pages (eight URLs total).
- `robots.txt` allows crawling and points crawlers to the sitemap.
- Each page has a unique title, meta description, canonical URL and structured data.

## Deployment
The `koupati-website-2.0-phase-2` branch is for development and review. Do not merge it into `main` or deploy it to the live website until the site owner has reviewed and approved the changes. The production Vercel deployment remains connected to the production branch.

This is an independent local guide, not an official government tourism or tea-estate website. Verify local details, visitor access, market hours and directions before publishing further claims.

## Phase 2 authentic local photo assets (development branch)

The homepage gallery and local-life/culture-food pages now reference 15 WebP files in `images/local/`. **All 15 WebP files have been uploaded to the repository root (`90372.webp`, ..., `90515.webp`) and the development-branch HTML now points to these exact paths. Verify all 15 photos and gallery/lightbox before merging. Keep the production `main` branch unchanged until approval.

## SEO and UX improvement branch (November 2026)
- Current page titles and meta descriptions use Udalguri consistently for Koupati, while preserving route-specific geographic references where relevant.
- Added a contextual link to the travel guide from the education and nearby-services pages.
- Existing sitemap and robots.txt remain unchanged; validate deployed HTTP status, canonical URLs, images and structured data before merging.
- Photo provenance, location claims in page bodies, and live indexing remain to be reviewed before publication.
