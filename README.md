# Gleafink Corporate Website (Static)

Modern enterprise B2B corporate website for **Gleafink**, inspired by the layout and polish of progress.com.

## Completed features
- 6 static pages: Home, Products, Solutions, Resources, About, Contact
- Sticky header with mobile drawer navigation
- Brand palette applied via CSS variables (RGB + HEX)
- Request Demo / Talk to Expert modal (UI-only)
- Scroll-reveal micro-interactions
- Home page “What we do?” static cards section (4 core offerings + 2 extra items)
- Home page “Data Products” static cards section (Metainsights, Datasculpt, Introsight, Talk to Data/Arvis)
- Resources page: client-side filter chips + search
- Contact page: client-side form validation and success message
- Footer sitemap on every page

## Entry URIs
- `/index.html` – Home
- `/products.html` – Products
- `/solutions.html` – Solutions
- `/resources.html` – Resources (filters + search)
- `/about.html` – About
- `/contact.html` – Contact (form validation)

## Brand assets
- `images/gleafink-logo.png` – Provided logo
- `images/gleafink-brand-sheet.png` – Brand sheet/palette reference

## Data/storage
- No backend or database (static-only). Forms are UI-only.

## Not yet implemented
- Real blog/news CMS
- Backend form submission (email/CRM)
- Real customer logos/case studies
- Multi-level mega-menu (simplified nav)

## Next steps
- Replace placeholder content with final copy
- Add real customer proof and case studies
- Connect forms to your backend/CRM (requires server/service)
- Add SEO enhancements (OpenGraph images, sitemap.xml)

## Recommended hosting (best for gleafink.com)
**Cloudflare Pages** is the best fit for this static site:
- Fast global CDN + automatic HTTPS
- Easy custom domains (root + www)
- Great caching and performance
- Works well with static HTML/CSS/JS projects

Alternatives:
- **Vercel** (excellent DX, also great for static sites)
- **Netlify** (solid static hosting + forms/add-ons)

## Custom domain (gleafink.com)
Custom domain setup is done in your hosting/DNS provider (not inside this codebase).
High-level steps:
1. Deploy using the **Publish tab** (or your host’s deploy workflow)
2. In your host dashboard, add the custom domain: `gleafink.com` (and optionally `www.gleafink.com`)
3. Add the DNS records your host provides (commonly a CNAME for `www` and an A/ALIAS for the root `@`)
4. Wait for SSL certificate provisioning (usually automatic)

## Deploy
To deploy and make the site live, use the **Publish tab**.
