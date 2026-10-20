// Lo poco que necesita JavaScript: el email (codificado para frenar a los bots),
// la presentación de la portada, la rejilla que se enciende con el cursor,
// la aparición de los bloques y las cifras que cuentan.
// Sin JavaScript la web se ve entera y quieta.
//
// El movimiento está activado siempre, aunque el sistema pida reducirlo (como en
// Merkavisión); quien lo prefiera lo apaga con «Reducir movimiento» en el pie, y la
// elección se guarda en el navegador (ab-motion).
const root = document.documentElement;
root.classList.add("js");

let calm = false;
try {
  calm = localStorage.getItem("ab-motion") === "off";
} catch {}
if (!calm) root.classList.add("motion");

document.addEventListener("DOMContentLoaded", () => {
  for (const a of document.querySelectorAll("a[data-mail]")) {
    const mail = atob(a.dataset.mail).split("").reverse().join("");
    a.href = "mailto:" + mail;
    a.textContent = mail;
  }

  const top = document.querySelector(".top");
  const onScroll = () => top.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  motionToggle();
  presentHero();
  spotlight();
  reveal();
});

function motionToggle() {
  const btn = document.querySelector(".motion-toggle");
  if (!btn) return;
  btn.hidden = false;
  btn.setAttribute("aria-pressed", String(calm));
  btn.addEventListener("click", () => {
    calm = !calm;
    root.classList.toggle("motion", !calm);
    btn.setAttribute("aria-pressed", String(calm));
    try {
      localStorage.setItem("ab-motion", calm ? "off" : "on");
    } catch {}
  });
}

// «$ whoami» se escribe solo y después sube el nombre, palabra a palabra.
function presentHero() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  hero.querySelectorAll(".name .w > span").forEach((el, i) => el.style.setProperty("--i", i));
  const go = () => hero.classList.add("go");
  const cmd = hero.querySelector(".cmd");
  if (calm || !cmd) return go();

  const text = cmd.dataset.type;
  cmd.textContent = "";
  let n = 0;
  const type = () => {
    cmd.textContent = text.slice(0, ++n);
    if (n < text.length) setTimeout(type, 70 + Math.random() * 60);
    else setTimeout(go, 220);
  };
  setTimeout(type, 400);
  setTimeout(go, 3000); // por si algo falla, el contenido nunca se queda oculto
}

// Los puntos de la portada se encienden alrededor del cursor (solo con ratón).
function spotlight() {
  const wrap = document.querySelector(".hero-wrap");
  if (!wrap || calm || !window.matchMedia("(pointer: fine)").matches) return;
  let frame = 0;
  wrap.addEventListener("pointermove", (e) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      const r = wrap.getBoundingClientRect();
      wrap.style.setProperty("--mx", `${e.clientX - r.left}px`);
      wrap.style.setProperty("--my", `${e.clientY - r.top}px`);
      wrap.classList.add("lit");
      frame = 0;
    });
  });
  wrap.addEventListener("pointerleave", () => wrap.classList.remove("lit"));
}

function reveal() {
  const items = document.querySelectorAll(".reveal, .wipe");
  const stats = document.querySelectorAll(".stats dt");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("in");
        if (e.target.tagName === "DT") countUp(e.target);
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => io.observe(el));
  if (!calm) stats.forEach((el) => io.observe(el));
}

// «10 días», «100 / 100»: los números cuentan desde 0 al aparecer.
function countUp(el) {
  const original = el.textContent;
  if (!/\d/.test(original) || /^0$/.test(original.trim())) return;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / 1300, 1);
    const k = 1 - Math.pow(1 - t, 3);
    el.textContent = original.replace(/\d+/g, (d) => Math.round(Number(d) * k));
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = original;
  };
  requestAnimationFrame(step);
}
