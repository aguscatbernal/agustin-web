// Todos los textos de la web, en español (/) e inglés (/en/).
// Lo que va entre *asteriscos* se resalta.

// Email al revés y en base64 para frenar a los recolectores. Para generar otro:
// btoa("tu@email.com".split("").reverse().join(""))
export const site = {
  name: "Agustín Bernal",
  fullName: "Agustín Nahuel Bernal Sita",
  emailEncoded: "bW9jLmxpYW1nQGxhbnJlYnRhY3N1Z2E=",
  github: "https://github.com/aguscatbernal",
  linkedin: "https://www.linkedin.com/in/agust%C3%ADn-bernal-67479b372/",
  // La cinta que pasa bajo la portada.
  marquee: ["Flutter", "React", "TypeScript", "Java", "Dart", "C#", "Python", "Unity", "Firebase", "Three.js", "Azure", "Cloudflare", "Git"],
};

const links = {
  wiccao: "https://wiccao.com",
  merkavision: "https://merkavision-web.aguscatbernal.workers.dev",
  acemedia: "https://ac-marketing-malaga.pages.dev",
  estudio: "https://estudio-andrea-sita-web.aguscatbernal.workers.dev",
  reels: "https://github.com/aguscatbernal/reels_manager",
};

export const content = {
  es: {
    lang: "es",
    path: "/",
    meta: {
      title: "Agustín Nahuel Bernal Sita · Desarrollador de software en Málaga",
      description:
        "Desarrollador de software (DAM, Matrícula de Honor) en Málaga. Webs y apps reales para negocios: wiccao.com, Merkavisión, AceMedia. Flutter, React, TypeScript. Busco mi primer puesto junior.",
    },
    nav: { work: "Proyectos", how: "Cómo trabajo", cv: "Trayectoria", contact: "Contacto", skip: "Saltar al contenido", switchLabel: "English", switchHref: "/en/" },
    hero: {
      prompt: "whoami",
      kicker: "Desarrollador de software · Málaga",
      statement: "Hago webs y apps que usan *negocios de verdad*.",
      lead:
        "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma con Matrícula de Honor. Trabajo como freelance para negocios de Málaga y Buenos Aires, y ahora busco mi primer puesto como desarrollador junior: quiero un equipo del que aprender y en el que crecer.",
      ctaPrimary: "Ver proyectos",
      ctaSecondary: "Escríbeme",
      sheetTitle: "Ficha técnica",
      sheet: [
        ["Puesto buscado", "Desarrollador junior"],
        ["Base", "Málaga · presencial, híbrido o remoto"],
        ["Stack", "Flutter · React · TypeScript · Java"],
        ["Idiomas", "Español nativo · Inglés C1"],
        ["Estado", "Disponible"],
      ],
    },
    featured: {
      label: "Mi último proyecto · octubre 2026",
      title: "wiccao.com",
      kind: "Web para una tienda de reparación de móviles · Calahonda, Mijas",
      body: [
        "Wiccao es mi trabajo más reciente y en el que más me dejé la piel. La W del logo se convirtió en una mascota que te recibe en la portada; hay presupuesto por marca y modelo que sale directo a WhatsApp, catálogo, fotos de antes y después de reparaciones y versión en inglés para la clientela extranjera de la costa.",
        "Al cliente le encantó, y está publicada en su propio dominio.",
      ],
      stats: [
        ["10 días", "de la primera línea a la web publicada (41 commits)"],
        ["100 / 100", "accesibilidad y SEO en Lighthouse (móvil)"],
        ["ES + EN", "HTML pre-renderizado en los dos idiomas"],
        ["0", "cookies de seguimiento"],
      ],
      securityTitle: "Lo que la hace segura",
      security: [
        "Sin servidor ni base de datos: el formulario prepara un WhatsApp y no guarda nada del visitante.",
        "Antispam igualmente: campo trampa, tiempo mínimo, máximo 3 envíos cada 10 minutos y validación de cada campo.",
        "Cabeceras de seguridad: CSP ajustada a lo que carga la web, HSTS, anti-iframe y Permissions-Policy.",
        "Cookies sin trucos: el mapa de Google solo se carga si lo aceptas, y aceptar y rechazar pesan lo mismo.",
        "Probada también en navegadores de móvil antiguos (Samsung Internet, Xiaomi).",
      ],
      stack: ["React 19", "TypeScript", "Vite", "Framer Motion", "Cloudflare"],
      cta: "Visitar wiccao.com",
      shotAlt: "Portada de wiccao.com: la mascota W saluda entre las tarjetas de móviles, vapers y accesorios",
    },
    work: {
      title: "Más proyectos",
      intro: "Todo lo que hay aquí existe y se usa (o se jugó). En cada uno cuento qué hace y cómo lo protegí.",
      labels: { stack: "Stack", security: "Seguridad", status: "Estado", visit: "Ver la web", code: "Ver el código" },
      projects: [
        {
          id: "merkavision",
          title: "Merkavisión Sostoa",
          kind: "Web para una óptica del centro de Málaga",
          body:
            "Un probador de gafas con la cámara: las monturas se colocan en tu cara y siguen el giro de la cabeza, con 5 modelos, 4 colores y 4 tipos de cristal. Una carta de optometrista interactiva que simula la miopía y te «pone las gafas». Y citas que solo dejan elegir los días que abre la tienda.",
          security: [
            "La cámara solo se enciende si pulsas el botón y se apaga al cambiar de pestaña; la imagen se procesa en tu dispositivo y no se graba ni se envía.",
            "Sin servidor: la cita sale por WhatsApp o email desde el móvil de quien la pide.",
            "Teléfono y email codificados y fuera del HTML para frenar a los bots; CSP estricta.",
          ],
          stack: ["React", "TypeScript", "Three.js", "MediaPipe", "GSAP"],
          status: "Lista para el lanzamiento",
          link: links.merkavision,
          img: "merkavision",
          imgAlt: "Vista previa de la web de Merkavisión: «Tu óptica en» sobre la placa de mármol de la calle Héroe de Sostoa",
        },
        {
          id: "acemedia",
          title: "AceMedia Marketing",
          kind: "Web de una agencia de contenido · Málaga, Costa del Sol y Madrid",
          body:
            "Landing en español e inglés con reels, servicios y precios. Las consultas del formulario no se quedan en un email: llegan directamente a reels_manager, la app interna con la que la agencia organiza su trabajo.",
          security: [
            "Reglas de Firestore que solo permiten crear consultas válidas: nadie de fuera puede leer, editar ni borrar. Probadas con el emulador en 23 casos.",
            "Firebase solo se descarga al enviar; antispam con campo trampa y límite de envíos.",
            "Tipografías servidas desde la propia web: ningún tercero al cargar.",
          ],
          stack: ["React", "TypeScript", "Firebase", "Firestore"],
          status: "Publicada",
          link: links.acemedia,
          img: "acemedia",
          imgAlt: "Vista previa de AceMedia Marketing: logotipo con una palmera y tres reels",
        },
        {
          id: "estudio",
          title: "Estudio Contable Andrea Sita",
          kind: "Web para un estudio impositivo y contable · Buenos Aires",
          body:
            "La web de mi tía, contadora pública con 27 años de ejercicio: impuestos, balances y pericias judiciales explicados claro. Pensada para que la encuentren en Google: HTML pre-renderizado y datos de negocio local (JSON-LD) generados a partir de los mismos textos de la web.",
          security: [
            "Sin servidor ni base de datos: el formulario arma el mensaje y abre WhatsApp o el correo.",
            "CSP estricta, HSTS y anti-iframe; contacto codificado.",
          ],
          stack: ["React", "TypeScript", "Vite", "Cloudflare Workers"],
          status: "Publicada",
          link: links.estudio,
          visual: { type: "type", big: "27", small: "años de ejercicio, ahora también en Google" },
        },
        {
          id: "reels",
          title: "reels_manager",
          kind: "App de escritorio para un equipo de creación de contenido",
          body:
            "La herramienta con la que trabajamos a diario: reels de referencia, colaboraciones con los datos de cada cliente, calendario de publicación, propuestas y el registro de a qué cuentas de Instagram ya les escribimos y a cuáles no. Todo en tiempo real: lo que carga uno, el otro lo ve al instante. Y se actualiza sola con un clic.",
          security: [
            "Acceso solo para el equipo, en dos capas: login de Google restringido y lista de emails autorizados en la app y en las reglas de Firestore.",
            "Arquitectura por capas (domain / data / presentation) en cada sección.",
          ],
          stack: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore"],
          status: "En uso diario · v0.9",
          link: links.reels,
          linkIsCode: true,
          visual: { type: "list", items: ["Reels", "Colaboraciones", "Calendario", "Propuestas", "Cuentas contactadas ✓", "Notas"] },
        },
        {
          id: "binance",
          title: "Bot de trading en Binance",
          kind: "Laboratorio personal de automatización · Python",
          body:
            "Un bot que lee el mercado, decide con una votación de tres indicadores (EMA, RSI y MACD) y gestiona el riesgo solo: 2% por operación, stop-loss y un freno diario si se pierde un 5%. Lo que más me enseñó fue a medir antes de creer: backtests, «operaciones sombra» para evaluar un filtro sin arriesgar nada y corregir mis propias conclusiones cuando los datos no las sostenían.",
          security: [
            "Solo en Testnet: si la configuración apunta al Binance real, el bot se niega a arrancar.",
            "Claves en variables de entorno, nunca en el repositorio.",
          ],
          stack: ["Python", "Flask", "SQLite", "API de Binance"],
          status: "Experimento en Testnet",
          visual: {
            type: "table",
            caption: "Backtest, 15 días de BTCUSDT",
            head: ["Filtro", "Win rate", "Resultado"],
            rows: [["Sin filtro", "24,1%", "−6,82%"], ["EMA ≥ 0,2%", "42,9%", "+15,51%"]],
          },
        },
        {
          id: "ihtj",
          title: "I Hate This Job",
          kind: "Videojuego de terror · Proyecto de Fin de Grado",
          body:
            "Mi juego, y el proyecto al que más horas le he dedicado. Conduces de noche, recoges objetos para resolver mini-puzzles y los sustos se disparan según lo que haces. Escenarios modelados en Blender, lógica en C# con Unity y partidas guardadas en SQLite. No está terminado: todavía tengo una lista con cosas como arreglar las puertas de la casa o que se pueda tocar el piano.",
          stack: ["Unity", "C#", "SQLite", "Blender"],
          status: "Sin terminar (todavía)",
          gallery: [
            ["ihtj-carretera", "Carretera de noche iluminada por farolas"],
            ["ihtj-bar", "Un bar abandonado con las sillas sobre las mesas"],
            ["ihtj-supermercado", "Exterior de un supermercado de noche"],
          ],
        },
      ],
      more: {
        title: "Y también",
        items: [
          ["OptiGest", "Gestión de clientes y ventas para una óptica, con facturas en PDF automáticas. Flutter + Firebase. Repositorio privado por los datos reales de clientes."],
        ],
      },
    },
    how: {
      title: "Cómo trabajo",
      items: [
        ["Seguro por defecto", "Aunque sea una landing, lleva CSP, HSTS y antispam. Y no guardo datos que no hagan falta: la mejor base de datos que proteger es la que no existe."],
        ["Bilingüe de serie", "Español e inglés pre-renderizados, para Google y para la clientela extranjera de la costa."],
        ["Medir, no suponer", "Lighthouse, pruebas con el emulador de Firestore, backtests. Si los datos me llevan la contraria, cambio de idea."],
        ["Que el cliente no dependa de mí", "Cada proyecto lleva un README que explica dónde se cambia cada texto, precio u horario."],
      ],
    },
    cv: {
      title: "Trayectoria",
      expTitle: "Experiencia",
      exp: [
        ["2026 — hoy", "Desarrollador freelance", "Málaga", "Webs y apps para negocios: diseño, desarrollo, publicación en Cloudflare, dominio y posicionamiento en Google."],
        ["2025 — 2026", "Prácticas de desarrollo", "Avarda Bank · Málaga", "Desarrollo y optimización de aplicaciones de software dentro de un equipo con metodologías ágiles."],
        ["2024", "Instalaciones de telecomunicaciones", "GO · Malta", "Instalaciones para un operador de telecomunicaciones, trabajando en inglés."],
      ],
      eduTitle: "Formación",
      edu: [
        ["2024 — 2026", "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma", "IES Pablo Picasso · Málaga", "Matrícula de Honor"],
        ["2023 — 2024", "Técnico en Instalaciones de Telecomunicaciones", "IES Martín Aldehuela · Málaga", "Matrícula de Honor"],
      ],
      skillsTitle: "Herramientas",
      skills: [
        ["Lenguajes", "Dart, TypeScript / JavaScript, Java, C#, Python, HTML, CSS"],
        ["Frameworks y motores", "Flutter, React, Unity, Flask"],
        ["Datos", "Firebase / Firestore, SQLite, MySQL"],
        ["Nube y equipo", "Microsoft Azure, Cloudflare, Microsoft 365 y Teams"],
        ["Día a día", "Git y GitHub, Vite, Linux, Blender, Claude Code"],
      ],
    },
    next: {
      title: "Lo que busco",
      body:
        "Dar el salto de freelance a desarrollador junior con todas las letras: un equipo con code reviews, gente con más experiencia de la que aprender y proyectos en los que aportar desde el primer día. Traigo webs en producción, costumbre de documentar y muchas ganas.",
      learningTitle: "Lo siguiente que quiero aprender",
      learning: ["Tests automáticos y CI/CD", "Backend con Spring Boot o Node", "Trabajar con code review en equipo"],
    },
    contact: {
      title: "¿Hablamos?",
      body: "Si buscas un junior con proyectos reales detrás, o tienes un negocio que necesita una web, escríbeme.",
      emailLabel: "Email",
      noscript: "aguscatbernal [arroba] gmail.com",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      footer: "Málaga, España",
      motionOff: "Reducir movimiento",
    },
  },

  en: {
    lang: "en",
    path: "/en/",
    meta: {
      title: "Agustín Nahuel Bernal Sita · Software developer in Málaga, Spain",
      description:
        "Software developer (Multiplatform App Development, top honours) based in Málaga, Spain. Real websites and apps for real businesses: wiccao.com, Merkavisión, AceMedia. Flutter, React, TypeScript. Looking for my first junior role.",
    },
    nav: { work: "Work", how: "How I work", cv: "Background", contact: "Contact", skip: "Skip to content", switchLabel: "Español", switchHref: "/" },
    hero: {
      prompt: "whoami",
      kicker: "Software developer · Málaga, Spain",
      statement: "I build websites and apps that *real businesses* use.",
      lead:
        "Multiplatform Application Developer (Higher Technician, top honours). I freelance for businesses in Málaga and Buenos Aires, and I'm now looking for my first junior developer role: a team to learn from and grow with.",
      ctaPrimary: "See my work",
      ctaSecondary: "Get in touch",
      sheetTitle: "Spec sheet",
      sheet: [
        ["Looking for", "Junior developer role"],
        ["Based in", "Málaga · on-site, hybrid or remote"],
        ["Stack", "Flutter · React · TypeScript · Java"],
        ["Languages", "Spanish (native) · English C1"],
        ["Status", "Available"],
      ],
    },
    featured: {
      label: "Latest project · October 2026",
      title: "wiccao.com",
      kind: "Website for a phone repair shop · Calahonda, Mijas",
      body: [
        "Wiccao is my most recent project and the one I poured the most into. The W in the logo became a mascot that greets you on the home page; there's a quote request by brand and model that goes straight to WhatsApp, a catalogue, before-and-after repair photos and an English version for the coast's international customers.",
        "The client loved it, and it's live on their own domain.",
      ],
      stats: [
        ["10 days", "from first line of code to live site (41 commits)"],
        ["100 / 100", "accessibility and SEO in Lighthouse (mobile)"],
        ["ES + EN", "pre-rendered HTML in both languages"],
        ["0", "tracking cookies"],
      ],
      securityTitle: "What keeps it safe",
      security: [
        "No server, no database: the form prepares a WhatsApp message and stores nothing about the visitor.",
        "Spam protection anyway: honeypot field, minimum time, max 3 sends per 10 minutes and per-field validation.",
        "Security headers: a CSP fitted to exactly what the site loads, HSTS, anti-framing and Permissions-Policy.",
        "Honest cookies: the Google map only loads if you accept it, and Accept and Reject carry the same weight.",
        "Tested on older mobile browsers too (Samsung Internet, Xiaomi).",
      ],
      stack: ["React 19", "TypeScript", "Vite", "Framer Motion", "Cloudflare"],
      cta: "Visit wiccao.com",
      shotAlt: "wiccao.com home page: the W mascot waves between the phones, vapes and accessories cards",
    },
    work: {
      title: "More work",
      intro: "Everything here exists and gets used (or played). For each one I explain what it does and how I secured it.",
      labels: { stack: "Stack", security: "Security", status: "Status", visit: "Visit the site", code: "See the code" },
      projects: [
        {
          id: "merkavision",
          title: "Merkavisión Sostoa",
          kind: "Website for an optician in central Málaga",
          body:
            "A camera-based glasses try-on: frames sit on your face and follow your head as it turns, with 5 models, 4 colours and 4 lens types. An interactive eye chart that simulates short-sightedness and then «puts your glasses on». And appointments that only let you pick days the shop is open.",
          security: [
            "The camera only turns on when you press the button and switches off when you change tabs; the image is processed on your device and never recorded or sent.",
            "No server: appointments go out via WhatsApp or email from the visitor's own phone.",
            "Phone and email are encoded and kept out of the HTML to stop scrapers; strict CSP.",
          ],
          stack: ["React", "TypeScript", "Three.js", "MediaPipe", "GSAP"],
          status: "Ready to launch",
          link: links.merkavision,
          img: "merkavision",
          imgAlt: "Merkavisión preview: «Your optician on» over the marble street sign of Calle Héroe de Sostoa",
        },
        {
          id: "acemedia",
          title: "AceMedia Marketing",
          kind: "Website for a content agency · Málaga, Costa del Sol and Madrid",
          body:
            "A Spanish/English landing page with reels, services and pricing. Enquiries from the form don't end up buried in an inbox: they land straight in reels_manager, the internal app the agency runs its work on.",
          security: [
            "Firestore rules that only allow creating valid enquiries: nobody outside can read, edit or delete. Tested against the emulator with 23 cases.",
            "Firebase is only downloaded on submit; honeypot and rate limiting against spam.",
            "Fonts served from the site itself: no third parties on load.",
          ],
          stack: ["React", "TypeScript", "Firebase", "Firestore"],
          status: "Live",
          link: links.acemedia,
          img: "acemedia",
          imgAlt: "AceMedia Marketing preview: palm-tree logo and three reels",
        },
        {
          id: "estudio",
          title: "Andrea Sita Accounting",
          kind: "Website for a tax and accounting practice · Buenos Aires",
          body:
            "The website for my aunt, a chartered accountant with 27 years in practice: taxes, financial statements and court-appointed expert reports, explained clearly. Built to be found on Google: pre-rendered HTML and local-business structured data (JSON-LD) generated from the same copy as the page.",
          security: [
            "No server or database: the form composes the message and opens WhatsApp or email.",
            "Strict CSP, HSTS and anti-framing; encoded contact details.",
          ],
          stack: ["React", "TypeScript", "Vite", "Cloudflare Workers"],
          status: "Live",
          link: links.estudio,
          visual: { type: "type", big: "27", small: "years in practice, now on Google too" },
        },
        {
          id: "reels",
          title: "reels_manager",
          kind: "Desktop app for a content creation team",
          body:
            "The tool we work with every day: reference reels, collaborations with each client's details, a publishing calendar, proposals and a log of which Instagram accounts we've already messaged and which we haven't. All in real time: what one person adds, the other sees instantly. And it updates itself in one click.",
          security: [
            "Team-only access, in two layers: restricted Google sign-in plus an allow-list of emails in both the app and the Firestore rules.",
            "Layered architecture (domain / data / presentation) in every feature.",
          ],
          stack: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore"],
          status: "In daily use · v0.9",
          link: links.reels,
          linkIsCode: true,
          visual: { type: "list", items: ["Reels", "Collaborations", "Calendar", "Proposals", "Accounts contacted ✓", "Notes"] },
        },
        {
          id: "binance",
          title: "Binance trading bot",
          kind: "Personal automation lab · Python",
          body:
            "A bot that reads the market, decides through a vote of three indicators (EMA, RSI and MACD) and manages its own risk: 2% per trade, stop-loss and a daily brake at a 5% loss. What it taught me most was to measure before believing: backtests, «shadow trades» to evaluate a filter without risking anything, and correcting my own conclusions when the data didn't back them up.",
          security: [
            "Testnet only: if the config points at real Binance, the bot refuses to start.",
            "Keys live in environment variables, never in the repository.",
          ],
          stack: ["Python", "Flask", "SQLite", "Binance API"],
          status: "Testnet experiment",
          visual: {
            type: "table",
            caption: "Backtest, 15 days of BTCUSDT",
            head: ["Filter", "Win rate", "Result"],
            rows: [["No filter", "24.1%", "−6.82%"], ["EMA ≥ 0.2%", "42.9%", "+15.51%"]],
          },
        },
        {
          id: "ihtj",
          title: "I Hate This Job",
          kind: "Horror video game · Final degree project",
          body:
            "My game, and the project I've spent the most hours on. You drive at night, collect objects to solve mini-puzzles, and scares trigger depending on what you do. Scenes modelled in Blender, logic in C# with Unity, and save games in SQLite. It's not finished: I still have a list with things like fixing the doors in the house or making the piano playable.",
          stack: ["Unity", "C#", "SQLite", "Blender"],
          status: "Unfinished (for now)",
          gallery: [
            ["ihtj-carretera", "A road at night lit by street lamps"],
            ["ihtj-bar", "An abandoned bar with chairs stacked on the tables"],
            ["ihtj-supermercado", "Outside a supermarket at night"],
          ],
        },
      ],
      more: {
        title: "Also",
        items: [
          ["OptiGest", "Customer and sales management for an optician, with automatic PDF invoices. Flutter + Firebase. Private repository because it holds real customer data."],
        ],
      },
    },
    how: {
      title: "How I work",
      items: [
        ["Secure by default", "Even a landing page gets CSP, HSTS and spam protection. And I don't store data that isn't needed: the best database to protect is the one that doesn't exist."],
        ["Bilingual out of the box", "Spanish and English, pre-rendered, for Google and for the coast's international customers."],
        ["Measure, don't assume", "Lighthouse, Firestore emulator tests, backtests. If the data disagrees with me, I change my mind."],
        ["Clients shouldn't depend on me", "Every project ships with a README explaining where to change each text, price or opening hour."],
      ],
    },
    cv: {
      title: "Background",
      expTitle: "Experience",
      exp: [
        ["2026 — now", "Freelance developer", "Málaga", "Websites and apps for businesses: design, development, Cloudflare deployment, domains and Google visibility."],
        ["2025 — 2026", "Software development intern", "Avarda Bank · Málaga", "Developing and optimising software applications within an agile team."],
        ["2024", "Telecommunications installations", "GO · Malta", "Installations for a telecoms operator, working in English."],
      ],
      eduTitle: "Education",
      edu: [
        ["2024 — 2026", "Higher Technician in Multiplatform Application Development", "IES Pablo Picasso · Málaga", "Top honours (Matrícula de Honor)"],
        ["2023 — 2024", "Technician in Telecommunications Installations", "IES Martín Aldehuela · Málaga", "Top honours (Matrícula de Honor)"],
      ],
      skillsTitle: "Tools",
      skills: [
        ["Languages", "Dart, TypeScript / JavaScript, Java, C#, Python, HTML, CSS"],
        ["Frameworks & engines", "Flutter, React, Unity, Flask"],
        ["Data", "Firebase / Firestore, SQLite, MySQL"],
        ["Cloud & teamwork", "Microsoft Azure, Cloudflare, Microsoft 365 and Teams"],
        ["Day to day", "Git & GitHub, Vite, Linux, Blender, Claude Code"],
      ],
    },
    next: {
      title: "What I'm looking for",
      body:
        "To go from freelancer to a junior developer in every sense: a team with code reviews, more experienced people to learn from and projects I can contribute to from day one. I bring sites in production, a habit of documenting my work and a lot of drive.",
      learningTitle: "What I want to learn next",
      learning: ["Automated testing and CI/CD", "Backend with Spring Boot or Node", "Working with code review in a team"],
    },
    contact: {
      title: "Let's talk",
      body: "If you're looking for a junior with real projects behind them, or you run a business that needs a website, drop me a line.",
      emailLabel: "Email",
      noscript: "aguscatbernal [at] gmail.com",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      footer: "Málaga, Spain",
      motionOff: "Reduce motion",
    },
  },
};
