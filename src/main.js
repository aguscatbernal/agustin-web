// Lo poco que necesita JavaScript: el email (codificado para frenar a los bots),
// el borde de la cabecera al hacer scroll y la aparición suave de los bloques.
document.documentElement.classList.add("js");

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

  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => io.observe(el));
});
