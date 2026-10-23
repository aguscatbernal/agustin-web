// Genera la web estática en dist/: una página por idioma (/ y /en/),
// más estilos, script, fuentes, imágenes, robots.txt, sitemap.xml y cabeceras.
import { cpSync, mkdirSync, rmSync, writeFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { content, site } from "./src/content.mjs";

// Dirección pública de la web. Cambiarla aquí (o con SITE_URL) al tener dominio propio.
const SITE_URL = (process.env.SITE_URL || "https://agustin-web.aguscatbernal.workers.dev").replace(/\/$/, "");
const OUT = "dist";

// Versión de CSS y JS en la URL: cada cambio obliga al navegador a bajar el archivo nuevo.
const version = (f) => createHash("sha256").update(readFileSync(f)).digest("hex").slice(0, 10);
const V = { css: version("src/styles.css"), js: version("src/main.js") };

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// *texto* -> <em>texto</em>
const rich = (s) => esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
const list = (arr, fn) => arr.map(fn).join("");

const picture = (name, alt, sizes, eager = false) =>
  `<img src="/img/${name}-1200.webp" srcset="/img/${name}-700.webp 700w, /img/${name}-1200.webp 1200w" sizes="${sizes}" alt="${esc(alt)}" width="1200" height="630"${eager ? "" : ' loading="lazy"'} decoding="async">`;

// El nombre en dos líneas («Agustín Nahuel» / «Bernal Sita»), cada palabra en su
// propia máscara para que suba al presentarse.
const nameLines = () => {
  const words = site.fullName.split(" ");
  const half = Math.ceil(words.length / 2);
  return [words.slice(0, half), words.slice(half)]
    .map((ws, i) => `<span class="line${i ? " outline" : ""}">${ws.map((w) => `<span class="w"><span>${esc(w)}</span></span>`).join(" ")}</span>`)
    .join("");
};

const arrow =`<svg class="arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;

function visual(p, t) {
  if (p.img) return `<figure class="shot wipe">${picture(p.img, p.imgAlt, "(min-width: 900px) 560px, 92vw")}</figure>`;
  if (p.gallery)
    return `<div class="gallery">${list(p.gallery, ([n, alt], i) => `<figure class="wipe${i === 0 ? " wide" : ""}">${picture(n, alt, i === 0 ? "(min-width: 900px) 560px, 92vw" : "(min-width: 900px) 280px, 46vw")}</figure>`)}</div>`;
  const v = p.visual;
  if (v.type === "type") return `<div class="wipe vis vis-type" aria-hidden="true"><span class="big">${esc(v.big)}</span><span class="small">${esc(v.small)}</span></div>`;
  if (v.type === "list")
    return `<div class="wipe vis vis-app" aria-hidden="true"><div class="app-bar"><i></i><i></i><i></i><span>reels_manager</span></div><ul>${list(v.items, (it, i) => `<li${i === 4 ? ' class="on"' : ""}>${esc(it)}</li>`)}</ul></div>`;
  if (v.type === "table")
    return `<div class="wipe vis vis-table"><table><caption>${esc(v.caption)}</caption><thead><tr>${list(v.head, (h) => `<th scope="col">${esc(h)}</th>`)}</tr></thead><tbody>${list(v.rows, (r) => `<tr>${list(r, (c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`))}</tr>`)}</tbody></table></div>`;
  return "";
}

function project(p, i, t) {
  const L = t.work.labels;
  const link = p.link
    ? `<a class="link" href="${p.link}" target="_blank" rel="noopener">${p.linkIsCode ? L.code : L.visit} ${arrow}</a>`
    : "";
  return `
<article class="project reveal" id="${p.id}">
  <div class="p-visual">${visual(p, t)}</div>
  <div class="p-text">
    <p class="p-num mono">N.º ${String(i + 2).padStart(2, "0")} · ${esc(p.status)}</p>
    <h3>${esc(p.title)}</h3>
    <p class="p-kind">${esc(p.kind)}</p>
    <p>${rich(p.body)}</p>
    ${p.security ? `<div class="spec"><p class="mono spec-k">${L.security}</p><ul class="checks">${list(p.security, (s) => `<li>${rich(s)}</li>`)}</ul></div>` : ""}
    <p class="tags">${list(p.stack, (s) => `<span>${esc(s)}</span>`)}</p>
    ${link}
  </div>
</article>`;
}

function page(t) {
  const other = t.lang === "es" ? content.en : content.es;
  const f = t.featured;
  const url = SITE_URL + t.path;
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.meta.title)}</title>
<meta name="description" content="${esc(t.meta.description)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="es" href="${SITE_URL}/">
<link rel="alternate" hreflang="en" href="${SITE_URL}/en/">
<link rel="alternate" hreflang="x-default" href="${SITE_URL}/">
<meta property="og:type" content="profile">
<meta property="og:title" content="${esc(t.meta.title)}">
<meta property="og:description" content="${esc(t.meta.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/og-image.jpg">
<meta property="og:locale" content="${t.lang === "es" ? "es_ES" : "en_GB"}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0a0a0a">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css?v=${V.css}">
<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    alternateName: site.name,
    url,
    jobTitle: t.lang === "es" ? "Desarrollador de software" : "Software developer",
    address: { "@type": "PostalAddress", addressLocality: "Málaga", addressCountry: "ES" },
    sameAs: [site.github, site.linkedin].filter(Boolean),
    knowsLanguage: ["es", "en"],
  })}</script>
<script src="/main.js?v=${V.js}"></script>
</head>
<body>
<a class="skip" href="#main">${t.nav.skip}</a>
<header class="top">
  <a class="brand" href="${t.path}">Agustín Bernal<span>.</span></a>
  <nav aria-label="${t.lang === "es" ? "Principal" : "Main"}">
    <a href="#trabajo">${t.nav.work}</a>
    <a href="#como">${t.nav.how}</a>
    <a href="#trayectoria">${t.nav.cv}</a>
    <a href="#contacto">${t.nav.contact}</a>
  </nav>
  <a class="lang mono" href="${t.nav.switchHref}" hreflang="${other.lang}" lang="${other.lang}">${t.nav.switchLabel}</a>
</header>

<main id="main">
<section class="hero-wrap">
<div class="hero">
  <p class="prompt mono" aria-hidden="true"><span class="path">~/málaga</span> <span class="dollar">$</span> <span class="cmd" data-type="${esc(t.hero.prompt)}">${esc(t.hero.prompt)}</span><span class="caret"></span></p>
  <h1 class="name">${nameLines()}</h1>
  <div class="hero-grid">
    <div class="hero-text">
      <p class="kicker mono later"><span class="dot" aria-hidden="true"></span>${esc(t.hero.kicker)}</p>
      <p class="statement later">${rich(t.hero.statement)}</p>
      <p class="lead later">${rich(t.hero.lead)}</p>
      <p class="ctas later">
        <a class="btn" href="#trabajo">${t.hero.ctaPrimary}</a>
        <a class="btn ghost" href="#contacto">${t.hero.ctaSecondary}</a>
      </p>
    </div>
    <aside class="sheet later" aria-label="${esc(t.hero.sheetTitle)}">
      <p class="mono sheet-t">${esc(t.hero.sheetTitle)}</p>
      <dl>${list(t.hero.sheet, ([k, v]) => `<div><dt class="mono">${esc(k)}</dt><dd>${esc(v)}</dd></div>`)}</dl>
    </aside>
  </div>
</div>
</section>

<div class="marquee" aria-hidden="true"><div class="track">${list([0, 1], () => `<p>${list(site.marquee, (s) => `<span>${esc(s)}</span><i>✦</i>`)}</p>`)}</div></div>

<section class="featured" id="trabajo" aria-labelledby="f-title">
  <div class="wrap">
    <p class="mono f-label"><span class="badge">N.º 01</span> ${esc(f.label)}</p>
    <div class="f-grid">
      <div class="f-head">
        <h2 id="f-title"><a href="https://wiccao.com" target="_blank" rel="noopener">${esc(f.title)}</a></h2>
        <p class="p-kind">${esc(f.kind)}</p>
        ${list(f.body, (b) => `<p>${rich(b)}</p>`)}
        <p class="tags">${list(f.stack, (s) => `<span>${esc(s)}</span>`)}</p>
        <a class="btn accent" href="https://wiccao.com" target="_blank" rel="noopener">${esc(f.cta)} ${arrow}</a>
      </div>
      <figure class="browser reveal">
        <div class="browser-bar" aria-hidden="true"><i></i><i></i><i></i><span>wiccao.com</span></div>
        ${picture("wiccao", f.shotAlt, "(min-width: 900px) 640px, 92vw")}
      </figure>
    </div>
    <dl class="stats">${list(f.stats, ([n, d]) => `<div class="reveal"><dt>${esc(n)}</dt><dd>${esc(d)}</dd></div>`)}</dl>
    <div class="f-sec">
      <h3 class="mono">${esc(f.securityTitle)}</h3>
      <ul class="checks">${list(f.security, (s) => `<li>${rich(s)}</li>`)}</ul>
    </div>
  </div>
</section>

<section class="work wrap" aria-labelledby="w-title">
  <div class="section-head">
    <h2 id="w-title">${esc(t.work.title)}</h2>
    <p>${esc(t.work.intro)}</p>
  </div>
  ${list(t.work.projects, (p, i) => project(p, i, t))}
  <div class="more">
    <h3 class="mono">${esc(t.work.more.title)}</h3>
    ${list(t.work.more.items, ([n, d]) => `<p><strong>${esc(n)}</strong> — ${esc(d)}</p>`)}
  </div>
</section>

<section class="how" id="como" aria-labelledby="h-title">
  <div class="wrap">
    <h2 id="h-title">${esc(t.how.title)}</h2>
    <ol class="how-grid">${list(t.how.items, ([h, d], i) => `<li class="reveal"><span class="mono">0${i + 1}</span><h3>${esc(h)}</h3><p>${esc(d)}</p></li>`)}</ol>
  </div>
</section>

<section class="cv wrap" id="trayectoria" aria-labelledby="cv-title">
  <h2 id="cv-title">${esc(t.cv.title)}</h2>
  <div class="cv-grid">
    <div>
      <h3 class="mono">${esc(t.cv.expTitle)}</h3>
      <ol class="timeline">${list(t.cv.exp, ([when, role, where, d]) => `<li><p class="mono when">${esc(when)}</p><p class="role">${esc(role)}</p><p class="where">${esc(where)}</p><p>${esc(d)}</p></li>`)}</ol>
      <h3 class="mono">${esc(t.cv.eduTitle)}</h3>
      <ol class="timeline">${list(t.cv.edu, ([when, role, where, honor]) => `<li><p class="mono when">${esc(when)}</p><p class="role">${esc(role)}</p><p class="where">${esc(where)}</p><p class="honor">${esc(honor)}</p></li>`)}</ol>
    </div>
    <div>
      <h3 class="mono">${esc(t.cv.skillsTitle)}</h3>
      <dl class="skills">${list(t.cv.skills, ([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)}</dl>
      <div class="next">
        <h3>${esc(t.next.title)}</h3>
        <p>${esc(t.next.body)}</p>
        <p class="mono next-t">${esc(t.next.learningTitle)}</p>
        <ul>${list(t.next.learning, (l) => `<li>${esc(l)}</li>`)}</ul>
      </div>
    </div>
  </div>
</section>

<section class="contact" id="contacto" aria-labelledby="c-title">
  <div class="wrap">
    <h2 id="c-title">${esc(t.contact.title)}</h2>
    <p class="lead">${esc(t.contact.body)}</p>
    <ul class="c-links">
      <li><span class="mono">${t.contact.emailLabel}</span> <a class="mail" data-mail="${site.emailEncoded}" href="#contacto">${esc(t.contact.noscript)}</a></li>
      <li><span class="mono">${t.contact.githubLabel}</span> <a href="${site.github}" target="_blank" rel="noopener">github.com/aguscatbernal</a></li>
      ${site.linkedin ? `<li><span class="mono">${t.contact.linkedinLabel}</span> <a href="${site.linkedin}" target="_blank" rel="noopener">${esc(decodeURI(site.linkedin).replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))}</a></li>` : ""}
    </ul>
  </div>
</section>
</main>

<footer class="foot wrap">
  <p>© ${new Date().getFullYear()} ${esc(site.fullName)} · ${esc(t.contact.footer)}</p>
  <div class="foot-r">
    <button class="motion-toggle mono" type="button" aria-pressed="false" data-off="${esc(t.contact.motionOff)}" data-on="${esc(t.contact.motionOn)}" hidden>${t.contact.motionOff}</button>
    <a class="mono" href="${t.nav.switchHref}" hreflang="${other.lang}" lang="${other.lang}">${t.nav.switchLabel}</a>
  </div>
</footer>
</body>
</html>
`;
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(`${OUT}/en`, { recursive: true });
mkdirSync(`${OUT}/fonts`, { recursive: true });
cpSync("public", OUT, { recursive: true });
cpSync("src/styles.css", `${OUT}/styles.css`);
cpSync("src/main.js", `${OUT}/main.js`);
cpSync("node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2", `${OUT}/fonts/archivo.woff2`);
cpSync("node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", `${OUT}/fonts/plex-mono-400.woff2`);
cpSync("node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2", `${OUT}/fonts/plex-mono-500.woff2`);

writeFileSync(`${OUT}/index.html`, page(content.es));
writeFileSync(`${OUT}/en/index.html`, page(content.en));
writeFileSync(`${OUT}/robots.txt`, `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
writeFileSync(
  `${OUT}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${["/", "/en/"]
    .map((p) => `  <url><loc>${SITE_URL}${p}</loc><xhtml:link rel="alternate" hreflang="es" href="${SITE_URL}/"/><xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/"/></url>`)
    .join("\n")}\n</urlset>\n`
);

console.log(`dist/ listo para ${SITE_URL}`);
