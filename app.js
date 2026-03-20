const FORM_ENDPOINT = "https://formspree.io/f/xyknpdjv";
const FORM_ENDPOINT_PLACEHOLDER = "REPLACE_WITH_YOUR_FORM_ID";
const CONSULTATION_MIN_LOADING_MS = 1200;
const TURNSTILE_SITE_KEY = "0x4AAAAAACqP0xV6NCSkGF91";
const TURNSTILE_TOKEN_FIELD = "cf-turnstile-response";

const SUPPORTED_LOCALES = ["en", "es", "de"];
const DEFAULT_LOCALE = "en";
const LOCALE_STORAGE_KEY = "cv_locale";
const COMPACT_HEADER_MEDIA_QUERY = "(max-width: 760px), ((max-width: 1040px) and (orientation: landscape))";
const HERO_GIF_ROTATION_MS = 4000;
const HERO_GIF_FADE_MS = 400;
const HERO_GIF_SEQUENCE = [
  {
    id: "short-ribs",
    src: "./Short-Ribs.gif"
  },
  {
    id: "strawberry-croissant",
    src: "./Strawberry-Croissant.gif"
  },
  {
    id: "sushi",
    src: "./Sushi.gif"
  }
];
const DEFAULT_EXPERIENCE_SAMPLE_ID = "sushi";
const LANDING_DISH_MEDIA = {
  sushi: {
    posterSrc: "./Sushi-int-poster.webp",
    interactiveSpriteSrc: "./Sushi-int-sprite.webp"
  }
};
const LANDING_MODAL_GUIDANCE_ASSETS = {
  circularMotionArrows: "./visual_onboarding/circular_motion_arrows.png",
  pointingHand: "./visual_onboarding/pointing_hand.png",
  sampleDish: "./visual_onboarding/sample_2d_dish.png"
};
const LANDING_MODAL_GUIDANCE_ASSET_KEYS = {
  circularMotionArrows: "guidance:circularMotionArrows",
  pointingHand: "guidance:pointingHand",
  sampleDish: "guidance:sampleDish"
};
const LANDING_MEDIA_ASSETS = Object.fromEntries([
  ...Object.entries(LANDING_DISH_MEDIA).flatMap(([sampleId, media]) =>
    [
      media.posterSrc ? [`${sampleId}:poster`, media.posterSrc] : null,
      media.interactiveSpriteSrc ? [`${sampleId}:interactive`, media.interactiveSpriteSrc] : null
    ].filter(Boolean)
  ),
  ...Object.entries(LANDING_MODAL_GUIDANCE_ASSETS).map(([assetName, src]) => [
    LANDING_MODAL_GUIDANCE_ASSET_KEYS[assetName],
    src
  ])
]);
const LANDING_MEDIA_ASSET_KEYS_BY_SRC = new Map(
  Object.entries(LANDING_MEDIA_ASSETS).map(([assetKey, src]) => [src, assetKey])
);
const SPRITE_META = {
  frameWidth: 500,
  frameHeight: 500,
  columns: 10,
  rows: 6,
  totalFrames: 60
};
const LANDING_CONTENT_BY_LOCALE = {
  en: {
    hero: {
      eyebrow: "Visual Menus for Restaurants",
      headline: "Let guests see what they’re about to order.",
      subheadline:
        "Interactive visual menus for restaurants that want faster, more confident orders, especially from international guests."
    },
    whyItMatters: {
      eyebrow: "Why It Matters",
      heading: "What changes when guests can see the dish",
      intro: [
        "If guests cannot picture the dish, they hesitate. Visual clarity speeds decisions and protects premium perception, especially for international guests."
      ],
      impacts: [
        {
          title: "Elevate Premium Perception",
          body: "Presentation signals quality before the first bite reaches the table."
        },
        {
          title: "Stand Out from Competitors",
          body: "Most restaurants still use static menus; immersive interaction differentiates instantly."
        },
        {
          title: "Speed Up Confident Orders",
          body: "Dish visuals, allergen cues, and dietary context reduce hesitation and make unfamiliar dishes easier to choose."
        }
      ]
    },
    experience: {
      eyebrow: "The Experience",
      heading: "The future of menus is visual.",
      body: "See how the same dish becomes clearer, richer, and more desirable.",
      defaultSampleId: DEFAULT_EXPERIENCE_SAMPLE_ID,
      steps: [
        {
          title: "TEXT MENU",
          body: "Guests guess what they’ll get."
        },
        {
          title: "PHOTO MENU",
          body: "Guests get a clearer idea of the dish."
        },
        {
          title: "IMMERSIVE MENU",
          body: "Guests see the dish, understand it, and want to order it."
        }
      ],
      samples: {
        sushi: {
          ...LANDING_DISH_MEDIA.sushi,
          name: "Mexican-Style Sushi Roll",
          shortDescription: "Crunchy fusion roll with sesame topping, sauces, and bold flavors.",
          longDescription:
            "Mexican-style sushi is a contemporary reinterpretation of Japanese sushi, popular in many cities across Mexico and Latin America. It often incorporates crunchy textures, creamy dressings, sweet or spicy sauces, and generally bolder seasoning than traditional sushi. This version reflects a fusion approach that combines Japanese technique with local tastes.",
          badges: [{ key: "spice-1", label: "Spice", tone: "spice", spiceLevel: 1 }],
          allergensText: "Gluten, Egg, Soy, Fish, Sesame",
          price: 14,
          currency: "EUR",
          alt: "Mexican-style sushi roll presentation"
        }
      }
    },
    demos: {
      eyebrow: "Live Demos",
      heading: "Open the live experience.",
      body: "Explore real demos and see how the menu feels."
    },
    howItWorks: {
      eyebrow: "How It Works",
      heading: "Two ways to capture. One production flow.",
      body: "We handle production. Your team stays focused on service.",
      pathATitle: "On-Site Capture",
      pathASubtitle: "Best for full production support",
      pathAIntroSteps: ["We visit your location.", "We capture your dishes professionally."],
      pathBTitle: "Remote Capture",
      pathBSubtitle: "Best for a faster rollout",
      pathBIntroSteps: ["You record one short guided clip per dish."],
      sharedTitle: "From production to launch",
      sharedSteps: [
        "We process the assets.",
        "We build the interactive menu site.",
        "We host it for you or support integration into your existing website."
      ],
      sharedNote: "You keep full ownership of the delivered files either way."
    },
    collaboration: {
      eyebrow: "Project Pricing",
      heading: "Clear pricing for an interactive menu project tailored to your restaurant.",
      intro: [
        "It’s an interactive website tailored to your restaurant: we capture the dishes, configure the experience around your brand and menu, publish it, and include one year of updates."
      ],
      standardPricing: {
        title: "Project pricing",
        items: [
          {
            label: "Base setup",
            price: "€500",
            body: "Site setup, hosting configuration, menu structure, visual system, and publication prep."
          },
          {
            label: "Dish digitization",
            price: "€100 per dish",
            body: "Dish capture or processing, visual optimization, and integration into the interactive website."
          },
          {
            label: "Typical project investment",
            price: "€1,200 – €3,000",
            body: "Most complete restaurant projects land in this range.",
            emphasis: true
          }
        ],
        examplesTitle: "Typical project budgets",
        examples: [
          { label: "10 dishes", price: "€1,500" },
          { label: "15 dishes", price: "€2,000" },
          { label: "25 dishes", price: "€3,000" }
        ]
      },
      projectIncludes: {
        title: "What you get",
        deliveryTitle: "At launch",
        deliveryItems: [
          "Hosted interactive menu website",
          "Multi-language menu support",
          "Full file ownership and optional integration into your existing website"
        ],
        updatesTitle: "Included for 1 year",
        updatesItems: [
          "Price and name changes",
          "Copy and visual updates",
          "Seasonal refinements"
        ],
        note:
          "Hosting is included by default. If you already have your own website, you keep full ownership of the delivered files and we can support integration there."
      },
      newDishes: {
        title: "Expand with new dishes",
        items: [
          { label: "Standard addition", price: "€100 per new dish" },
          { label: "Seasonal bundle", price: "€400 for 5 dishes" }
        ],
        body: "Best for seasonal additions or a new menu section."
      },
      launchOffer: {
        title: "Early launch offer",
        items: [
          "No €500 setup fee",
          "€70 per digitized dish",
          "1 year of hosting and menu updates included"
        ],
        body: "Reserved for the first 5 restaurant projects."
      },
      aftercareNote:
        "After year one, hosting, maintenance, and menu updates continue for €100/year."
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Key questions, answered",
      items: [
        {
          q: "Do guests need to download an app?",
          a: "No. Everything runs directly in the browser on mobile and desktop."
        },
        {
          q: "Can we update dishes later?",
          a: "Yes. First-year text, price, and visual updates are included. New dishes are priced separately."
        },
        {
          q: "Is hosting included, or do we receive the files?",
          a: "Hosting is included by default. If you already have your own website, you keep full ownership of the delivered files and we can support integration there."
        }
      ]
    },
    consultation: {
      heading: "Request information or start your project.",
      body:
        "Tell us about your restaurant, your menu, and what you want to launch. We’ll reply with details, pricing, and next steps."
    }
  },
  es: {
    hero: {
      eyebrow: "Menús visuales para restaurantes",
      headline: "Haz que tus comensales vean lo que están a punto de pedir.",
      subheadline:
        "Menús visuales interactivos para restaurantes que quieren pedidos más rápidos y seguros, especialmente con clientes internacionales."
    },
    whyItMatters: {
      eyebrow: "Por Qué Importa",
      heading: "Qué cambia cuando el cliente ve el plato",
      intro: [
        "Si el cliente no imagina el plato, la decisión se frena. La claridad visual reduce la duda y sostiene la percepción premium, sobre todo en clientes internacionales."
      ],
      impacts: [
        {
          title: "Eleva la percepción premium",
          body: "La presentación comunica calidad antes del primer bocado."
        },
        {
          title: "Diferencia frente a la competencia",
          body: "La mayoría aún usa menús estáticos; la interacción inmersiva destaca de inmediato."
        },
        {
          title: "Acelera decisiones seguras",
          body: "Los visuales del plato, alérgenos y contexto dietario reducen la duda y facilitan elegir."
        }
      ]
    },
    experience: {
      eyebrow: "La Experiencia",
      heading: "El futuro de los menús es visual.",
      body: "Mira cómo el mismo plato se vuelve más claro, más atractivo y más deseable.",
      defaultSampleId: DEFAULT_EXPERIENCE_SAMPLE_ID,
      steps: [
        {
          title: "MENÚ DE TEXTO",
          body: "Los comensales adivinan qué van a recibir."
        },
        {
          title: "MENÚ CON FOTO",
          body: "Los comensales se hacen una idea más clara del plato."
        },
        {
          title: "MENÚ INMERSIVO",
          body: "Los comensales ven el plato, lo entienden y quieren pedirlo."
        }
      ],
      samples: {
        sushi: {
          ...LANDING_DISH_MEDIA.sushi,
          name: "Sushi estilo mexicano",
          shortDescription: "Roll crujiente con cobertura de ajonjolí, salsas y sabores intensos de fusión.",
          longDescription:
            "El sushi estilo mexicano es una reinterpretación contemporánea del sushi japonés, popular en muchas ciudades de México y América Latina. Suele incorporar ingredientes crujientes, aderezos cremosos, salsas dulces o picantes y, con frecuencia, un sabor más intenso que el sushi tradicional. Esta versión refleja una cocina de fusión que combina técnica japonesa con preferencias locales.",
          badges: [{ key: "spice-1", label: "Picante", tone: "spice", spiceLevel: 1 }],
          allergensText: "Gluten, Huevo, Soya, Pescado, Ajonjolí",
          price: 14,
          currency: "EUR",
          alt: "Presentación de sushi estilo mexicano"
        }
      }
    },
    demos: {
      eyebrow: "Demos en Vivo",
      heading: "Abre la experiencia en vivo.",
      body: "Explora demos reales y mira cómo se siente el menú."
    },
    howItWorks: {
      eyebrow: "Cómo Funciona",
      heading: "Dos formas de capturar. Un mismo flujo de producción.",
      body: "Nos encargamos de la producción. Tu equipo sigue enfocado en el servicio.",
      pathATitle: "Captura en sitio",
      pathASubtitle: "Ideal para soporte completo de producción",
      pathAIntroSteps: ["Visitamos tu ubicación.", "Capturamos tus platos de forma profesional."],
      pathBTitle: "Captura remota",
      pathBSubtitle: "Ideal para un lanzamiento más rápido",
      pathBIntroSteps: ["Tú grabas un clip guiado y corto por ítem."],
      sharedTitle: "De producción a lanzamiento",
      sharedSteps: [
        "Procesamos los activos.",
        "Construimos el sitio de menú interactivo.",
        "Lo publicamos con hosting o te ayudamos a integrarlo en tu web."
      ],
      sharedNote: "En ambos casos mantienes la propiedad total de los archivos entregados."
    },
    collaboration: {
      eyebrow: "Precios del proyecto",
      heading: "Precios claros para un proyecto de menú interactivo adaptado a tu restaurante.",
      intro: [
        "Es una web interactiva adaptada a tu restaurante: capturamos los platos, configuramos la experiencia con tu marca y tu menú, la publicamos y cubrimos un año de actualizaciones."
      ],
      standardPricing: {
        title: "Precios del proyecto",
        items: [
          {
            label: "Configuración base",
            price: "€500",
            body: "Configuración del sitio, hosting, estructura del menú, sistema visual y preparación de publicación."
          },
          {
            label: "Digitalización por plato",
            price: "€100 por plato",
            body: "Captura o procesamiento del plato, optimización visual e integración en la web interactiva."
          },
          {
            label: "Inversión típica del proyecto",
            price: "€1,200 – €3,000",
            body: "La mayoría de proyectos completos para restaurantes cae en este rango.",
            emphasis: true
          }
        ],
        examplesTitle: "Presupuestos típicos del proyecto",
        examples: [
          { label: "10 platos", price: "€1,500" },
          { label: "15 platos", price: "€2,000" },
          { label: "25 platos", price: "€3,000" }
        ]
      },
      projectIncludes: {
        title: "Lo que recibes",
        deliveryTitle: "En el lanzamiento",
        deliveryItems: [
          "Sitio de menú interactivo con hosting incluido",
          "Soporte de menú multilenguaje",
          "Propiedad total de los archivos y soporte opcional para integrarlo en tu sitio web"
        ],
        updatesTitle: "Incluido durante 1 año",
        updatesItems: [
          "Cambios de precio y nombre",
          "Ajustes de texto y visuales",
          "Actualizaciones estacionales"
        ],
        note:
          "El servicio incluye hosting por defecto. Si ya tienes tu propia web, mantienes la propiedad total de los archivos entregados y podemos ayudarte a integrarlo allí."
      },
      newDishes: {
        title: "Amplía con nuevos platos",
        items: [
          { label: "Adición estándar", price: "€100 por plato nuevo" },
          { label: "Paquete estacional", price: "€400 por 5 platos" }
        ],
        body: "Ideal para platos de temporada o una nueva sección del menú."
      },
      launchOffer: {
        title: "Oferta de lanzamiento inicial",
        items: [
          "Sin tarifa de configuración de €500",
          "€70 por plato digitalizado",
          "1 año de hosting y actualizaciones del menú incluido"
        ],
        body: "Reservada para los primeros 5 proyectos de restaurante."
      },
      aftercareNote:
        "Tras el primer año, hosting, mantenimiento y actualizaciones continúan por €100/año."
    },
    faq: {
      eyebrow: "Preguntas Frecuentes",
      heading: "Preguntas clave, resueltas",
      items: [
        {
          q: "¿Los clientes necesitan descargar una app?",
          a: "No. Todo funciona directamente en el navegador, en móvil y desktop."
        },
        {
          q: "¿Podemos actualizar platos después?",
          a: "Sí. El primer año incluye ajustes de texto, precio y visuales. Los platos nuevos se cotizan aparte."
        },
        {
          q: "¿El servicio incluye hosting o recibimos los archivos?",
          a: "El servicio incluye hosting por defecto. Si ya tienes tu propia web, mantienes la propiedad total de los archivos entregados y podemos ayudarte a integrarlo allí."
        }
      ]
    },
    consultation: {
      heading: "Solicita información o empieza tu proyecto.",
      body:
        "Cuéntanos sobre tu restaurante, tu menú y lo que quieres lanzar. Te responderemos con detalles, precios y siguientes pasos."
    }
  },
  de: {
    hero: {
      eyebrow: "Visuelle Menüs für Restaurants",
      headline: "Lass Gäste sehen, was sie gleich bestellen.",
      subheadline:
        "Interaktive visuelle Menüs für Restaurants, die schnellere und sicherere Bestellungen wollen, besonders bei internationalen Gästen."
    },
    whyItMatters: {
      eyebrow: "Warum es wichtig ist",
      heading: "Was sich ändert, wenn Gäste das Gericht sehen",
      intro: [
        "Wenn Gäste sich das Gericht nicht vorstellen können, stockt die Entscheidung. Visuelle Klarheit reduziert Unsicherheit und stärkt die Premium-Wahrnehmung, besonders bei internationalen Gästen."
      ],
      impacts: [
        {
          title: "Stärkere Premium-Wahrnehmung",
          body: "Präsentation signalisiert Qualität schon vor dem ersten Bissen."
        },
        {
          title: "Klarer Wettbewerbsvorteil",
          body: "Viele Restaurants nutzen weiterhin statische Menüs; immersive Interaktion differenziert sofort."
        },
        {
          title: "Schnellere sichere Entscheidungen",
          body: "Gerichtsvisuals, Allergenhinweise und Ernährungskontext reduzieren Unsicherheit und erleichtern die Wahl."
        }
      ]
    },
    experience: {
      eyebrow: "Die Experience",
      heading: "Die Zukunft von Menüs ist visuell.",
      body: "Sieh, wie dasselbe Gericht klarer, eindrucksvoller und begehrenswerter wird.",
      defaultSampleId: DEFAULT_EXPERIENCE_SAMPLE_ID,
      steps: [
        {
          title: "TEXTMENÜ",
          body: "Gäste raten, was sie bekommen."
        },
        {
          title: "FOTOMENÜ",
          body: "Gäste bekommen eine klarere Vorstellung vom Gericht."
        },
        {
          title: "IMMERSIVES MENÜ",
          body: "Gäste sehen das Gericht, verstehen es und wollen es bestellen."
        }
      ],
      samples: {
        sushi: {
          ...LANDING_DISH_MEDIA.sushi,
          name: "Sushi auf mexikanische Art",
          shortDescription: "Knusprige Fusionsrolle mit Sesam, Saucen und kräftigen Aromen.",
          longDescription:
            "Mexikanisches Sushi ist eine moderne Neuinterpretation des japanischen Sushi und in vielen Städten Mexikos und Lateinamerikas beliebt. Häufig enthält es knusprige Elemente, cremige Dressings, süße oder scharfe Saucen und insgesamt kräftigere Aromen als klassisches Sushi. Diese Variante steht für eine Fusionsküche, die japanische Technik mit lokalen Vorlieben verbindet.",
          badges: [{ key: "spice-1", label: "Scharf", tone: "spice", spiceLevel: 1 }],
          allergensText: "Gluten, Ei, Soja, Fisch, Sesam",
          price: 14,
          currency: "EUR",
          alt: "Präsentation von Sushi auf mexikanische Art"
        }
      }
    },
    demos: {
      eyebrow: "Live-Demos",
      heading: "Öffne das Live-Erlebnis.",
      body: "Sieh reale Demos und prüfe, wie sich das Menü anfühlt."
    },
    howItWorks: {
      eyebrow: "So funktioniert es",
      heading: "Zwei Wege zur Erfassung. Ein gemeinsamer Produktionsablauf.",
      body: "Wir übernehmen die Produktion. Dein Team bleibt beim Service.",
      pathATitle: "Capture vor Ort",
      pathASubtitle: "Ideal für volle Produktionsbegleitung",
      pathAIntroSteps: ["Wir besuchen deine Location.", "Wir erfassen deine Gerichte professionell."],
      pathBTitle: "Remote Capture",
      pathBSubtitle: "Ideal für einen schnelleren Rollout",
      pathBIntroSteps: ["Du zeichnest pro Item einen kurzen geführten Clip auf."],
      sharedTitle: "Von Produktion bis Launch",
      sharedSteps: [
        "Wir verarbeiten die 3D-Assets.",
        "Wir bauen die interaktive Menü-Website.",
        "Wir hosten sie für dich oder unterstützen die Integration in deine bestehende Website."
      ],
      sharedNote: "In beiden Fällen behältst du das volle Eigentum an den gelieferten Dateien."
    },
    collaboration: {
      eyebrow: "Projektpreise",
      heading: "Klare Preise für ein interaktives Menüprojekt, abgestimmt auf dein Restaurant.",
      intro: [
        "Es ist eine interaktive Website, die auf dein Restaurant abgestimmt ist: Wir erfassen die Gerichte, richten das Erlebnis auf deine Marke und dein Menü aus, veröffentlichen es und decken ein Jahr an Updates ab."
      ],
      standardPricing: {
        title: "Projektpreise",
        items: [
          {
            label: "Basis-Setup",
            price: "€500",
            body: "Setup der Website, Hosting-Konfiguration, Menüstruktur, visuelles System und Veröffentlichungsvorbereitung."
          },
          {
            label: "Gerichtsdigitalisierung",
            price: "€100 pro Gericht",
            body: "Erfassung oder Verarbeitung des Gerichts, visuelle Optimierung und Integration in die interaktive Website."
          },
          {
            label: "Typische Projektinvestition",
            price: "€1,200 – €3,000",
            body: "Die meisten vollständigen Restaurantprojekte liegen in diesem Bereich.",
            emphasis: true
          }
        ],
        examplesTitle: "Typische Projektbudgets",
        examples: [
          { label: "10 Gerichte", price: "€1,500" },
          { label: "15 Gerichte", price: "€2,000" },
          { label: "25 Gerichte", price: "€3,000" }
        ]
      },
      projectIncludes: {
        title: "Was du bekommst",
        deliveryTitle: "Zum Launch",
        deliveryItems: [
          "Interaktive Menü-Website inklusive Hosting",
          "Mehrsprachige Menüunterstützung",
          "Volle Dateieigentümerschaft und optionale Integration in deine bestehende Website"
        ],
        updatesTitle: "1 Jahr inklusive",
        updatesItems: [
          "Preis- und Namensänderungen",
          "Text- und visuelle Anpassungen",
          "Saisonale Verfeinerungen"
        ],
        note:
          "Hosting ist standardmäßig inklusive. Wenn du bereits eine eigene Website hast, behältst du das volle Eigentum an den gelieferten Dateien und wir können die Integration dort unterstützen."
      },
      newDishes: {
        title: "Mit neuen Gerichten erweitern",
        items: [
          { label: "Standard-Ergänzung", price: "€100 pro neues Gericht" },
          { label: "Saisonales Bundle", price: "€400 für 5 Gerichte" }
        ],
        body: "Sinnvoll für saisonale Gerichte oder einen neuen Menübereich."
      },
      launchOffer: {
        title: "Frühes Launch-Angebot",
        items: [
          "Keine €500 Setup-Gebühr",
          "€70 pro digitalisiertem Gericht",
          "1 Jahr Hosting und Menüupdates inklusive"
        ],
        body: "Reserviert für die ersten 5 Restaurantprojekte."
      },
      aftercareNote:
        "Nach dem ersten Jahr laufen Hosting, Wartung und Menüupdates für €100/Jahr weiter."
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Die wichtigsten Fragen, beantwortet",
      items: [
        {
          q: "Müssen Gäste eine App herunterladen?",
          a: "Nein. Alles läuft direkt im Browser auf Mobile und Desktop."
        },
        {
          q: "Können wir Gerichte später aktualisieren?",
          a: "Ja. Im ersten Jahr sind Text-, Preis- und visuelle Anpassungen inklusive. Neue Gerichte werden separat berechnet."
        },
        {
          q: "Ist Hosting inklusive oder erhalten wir die Dateien?",
          a: "Hosting ist standardmäßig inklusive. Wenn du bereits eine eigene Website hast, behältst du das volle Eigentum an den gelieferten Dateien und wir können die Integration dort unterstützen."
        }
      ]
    },
    consultation: {
      heading: "Information anfragen oder Projekt starten.",
      body:
        "Erzähl uns von deinem Restaurant, deinem Menü und deinem geplanten Launch. Wir antworten mit Details, Preisen und den nächsten Schritten."
    }
  }
};

const UI_TEXT_BY_LOCALE = {
  en: {
    meta: {
      title: "Creativivid Studio | Visual Menus for Restaurants",
      description:
        "Creativivid Studio creates interactive visual menus that help guests understand dishes before ordering, especially in restaurants with international visitors."
    },
    skipLink: "Skip to content",
    brandAria: "Creativivid Studio home",
    nav: {
      aria: "Main navigation",
      experience: "Experience",
      demos: "Demos",
      pricing: "Pricing",
      consultation: "Contact",
      menuOpen: "Open menu",
      menuClose: "Close menu"
    },
    locale: {
      label: "Language"
    },
    hero: {
      ctaDemo: "Open Live Demo",
      ctaConsult: "Request Information",
      chipLanguages: "9 menu languages",
      chipDietary: "Dietary & allergen tags",
      chipScroll: "Drag or swipe to rotate",
      dragHint: "Drag to inspect"
    },
    menuTerms: {
      allergens: "Allergens"
    },
    media: {
      loadingAria: "Loading visual asset"
    },
    demos: {
      cardCta: "Open demo",
      previewFrameTitle: "Preview of {name}",
      emptyState: "No demos available yet. Publish exports to /demos/ first.",
      untitled: "Untitled demo"
    },
    collaboration: {
      applyCta: "Request Information"
    },
    form: {
      menuSituationLegend: "Tell us a little about your menu",
      menuSituationPaperPdf: "We currently use a paper or PDF menu",
      menuSituationWebsite: "We already have a website menu",
      menuSituationNew: "We want something completely new",
      contactStageTitle: "Contact Details",
      restaurantBrandLabel: "Restaurant / Brand *",
      contactNameLabel: "Contact Name *",
      contactEmailLabel: "Email *",
      optionalDetailsSummary: "Optional details (help us respond)",
      cityCountryLabel: "City / Country",
      projectScopeLabel: "What initial project scope fits best?",
      projectScopeUpTo10: "Up to 10 dishes",
      projectScope11to15: "11-15 dishes",
      projectScope16to25: "16-25 dishes",
      projectScopeNotSure: "Not sure yet - let's discuss",
      timelineLabel: "When are you hoping to launch or update your menu?",
      selectOneOption: "Select one...",
      timelineAsapOption: "As soon as possible",
      timelineSoonOption: "Within 1-2 months",
      timelineExploringOption: "Exploring for the future",
      messageLabel: "Anything you'd like us to know about your restaurant or project?",
      messagePlaceholder: "Tell us about your concept, menu goals, or context.",
      consentPrefix:
        "I consent to Creativivid Studio processing my information to respond to this inquiry and understand the ",
      privacyLinkText: "privacy policy",
      consentSuffix: ".",
      submitIdle: "Request Information",
      submitSending: "Sending...",
      reassuranceText: "No pressure. Ask for details, pricing, or next steps.",
      statusSending: "Sending your request...",
      statusRequired: "Please complete menu situation, restaurant/brand, contact name, and email.",
      statusInvalidEmail: "Please provide a valid email address.",
      statusNoConsent: "Please provide consent to continue.",
      statusCaptchaRequired: "Complete the security check to continue.",
      statusEndpoint:
        "Contact form is not connected yet. Replace FORM_ENDPOINT in app.js with your Formspree endpoint.",
      statusSuccess: "Thank you. Your request has been received.",
      statusError: "Request failed. Please try again shortly.",
      successHeadline: "Your request has been received.",
      successBody: "We’ll reply within 24 hours with details and next steps.",
      successDemoText: "While you wait, open a live demo.",
      successDemoCta: "Open Live Demo"
    },
    footer: {
      copyrightBody: "Creativivid Studio. All rights reserved.",
      privacyPolicy: "Privacy Policy"
    },
    backToTopAria: "Back to top",
    faq: {
      mergeNote: "Both paths merge here."
    }
  },
  es: {
    meta: {
      title: "Creativivid Studio | Menús visuales para restaurantes",
      description:
        "Creativivid Studio crea menús visuales interactivos que ayudan a los comensales a entender los platos antes de pedir, especialmente en restaurantes con visitantes internacionales."
    },
    skipLink: "Saltar al contenido",
    brandAria: "Inicio de Creativivid Studio",
    nav: {
      aria: "Navegación principal",
      experience: "Experiencia",
      demos: "Demos",
      pricing: "Precios",
      consultation: "Contacto",
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú"
    },
    locale: {
      label: "Idioma"
    },
    hero: {
      ctaDemo: "Abrir demo en vivo",
      ctaConsult: "Solicitar información",
      chipLanguages: "9 idiomas de menú",
      chipDietary: "Etiquetas dietarias y de alérgenos",
      chipScroll: "Arrastra o desliza para rotar",
      dragHint: "Arrastra para inspeccionar"
    },
    menuTerms: {
      allergens: "Alérgenos"
    },
    media: {
      loadingAria: "Cargando recurso visual"
    },
    demos: {
      cardCta: "Abrir demo",
      previewFrameTitle: "Vista previa de {name}",
      emptyState: "Aun no hay demos disponibles. Publica exportaciones en /demos/ primero.",
      untitled: "Demo sin titulo"
    },
    collaboration: {
      applyCta: "Solicitar información"
    },
    form: {
      menuSituationLegend: "Cuéntanos un poco sobre tu menú",
      menuSituationPaperPdf: "Actualmente usamos un menú en papel o PDF",
      menuSituationWebsite: "Ya tenemos un menú en nuestra web",
      menuSituationNew: "Queremos algo completamente nuevo",
      contactStageTitle: "Datos de contacto",
      restaurantBrandLabel: "Restaurante / Marca *",
      contactNameLabel: "Nombre de contacto *",
      contactEmailLabel: "Correo electrónico *",
      optionalDetailsSummary: "Detalles opcionales (nos ayudan a responder)",
      cityCountryLabel: "Ciudad / País",
      projectScopeLabel: "¿Qué alcance inicial del proyecto encaja mejor?",
      projectScopeUpTo10: "Hasta 10 platos",
      projectScope11to15: "11-15 platos",
      projectScope16to25: "16-25 platos",
      projectScopeNotSure: "Aún no estoy seguro - mejor lo conversamos",
      timelineLabel: "¿Cuándo esperas lanzar o actualizar tu menú?",
      selectOneOption: "Selecciona una opción...",
      timelineAsapOption: "Lo antes posible",
      timelineSoonOption: "Dentro de 1-2 meses",
      timelineExploringOption: "Explorando para más adelante",
      messageLabel: "¿Hay algo que quieras contarnos sobre tu restaurante o proyecto?",
      messagePlaceholder: "Cuéntanos sobre tu concepto, objetivos del menú o contexto.",
      consentPrefix:
        "Acepto que Creativivid Studio procese mi información para responder esta consulta y entiendo la ",
      privacyLinkText: "política de privacidad",
      consentSuffix: ".",
      submitIdle: "Solicitar información",
      submitSending: "Enviando...",
      reassuranceText: "Sin presión. Puedes pedir detalles, precios o siguientes pasos.",
      statusSending: "Enviando tu solicitud...",
      statusRequired: "Completa situación del menú, restaurante/marca, nombre de contacto y correo electrónico.",
      statusInvalidEmail: "Ingresa un correo electrónico válido.",
      statusNoConsent: "Debes otorgar consentimiento para continuar.",
      statusCaptchaRequired: "Completa la verificación de seguridad para continuar.",
      statusEndpoint:
        "El formulario de contacto aún no está conectado. Reemplaza FORM_ENDPOINT en app.js con tu endpoint de Formspree.",
      statusSuccess: "Gracias. Tu solicitud fue recibida.",
      statusError: "La solicitud falló. Inténtalo de nuevo en breve.",
      successHeadline: "Tu solicitud ha sido recibida.",
      successBody: "Responderemos dentro de 24 horas con detalles y siguientes pasos.",
      successDemoText: "Mientras esperas, abre una demo en vivo.",
      successDemoCta: "Abrir demo en vivo"
    },
    footer: {
      copyrightBody: "Creativivid Studio. Todos los derechos reservados.",
      privacyPolicy: "Política de privacidad"
    },
    backToTopAria: "Volver arriba",
    faq: {
      mergeNote: "Ambas rutas se unen aquí."
    }
  },
  de: {
    meta: {
      title: "Creativivid Studio | Visuelle Menüs für Restaurants",
      description:
        "Creativivid Studio entwickelt interaktive visuelle Menüs, die Gästen helfen, Gerichte vor der Bestellung besser zu verstehen, besonders in Restaurants mit internationalen Gästen."
    },
    skipLink: "Zum Inhalt springen",
    brandAria: "Startseite Creativivid Studio",
    nav: {
      aria: "Hauptnavigation",
      experience: "Experience",
      demos: "Demos",
      pricing: "Preise",
      consultation: "Kontakt",
      menuOpen: "Menü öffnen",
      menuClose: "Menü schließen"
    },
    locale: {
      label: "Sprache"
    },
    hero: {
      ctaDemo: "Live-Demo öffnen",
      ctaConsult: "Information anfragen",
      chipLanguages: "9 Menüsprachen",
      chipDietary: "Ernährungs- und Allergenhinweise",
      chipScroll: "Ziehen oder wischen zum Drehen",
      dragHint: "Zum Erkunden ziehen"
    },
    menuTerms: {
      allergens: "Allergene"
    },
    media: {
      loadingAria: "Visuelles Asset wird geladen"
    },
    demos: {
      cardCta: "Demo öffnen",
      previewFrameTitle: "Vorschau von {name}",
      emptyState: "Noch keine Demos verfügbar. Veröffentliche zuerst Exporte nach /demos/.",
      untitled: "Demo ohne Titel"
    },
    collaboration: {
      applyCta: "Information anfragen"
    },
    form: {
      menuSituationLegend: "Erzähl uns kurz etwas über dein Menü",
      menuSituationPaperPdf: "Wir nutzen aktuell ein Papier- oder PDF-Menü",
      menuSituationWebsite: "Wir haben bereits ein Menü auf unserer Website",
      menuSituationNew: "Wir möchten etwas komplett Neues",
      contactStageTitle: "Kontaktdaten",
      restaurantBrandLabel: "Restaurant / Marke *",
      contactNameLabel: "Ansprechperson *",
      contactEmailLabel: "E-Mail *",
      optionalDetailsSummary: "Optionale Details (helfen uns bei der Antwort)",
      cityCountryLabel: "Stadt / Land",
      projectScopeLabel: "Welcher anfängliche Projektumfang passt am besten?",
      projectScopeUpTo10: "Bis zu 10 Gerichte",
      projectScope11to15: "11-15 Gerichte",
      projectScope16to25: "16-25 Gerichte",
      projectScopeNotSure: "Noch nicht sicher - lasst uns sprechen",
      timelineLabel: "Wann möchtet ihr euer Menü launchen oder aktualisieren?",
      selectOneOption: "Bitte auswählen...",
      timelineAsapOption: "So schnell wie möglich",
      timelineSoonOption: "Innerhalb von 1-2 Monaten",
      timelineExploringOption: "Erst einmal für später orientieren",
      messageLabel: "Gibt es etwas, das wir über euer Restaurant oder Projekt wissen sollten?",
      messagePlaceholder: "Beschreibe kurz Konzept, Menüziele oder Kontext.",
      consentPrefix:
        "Ich stimme zu, dass Creativivid Studio meine Daten zur Beantwortung dieser Anfrage verarbeitet und die ",
      privacyLinkText: "Datenschutzerklärung",
      consentSuffix: " verstehe.",
      submitIdle: "Information anfragen",
      submitSending: "Wird gesendet...",
      reassuranceText: "Ohne Druck. Frag nach Details, Preisen oder den nächsten Schritten.",
      statusSending: "Deine Anfrage wird gesendet...",
      statusRequired: "Bitte Menüsituation, Restaurant/Marke, Ansprechperson und E-Mail ausfüllen.",
      statusInvalidEmail: "Bitte eine gültige E-Mail-Adresse eingeben.",
      statusNoConsent: "Bitte Zustimmung erteilen, um fortzufahren.",
      statusCaptchaRequired: "Bitte schließe die Sicherheitsprüfung ab, um fortzufahren.",
      statusEndpoint:
        "Das Kontaktformular ist noch nicht verbunden. Ersetze FORM_ENDPOINT in app.js durch deinen Formspree-Endpoint.",
      statusSuccess: "Danke. Deine Anfrage ist eingegangen.",
      statusError: "Anfrage fehlgeschlagen. Bitte versuche es in Kürze erneut.",
      successHeadline: "Deine Anfrage ist eingegangen.",
      successBody: "Wir antworten innerhalb von 24 Stunden mit Details und den nächsten Schritten.",
      successDemoText: "Während du wartest, öffne eine Live-Demo.",
      successDemoCta: "Live-Demo öffnen"
    },
    footer: {
      copyrightBody: "Creativivid Studio. Alle Rechte vorbehalten.",
      privacyPolicy: "Datenschutz"
    },
    backToTopAria: "Nach oben",
    faq: {
      mergeNote: "Beide Wege führen hier zusammen."
    }
  }
};

const DEFAULT_MANIFEST = {
  schemaVersion: 1,
  basePath: "/demos",
  total: 0,
  demos: []
};

const urlParams = new URLSearchParams(window.location.search);
const manifestUrl = urlParams.get("manifest") ?? "/demos/demos-manifest.json";

const waitForTurnstile = () =>
  new Promise((resolve) => {
    if (window.turnstile) {
      resolve(window.turnstile);
      return;
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (window.turnstile) {
        window.clearInterval(timer);
        resolve(window.turnstile);
        return;
      }

      if (attempts >= 50) {
        window.clearInterval(timer);
        resolve(null);
      }
    }, 150);
  });

const detectCaptchaError = async (response) => {
  try {
    const data = await response.json();
    if (!Array.isArray(data?.errors)) return false;
    return data.errors.some((entry) => {
      const value = `${entry?.code ?? ""} ${entry?.message ?? ""}`.toLowerCase();
      return value.includes("turnstile") || value.includes("captcha") || value.includes("challenge");
    });
  } catch {
    return false;
  }
};

const createTurnstileController = ({ container, setStatus, getCaptchaMessage }) => {
  let widgetId = null;

  const ensureRendered = async () => {
    if (!container || widgetId !== null) return widgetId;
    const turnstile = await waitForTurnstile();
    if (!turnstile) return null;

    widgetId = turnstile.render(container, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "light",
      callback: () => {
        if (container.dataset.errorState !== "true") return;
        container.dataset.errorState = "false";
        setStatus("");
      },
      "expired-callback": () => {
        container.dataset.errorState = "true";
        setStatus(getCaptchaMessage(), "error");
        turnstile.reset(widgetId);
      },
      "timeout-callback": () => {
        container.dataset.errorState = "true";
        setStatus(getCaptchaMessage(), "error");
        turnstile.reset(widgetId);
      },
      "error-callback": () => {
        container.dataset.errorState = "true";
        setStatus(getCaptchaMessage(), "error");
      }
    });

    return widgetId;
  };

  const getToken = () => {
    if (widgetId === null || !window.turnstile) return "";
    return window.turnstile.getResponse(widgetId) || "";
  };

  const reset = () => {
    if (widgetId === null || !window.turnstile) return;
    container.dataset.errorState = "false";
    window.turnstile.reset(widgetId);
  };

  return { ensureRendered, getToken, reset };
};

let currentLocale = DEFAULT_LOCALE;
let manifestEntries = [];
const demoPreviewImageCache = new Map();
let demoPreviewObserver = null;
const assetStateByKey = new Map(
  Object.keys(LANDING_MEDIA_ASSETS).map((key) => [key, "idle"])
);
const assetStateSubscribersByKey = new Map(
  Object.keys(LANDING_MEDIA_ASSETS).map((key) => [key, new Set()])
);
const assetImageCacheByKey = new Map();
const assetPromiseByKey = new Map();
let heroGifCarouselDispose = null;
let experienceMediaDisposers = [];
let mobileHeaderController = null;

const htmlEscape = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const formatTemplate = (template, values = {}) =>
  String(template ?? "").replace(/\{([a-zA-Z0-9_]+)\}/g, (_, key) => String(values[key] ?? ""));

const formatPrice = (amount, currency = "EUR") => {
  const numericAmount = Number(amount);
  const normalizedAmount = Number.isFinite(numericAmount) ? numericAmount : 0;
  const fractionDigits = Number.isInteger(normalizedAmount) ? 0 : 1;
  return new Intl.NumberFormat(currentLocale, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(normalizedAmount);
};

const getByPath = (source, path) => {
  const parts = String(path ?? "").split(".").filter(Boolean);
  let current = source;
  for (const part of parts) {
    if (!current || typeof current !== "object") return "";
    current = current[part];
  }
  return typeof current === "string" ? current : "";
};

const getLandingMediaAssetKeyBySrc = (src) => LANDING_MEDIA_ASSET_KEYS_BY_SRC.get(src) ?? "";

const setAssetState = (assetKey, state) => {
  assetStateByKey.set(assetKey, state);
  const subscribers = assetStateSubscribersByKey.get(assetKey);
  if (!subscribers) return;
  subscribers.forEach((callback) => {
    try {
      callback(state);
    } catch {}
  });
};

const subscribeToAssetState = (assetKey, callback) => {
  if (!(callback instanceof Function)) return () => {};
  if (!assetStateSubscribersByKey.has(assetKey)) {
    assetStateSubscribersByKey.set(assetKey, new Set());
  }
  const subscribers = assetStateSubscribersByKey.get(assetKey);
  subscribers.add(callback);
  callback(assetStateByKey.get(assetKey) ?? "idle");
  return () => subscribers.delete(callback);
};

const loadLandingAssetImage = async (assetKey) => {
  if (!(assetKey in LANDING_MEDIA_ASSETS)) {
    throw new Error(`Unknown asset key: ${assetKey}`);
  }

  if (assetImageCacheByKey.has(assetKey)) {
    setAssetState(assetKey, "loaded");
    return assetImageCacheByKey.get(assetKey);
  }

  const pending = assetPromiseByKey.get(assetKey);
  if (pending) return pending;

  setAssetState(assetKey, "loading");
  const task = new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      assetImageCacheByKey.set(assetKey, image);
      setAssetState(assetKey, "loaded");
      resolve(image);
    };
    image.onerror = () => {
      setAssetState(assetKey, "error");
      reject(new Error(`Failed to load asset: ${assetKey}`));
    };
    image.src = LANDING_MEDIA_ASSETS[assetKey];
  });

  const wrappedTask = task.finally(() => {
    assetPromiseByKey.delete(assetKey);
  });

  assetPromiseByKey.set(assetKey, wrappedTask);
  return wrappedTask;
};

const setMediaStageState = (stage, state) => {
  if (!stage) return;
  stage.classList.toggle("is-loading-media", state === "loading");
  stage.classList.toggle("is-media-ready", state === "ready");
  stage.classList.toggle("is-media-error", state === "error");
};

const preloadHeroGifSlide = (slide) =>
  new Promise((resolve) => {
    if (!(slide instanceof HTMLImageElement)) {
      resolve(false);
      return;
    }

    if (slide.complete) {
      resolve(slide.naturalWidth > 0);
      return;
    }

    const finish = (loaded) => {
      slide.removeEventListener("load", handleLoad);
      slide.removeEventListener("error", handleError);
      resolve(loaded);
    };

    const handleLoad = () => finish(true);
    const handleError = () => finish(false);

    slide.addEventListener("load", handleLoad, { once: true });
    slide.addEventListener("error", handleError, { once: true });
  });

const resolveInteractiveOrbitFrame = (rect) => {
  const left = Number(rect?.left) || 0;
  const top = Number(rect?.top) || 0;
  const width = Math.max(0, Number(rect?.width) || 0);
  const height = Math.max(0, Number(rect?.height) || 0);
  const rx = width / 2;
  const ry = height / 2;

  return {
    left,
    top,
    width,
    height,
    cx: left + rx,
    cy: top + ry,
    rx,
    ry,
    arcRadiusPx: (rx + ry) / 2,
    deadZoneRadiusPx: Math.min(width, height) * 0.14
  };
};

const readInteractiveOrbitSample = (clientX, clientY, frame) => {
  if (
    frame.width <= 0 ||
    frame.height <= 0 ||
    clientX < frame.left ||
    clientX > frame.left + frame.width ||
    clientY < frame.top ||
    clientY > frame.top + frame.height
  ) {
    return { kind: "outside-host" };
  }

  const dx = clientX - frame.cx;
  const dy = clientY - frame.cy;
  const distancePx = Math.hypot(dx, dy);
  if (distancePx <= frame.deadZoneRadiusPx) {
    return { kind: "dead-zone" };
  }

  const normalizedDx = frame.rx > 0 ? dx / frame.rx : 0;
  const normalizedDy = frame.ry > 0 ? dy / frame.ry : 0;

  return {
    kind: "sample",
    angleRad: Math.atan2(normalizedDy, normalizedDx)
  };
};

const unwrapInteractiveAngleDelta = (previousAngleRad, nextAngleRad) => {
  let delta = nextAngleRad - previousAngleRad;
  while (delta <= -Math.PI) delta += Math.PI * 2;
  while (delta > Math.PI) delta -= Math.PI * 2;
  return delta;
};

const resolveInteractiveVirtualDeltaPx = (previousAngleRad, nextAngleRad, frame) =>
  -unwrapInteractiveAngleDelta(previousAngleRad, nextAngleRad) * frame.arcRadiusPx;

const resolveInteractiveOrbitPixelsPerFrame = (frame, frameCount) =>
  Math.max(1, Number(Math.max(1, (Math.PI * (frame.rx + frame.ry)) / Math.max(2, frameCount)).toFixed(2)));

const attachInteractiveOrbitDrag = ({ host, target, frameCount, onDelta, onDismiss }) => {
  let pointerId = null;
  let lastAngleRad = null;

  const dismissGuidance = () => {
    onDismiss?.();
  };

  const onPointerDown = (event) => {
    pointerId = event.pointerId;
    lastAngleRad = null;
    host.classList.add("is-dragging-interactive");
    dismissGuidance();
    try {
      target.setPointerCapture(pointerId);
    } catch {}
    target.classList.add("is-dragging");
    event.preventDefault();
  };

  const onPointerMove = (event) => {
    if (pointerId !== event.pointerId) return;
    dismissGuidance();
    const frame = resolveInteractiveOrbitFrame(host.getBoundingClientRect());
    const sample = readInteractiveOrbitSample(event.clientX, event.clientY, frame);
    if (sample.kind !== "sample") {
      lastAngleRad = null;
      event.preventDefault();
      return;
    }
    if (lastAngleRad === null) {
      lastAngleRad = sample.angleRad;
      event.preventDefault();
      return;
    }
    const deltaPx = resolveInteractiveVirtualDeltaPx(lastAngleRad, sample.angleRad, frame);
    lastAngleRad = sample.angleRad;
    const pixelsPerFrame = resolveInteractiveOrbitPixelsPerFrame(frame, frameCount);
    onDelta((deltaPx / pixelsPerFrame) * -1);
    event.preventDefault();
  };

  const onPointerRelease = (event) => {
    if (pointerId === null || pointerId !== event.pointerId) return;
    try {
      target.releasePointerCapture(pointerId);
    } catch {}
    pointerId = null;
    lastAngleRad = null;
    target.classList.remove("is-dragging");
    host.classList.remove("is-dragging-interactive");
    dismissGuidance();
  };

  const onClick = () => {
    dismissGuidance();
  };

  const onTouchStart = () => {
    dismissGuidance();
  };

  const onTouchMove = () => {
    dismissGuidance();
  };

  target.addEventListener("pointerdown", onPointerDown);
  target.addEventListener("pointermove", onPointerMove);
  target.addEventListener("pointerup", onPointerRelease);
  target.addEventListener("pointercancel", onPointerRelease);
  target.addEventListener("click", onClick);
  target.addEventListener("touchstart", onTouchStart, { passive: true });
  target.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("pointerup", onPointerRelease);
  window.addEventListener("pointercancel", onPointerRelease);
  target.addEventListener("contextmenu", (event) => event.preventDefault());
  target.addEventListener("dragstart", (event) => event.preventDefault());

  return () => {
    target.removeEventListener("pointerdown", onPointerDown);
    target.removeEventListener("pointermove", onPointerMove);
    target.removeEventListener("pointerup", onPointerRelease);
    target.removeEventListener("pointercancel", onPointerRelease);
    target.removeEventListener("click", onClick);
    target.removeEventListener("touchstart", onTouchStart);
    target.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("pointerup", onPointerRelease);
    window.removeEventListener("pointercancel", onPointerRelease);
    target.classList.remove("is-dragging");
    host.classList.remove("is-dragging-interactive");
  };
};

const normalizeLocale = (value) => {
  if (!value) return null;
  const normalized = String(value).trim().toLowerCase();
  if (!normalized) return null;
  const primary = normalized.replace("_", "-").split("-")[0];
  return SUPPORTED_LOCALES.includes(primary) ? primary : null;
};

const safeLocalStorageGet = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeLocalStorageSet = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore storage failures in privacy mode
  }
};

const resolveLocaleFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return normalizeLocale(params.get("lang"));
};

const resolveLocaleFromStorage = () => normalizeLocale(safeLocalStorageGet(LOCALE_STORAGE_KEY));

const resolveLocaleFromNavigator = () => {
  const candidates = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language];
  for (const candidate of candidates) {
    const normalized = normalizeLocale(candidate);
    if (normalized) return normalized;
  }
  return null;
};

const resolveInitialLocale = () =>
  resolveLocaleFromUrl() ?? resolveLocaleFromStorage() ?? resolveLocaleFromNavigator() ?? DEFAULT_LOCALE;

const getUiText = () => UI_TEXT_BY_LOCALE[currentLocale] ?? UI_TEXT_BY_LOCALE[DEFAULT_LOCALE];

const getLandingContent = () =>
  LANDING_CONTENT_BY_LOCALE[currentLocale] ?? LANDING_CONTENT_BY_LOCALE[DEFAULT_LOCALE];

const isMobileHeaderViewport = () => window.matchMedia?.(COMPACT_HEADER_MEDIA_QUERY)?.matches ?? false;

const getMinimumHeaderOffset = () => (isMobileHeaderViewport() ? 56 : 64);

const applyDocumentLocale = () => {
  const ui = getUiText();
  document.documentElement.lang = currentLocale;
  document.title = ui.meta.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", ui.meta.description);
};

const syncLocaleSelects = () => {
  document.querySelectorAll("[data-locale-select]").forEach((select) => {
    if (select instanceof HTMLSelectElement) {
      select.value = currentLocale;
    }
  });
};

const updateUrlLang = (nextLocale) => {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", nextLocale);
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(null, "", next);
};

const syncPrivacyLinks = () => {
  const path = `/privacy.html?lang=${encodeURIComponent(currentLocale)}`;
  document.querySelectorAll("[data-privacy-link]").forEach((node) => {
    if (node instanceof HTMLAnchorElement) {
      node.href = path;
    }
  });
};

const applyStaticTranslations = () => {
  const ui = getUiText();

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    const value = getByPath(ui, key);
    if (value) node.textContent = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    const value = getByPath(ui, key);
    if (!value) return;
    if ("placeholder" in node) node.placeholder = value;
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    const key = node.getAttribute("data-i18n-aria-label");
    const value = getByPath(ui, key);
    if (value) node.setAttribute("aria-label", value);
  });

  syncPrivacyLinks();
};

const setLocale = (nextLocale, options = {}) => {
  const { persist = true, updateUrl = false, rerender = true } = options;
  const normalized = normalizeLocale(nextLocale) ?? DEFAULT_LOCALE;
  currentLocale = normalized;

  if (persist) safeLocalStorageSet(LOCALE_STORAGE_KEY, currentLocale);
  if (updateUrl) updateUrlLang(currentLocale);

  syncLocaleSelects();
  applyDocumentLocale();
  applyStaticTranslations();
  mobileHeaderController?.syncLabels();

  if (!rerender) return;

  hydrateLanding();
  hydrateFooterYear();
  renderPublishedDemos();
};

const setupLocaleSwitchers = () => {
  document.querySelectorAll("[data-locale-select]").forEach((node) => {
    if (!(node instanceof HTMLSelectElement)) return;
    if (node.dataset.localeBound === "true") return;

    node.dataset.localeBound = "true";
    node.addEventListener("change", () => {
      const nextLocale = normalizeLocale(node.value) ?? DEFAULT_LOCALE;
      setLocale(nextLocale, { persist: true, updateUrl: true, rerender: true });
    });
  });
};

const syncHeaderOffset = () => {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const headerHeight = Math.ceil(header.getBoundingClientRect().height);
  const offset = Math.max(getMinimumHeaderOffset(), headerHeight + 2);
  document.documentElement.style.setProperty("--header-offset", `${offset}px`);
};

const SECTION_SCROLL_ALIGNMENT_TOLERANCE = 4;
let sectionScrollCorrectionToken = 0;

const resolveHeaderOffsetHeight = (headerOffsetOverride = null) => {
  if (typeof headerOffsetOverride === "number") return headerOffsetOverride;
  const header = document.querySelector(".site-header");
  return header ? Math.ceil(header.getBoundingClientRect().height) : 0;
};

const resolveSectionScrollTop = (target, headerOffsetOverride = null, targetTopAdjustment = 0) => {
  const headerHeight = resolveHeaderOffsetHeight(headerOffsetOverride);
  const targetTop = window.scrollY + target.getBoundingClientRect().top + targetTopAdjustment;
  return Math.max(0, targetTop - headerHeight - 2);
};

const alignSectionAfterScroll = (hash, headerOffsetOverride = null) => {
  const target = document.querySelector(hash);
  if (!target) return true;

  const headerHeight = resolveHeaderOffsetHeight(headerOffsetOverride);
  const delta = target.getBoundingClientRect().top - headerHeight - 2;
  if (Math.abs(delta) <= SECTION_SCROLL_ALIGNMENT_TOLERANCE) return true;

  window.scrollTo(0, Math.max(0, window.scrollY + delta));
  return false;
};

const scheduleSectionScrollCorrection = (hash, behavior = "smooth", headerOffsetOverride = null) => {
  sectionScrollCorrectionToken += 1;
  const token = sectionScrollCorrectionToken;
  const correctionDelays = behavior === "instant" ? [0, 180, 420] : [180, 420, 720];

  correctionDelays.forEach((delay, index, delays) => {
    window.setTimeout(() => {
      if (token !== sectionScrollCorrectionToken) return;
      const isAligned = alignSectionAfterScroll(hash, headerOffsetOverride);
      if (isAligned || index === delays.length - 1) {
        if (token === sectionScrollCorrectionToken) {
          sectionScrollCorrectionToken += 1;
        }
      }
    }, delay);
  });
};

const scrollToSectionWithOffset = (hash, behavior = "smooth", headerOffsetOverride = null, targetTopAdjustment = 0) => {
  if (!hash || !hash.startsWith("#")) return;
  const target = document.querySelector(hash);
  if (!target) return;

  const scrollTop = resolveSectionScrollTop(target, headerOffsetOverride, targetTopAdjustment);

  if (behavior === "instant") {
    window.scrollTo(0, scrollTop);
  } else {
    window.scrollTo({ top: scrollTop, behavior });
  }
  scheduleSectionScrollCorrection(hash, behavior, headerOffsetOverride);

  if (history.replaceState) {
    history.replaceState(null, "", hash);
  } else {
    window.location.hash = hash;
  }
};

const setupMobileHeader = () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector("[data-mobile-nav-toggle]");
  const sheet = document.querySelector("[data-mobile-nav-sheet]");
  if (!(header instanceof HTMLElement) || !(toggle instanceof HTMLButtonElement) || !(sheet instanceof HTMLElement)) {
    return null;
  }

  const mobileQuery = window.matchMedia(COMPACT_HEADER_MEDIA_QUERY);
  const focusableNodes = Array.from(sheet.querySelectorAll("a, button, select")).filter(
    (node) => node instanceof HTMLElement
  );
  const localeSelect = sheet.querySelector("[data-locale-select]");
  const labelNode = toggle.querySelector("[data-mobile-nav-toggle-label]");
  let isOpen = false;
  let lastScrollY = window.scrollY;
  let scrollTicking = false;
  let holdVisibleUntil = 0;

  const syncFocusableNodes = (enabled) => {
    sheet.setAttribute("aria-hidden", String(!enabled));
    focusableNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) return;

      if (enabled) {
        const originalTabIndex = node.dataset.mobileNavOriginalTabindex;
        if (originalTabIndex === "__none__") {
          node.removeAttribute("tabindex");
        } else if (typeof originalTabIndex === "string") {
          node.setAttribute("tabindex", originalTabIndex);
        }
        delete node.dataset.mobileNavOriginalTabindex;
        return;
      }

      if (!("mobileNavOriginalTabindex" in node.dataset)) {
        node.dataset.mobileNavOriginalTabindex = node.getAttribute("tabindex") ?? "__none__";
      }
      node.setAttribute("tabindex", "-1");
    });
  };

  const syncLabels = () => {
    const ui = getUiText();
    const label = isOpen ? ui.nav.menuClose : ui.nav.menuOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", label);
    if (labelNode) labelNode.textContent = label;
    header.classList.toggle("site-header--menu-open", isOpen);
    if (isOpen) header.classList.remove("site-header--hidden");
    syncFocusableNodes(isOpen && mobileQuery.matches);
  };

  const setMenuOpen = (nextOpen, options = {}) => {
    const { restoreFocus = false, syncOffset = true } = options;
    const resolvedOpen = Boolean(nextOpen && mobileQuery.matches);
    if (isOpen === resolvedOpen) {
      if (!isOpen) header.classList.remove("site-header--menu-open");
      if (syncOffset) window.requestAnimationFrame(syncHeaderOffset);
      return;
    }

    isOpen = resolvedOpen;
    syncLabels();
    if (syncOffset) window.requestAnimationFrame(syncHeaderOffset);
    if (!isOpen && restoreFocus) toggle.focus();
  };

  const applyScrollVisibility = () => {
    scrollTicking = false;
    const currentScrollY = window.scrollY;

    if (!mobileQuery.matches || isOpen) {
      header.classList.remove("site-header--hidden");
      lastScrollY = currentScrollY;
      return;
    }

    if (performance.now() < holdVisibleUntil) {
      header.classList.remove("site-header--hidden");
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY <= 8) {
      header.classList.remove("site-header--hidden");
    } else if (currentScrollY > lastScrollY + 10 && currentScrollY > 80) {
      header.classList.add("site-header--hidden");
    } else if (currentScrollY < lastScrollY - 10) {
      header.classList.remove("site-header--hidden");
    }

    lastScrollY = currentScrollY;
  };

  const handleScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(applyScrollVisibility);
  };

  const handleViewportChange = () => {
    if (!mobileQuery.matches) {
      setMenuOpen(false, { syncOffset: false });
      header.classList.remove("site-header--hidden");
    } else {
      syncLabels();
    }
    holdVisibleUntil = 0;
    lastScrollY = window.scrollY;
    syncHeaderOffset();
  };

  toggle.addEventListener("click", () => {
    setMenuOpen(!isOpen);
  });

  if (localeSelect instanceof HTMLSelectElement) {
    localeSelect.addEventListener("change", () => {
      window.requestAnimationFrame(() => setMenuOpen(false));
    });
  }

  document.addEventListener("click", (event) => {
    if (!isOpen || !(event.target instanceof Node)) return;
    if (header.contains(event.target)) return;
    setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !isOpen) return;
    event.preventDefault();
    setMenuOpen(false, { restoreFocus: true });
  });

  window.addEventListener("scroll", handleScroll, { passive: true });
  sheet.addEventListener("transitionend", (event) => {
    if (event.target === sheet && event.propertyName === "max-height") {
      syncHeaderOffset();
    }
  });

  if ("addEventListener" in mobileQuery) {
    mobileQuery.addEventListener("change", handleViewportChange);
  } else if ("addListener" in mobileQuery) {
    mobileQuery.addListener(handleViewportChange);
  }

  syncLabels();
  syncHeaderOffset();

  return {
    isMenuOpen: () => isOpen,
    closeMenu: (options = {}) => setMenuOpen(false, options),
    holdVisible: (durationMs = 900) => {
      holdVisibleUntil = performance.now() + durationMs;
      header.classList.remove("site-header--hidden");
    },
    syncLabels
  };
};

const setupInPageAnchors = () => {
  const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]')).filter((link) => {
    const href = link.getAttribute("href");
    return typeof href === "string" && href.trim().length > 1;
  });
  if (!anchorLinks.length) return;
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const defaultBehavior = prefersReducedMotion ? "instant" : "smooth";

  anchorLinks.forEach((link) => {
    if (link.dataset.inPageAnchorBound === "true") return;
    link.dataset.inPageAnchorBound = "true";
    link.addEventListener("click", (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      if (!document.querySelector(hash)) return;

      const behavior = link.classList.contains("skip-link") ? "instant" : defaultBehavior;
      event.preventDefault();
      const shouldUseCollapsedOffset = mobileHeaderController?.isMenuOpen?.() ?? false;
      mobileHeaderController?.holdVisible?.();
      if (shouldUseCollapsedOffset) {
        const header = document.querySelector(".site-header");
        const expandedHeaderHeight = header ? Math.ceil(header.getBoundingClientRect().height) : getMinimumHeaderOffset();
        const collapsedOffset = getMinimumHeaderOffset();
        const targetTopAdjustment = -Math.max(0, expandedHeaderHeight - collapsedOffset);
        mobileHeaderController.closeMenu({ syncOffset: false });
        scrollToSectionWithOffset(hash, behavior, collapsedOffset, targetTopAdjustment);
        window.requestAnimationFrame(syncHeaderOffset);
        return;
      }

      syncHeaderOffset();
      scrollToSectionWithOffset(hash, behavior);
    });
  });
};

const setupBackToTop = () => {
  const button = document.getElementById("back-to-top");
  if (!button) return;

  const threshold = 320;

  const syncState = () => {
    const isVisible = window.scrollY > threshold;
    button.classList.toggle("is-visible", isVisible);
    button.setAttribute("aria-hidden", String(!isVisible));
    button.tabIndex = isVisible ? 0 : -1;
  };

  button.addEventListener("click", () => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", syncState, { passive: true });
  syncState();
};

const hydrateContentText = () => {
  const content = getLandingContent();
  document.querySelectorAll("[data-content]").forEach((target) => {
    const key = target.getAttribute("data-content");
    target.textContent = getByPath(content, key);
  });
};

const renderWhyItMatters = () => {
  const content = getLandingContent();
  const target = document.getElementById("why-it-matters-content");
  if (!target) return;
  const section = content.whyItMatters;

  target.innerHTML = `
    <div class="why-it-matters-layout">
      <div class="why-it-matters-copy">
        <p class="eyebrow">${htmlEscape(section.eyebrow)}</p>
        <h2>${htmlEscape(section.heading)}</h2>
        ${section.intro.map((paragraph) => `<p>${htmlEscape(paragraph)}</p>`).join("")}
      </div>
      <ul class="why-impact-grid">
        ${section.impacts
          .map(
            (item) => `
              <li class="why-impact-card">
                <h3>${htmlEscape(item.title)}</h3>
                <p>${htmlEscape(item.body)}</p>
              </li>
            `
          )
          .join("")}
      </ul>
    </div>
  `;
};

const getExperienceContent = () => getLandingContent().experience ?? {};

const renderExperienceMenuEntry = (sample, descriptionText, modifierClass = "") => {
  if (!sample) return "";
  const modifier = modifierClass ? ` ${modifierClass}` : "";
  return `
    <div class="experience-menu-entry${modifier}">
      <div class="experience-menu-entry-head">
        <p class="experience-menu-entry-name">${htmlEscape(sample.name)}</p>
        <p class="experience-menu-entry-price">${htmlEscape(formatPrice(sample.price, sample.currency))}</p>
      </div>
      <p class="experience-menu-entry-description">${htmlEscape(descriptionText)}</p>
    </div>
  `;
};

const EXPERIENCE_STORY_PHASES = ["text", "photo", "interactive"];
const EXPERIENCE_STORY_TRACK_PHASES = [...EXPERIENCE_STORY_PHASES, "tail"];
const EXPERIENCE_CHAPTER_TRANSITION_START = 0.72;
const EXPERIENCE_INTERACTIVE_UNLOCK_START = 0.84;

const clampNumber = (value, min = 0, max = 1) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return min;
  return Math.min(max, Math.max(min, numericValue));
};

const remapClamped = (value, start, end) => {
  if (end <= start) return value >= end ? 1 : 0;
  return clampNumber((value - start) / (end - start));
};

const renderExperienceStoryChapters = (steps = [], modifierClass = "") =>
  EXPERIENCE_STORY_PHASES.map((phase, index) => {
    const step = steps[index] ?? {};
    const number = String(index + 1).padStart(2, "0");
    const chapterClass = modifierClass ? ` ${modifierClass}` : "";
    return `
      <article
        class="experience-story-chapter${chapterClass}${index === 0 ? " is-active is-revealed" : ""}"
        data-experience-chapter
        data-phase="${htmlEscape(phase)}"
      >
        <span class="experience-story-chapter-index">${htmlEscape(number)}</span>
        <p class="experience-story-chapter-title">${htmlEscape(step.title ?? "")}</p>
        <h3>${htmlEscape(step.body ?? "")}</h3>
      </article>
    `;
  }).join("");

const renderExperienceStoryTrack = () => `
  <div class="experience-story-track" data-experience-story-track aria-hidden="true">
    ${EXPERIENCE_STORY_TRACK_PHASES.map(
      (phase) =>
        `<div class="experience-story-track-step${phase === "tail" ? " experience-story-track-step--tail" : ""}" data-experience-story-track-step data-phase="${htmlEscape(phase)}"></div>`
    ).join("")}
  </div>
`;

const renderExperienceStoryTextSurface = (sample) => `
  <div class="experience-story-surface experience-story-surface--text" data-experience-story-layer="text">
    <div class="experience-story-surface-inner experience-story-surface-inner--text">
      <div class="experience-story-ticket experience-story-ticket--text">
        ${renderExperienceMenuEntry(sample, sample.shortDescription, "experience-menu-entry--story-ticket")}
      </div>
    </div>
  </div>
`;

const resolveExperiencePhotoDescription = (sample) => {
  const shortDescription = String(sample?.shortDescription ?? "").trim();
  if (shortDescription) return shortDescription;
  return String(sample?.longDescription ?? "").trim();
};

const renderExperienceStoryPhotoSurface = ({ sample, posterAssetKey, ui }) => {
  const photoDescription = resolveExperiencePhotoDescription(sample);
  return `
  <div class="experience-story-surface experience-story-surface--photo" data-experience-story-layer="photo">
    <div class="experience-story-surface-inner experience-story-surface-inner--photo">
      <div class="experience-photo-shell">
        <div class="experience-embedded-modal experience-embedded-modal--photo">
          <div class="dish-modal__card experience-photo-card">
            <div class="dish-modal__media-slot experience-photo-card__media-slot">
              <div
                class="landing-media-stage experience-media-stage experience-photo-card__media dish-modal__media"
                data-experience-photo-stage
                data-media-kind="image"
                data-primary-asset-key="${htmlEscape(posterAssetKey)}"
                data-fallback-asset-key="${htmlEscape(posterAssetKey)}"
              >
                <div class="landing-media-loader" role="status" aria-live="polite" aria-label="${htmlEscape(ui.media.loadingAria)}">
                  <span class="landing-media-loader__spinner" aria-hidden="true"></span>
                </div>
                <img
                  class="experience-media-image dish-modal__media-image"
                  data-experience-photo-image
                  src="${htmlEscape(sample.posterSrc)}"
                  alt="${htmlEscape(sample.alt)}"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </div>
            </div>
            <div class="experience-photo-card__support${photoDescription ? "" : " experience-photo-card__support--empty"}">
              ${renderExperienceMenuEntry(sample, photoDescription, "experience-menu-entry--supporting experience-menu-entry--wide")}
            </div>
          </div>
        </div>
        <div class="experience-story-ticket experience-story-ticket--photo">
          ${renderExperienceMenuEntry(sample, photoDescription, "experience-menu-entry--supporting")}
        </div>
      </div>
    </div>
  </div>
`;
};

const renderExperienceStoryInteractiveSurface = ({ sample, posterAssetKey, interactiveSpriteAssetKey, ui }) => `
  <div class="experience-story-surface experience-story-surface--interactive" data-experience-story-layer="interactive">
    <div class="experience-story-surface-inner experience-story-surface-inner--interactive">
      ${renderEmbeddedInteractiveModal({
        sample,
        posterAssetKey,
        interactiveSpriteAssetKey,
        ui
      })}
    </div>
  </div>
`;

const renderExperienceModalBadges = (sample) => {
  const badges = Array.isArray(sample?.badges) ? sample.badges.filter(Boolean) : [];
  if (!badges.length) return "";

  return `
    <div class="dish-modal__badges">
      ${badges
        .map((badge) => {
          const tone = badge?.tone === "vegan" || badge?.tone === "spice" ? badge.tone : "neutral";
          const spiceLevel = Number.isFinite(Number(badge?.spiceLevel))
            ? Math.max(0, Math.min(3, Math.round(Number(badge.spiceLevel))))
            : 0;
          return `
            <span class="menu-pill menu-pill--${htmlEscape(tone)} dish-modal__badge">
              <span>${htmlEscape(String(badge?.label ?? ""))}</span>
              ${
                spiceLevel > 0
                  ? `
                    <span class="menu-pill__meter" aria-hidden="true">
                      ${Array.from({ length: 3 }, (_, index) => index + 1)
                        .map(
                          (level) =>
                            `<span class="menu-pill__meter-dot${level <= spiceLevel ? " is-active" : ""}"></span>`
                        )
                        .join("")}
                    </span>
                  `
                  : ""
              }
            </span>
          `;
        })
        .join("")}
    </div>
  `;
};

const renderExperienceModalAllergens = (sample, ui) => {
  const allergensText = String(sample?.allergensText ?? "").trim();
  if (!allergensText) return "";
  const allergensLabel = String(ui?.menuTerms?.allergens ?? "Allergens").trim() || "Allergens";
  return `<p class="dish-modal__allergens">${htmlEscape(allergensLabel)}: ${htmlEscape(allergensText)}</p>`;
};

const renderEmbeddedInteractiveModal = ({ sample, posterAssetKey, interactiveSpriteAssetKey, ui }) => {
  if (!sample) return "";
  const hasLongDescription = Boolean(String(sample.longDescription ?? "").trim());
  const hasShortDescription = Boolean(String(sample.shortDescription ?? "").trim());
  const contentClass = hasLongDescription || hasShortDescription
    ? "dish-modal__content"
    : "dish-modal__content dish-modal__content--meta-only";

  return `
    <div class="experience-embedded-modal">
      <div class="dish-modal__card experience-embedded-modal__card">
        <div class="dish-modal__header">
          <h3 class="dish-modal__title">${htmlEscape(sample.name)}</h3>
        </div>
        <div class="dish-modal__media-slot">
          <div
            class="landing-media-stage experience-media-stage experience-media-stage--interactive dish-modal__media"
            data-experience-media-stage
            data-media-kind="sprite"
            data-primary-asset-key="${htmlEscape(interactiveSpriteAssetKey)}"
            data-fallback-asset-key="${htmlEscape(posterAssetKey)}"
          >
            <div class="dish-modal__interactive-guidance is-hidden" data-experience-guidance aria-hidden="true">
              <div class="dish-modal__interactive-guidance-mask">
                <div
                  class="dish-modal__interactive-guidance-scene"
                  data-experience-guidance-scene
                  data-guidance-ellipse-src="${htmlEscape(LANDING_MODAL_GUIDANCE_ASSETS.circularMotionArrows)}"
                  data-guidance-dish-src="${htmlEscape(LANDING_MODAL_GUIDANCE_ASSETS.sampleDish)}"
                >
                  <span class="dish-modal__interactive-guidance-hand-wrap">
                    <img
                      class="dish-modal__interactive-guidance-hand"
                      data-experience-guidance-hand
                      data-guidance-hand-src="${htmlEscape(LANDING_MODAL_GUIDANCE_ASSETS.pointingHand)}"
                      alt=""
                      draggable="false"
                      decoding="async"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div class="landing-media-loader" role="status" aria-live="polite" aria-label="${htmlEscape(ui.media.loadingAria)}">
              <span class="landing-media-loader__spinner" aria-hidden="true"></span>
            </div>
            <img
              class="dish-modal__media-image"
              data-experience-media-image
              src="${htmlEscape(sample.posterSrc)}"
              alt="${htmlEscape(sample.alt)}"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
            <canvas class="dish-modal__media-canvas" data-experience-media-canvas hidden></canvas>
          </div>
        </div>
        <div class="${contentClass}">
          ${
            hasShortDescription || hasLongDescription
              ? `
                <div class="dish-modal__copy-scroll">
                  ${hasShortDescription ? `<p class="dish-modal__desc">${htmlEscape(sample.shortDescription)}</p>` : ""}
                  ${hasLongDescription ? `<p class="dish-modal__long">${htmlEscape(sample.longDescription)}</p>` : ""}
                </div>
              `
              : ""
          }
          <div class="dish-modal__meta">
            ${renderExperienceModalBadges(sample)}
            ${renderExperienceModalAllergens(sample, ui)}
            <p class="dish-modal__price">${htmlEscape(formatPrice(sample.price, sample.currency))}</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

const renderExperience = () => {
  const experience = getExperienceContent();
  const ui = getUiText();
  const grid = document.getElementById("experience-grid");
  if (!grid) return;

  const selectedSample = experience.samples?.[DEFAULT_EXPERIENCE_SAMPLE_ID] ?? null;
  if (!selectedSample) {
    grid.innerHTML = "";
    return;
  }

  const posterAssetKey = getLandingMediaAssetKeyBySrc(selectedSample.posterSrc);
  const interactiveSpriteAssetKey = getLandingMediaAssetKeyBySrc(selectedSample.interactiveSpriteSrc);

  grid.innerHTML = `
    <div
      class="experience-story"
      data-experience-story
      data-active-phase="text"
      data-interactive-prepared="false"
      data-interactive-unlocked="false"
    >
      <div class="experience-story-layout">
        <div class="experience-narrative-column">
          <div class="experience-narrative-sticky">
            <div class="experience-narrative-rail experience-narrative-rail--wide">
              ${renderExperienceStoryChapters(Array.isArray(experience.steps) ? experience.steps : [], "experience-story-chapter--wide")}
            </div>
          </div>
          ${renderExperienceStoryTrack()}
        </div>
        <div class="experience-stage-column">
          <div class="experience-stage-sticky">
            <div class="experience-stage-stack">
              <div class="experience-stage-shell" data-experience-story-stage-shell>
                <div class="experience-stage-frame" aria-hidden="true"></div>
                ${renderExperienceStoryTextSurface(selectedSample)}
                ${renderExperienceStoryPhotoSurface({
                  sample: selectedSample,
                  posterAssetKey,
                  ui
                })}
                ${renderExperienceStoryInteractiveSurface({
                  sample: selectedSample,
                  posterAssetKey,
                  interactiveSpriteAssetKey,
                  ui
                })}
              </div>
              <div class="experience-narrative-rail experience-narrative-rail--portrait">
                ${renderExperienceStoryChapters(Array.isArray(experience.steps) ? experience.steps : [], "experience-story-chapter--portrait")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

const teardownExperienceMedia = () => {
  experienceMediaDisposers.forEach((dispose) => {
    try {
      dispose();
    } catch {}
  });
  experienceMediaDisposers = [];
};

const createImageStageController = ({ stage, imageNode, primaryAssetKey, fallbackAssetKey = primaryAssetKey }) => {
  if (!stage || !(imageNode instanceof HTMLImageElement)) return () => {};
  let disposed = false;
  const unsubscribe = subscribeToAssetState(primaryAssetKey, (state) => {
    if (disposed) return;
    if (state === "loading") setMediaStageState(stage, "loading");
  });

  const applyImageSource = (assetKey) => {
    imageNode.src = LANDING_MEDIA_ASSETS[assetKey] ?? imageNode.src;
  };

  setMediaStageState(stage, "loading");
  imageNode.classList.remove("is-hidden");
  applyImageSource(fallbackAssetKey);

  void loadLandingAssetImage(primaryAssetKey)
    .then(() => {
      if (disposed) return;
      applyImageSource(primaryAssetKey);
      setMediaStageState(stage, "ready");
    })
    .catch(async () => {
      if (disposed) return;
      if (primaryAssetKey !== fallbackAssetKey) {
        try {
          await loadLandingAssetImage(fallbackAssetKey);
          if (!disposed) applyImageSource(fallbackAssetKey);
        } catch {}
      }
      if (!disposed) setMediaStageState(stage, "error");
    });

  return () => {
    disposed = true;
    unsubscribe();
  };
};

const createSpriteStageController = ({
  stage,
  fallbackImage,
  canvas,
  assetKey,
  guidanceNode,
  spriteMeta = SPRITE_META,
  onPrepare = null
}) => {
  const noopController = {
    prepare() {},
    setUnlocked() {},
    dispose() {}
  };
  if (!stage || !(canvas instanceof HTMLCanvasElement) || !assetKey) return noopController;
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) {
    setMediaStageState(stage, "error");
    return noopController;
  }

  let disposed = false;
  let prepared = false;
  let unlocked = false;
  let failed = false;
  let spriteImage = null;
  let detachDrag = null;
  let guidanceDismissed = false;
  let guidanceAssetsReady = false;
  let guidanceAssetsFailed = false;
  let guidancePrepareTask = null;
  const frameCount = Math.max(
    2,
    Math.min(
      Number(spriteMeta.totalFrames) || SPRITE_META.totalFrames,
      (Number(spriteMeta.columns) || SPRITE_META.columns) * (Number(spriteMeta.rows) || SPRITE_META.rows)
    )
  );
  let frameCursor = 0;
  const unsubscribe = subscribeToAssetState(assetKey, (state) => {
    if (disposed || !prepared || spriteImage || failed) return;
    if (state === "loading") {
      stage.classList.add("is-loading-interactive");
      setMediaStageState(stage, "loading");
    }
  });

  canvas.width = Number(spriteMeta.frameWidth) || SPRITE_META.frameWidth;
  canvas.height = Number(spriteMeta.frameHeight) || SPRITE_META.frameHeight;

  const showFallback = () => {
    if (fallbackImage instanceof HTMLElement) fallbackImage.classList.remove("is-hidden");
  };

  const hideFallback = () => {
    if (fallbackImage instanceof HTMLElement) fallbackImage.classList.add("is-hidden");
  };

  const setGuidanceVisible = (visible) => {
    if (!(guidanceNode instanceof HTMLElement)) return;
    guidanceNode.classList.toggle("is-hidden", !visible);
    guidanceNode.setAttribute("aria-hidden", String(!visible));
  };

  const prepareGuidanceAssets = () => {
    if (guidancePrepareTask) return guidancePrepareTask;
    if (!(onPrepare instanceof Function)) {
      guidanceAssetsFailed = true;
      return Promise.resolve(false);
    }

    guidancePrepareTask = Promise.resolve(onPrepare())
      .then((ready) => {
        if (disposed) return Boolean(ready);
        guidanceAssetsReady = Boolean(ready);
        guidanceAssetsFailed = !guidanceAssetsReady;
        syncInteractiveState();
        return guidanceAssetsReady;
      })
      .catch(() => {
        if (disposed) return false;
        guidanceAssetsReady = false;
        guidanceAssetsFailed = true;
        syncInteractiveState();
        return false;
      });

    return guidancePrepareTask;
  };

  const detachInteractiveDrag = () => {
    if (detachDrag) {
      detachDrag();
      detachDrag = null;
    }
    canvas.classList.remove("is-dragging");
    stage.classList.remove("is-dragging-interactive");
  };

  const drawFrame = (spriteImage, rawFrame) => {
    const frame = ((Math.round(rawFrame) % frameCount) + frameCount) % frameCount;
    const columns = Number(spriteMeta.columns) || SPRITE_META.columns;
    const frameWidth = Number(spriteMeta.frameWidth) || SPRITE_META.frameWidth;
    const frameHeight = Number(spriteMeta.frameHeight) || SPRITE_META.frameHeight;
    const column = frame % columns;
    const row = Math.floor(frame / columns);
    const sx = column * frameWidth;
    const sy = row * frameHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(spriteImage, sx, sy, frameWidth, frameHeight, 0, 0, canvas.width, canvas.height);
  };

  const dismissGuidance = () => {
    if (guidanceDismissed) return;
    guidanceDismissed = true;
    setGuidanceVisible(false);
  };

  canvas.hidden = true;
  showFallback();
  setGuidanceVisible(false);

  const syncInteractiveState = () => {
    if (disposed) return;
    const isReady = Boolean(spriteImage);
    stage.classList.toggle("is-loading-interactive", prepared && !isReady && !failed);
    stage.classList.toggle("is-interactive-ready", isReady);
    stage.classList.toggle("is-interactive-unlocked", isReady && unlocked);

    if (!isReady || !unlocked) {
      detachInteractiveDrag();
    }

    if (isReady) {
      canvas.hidden = false;
      hideFallback();
      setMediaStageState(stage, "ready");
      if (unlocked && !detachDrag) {
        detachDrag = attachInteractiveOrbitDrag({
          host: stage,
          target: canvas,
          frameCount,
          onDismiss: dismissGuidance,
          onDelta: (deltaFrames) => {
            frameCursor += deltaFrames;
            drawFrame(spriteImage, frameCursor);
          }
        });
      }
    } else {
      canvas.hidden = true;
      showFallback();
    }

    setGuidanceVisible(isReady && unlocked && guidanceAssetsReady && !guidanceDismissed && !guidanceAssetsFailed);
  };

  const prepare = () => {
    if (disposed || prepared || failed) return;
    prepared = true;
    void prepareGuidanceAssets();
    setMediaStageState(stage, "loading");
    stage.classList.add("is-loading-interactive");

    void loadLandingAssetImage(assetKey)
      .then((loadedSpriteImage) => {
        if (disposed) return;
        spriteImage = loadedSpriteImage;
        frameCursor = 0;
        drawFrame(spriteImage, frameCursor);
        stage.classList.remove("is-loading-interactive");
        syncInteractiveState();
      })
      .catch(() => {
        if (disposed) return;
        failed = true;
        detachInteractiveDrag();
        canvas.hidden = true;
        showFallback();
        setGuidanceVisible(false);
        stage.classList.remove("is-loading-interactive");
        stage.classList.remove("is-interactive-ready");
        stage.classList.remove("is-interactive-unlocked");
        setMediaStageState(stage, "error");
      });
  };

  const setUnlocked = (nextUnlocked) => {
    unlocked = Boolean(nextUnlocked);
    syncInteractiveState();
  };

  const dispose = () => {
    disposed = true;
    unsubscribe();
    detachInteractiveDrag();
    canvas.hidden = true;
    setGuidanceVisible(false);
    stage.classList.remove("is-loading-interactive");
    stage.classList.remove("is-interactive-ready");
    stage.classList.remove("is-interactive-unlocked");
    showFallback();
  };

  return { prepare, setUnlocked, dispose };
};

const hydrateExperienceGuidanceAssets = async (guidanceNode) => {
  if (!(guidanceNode instanceof HTMLElement)) return false;

  let ellipseImage;
  let dishImage;
  let handImage;
  try {
    [ellipseImage, dishImage, handImage] = await Promise.all([
      loadLandingAssetImage(LANDING_MODAL_GUIDANCE_ASSET_KEYS.circularMotionArrows),
      loadLandingAssetImage(LANDING_MODAL_GUIDANCE_ASSET_KEYS.sampleDish),
      loadLandingAssetImage(LANDING_MODAL_GUIDANCE_ASSET_KEYS.pointingHand)
    ]);
  } catch {
    return false;
  }

  const scene = guidanceNode.querySelector("[data-experience-guidance-scene]");
  if (scene instanceof HTMLElement) {
    scene.style.setProperty("--dish-guidance-ellipse", `url(${ellipseImage.src})`);
    scene.style.setProperty("--dish-guidance-dish", `url(${dishImage.src})`);
  }

  const hand = guidanceNode.querySelector("[data-experience-guidance-hand]");
  if (hand instanceof HTMLImageElement) {
    hand.src = handImage.src;
  }

  return true;
};

const setupHeroGifCarousel = () => {
  const stage = document.querySelector("[data-hero-gif-stage]");
  if (!(stage instanceof HTMLElement)) return;
  if (heroGifCarouselDispose) {
    try {
      heroGifCarouselDispose();
    } catch {}
  }

  const slides = Array.from(stage.querySelectorAll("[data-hero-gif-slide]")).filter(
    (slide) => slide instanceof HTMLImageElement
  );
  const slideById = new Map(
    slides.map((slide) => [slide.dataset.heroGifId ?? "", slide]).filter(([id]) => Boolean(id))
  );
  const assetStatusById = new Map(HERO_GIF_SEQUENCE.map(({ id }) => [id, "loading"]));
  let disposed = false;
  let settledCount = 0;
  let activeSlideId = "";
  let rotationTimeoutId = 0;

  const clearRotationTimeout = () => {
    if (!rotationTimeoutId) return;
    window.clearTimeout(rotationTimeoutId);
    rotationTimeoutId = 0;
  };

  const setActiveSlide = (nextSlide) => {
    activeSlideId = nextSlide?.dataset.heroGifId ?? "";
    slides.forEach((slide) => {
      const isActive = slide === nextSlide;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
  };

  const getReadySlides = () =>
    HERO_GIF_SEQUENCE.map(({ id }) => slideById.get(id)).filter(
      (slide) => slide && assetStatusById.get(slide.dataset.heroGifId ?? "") === "loaded"
    );

  const scheduleNextRotation = () => {
    clearRotationTimeout();
    const readySlides = getReadySlides();
    if (readySlides.length < 2) return;

    rotationTimeoutId = window.setTimeout(() => {
      if (disposed) return;
      const currentIndex = readySlides.findIndex((slide) => (slide.dataset.heroGifId ?? "") === activeSlideId);
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % readySlides.length : 0;
      setActiveSlide(readySlides[nextIndex] ?? readySlides[0]);
      scheduleNextRotation();
    }, HERO_GIF_ROTATION_MS);
  };

  const syncCarouselState = () => {
    const readySlides = getReadySlides();
    if (readySlides.length > 0) {
      if (!readySlides.some((slide) => (slide.dataset.heroGifId ?? "") === activeSlideId)) {
        setActiveSlide(readySlides[0]);
      }
      setMediaStageState(stage, "ready");
      scheduleNextRotation();
      return;
    }

    clearRotationTimeout();
    if (settledCount >= HERO_GIF_SEQUENCE.length) {
      setActiveSlide(null);
      setMediaStageState(stage, "error");
      return;
    }
    setMediaStageState(stage, "loading");
  };

  stage.style.setProperty("--hero-gif-fade-duration", `${HERO_GIF_FADE_MS}ms`);
  setMediaStageState(stage, "loading");
  setActiveSlide(null);

  HERO_GIF_SEQUENCE.forEach(({ id }) => {
    const slide = slideById.get(id);
    if (!(slide instanceof HTMLImageElement)) {
      assetStatusById.set(id, "error");
      settledCount += 1;
      syncCarouselState();
      return;
    }

    preloadHeroGifSlide(slide).then((loaded) => {
      if (disposed) return;
      assetStatusById.set(id, loaded ? "loaded" : "error");
      if (!loaded) {
        slide.classList.add("is-unavailable");
        slide.setAttribute("aria-hidden", "true");
      } else {
        slide.classList.remove("is-unavailable");
      }
      settledCount += 1;
      syncCarouselState();
    });
  });

  heroGifCarouselDispose = () => {
    disposed = true;
    clearRotationTimeout();
  };
};

const applyExperienceStoryLayerStyles = (layer, { opacity, scale, translateY, blur = 0 }) => {
  if (!(layer instanceof HTMLElement)) return;
  layer.style.opacity = String(clampNumber(opacity, 0, 1));
  layer.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
  layer.style.filter = blur > 0 ? `blur(${blur.toFixed(2)}px)` : "none";
};

const resolveExperienceStoryPosition = (trackSteps, focusY) => {
  if (!trackSteps.length) {
    return { chapterIndex: 0, chapterProgress: 0 };
  }

  for (let index = 0; index < trackSteps.length; index += 1) {
    const step = trackSteps[index];
    const rect = step.getBoundingClientRect();
    const height = Math.max(1, rect.height);

    if (focusY < rect.top) {
      return {
        chapterIndex: Math.max(0, index - 1),
        chapterProgress: index === 0 ? 0 : 1
      };
    }

    if (focusY <= rect.bottom || index === trackSteps.length - 1) {
      return {
        chapterIndex: index,
        chapterProgress: clampNumber((focusY - rect.top) / height, 0, 1)
      };
    }
  }

  return {
    chapterIndex: trackSteps.length - 1,
    chapterProgress: 1
  };
};

const resolveExperienceStorySnapshot = ({ chapterIndex, chapterProgress }) => {
  const finalChapterIndex = EXPERIENCE_STORY_PHASES.length - 1;
  const isTail = chapterIndex > finalChapterIndex;
  const activeChapterIndex = isTail ? finalChapterIndex : chapterIndex;
  const activeChapterProgress = isTail ? 1 : chapterProgress;
  const textToPhoto = activeChapterIndex === 0
    ? remapClamped(activeChapterProgress, EXPERIENCE_CHAPTER_TRANSITION_START, 1)
    : activeChapterIndex > 0
      ? 1
      : 0;
  const photoToInteractive = activeChapterIndex === 1
    ? remapClamped(activeChapterProgress, EXPERIENCE_CHAPTER_TRANSITION_START, 1)
    : activeChapterIndex > 1
      ? 1
      : 0;
  const interactiveSettle = activeChapterIndex === finalChapterIndex
    ? isTail
      ? 1
      : remapClamped(activeChapterProgress, 0, 0.32)
    : 0;
  const interactiveUnlock = activeChapterIndex === finalChapterIndex
    ? isTail
      ? 1
      : remapClamped(activeChapterProgress, EXPERIENCE_INTERACTIVE_UNLOCK_START, 1)
    : 0;

  return {
    chapterIndex: activeChapterIndex,
    chapterProgress: activeChapterProgress,
    activePhase: EXPERIENCE_STORY_PHASES[activeChapterIndex] ?? EXPERIENCE_STORY_PHASES[finalChapterIndex],
    textToPhoto,
    photoToInteractive,
    interactiveSettle,
    interactiveUnlock,
    shouldPrepareInteractive: activeChapterIndex > 1 || (activeChapterIndex === 1 && photoToInteractive > 0),
    isInteractiveUnlocked: activeChapterIndex === finalChapterIndex
  };
};

const setupExperienceStory = () => {
  teardownExperienceMedia();
  const story = document.querySelector("[data-experience-story]");
  if (!(story instanceof HTMLElement)) return;

  const track = story.querySelector("[data-experience-story-track]");
  const trackSteps = Array.from(story.querySelectorAll("[data-experience-story-track-step]"));
  const chapters = Array.from(story.querySelectorAll("[data-experience-chapter]"));
  const narrativeSticky = story.querySelector(".experience-narrative-sticky");
  const wideRail = story.querySelector(".experience-narrative-rail--wide");
  const wideChapters = wideRail instanceof HTMLElement
    ? Array.from(wideRail.querySelectorAll("[data-experience-chapter]"))
    : [];
  const stageSticky = story.querySelector(".experience-stage-sticky");
  const stageShell = story.querySelector(".experience-stage-shell");
  const textLayer = story.querySelector('[data-experience-story-layer="text"]');
  const photoLayer = story.querySelector('[data-experience-story-layer="photo"]');
  const interactiveLayer = story.querySelector('[data-experience-story-layer="interactive"]');
  const compactLandscapeQuery = window.matchMedia("(max-width: 1040px) and (orientation: landscape)");

  const photoStage = story.querySelector("[data-experience-photo-stage]");
  const photoImage = story.querySelector("[data-experience-photo-image]");
  if (photoStage instanceof HTMLElement && photoImage instanceof HTMLImageElement) {
    const photoPrimaryAssetKey = photoStage.dataset.primaryAssetKey ?? "";
    const photoFallbackAssetKey = photoStage.dataset.fallbackAssetKey ?? photoPrimaryAssetKey;
    if (photoPrimaryAssetKey) {
      experienceMediaDisposers.push(
        createImageStageController({
          stage: photoStage,
          imageNode: photoImage,
          primaryAssetKey: photoPrimaryAssetKey,
          fallbackAssetKey: photoFallbackAssetKey
        })
      );
    }
  }

  const interactiveStage = interactiveLayer?.querySelector("[data-experience-media-stage]");
  const interactiveFallback = interactiveLayer?.querySelector("[data-experience-media-image]");
  const interactiveCanvas = interactiveLayer?.querySelector("[data-experience-media-canvas]");
  const guidanceNode = interactiveLayer?.querySelector("[data-experience-guidance]");
  const interactiveAssetKey = interactiveStage instanceof HTMLElement
    ? String(interactiveStage.dataset.primaryAssetKey ?? "").trim()
    : "";
  const interactiveController = createSpriteStageController({
    stage: interactiveStage,
    fallbackImage: interactiveFallback,
    canvas: interactiveCanvas,
    assetKey: interactiveAssetKey,
    guidanceNode,
    spriteMeta: SPRITE_META,
    onPrepare: () => hydrateExperienceGuidanceAssets(guidanceNode)
  });
  experienceMediaDisposers.push(() => {
    interactiveController.dispose();
  });
  let interactivePrepared = false;

  if (!(track instanceof HTMLElement) || !trackSteps.length) {
    return;
  }

  let landscapeFocusTop = null;
  let landscapeFocusKey = "";

  const resetWideRailLandscapeShift = () => {
    landscapeFocusTop = null;
    landscapeFocusKey = "";
    story.style.removeProperty("--experience-landscape-sticky-height");
    if (!(wideRail instanceof HTMLElement)) return;
    wideRail.style.removeProperty("transform");
  };

  const syncWideRailLandscapeShift = (snapshot) => {
    if (!(wideRail instanceof HTMLElement) || !(narrativeSticky instanceof HTMLElement)) return;

    if (!compactLandscapeQuery.matches || !wideChapters.length) {
      resetWideRailLandscapeShift();
      return;
    }

    const stageReference =
      stageShell instanceof HTMLElement
        ? stageShell.getBoundingClientRect()
        : stageSticky instanceof HTMLElement
          ? stageSticky.getBoundingClientRect()
          : null;

    if (!stageReference || stageReference.height <= 0) {
      resetWideRailLandscapeShift();
      return;
    }

    story.style.setProperty("--experience-landscape-sticky-height", `${stageReference.height}px`);

    const firstChapter = wideChapters[0];
    const activeChapter = wideChapters[snapshot.chapterIndex] ?? firstChapter;
    const stickyRect = narrativeSticky.getBoundingClientRect();
    const railRect = wideRail.getBoundingClientRect();
    const firstChapterRect = firstChapter.getBoundingClientRect();
    const stickyHeight = stageReference.height;
    const firstChapterNaturalTop =
      stickyRect.top + (stickyHeight - firstChapterRect.height) / 2 + firstChapter.offsetTop;
    const focusKey = [
      Math.round(stickyRect.top),
      Math.round(stickyHeight),
      Math.round(firstChapterRect.height),
      Math.round(firstChapter.offsetTop)
    ].join(":");

    if (landscapeFocusTop == null || landscapeFocusKey !== focusKey) {
      landscapeFocusTop = firstChapterNaturalTop;
      landscapeFocusKey = focusKey;
    }

    const activeChapterNaturalTop =
      stickyRect.top + (stickyHeight - railRect.height) / 2 + activeChapter.offsetTop;
    const shift = landscapeFocusTop - activeChapterNaturalTop;
    wideRail.style.transform = `translateY(${shift}px)`;
  };

  const syncStoryState = (snapshot) => {
    story.dataset.activePhase = snapshot.activePhase;
    story.dataset.interactivePrepared = String(interactivePrepared);
    story.dataset.interactiveUnlocked = String(snapshot.isInteractiveUnlocked);
    story.classList.toggle("is-interactive-prepared", interactivePrepared);
    story.classList.toggle("is-interactive-unlocked", snapshot.isInteractiveUnlocked);

    chapters.forEach((chapter) => {
      if (!(chapter instanceof HTMLElement)) return;
      const phase = String(chapter.dataset.phase ?? "").trim();
      const chapterIndex = EXPERIENCE_STORY_PHASES.indexOf(phase);
      if (chapterIndex < 0) return;
      chapter.classList.toggle("is-revealed", chapterIndex <= snapshot.chapterIndex);
      chapter.classList.toggle("is-active", chapterIndex === snapshot.chapterIndex);
      chapter.classList.toggle("is-complete", chapterIndex < snapshot.chapterIndex);
    });

    syncWideRailLandscapeShift(snapshot);

    applyExperienceStoryLayerStyles(textLayer, {
      opacity: 1 - snapshot.textToPhoto,
      scale: 1 - snapshot.textToPhoto * 0.08,
      translateY: snapshot.textToPhoto * 56,
      blur: snapshot.textToPhoto
    });

    applyExperienceStoryLayerStyles(photoLayer, {
      opacity: snapshot.chapterIndex === 0 ? snapshot.textToPhoto : 1 - snapshot.photoToInteractive * 0.96,
      scale:
        snapshot.chapterIndex === 0
          ? 0.88 + snapshot.textToPhoto * 0.12
          : 1 - snapshot.photoToInteractive * 0.04,
      translateY:
        snapshot.chapterIndex === 0
          ? (1 - snapshot.textToPhoto) * 34
          : snapshot.chapterIndex === 1
            ? 0
            : -snapshot.photoToInteractive * 18,
      blur: snapshot.photoToInteractive * 0.9
    });

    applyExperienceStoryLayerStyles(interactiveLayer, {
      opacity: snapshot.chapterIndex === 0 ? 0 : snapshot.chapterIndex === 1 ? snapshot.photoToInteractive : 1,
      scale: snapshot.chapterIndex === 1 ? 0.96 + snapshot.photoToInteractive * 0.04 : 1,
      translateY: 0,
      blur: snapshot.chapterIndex === 1 ? (1 - snapshot.photoToInteractive) * 0.9 : 0
    });
  };

  let rafId = 0;
  const updateStory = () => {
    const focusY = window.innerHeight * 0.52;
    const snapshot = resolveExperienceStorySnapshot(resolveExperienceStoryPosition(trackSteps, focusY));

    if (snapshot.shouldPrepareInteractive) {
      interactivePrepared = true;
      interactiveController.prepare();
    }

    interactiveController.setUnlocked(snapshot.isInteractiveUnlocked);
    syncStoryState(snapshot);
  };

  const requestUpdate = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(() => {
      rafId = 0;
      updateStory();
    });
  };

  updateStory();

  const resizeHandler = () => {
    resetWideRailLandscapeShift();
    requestUpdate();
  };
  const scrollHandler = () => requestUpdate();
  window.addEventListener("scroll", scrollHandler, { passive: true });
  window.addEventListener("resize", resizeHandler, { passive: true });
  window.addEventListener("orientationchange", resizeHandler, { passive: true });
  compactLandscapeQuery.addEventListener("change", resizeHandler);

  experienceMediaDisposers.push(() => {
    window.removeEventListener("scroll", scrollHandler);
    window.removeEventListener("resize", resizeHandler);
    window.removeEventListener("orientationchange", resizeHandler);
    compactLandscapeQuery.removeEventListener("change", resizeHandler);
    if (rafId) window.cancelAnimationFrame(rafId);
  });
};

const refreshExperienceSection = () => {
  renderExperience();
  setupExperienceStory();
};

const renderTimeline = () => {
  const content = getLandingContent();
  const ui = getUiText();
  const target = document.getElementById("timeline-grid");
  if (!target) return;
  const section = content.howItWorks;

  target.innerHTML = `
    <div class="timeline-fork-merge">
      <article class="timeline-track">
        <h3>${htmlEscape(section.pathATitle)}</h3>
        <p>${htmlEscape(section.pathASubtitle)}</p>
        <ol>
          ${section.pathAIntroSteps.map((step) => `<li>${htmlEscape(step)}</li>`).join("")}
        </ol>
      </article>
      <article class="timeline-track">
        <h3>${htmlEscape(section.pathBTitle)}</h3>
        <p>${htmlEscape(section.pathBSubtitle)}</p>
        <ol>
          ${section.pathBIntroSteps.map((step) => `<li>${htmlEscape(step)}</li>`).join("")}
        </ol>
      </article>
      <article class="timeline-track timeline-track-shared">
        <h3>${htmlEscape(section.sharedTitle)}</h3>
        <p>${htmlEscape(ui.faq.mergeNote)}</p>
        <ol>
          ${section.sharedSteps.map((step) => `<li>${htmlEscape(step)}</li>`).join("")}
        </ol>
        <p>${htmlEscape(section.sharedNote ?? "")}</p>
      </article>
    </div>
  `;
};

const renderCollaborationSection = () => {
  const content = getLandingContent();
  const target = document.getElementById("collaboration-content");
  if (!target) return;
  const section = content.collaboration;

  target.innerHTML = `
    <div class="collaboration-intro">
      ${section.intro
        .map(
          (paragraph, index) => `
            <p class="${index === 0 ? "section-intro" : "collaboration-intro-secondary"}">${htmlEscape(paragraph)}</p>
          `
        )
        .join("")}
    </div>
    <div class="collaboration-grid">
      <article class="collaboration-card collaboration-card-standard">
        <div class="collaboration-block collaboration-block-pricing">
          <h3>${htmlEscape(section.standardPricing.title)}</h3>
          <div class="pricing-rule-list">
            ${section.standardPricing.items
              .map(
                (item) => `
                  <div class="pricing-rule${item.emphasis ? " is-emphasis" : ""}">
                    <div class="pricing-rule-head">
                      <h4>${htmlEscape(item.label)}</h4>
                      <p class="pricing-rule-price">${htmlEscape(item.price)}</p>
                    </div>
                    <p class="pricing-rule-body">${htmlEscape(item.body)}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>

        <div class="collaboration-block">
          <h4>${htmlEscape(section.standardPricing.examplesTitle)}</h4>
          <ul class="pricing-example-list">
            ${section.standardPricing.examples
              .map(
                (example) => `
                  <li class="pricing-example-item">
                    <span class="pricing-example-label">${htmlEscape(example.label)}</span>
                    <span class="pricing-example-arrow" aria-hidden="true">→</span>
                    <strong class="pricing-example-price">${htmlEscape(example.price)}</strong>
                  </li>
                `
              )
              .join("")}
          </ul>
        </div>

        <div class="collaboration-block">
          <h4>${htmlEscape(section.projectIncludes.title)}</h4>
          <div class="collaboration-detail-columns">
            <section class="collaboration-detail-block">
              <p class="collaboration-note">${htmlEscape(section.projectIncludes.deliveryTitle)}</p>
              <ul class="collaboration-checklist">
                ${section.projectIncludes.deliveryItems.map((item) => `<li>${htmlEscape(item)}</li>`).join("")}
              </ul>
            </section>
            <section class="collaboration-detail-block">
              <p class="collaboration-note">${htmlEscape(section.projectIncludes.updatesTitle)}</p>
              <ul class="collaboration-checklist">
                ${section.projectIncludes.updatesItems.map((item) => `<li>${htmlEscape(item)}</li>`).join("")}
              </ul>
            </section>
          </div>
          <p class="collaboration-block-copy">${htmlEscape(section.projectIncludes.note)}</p>
        </div>

        <div class="collaboration-block">
          <h4>${htmlEscape(section.newDishes.title)}</h4>
          <ul class="collaboration-price-options">
            ${section.newDishes.items
              .map(
                (item) => `
                  <li class="collaboration-price-option">
                    <span class="collaboration-price-label">${htmlEscape(item.label)}</span>
                    <strong class="collaboration-price-value">${htmlEscape(item.price)}</strong>
                  </li>
                `
              )
              .join("")}
          </ul>
          <p class="collaboration-block-copy">${htmlEscape(section.newDishes.body)}</p>
        </div>
      </article>

      <aside class="collaboration-card collaboration-card-offer">
        <h3>${htmlEscape(section.launchOffer.title)}</h3>
        <ul class="collaboration-offer-list">
          ${section.launchOffer.items.map((item) => `<li>${htmlEscape(item)}</li>`).join("")}
        </ul>
        <p class="collaboration-offer-copy">${htmlEscape(section.launchOffer.body)}</p>
      </aside>
    </div>
    <p class="collaboration-support-note">${htmlEscape(section.aftercareNote)}</p>
  `;
};

const renderFaq = () => {
  const content = getLandingContent();
  const target = document.getElementById("faq-list");
  if (!target) return;

  target.innerHTML = content.faq.items
    .map(
      (item, index) => `
      <article class="faq-item">
        <button
          id="faq-question-${index}"
          class="faq-question"
          type="button"
          aria-expanded="false"
          aria-controls="faq-answer-${index}"
          data-faq-index="${index}"
        >
          <span>${htmlEscape(item.q)}</span>
        </button>
        <div id="faq-answer-${index}" class="faq-answer" role="region" aria-labelledby="faq-question-${index}" hidden>
          ${htmlEscape(item.a)}
        </div>
      </article>
    `
    )
    .join("");

  const buttons = Array.from(target.querySelectorAll(".faq-question"));

  const closeAll = () => {
    buttons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      const panelId = button.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (panel) panel.hidden = true;
    });
  };

  const openAt = (index) => {
    closeAll();
    const button = buttons[index];
    if (!button) return;
    button.setAttribute("aria-expanded", "true");
    const panelId = button.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    if (panel) panel.hidden = false;
  };

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        closeAll();
      } else {
        openAt(index);
      }
    });

    button.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        buttons[(index + 1) % buttons.length]?.focus();
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        buttons[(index - 1 + buttons.length) % buttons.length]?.focus();
      }
      if (event.key === "Home") {
        event.preventDefault();
        buttons[0]?.focus();
      }
      if (event.key === "End") {
        event.preventDefault();
        buttons[buttons.length - 1]?.focus();
      }
    });
  });

  if (buttons.length > 0) openAt(0);
};

const toAbsoluteHref = (href) => {
  const value = String(href ?? "").trim();
  if (!value) return "#";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return value;
  return `/${value.replace(/^\.?\//, "")}`;
};

const toDemoRootHref = (href) => {
  if (!href) return "";
  try {
    const url = new URL(String(href), window.location.origin);
    const path = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
    return `${url.origin}${path}`;
  } catch {
    return "";
  }
};

const toAssetUrlFromDemoRoot = (demoRootHref, outputPath) => {
  if (!demoRootHref || !outputPath) return "";
  try {
    const url = new URL(String(outputPath), demoRootHref);
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "";
  }
};

const toDemoPreviewImageHref = (demo) => {
  const demoRootHref = toDemoRootHref(demo?.href ?? "");
  const previewImage = String(demo?.previewImage ?? "").trim();
  if (!previewImage) return "";

  if (/^https?:\/\//i.test(previewImage) || previewImage.startsWith("/")) {
    return toAbsoluteHref(previewImage);
  }

  return toAssetUrlFromDemoRoot(demoRootHref, previewImage);
};

const pickDemoPreviewAsset = (assets) => {
  if (!Array.isArray(assets)) return null;
  const imageAssets = assets
    .filter((asset) => asset && typeof asset.outputPath === "string" && String(asset.mime ?? "").startsWith("image/"))
    .map((asset) => ({
      ...asset,
      bytes: Number(asset.bytes) || Number.MAX_SAFE_INTEGER,
      path: String(asset.outputPath),
      role: String(asset.role ?? "").toLowerCase(),
      mime: String(asset.mime ?? "").toLowerCase()
    }))
    .filter((asset) => !asset.path.toLowerCase().endsWith("favicon.ico"));

  if (!imageAssets.length) return null;

  const score = (asset) => {
    const pathLower = asset.path.toLowerCase();
    const isPoster = /-poster\.(webp|png|jpe?g)$/i.test(pathLower);
    const isBackgroundFirst = asset.role === "background" && Boolean(asset.firstView);
    const isBackground = asset.role === "background";
    const isFirstView = Boolean(asset.firstView);
    const isGif = asset.mime.endsWith("/gif") || pathLower.endsWith(".gif");
    const isLogo = pathLower.includes("/logos/");

    if (isPoster) return [0, asset.bytes];
    if (isBackgroundFirst && asset.bytes <= 800000) return [1, asset.bytes];
    if (isFirstView && !isGif && asset.bytes <= 1500000) return [2, asset.bytes];
    if (isBackground && asset.bytes <= 1200000) return [3, asset.bytes];
    if (isFirstView && asset.bytes <= 2000000) return [4, asset.bytes];
    if (isLogo) return [6, asset.bytes];
    return [5, asset.bytes];
  };

  return imageAssets.sort((a, b) => {
    const [rankA, bytesA] = score(a);
    const [rankB, bytesB] = score(b);
    if (rankA !== rankB) return rankA - rankB;
    return bytesA - bytesB;
  })[0];
};

const resolveDemoPreviewImageSrc = async (demo) => {
  const explicitPreviewHref = toDemoPreviewImageHref(demo);
  if (explicitPreviewHref) return explicitPreviewHref;

  const demoRootHref = toDemoRootHref(demo?.href ?? "");
  if (!demoRootHref) return "";
  if (demoPreviewImageCache.has(demoRootHref)) {
    return demoPreviewImageCache.get(demoRootHref) ?? "";
  }

  const manifestHref = `${demoRootHref}asset-manifest.json`;

  try {
    const response = await fetch(manifestHref, { cache: "force-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const manifest = await response.json();
    const previewAsset = pickDemoPreviewAsset(manifest?.assets);
    const previewSrc = previewAsset
      ? toAssetUrlFromDemoRoot(demoRootHref, previewAsset.outputPath)
      : toAssetUrlFromDemoRoot(demoRootHref, "favicon.ico");
    demoPreviewImageCache.set(demoRootHref, previewSrc);
    return previewSrc;
  } catch {
    const fallback = toAssetUrlFromDemoRoot(demoRootHref, "favicon.ico");
    demoPreviewImageCache.set(demoRootHref, fallback);
    return fallback;
  }
};

const hydrateDemoPreview = async (preview) => {
  if (!(preview instanceof HTMLElement)) return;
  if (preview.dataset.previewHydrated === "true") return;
  preview.dataset.previewHydrated = "true";

  const demoHref = preview.dataset.demoHref ?? "";
  const demoPreviewImage = preview.dataset.demoPreviewImage ?? "";
  const image = preview.querySelector("img");
  if (!(image instanceof HTMLImageElement)) return;

  try {
    const src = await resolveDemoPreviewImageSrc({
      href: demoHref,
      previewImage: demoPreviewImage
    });
    if (!src) {
      preview.classList.add("is-error");
      return;
    }
    image.addEventListener(
      "load",
      () => {
        preview.classList.add("is-loaded");
      },
      { once: true }
    );
    image.addEventListener(
      "error",
      () => {
        preview.classList.add("is-error");
      },
      { once: true }
    );
    image.src = src;
  } catch {
    preview.classList.add("is-error");
  }
};

const observeDemoPreview = (preview) => {
  if (!(preview instanceof HTMLElement)) return;
  if (preview.dataset.previewObserved === "true") return;
  preview.dataset.previewObserved = "true";

  if (!("IntersectionObserver" in window)) {
    hydrateDemoPreview(preview);
    return;
  }

  if (!demoPreviewObserver) {
    demoPreviewObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          hydrateDemoPreview(entry.target);
        });
      },
      {
        rootMargin: "260px 0px",
        threshold: 0.01
      }
    );
  }

  demoPreviewObserver.observe(preview);
};

const setupDemoPreviews = () => {
  document.querySelectorAll("[data-demo-preview]").forEach((preview) => observeDemoPreview(preview));
};

const renderDemoCards = (demos) => {
  const ui = getUiText();
  const list = document.getElementById("demos-list");
  if (!list) return;

  if (!Array.isArray(demos) || demos.length === 0) {
    list.innerHTML = `<li class="empty-state">${htmlEscape(ui.demos.emptyState)}</li>`;
    return;
  }

  list.innerHTML = demos
    .map((demo, index) => {
      const rawName = String(demo?.name ?? demo?.folder ?? ui.demos.untitled);
      const name = htmlEscape(rawName);
      const href = htmlEscape(toAbsoluteHref(demo?.href ?? ""));
      const previewImage = htmlEscape(String(demo?.previewImage ?? "").trim());
      const previewFrameTitle = htmlEscape(
        formatTemplate(ui.demos.previewFrameTitle ?? "{name}", {
          name: rawName
        })
      );
      return `
        <li>
          <a class="demo-card" href="${href}" ${index === 0 ? 'data-featured-demo="true"' : ""}>
            <span
              class="demo-preview"
              data-demo-preview
              data-demo-href="${href}"
              data-demo-preview-image="${previewImage}"
              aria-hidden="true"
            >
              <img loading="lazy" decoding="async" alt="${previewFrameTitle}" />
            </span>
            <span class="demo-name">${name}</span>
            <span class="demo-cta">${htmlEscape(ui.demos.cardCta)}</span>
          </a>
        </li>
      `;
    })
    .join("");

  setupDemoPreviews();
};

const renderPublishedDemos = () => {
  const demos = Array.isArray(manifestEntries) ? manifestEntries.slice(0, 3) : [];
  renderDemoCards(demos);
};

const highlightFeaturedDemoCard = () => {
  window.setTimeout(() => {
    const featured = document.querySelector('[data-featured-demo="true"]');
    if (!featured) return;
    featured.classList.add("is-highlight");
    window.setTimeout(() => featured.classList.remove("is-highlight"), 1600);
  }, 220);
};

const bindDemoHighlightCta = (elementId, boundKey = "demoBound") => {
  const trigger = document.getElementById(elementId);
  if (!trigger) return;
  if (trigger.dataset[boundKey] === "true") return;
  trigger.dataset[boundKey] = "true";
  trigger.addEventListener("click", highlightFeaturedDemoCard);
};

const setupHeroDemoCta = () => bindDemoHighlightCta("hero-demo-cta", "demoBound");

const fetchJson = async (url) => {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.json();
};

const loadManifest = async () => {
  try {
    return await fetchJson(manifestUrl);
  } catch {
    try {
      return await fetchJson("./demos-manifest.example.json");
    } catch {
      return DEFAULT_MANIFEST;
    }
  }
};

const hydrateFooterYear = () => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
};

const setFormStatus = (message, type = "") => {
  const status = document.getElementById("form-status");
  if (!status) return;
  status.textContent = message;
  status.classList.remove("error", "success");
  if (type) status.classList.add(type);
};

const isEndpointConfigured = () =>
  FORM_ENDPOINT && !FORM_ENDPOINT.includes(FORM_ENDPOINT_PLACEHOLDER) && /^https:\/\//.test(FORM_ENDPOINT);

const setupConsultationForm = () => {
  const consultationLayout = document.getElementById("consultation-layout");
  const consultationSection = document.getElementById("consultation");
  const wrap = document.getElementById("consultation-form-wrap");
  const form = document.getElementById("consultation-form");
  const submitButton = document.getElementById("consultation-submit");
  const successPanel = document.getElementById("consultation-success-panel");
  const turnstileContainer = document.getElementById("consultation-turnstile");
  if (!consultationLayout || !consultationSection || !wrap || !form || !submitButton || !successPanel) return;
  if (form.dataset.formBound === "true") return;

  form.dataset.formBound = "true";
  bindDemoHighlightCta("consultation-success-demo-cta", "successDemoBound");

  const readPayload = () => {
    const data = new FormData(form);
    return {
      menu_situation: String(data.get("menu_situation") ?? "").trim(),
      restaurant_brand: String(data.get("restaurant_brand") ?? "").trim(),
      contact_name: String(data.get("contact_name") ?? "").trim(),
      contact_email: String(data.get("contact_email") ?? "").trim(),
      city_country: String(data.get("city_country") ?? "").trim(),
      project_scope: String(data.get("project_scope") ?? "").trim(),
      timeline: String(data.get("timeline") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      consent: data.get("consent") === "on"
    };
  };

  const emailLooksValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const setCaptchaStatus = (message, type = "") => {
    const status = document.getElementById("form-status");
    if (!status) return;
    if (message === "" && status.textContent !== getUiText().form.statusCaptchaRequired) return;
    setFormStatus(message, type);
  };
  const turnstileController = createTurnstileController({
    container: turnstileContainer,
    setStatus: setCaptchaStatus,
    getCaptchaMessage: () => getUiText().form.statusCaptchaRequired
  });

  const revealSuccessPanel = () => {
    successPanel.hidden = false;
    consultationLayout.classList.add("is-transitioning");
    consultationLayout.classList.remove("is-success");
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        consultationLayout.classList.remove("is-transitioning");
        consultationLayout.classList.add("is-success");
        consultationSection.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start"
        });
      }, 180);
    });
  };

  void turnstileController.ensureRendered();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (consultationLayout.classList.contains("is-success") || consultationLayout.classList.contains("is-transitioning")) return;

    const ui = getUiText();
    const payload = readPayload();

    if (!payload.menu_situation || !payload.restaurant_brand || !payload.contact_name || !payload.contact_email) {
      setFormStatus(ui.form.statusRequired, "error");
      return;
    }

    if (!emailLooksValid(payload.contact_email)) {
      setFormStatus(ui.form.statusInvalidEmail, "error");
      return;
    }

    if (!payload.consent) {
      setFormStatus(ui.form.statusNoConsent, "error");
      return;
    }

    if (!isEndpointConfigured()) {
      setFormStatus(ui.form.statusEndpoint, "error");
      return;
    }

    await turnstileController.ensureRendered();
    const captchaToken = turnstileController.getToken();
    if (!captchaToken) {
      setFormStatus(ui.form.statusCaptchaRequired, "error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = ui.form.submitSending;
    setFormStatus(ui.form.statusSending);
    const submitStart = performance.now();

    try {
      const formData = new FormData(form);
      formData.set("email", payload.contact_email);
      formData.set("contact_email", payload.contact_email);
      formData.set("locale", currentLocale);
      formData.set("source_page", window.location.href);
      formData.set("consent", payload.consent ? "true" : "false");
      formData.set(TURNSTILE_TOKEN_FIELD, captchaToken);

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      if (!response.ok) {
        const message = (await detectCaptchaError(response)) ? ui.form.statusCaptchaRequired : ui.form.statusError;
        throw new Error(message);
      }

      const elapsed = performance.now() - submitStart;
      const remainingDelay = Math.max(0, CONSULTATION_MIN_LOADING_MS - elapsed);
      if (remainingDelay > 0) await wait(remainingDelay);

      form.reset();
      turnstileController.reset();
      setFormStatus(ui.form.statusSuccess, "success");
      revealSuccessPanel();
      submitButton.textContent = getUiText().form.submitIdle;
    } catch (error) {
      turnstileController.reset();
      setFormStatus(error instanceof Error ? error.message : getUiText().form.statusError, "error");
      submitButton.disabled = false;
      submitButton.textContent = getUiText().form.submitIdle;
    }
  });
};

const setupRevealAnimation = () => {
  const nodes = Array.from(document.querySelectorAll(".reveal"));
  if (!nodes.length) return;

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  nodes.forEach((node) => observer.observe(node));
};

const hydrateLanding = () => {
  hydrateContentText();
  renderWhyItMatters();
  refreshExperienceSection();
  renderTimeline();
  renderCollaborationSection();
  renderFaq();
};

const main = async () => {
  currentLocale = resolveInitialLocale();
  setupLocaleSwitchers();
  setLocale(currentLocale, { persist: true, updateUrl: false, rerender: false });
  mobileHeaderController = setupMobileHeader();

  syncHeaderOffset();
  window.addEventListener("resize", syncHeaderOffset, { passive: true });
  if (document.fonts?.ready) {
    document.fonts.ready.then(syncHeaderOffset).catch(() => {});
  }

  setupInPageAnchors();
  setupBackToTop();

  hydrateLanding();
  setupHeroGifCarousel();
  setupRevealAnimation();

  hydrateFooterYear();
  const manifest = await loadManifest();
  manifestEntries = Array.isArray(manifest?.demos) ? manifest.demos : [];

  renderPublishedDemos();
  setupHeroDemoCta();
  setupConsultationForm();
};

main();
