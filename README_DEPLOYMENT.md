# AiLovePDF multilingual deployment package

This package is structured for GitHub -> Vercel deployment.

Languages:
- English: /
- Spanish: /es/
- French: /fr/
- German: /de/
- Brazilian Portuguese: /pt-br/
- Arabic (RTL): /ar/

Each language contains the same SPA routes under its own language prefix. Navigation keeps the visitor inside that language ecosystem, and the Blog link points to the corresponding language blog subdomain.

Core updates:
- PDF to JPG now processes every PDF page at high quality (3x rendering scale).
- TXT to PDF now wraps and paginates long text across multiple PDF pages.
- Standard favicon links and favicon.ico included.
- 15-question FAQ accordion using HTML5 details/summary.
- FAQPage JSON-LD included in every HTML file.
- Responsive FAQ styling and Arabic RTL support.
- Hreflang links are included on every page for all six language versions plus x-default.
- Existing client-side PDF processing functions are retained; no backend, login, or database is added.

Deployment:
Upload the contents of this folder to the root of your GitHub repository. Do not upload the ZIP as the website root and do not place the outer folder inside the repository. Vercel can then deploy the repository normally.


SEO/GEO architecture finalized:
- Each indexable URL serves page-specific HTML under its own route; no unrelated page sections are shipped in the page root.
- One primary H1 per page.
- Page-specific WebPage + BreadcrumbList JSON-LD; FAQPage only where visible FAQs exist.
- Localized canonical/hreflang URLs preserved.
- Native localized internal links and crawlable anchors preserved.
- Localized pages keep their native language and Arabic RTL.
- Social preview image tags added.
- Existing PDF processing logic remains in each page's application script; the navigation layer swaps page-specific HTML without a hard reload.


## Final SEO/GEO production checklist
- Static routes are filesystem-first; unknown URLs return a real 404 instead of the homepage.
- Every indexable URL has exactly one `<!DOCTYPE html>` and one primary H1.
- Page-specific WebPage/BreadcrumbList/WebApplication/FAQ structured data is used only where relevant.
- Vercel Web Analytics and Speed Insights hooks are included on every HTML page. Enable **Web Analytics** in the Vercel project dashboard after deployment; Vercel reports page views, referrers and visitor geography such as country.
- Google Search Console verification remains an account/domain ownership step and cannot be truthfully hard-coded without the verification token from the site owner. Add the supplied GSC verification method after property verification.
- No fake GA4 measurement ID or fake Search Console token is included. This avoids corrupt analytics or falsely claiming ownership verification.


## PDF to JPG output
- Converts every page of the selected PDF, regardless of the input filename.
- Uses high-resolution browser rendering with maximum JPEG encoder quality.
- Names each page from the original PDF filename and packages all pages into one ZIP download, avoiding browser multi-download blocking.
- Uses adaptive canvas limits for unusually large PDF pages; browser/device memory remains the practical limit for extremely large documents.
- Processing is client-side; no PDF file upload is required for the conversion itself.
