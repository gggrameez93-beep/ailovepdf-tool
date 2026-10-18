// AiLovePDF country-based language routing for Vercel
// This file only handles automatic localization of the English root (/).
// Existing pages, tools, JavaScript logic, navigation, footer and hrefs are untouched.

const COUNTRY_TO_PATH = {
  // Arabic-speaking Middle East
  SA: "/ar/", // Saudi Arabia
  AE: "/ar/", // United Arab Emirates
  QA: "/ar/", // Qatar
  KW: "/ar/", // Kuwait
  BH: "/ar/", // Bahrain
  OM: "/ar/", // Oman
  YE: "/ar/", // Yemen
  IQ: "/ar/", // Iraq
  JO: "/ar/", // Jordan
  LB: "/ar/", // Lebanon
  SY: "/ar/", // Syria
  PS: "/ar/", // Palestine
  EG: "/ar/", // Egypt (commonly included in the Middle East)

  // Supported European / Brazilian locales
  DE: "/de/", // Germany
  FR: "/fr/", // France
  ES: "/es/", // Spain
  BR: "/pt-br/", // Brazil
};

function isBot(userAgent) {
  return /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|twitterbot|linkedinbot|google-inspectiontool|googlebot|adsbot/i.test(userAgent || "");
}

export default function middleware(request) {
  const url = new URL(request.url);

  // Only auto-localize the global root. Localized URLs always remain where requested.
  if (url.pathname !== "/" && url.pathname !== "") return;

  // Keep search engines on the canonical English root.
  if (isBot(request.headers.get("user-agent"))) return;

  const country = (request.headers.get("x-vercel-ip-country") || "").toUpperCase();
  const destination = COUNTRY_TO_PATH[country];

  if (!destination) return;

  url.pathname = destination;
  return Response.redirect(url, 307);
}
