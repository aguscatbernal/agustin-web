# Agustín Bernal — Web personal

Portfolio / CV en web, en español (`/`) e inglés (`/en/`). HTML y CSS sin framework:
`build.mjs` lee los textos de `src/content.mjs` y genera la web estática en `dist/`.

## Correr en local
```bash
npm install
npm run build        # genera dist/
npm run preview      # compila y la sirve en http://localhost:4321
npm run images       # vuelve a preparar las imágenes de public/img/ desde las capturas de cada proyecto
```

## Editar contenido
| Qué | Dónde |
| --- | --- |
| Todos los textos (ES + EN), proyectos, experiencia, herramientas | `src/content.mjs` |
| Email (codificado), GitHub, LinkedIn | `site` en `src/content.mjs` |
| Colores, tipografías, tamaños | `src/styles.css` (variables al principio) |
| Estructura de la página | `build.mjs` (función `page`) |
| Dirección pública (para Google y al compartir) | `SITE_URL` en `build.mjs` |

En los títulos, lo que va entre `*asteriscos*` se resalta.

## Movimiento
- **Portada**: se escribe `$ whoami`, el nombre sube palabra a palabra y después entra el resto.
  Con ratón, los puntos del fondo se encienden alrededor del cursor.
- Cinta de tecnologías que pasa sola (se para al pasar el ratón), imágenes que se destapan al hacer
  scroll y cifras de Wiccao que cuentan desde 0.
- **Activado siempre**, aunque el sistema pida «reducir movimiento» (igual que en Merkavisión). Quien lo
  prefiera lo apaga en el pie con **«Reducir movimiento»**; se guarda en el navegador (`ab-motion`).
- Todo está en `src/main.js` y en el bloque «Movimiento» de `src/styles.css`. Sin JavaScript la web se ve
  entera y quieta.

## Seguridad
- **Sin servidor, sin formularios, sin cookies, sin terceros**: las tipografías se sirven desde la propia web.
- **Cabeceras** (`public/_headers`): CSP estricta (solo la propia web), HSTS, anti-iframe, nosniff,
  Referrer-Policy y Permissions-Policy.
- **Email codificado** en el HTML para frenar a los recolectores; se descodifica en el navegador.

## Publicar en Cloudflare (gratis)
1. `npx wrangler login` (abre el navegador para entrar en tu cuenta de Cloudflare).
2. `npm run build && npx wrangler deploy`
3. Queda en `https://agustin-web.<tu-subdominio>.workers.dev`.

### Dominio propio
1. Comprarlo en Cloudflare: dash.cloudflare.com → **Domain Registration** → Register Domains
   (precio de coste, sin recargos; un `.com` o un `.dev` ronda 10–13 USD al año).
2. En el Worker `agustin-web` → **Settings → Domains & Routes → Add → Custom domain** → el dominio.
3. Poner la dirección en `SITE_URL` (`build.mjs`), volver a compilar y publicar.
4. Dar de alta la web en **Google Search Console** y enviar `sitemap.xml`.

Activar la verificación en dos pasos (2FA) en Cloudflare y GitHub.
