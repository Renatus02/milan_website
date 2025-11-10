Image asset guidelines for ProntoRiparo 24h
==========================================
Place the following optimized JPG images in this folder to replace remote Unsplash usage and improve performance & GDPR compliance.

Hero backgrounds (suggested size: 1600x900, ~180KB each, JPG progressive):
  hero-home.jpg
  hero-idraulico.jpg
  hero-fabbro.jpg
  hero-spurgo.jpg
  hero-caldaia.jpg
  hero-condizionatori.jpg
  hero-tetto.jpg

Service card thumbnails (suggested size: 600x400, crop center, ~70KB each, JPG progressive):
  service-idraulico.jpg
  service-fabbro.jpg
  service-spurgo.jpg
  service-caldaia.jpg
  service-condizionatori.jpg
  service-tetto.jpg

Optimization checklist:
- Use sRGB color space.
- Strip metadata (EXIF) for privacy.
- Compress via mozjpeg or similar (quality ~78-82).
- Ensure no text baked into the image (accessibility: keep text in HTML).
- Maintain visual contrast so white hero overlay text remains readable.

Fallback behavior:
- Each <img> tag in index.html has data-fallback pointing to the original Unsplash URL.
- If a local image is missing or fails to load, JS will automatically swap to its data-fallback.
- Hero sections use layered CSS backgrounds: local file first, remote Unsplash second, so the remote shows if local is absent.

After adding images, consider running a Lighthouse audit for performance improvements.

SEO & preload notes:
- Each service page now preloads its hero image for faster Largest Contentful Paint.
- Meta description tags added for better search snippet quality.

Automated download (no photos yet?):
- A manifest exists at images/images.json with stable, seeded Picsum URLs (brand seeds switched to prontoriparo-*).
- Run the downloader to fetch everything automatically:
  node fetch_images.js
- Licensing: Picsum serves images under CC0/Unsplash-like free-to-use terms for placeholders. For production brand photography, replace with your own licensed images.
