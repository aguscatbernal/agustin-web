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
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <rect x="80" y="96" width="44" height="4" fill="#ff5b2e"/>
  <text x="80" y="150" font-family="Consolas, monospace" font-size="28" fill="#9b978e">~/málaga $ whoami</text>
  <text x="74" y="275" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="104" fill="#f3f1ec">Agustín Nahuel</text>
  <text x="74" y="385" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="104" fill="none" stroke="#f3f1ec" stroke-width="2">Bernal Sita</text>
  <text x="80" y="480" font-family="Arial, sans-serif" font-size="36" fill="#f3f1ec">Webs y apps reales, rápidas y seguras.</text>
  <text x="80" y="550" font-family="Consolas, monospace" font-size="26" fill="#ff5b2e">wiccao.com · Flutter · React · Unity</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 86 }).toFile("public/og-image.jpg");
console.log("ok og-image");
