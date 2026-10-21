# Deploy: Yogi Segura Surf sales site

Plain static HTML/CSS with one small JS file. No build step. For this preview the publish directory is the repository root (English at `/`, Spanish at `/es/`).

English is primary (`/`), Spanish is secondary (`/es/`). Both languages use the same `assets/js/config.js`, so links only change in one place. Every page has `hreflang` tags (en, es, x-default = en) and an EN/ES switch in the header.

## Before going live (checklist)
1. **Remove the preview `noindex` tag.** Every HTML page (English and Spanish, including both `404.html` files) has `<meta name="robots" content="noindex">` so this GitHub Pages preview is kept out of search results. **Delete that tag from every page before the real launch.** `robots.txt` was left unchanged on purpose.
2. **Gumroad links + form endpoint + support email + launch deadline** → edit **`assets/js/config.js`** (the only config spot).
   - `links.core`, `links.analysis`, `links.waitlist` = your real Gumroad product URLs.
   - `waitlistFormEndpoint` = a form backend URL (Formspree, Tally, ConvertKit…) or leave the placeholder and use the Gumroad $0 waitlist link.
   - `launch.endsAt` = cart-open date + 14 days (Costa Rica time, `-06:00`). After it passes, the site shows $249 and hides the countdown automatically. Also change the price in Gumroad, and end the launch early in both places if 100 buyers is reached first.
   - Optional no-JS fallback: the HTML `href`s carry the same placeholder URLs. Swap them too with
     `grep -rl PLACEHOLDER-core . | xargs sed -i 's#https://gumroad.com/l/PLACEHOLDER-core#YOUR-REAL-URL#g'` (repeat for `-analysis` and `-waitlist`).
3. **Domain**: replace `https://www.example.com` everywhere (canonical, Open Graph, JSON-LD, sitemap, robots):
   `grep -rl 'www.example.com' . | xargs sed -i 's#https://www.example.com#https://YOURDOMAIN.com#g'`
   (`support@example.com` is set in config.js, but also appears in HTML as a fallback: `grep -rl 'support@example.com' . | xargs sed -i 's#support@example.com#you@yourdomain.com#g'`)
4. **Brand name**: "Yogi Segura Surf" is a working name. Rename with
   `grep -rl 'Yogi Segura Surf' . | xargs sed -i 's#Yogi Segura Surf#New Brand#g'`
5. Replace the placeholder photos (see `images/README.md`), testimonials, bio facts (`[XX]` and similar items in yellow) and the legal text in `privacy.html` / `terms.html`. Search for leftovers in both languages: `grep -rn PLACEHOLDER --include=*.html .`.
6. Optional: add analytics (Plausible or GA4) in each page's `<head>` and update `privacy.html`. Add Gumroad's overlay checkout by including `<script src="https://gumroad.com/js/gumroad.js"></script>` and the class `gumroad-button` on buy links if you want checkout to open on-page.

## Spanish pages (/es/)
The Spanish pages are generated from the English HTML by `tools/build_i18n.py` (in the project folder, outside `site/`). It holds every translation as an English→Spanish pair and fails loudly if the English copy changed and a pair no longer matches. After editing an English page, update the matching pair and run `python3 tools/build_i18n.py`. Or, after launch, just edit `site/es/*.html` by hand and stop using the script. The find-and-replace commands above also cover `/es/`.

## Hosts
- **Netlify**: drag and drop the `site/` folder (or `site.zip`) at app.netlify.com/drop, or connect the repo with publish dir `site`, no build command. `_headers` is applied automatically.
- **Cloudflare Pages**: Create project → Direct Upload → upload `site/`. Or connect git, build command empty, output dir `site`. `_headers` is supported.
- **Vercel**: `npx vercel deploy site --prod` or import the repo with framework "Other" and output dir `site`. Pages work at `/waitlist.html`.
- **GitHub Pages** (this preview): published from the `main` branch, `/` (root) folder, at `https://zaklion.github.io/yogi-segura-surf/`. `.nojekyll` is included. Content pages use relative links, so CSS, JS, images, and navigation work on that project subpath. Root `404.html` sets `<base href="/yogi-segura-surf/">` because Pages serves that file at whatever missing URL was requested; relative links then still resolve inside the project. `es/404.html` uses ordinary relative paths (`../assets/...`). **At real launch on a custom domain (site at `/`), remove that `<base>` tag** or the 404 links will keep pointing at `/yogi-segura-surf/`.

Then submit `https://YOURDOMAIN.com/sitemap.xml` in Google Search Console and test a page with the Rich Results Test (Course, Product and FAQ schema are included).
