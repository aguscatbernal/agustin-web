// Prepara las imágenes de los proyectos en public/img/ (webp, dos tamaños).
// Las fuentes son las capturas y vistas previas de cada proyecto; se vuelve a
// correr con `npm run images` si cambia alguna.
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const APPS = "C:/Users/media/Desktop/Apps";
const GAME = "C:/Users/media/Desktop/JUEGO I hate this job/Imagenes Carrusel Juego";
const OUT = "public/img";
mkdirSync(OUT, { recursive: true });

const jobs = [
  // Captura de wiccao.com recortada por encima del aviso de cookies.
  { src: "raw/wiccao.png", name: "wiccao", crop: { left: 110, top: 0, width: 1220, height: 690 } },
  { src: `${APPS}/ACmarketingPag/public/og-image.jpg`, name: "acemedia" },
  { src: `${APPS}/MerkavisionWeb/public/og-image.jpg`, name: "merkavision" },
  { src: `${GAME}/carretera.png`, name: "ihtj-carretera" },
  { src: `${GAME}/supermercado.png`, name: "ihtj-supermercado" },
  { src: `${GAME}/bar.png`, name: "ihtj-bar" },
];

for (const { src, name, crop } of jobs) {
  for (const width of [1200, 700]) {
    let img = sharp(src);
    if (crop) img = img.extract(crop);
    await img.resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${OUT}/${name}-${width}.webp`);
  }
  console.log("ok", name);
}

// Vista previa al compartir el link (1200x630).
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#f2efe8"/>
  <rect x="0" y="0" width="1200" height="14" fill="#e2481f"/>
  <text x="80" y="150" font-family="Consolas, monospace" font-size="28" fill="#5d594f">DEVELOPER · MÁLAGA · ES / EN</text>
  <text x="76" y="300" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="118" fill="#17150f">Agustín Bernal</text>
  <text x="80" y="390" font-family="Arial, sans-serif" font-size="40" fill="#17150f">Webs y apps reales, rápidas y seguras.</text>
  <text x="80" y="540" font-family="Consolas, monospace" font-size="26" fill="#e2481f">wiccao.com · Flutter · React · Unity</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 86 }).toFile("public/og-image.jpg");
console.log("ok og-image");
