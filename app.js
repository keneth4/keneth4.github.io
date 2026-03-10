const FORM_ENDPOINT = "https://formspree.io/f/xjgabebv";
const FORM_ENDPOINT_PLACEHOLDER = "REPLACE_WITH_YOUR_FORM_ID";
const CONSULTATION_MIN_LOADING_MS = 1200;

const SUPPORTED_LOCALES = ["en", "es", "de"];
const DEFAULT_LOCALE = "en";
const LOCALE_STORAGE_KEY = "cv_locale";
const FEATURED_DISH_ASSETS = {
  poster: "./Short-Ribs-int-poster.webp",
  spriteHq: "./Short-Ribs-int-sprite.webp",
  spriteMd: "./Short-Ribs-int-sprite-md.webp"
};
const SPRITE_META = {
  frameWidth: 500,
  frameHeight: 500,
  columns: 10,
  rows: 6,
  totalFrames: 60
};
const DEMO_PARITY_PIXELS_PER_FRAME = {
  coarse: 7,
  fine: 4
};
const SPRITE_CUE_PROFILE_CALM = {
  forwardMs: 420,
  returnMs: 480,
  turnPauseMs: 320,
  offsetRatio: 0.1,
  minOffsetFrames: 3,
  loopIdleMs: 5200,
  startDelayMs: 1200,
  resumeDelayMs: 1200,
  hintReshowIdleMs: 15000
};

const LANDING_CONTENT_BY_LOCALE = {
  en: {
    hero: {
      eyebrow: "Immersive 3D Experience Studio",
      headline: "Designed to Be Desired.",
      subheadline:
        "Immersive interactive 3D menus designed for modern restaurants that want to attract, inform, and excite guests before the first bite.",
      microValue: "Multi-language. Visual. Story-driven. Allergen-aware."
    },
    credibility: [
      "Based in Germany, collaborating with independent restaurants and dining venues internationally.",
      "Menu language support: Spanish, English, French, Portuguese, Italian, German, Japanese, Korean, Chinese.",
      "No subscription required. Delivered as fully-owned files.",
      "Selective studio: limited projects per quarter for quality."
    ],
    problem: {
      eyebrow: "The Real Problem",
      heading: "Static menus rarely create emotion.",
      bodyA:
        "Across Germany and Europe, many restaurants still rely on paper menus or static PDFs. For international guests, unfamiliar ingredients and unclear allergen context create friction at the point of ordering.",
      bodyB:
        "When guests cannot visualize what they are ordering, hesitation rises and premium perception drops. Presentation is not decoration. Presentation is positioning.",
      listHeading: "What restaurants lose with static presentation",
      points: [
        "Craving trigger and emotional momentum",
        "Clarity for ingredients and allergen confidence",
        "Story depth behind each signature dish",
        "A memorable digital impression worth sharing"
      ]
    },
    experience: {
      eyebrow: "The Experience",
      heading: "Guests don't just read your menu. They explore it.",
      body: "A modern interactive layer that blends 3D dish visualization, language flexibility, dietary context, and storytelling.",
      cards: [
        {
          title: "Immersive Dish Preview",
          body: "Slow, tactile product viewing designed to create anticipation before ordering.",
          mediaType: "poster",
          src: FEATURED_DISH_ASSETS.poster,
          alt: "Short ribs dish poster"
        },
        {
          title: "Interactive Motion Layer",
          body: "A fluid interactive preview that reveals depth and detail as guests explore.",
          mediaType: "spriteSheet",
          src: FEATURED_DISH_ASSETS.spriteHq,
          spriteMeta: SPRITE_META,
          alt: "MarryGo interactive depth preview"
        },
        {
          title: "Visual Appetite Trigger",
          body: "Real food texture and atmosphere to help guests decide faster with more confidence.",
          mediaType: "animatedWebp",
          src: FEATURED_DISH_ASSETS.spriteMd,
          alt: "Short ribs dish animation"
        }
      ]
    },
    demos: {
      eyebrow: "Live Demos",
      heading: "Published demo experiences"
    },
    hospitality: {
      eyebrow: "Designed for Visual-First Dining Venues",
      heading: "Built for independent venues where presentation is part of the experience.",
      body:
        "Creativivid Studio creates immersive menu experiences for boutique cafes, brunch studios, cocktail or speakeasy bars, dessert-forward concepts, chef-led dining venues, and Irish pubs.",
      lines: ["It's experience.", "It's culture.", "It's story.", "It's your brand, made tangible."]
    },
    impact: {
      eyebrow: "Why It Works",
      heading: "Business impact, not visual noise.",
      body:
        "Interactive 3D showcases increase engagement and reduce ordering hesitation while elevating premium perception.",
      items: [
        {
          title: "Increase Engagement Time",
          body: "Guests spend longer exploring dishes, stories, and details before deciding."
        },
        {
          title: "Elevate Premium Perception",
          body: "Presentation signals quality before the first bite reaches the table."
        },
        {
          title: "Stand Out from Competitors",
          body: "Most restaurants still use static menus; immersive interaction differentiates instantly."
        },
        {
          title: "Encourage Social Sharing",
          body: "Visual-first experiences generate screenshots, conversation, and organic mentions."
        },
        {
          title: "Reduce Ordering Hesitation",
          body: "Dish clarity and context shorten decision time for international guests."
        },
        {
          title: "Improve Guest Confidence",
          body: "Allergen and dietary cues make ordering clearer and more comfortable."
        }
      ]
    },
    howItWorks: {
      eyebrow: "How It Works",
      heading: "Two capture paths. One production flow.",
      body: "We handle technical complexity end-to-end so your team can stay focused on guest experience.",
      pathATitle: "Option 1: On-Site Capture",
      pathASubtitle: "Best for venues that want full production support",
      pathAIntroSteps: ["We visit your location.", "We capture your dishes professionally."],
      pathBTitle: "Option 2: Remote Capture",
      pathBSubtitle: "Best for faster, flexible scheduling",
      pathBIntroSteps: ["You record a guided few-minutes clip per item."],
      sharedTitle: "Shared Production & Delivery Flow",
      sharedSteps: [
        "We process immersive 3D assets.",
        "We build your interactive web experience.",
        "You receive a ready-to-deploy interactive website.",
        "Optional domain and server setup assistance is available."
      ]
    },
    deliverables: {
      eyebrow: "What You Receive",
      heading: "Complete ownership and deployment-ready delivery.",
      items: [
        "Fully responsive interactive website",
        "Immersive 3D dish visualizations",
        "Menu language support: Spanish, English, French, Portuguese, Italian, German, Japanese, Korean, Chinese.",
        "Clear vegan and allergen indicators",
        "Story-rich dish detail structure",
        "Custom brand styling and direction",
        "Deployment assistance (optional add-on)",
        "Full ownership of delivered files"
      ]
    },
    collaboration: {
      eyebrow: "Collaboration Options",
      heading: "Selective engagement model",
      intro: [
        "Creativivid Studio works with a limited number of independent dining venues per quarter to maintain creative and technical excellence.",
        "Pricing is structured around a simple setup fee and the number of dishes included in the experience. Restaurants can begin with a focused selection and expand the experience over time."
      ],
      standardPricing: {
        title: "Standard Project Pricing",
        items: [
          {
            label: "Base setup",
            price: "€500",
            body: "Project setup, interactive menu structure, visual environment configuration, and deployment preparation."
          },
          {
            label: "Dish digitization",
            price: "€100 per dish",
            body: "Dish capture and processing, visual optimization, and integration into the interactive menu."
          },
          {
            label: "Typical project investment",
            price: "€1,200 – €3,000",
            body: "Final pricing depends primarily on the number of dishes included.",
            emphasis: true
          }
        ],
        examplesTitle: "Pricing examples",
        examples: [
          { label: "10 dishes", price: "€1,500" },
          { label: "15 dishes", price: "€2,000" },
          { label: "25 dishes", price: "€3,000" }
        ]
      },
      included: {
        title: "Included in every project",
        items: [
          "Interactive menu website",
          "Dish visual integration",
          "Multi-language menu support",
          "Deployment assistance",
          "1 year of menu updates included"
        ]
      },
      updatesIncluded: {
        title: "1 year of menu updates included",
        items: [
          "Price changes",
          "Dish name adjustments",
          "Description edits",
          "Presentation background changes",
          "Seasonal refinements"
        ],
        body: "These updates help keep the menu accurate as your offerings evolve.",
        note: "New dishes are not included in these updates."
      },
      newDishes: {
        title: "Add new dishes later",
        items: [
          { label: "Standard addition", price: "€100 per new dish" },
          { label: "Seasonal bundle", price: "€400 for 5 dishes" }
        ],
        body: "The bundle is useful for seasonal menu updates or new menu sections."
      },
      launchOffer: {
        title: "Launch Offer — First 5 Restaurants",
        items: [
          "No €500 setup fee",
          "€70 per dish digitized",
          "1 year of menu updates included",
          "Limited availability"
        ],
        body: "This offer is intended for the first restaurants participating during the launch stage of the studio's interactive menu format."
      },
      aftercareNote:
        "After the first year, ongoing menu updates and maintenance are available for €100 per year, including hosting, technical maintenance, and continued menu updates."
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Clear answers before we start",
      items: [
        {
          q: "Do guests need to download an app?",
          a: "No. Everything runs directly in the browser on mobile and desktop."
        },
        {
          q: "Can we update dishes later?",
          a: "Yes. During the first year, text, pricing, and presentation refinements are included. New dishes can be added later with separate dish pricing."
        },
        {
          q: "What if we do not have professional recording equipment?",
          a: "We provide a practical remote capture guide and quality checks before production starts."
        },
        {
          q: "Is this only for luxury restaurants?",
          a: "It is for independent restaurants and dining venues that value presentation, storytelling, and differentiation."
        }
      ]
    },
    about: {
      eyebrow: "About the Studio",
      heading: "Engineering precision meets cinematic presentation.",
      body:
        "Creativivid Studio blends AI and computer vision expertise with visual storytelling to craft premium interactive menu experiences."
    },
    consultation: {
      heading: "Elevate how guests experience your menu.",
      body:
        "If your brand values presentation, story, and differentiation, let's discuss your concept and evaluate strategic fit."
    }
  },
  es: {
    hero: {
      eyebrow: "Estudio de Experiencias 3D Inmersivas",
      headline: "Diseñado para ser deseado.",
      subheadline:
        "Menús 3D interactivos e inmersivos para restaurantes modernos que quieren atraer, informar y entusiasmar a sus clientes antes del primer bocado.",
      microValue: "Multilenguaje. Visual. Narrativo. Con alérgenos claros."
    },
    credibility: [
      "Con base en Alemania, colaboramos con restaurantes y espacios gastronómicos independientes a nivel internacional.",
      "Idiomas de menú: español, inglés, francés, portugués, italiano, alemán, japonés, coreano y chino.",
      "Sin suscripción. Entrega de archivos totalmente propios.",
      "Estudio selectivo: proyectos limitados por trimestre para asegurar calidad."
    ],
    problem: {
      eyebrow: "El Problema Real",
      heading: "Los menús estáticos rara vez generan emoción.",
      bodyA:
        "En Alemania y Europa, muchos restaurantes aún dependen de menús impresos o PDF estáticos. Para clientes internacionales, ingredientes poco familiares y contexto de alérgenos poco claro generan fricción al ordenar.",
      bodyB:
        "Cuando los clientes no pueden visualizar lo que piden, aumenta la duda y baja la percepción premium. La presentación no es decoración. La presentación es posicionamiento.",
      listHeading: "Lo que pierden los restaurantes con una presentación estática",
      points: [
        "Impacto emocional y deseo inmediato",
        "Claridad de ingredientes y confianza en alérgenos",
        "Profundidad narrativa de cada plato insignia",
        "Una impresión digital memorable para compartir"
      ]
    },
    experience: {
      eyebrow: "La Experiencia",
      heading: "Tus clientes no solo leen el menú. Lo exploran.",
      body: "Una capa interactiva moderna que combina visualización 3D, flexibilidad de idioma, contexto alimentario y narrativa.",
      cards: [
        {
          title: "Vista Inmersiva del Plato",
          body: "Exploracion visual tactil y pausada para crear anticipacion antes de ordenar.",
          mediaType: "poster",
          src: FEATURED_DISH_ASSETS.poster,
          alt: "Vista del plato MarryGo"
        },
        {
          title: "Capa de Movimiento Interactivo",
          body: "Vista interactiva fluida que revela profundidad y detalle mientras se explora.",
          mediaType: "spriteSheet",
          src: FEATURED_DISH_ASSETS.spriteHq,
          spriteMeta: SPRITE_META,
          alt: "Vista interactiva de profundidad MarryGo"
        },
        {
          title: "Disparador Visual de Apetito",
          body: "Textura real y ambiente visual para decidir más rápido y con mayor seguridad.",
          mediaType: "animatedWebp",
          src: FEATURED_DISH_ASSETS.spriteMd,
          alt: "Animacion del plato CafeBrunch"
        }
      ]
    },
    demos: {
      eyebrow: "Demos en Vivo",
      heading: "Experiencias demo publicadas"
    },
    hospitality: {
      eyebrow: "Diseñado para Espacios Gastronomicos Visuales",
      heading: "Creado para espacios independientes donde la presentación es parte de la experiencia.",
      body:
        "Creativivid Studio crea experiencias de menú inmersivas para cafes boutique, brunch studios, bares de cócteles o speakeasy, conceptos de postres, espacios de autor e Irish pubs.",
      lines: ["Es experiencia.", "Es cultura.", "Es historia.", "Es tu marca, hecha tangible."]
    },
    impact: {
      eyebrow: "Por Que Funciona",
      heading: "Impacto de negocio, no ruido visual.",
      body:
        "Las experiencias 3D interactivas aumentan el engagement, reducen la duda al ordenar y elevan la percepción premium.",
      items: [
        {
          title: "Aumenta el Tiempo de Interaccion",
          body: "Los clientes pasan más tiempo explorando platos, historias y detalles antes de decidir."
        },
        {
          title: "Eleva la Percepcion Premium",
          body: "La presentación comunica calidad antes del primer bocado."
        },
        {
          title: "Diferencia Frente a la Competencia",
          body: "La mayoría aún usa menús estáticos; la interacción inmersiva destaca de inmediato."
        },
        {
          title: "Impulsa Compartidos en Redes",
          body: "Las experiencias visuales generan capturas, conversacion y menciones organicas."
        },
        {
          title: "Reduce la Duda al Ordenar",
          body: "La claridad del plato y su contexto reducen el tiempo de decision de clientes internacionales."
        },
        {
          title: "Mejora la Confianza del Cliente",
          body: "Indicadores de dieta y alérgenos hacen el pedido más claro y seguro."
        }
      ]
    },
    howItWorks: {
      eyebrow: "Como Funciona",
      heading: "Dos rutas de captura. Un flujo de producción.",
      body: "Nos encargamos de la complejidad técnica de principio a fin para que tu equipo se enfoque en la experiencia del cliente.",
      pathATitle: "Opción 1: Captura en Sitio",
      pathASubtitle: "Ideal para espacios que buscan soporte completo de producción",
      pathAIntroSteps: ["Visitamos tu ubicación.", "Capturamos tus platos de forma profesional."],
      pathBTitle: "Opción 2: Captura Remota",
      pathBSubtitle: "Ideal para tiempos más rápidos y flexibles",
      pathBIntroSteps: ["Tu grabas un clip guiado de pocos minutos por item."],
      sharedTitle: "Flujo Compartido de Produccion y Entrega",
      sharedSteps: [
        "Procesamos activos 3D inmersivos.",
        "Construimos tu experiencia web interactiva.",
        "Recibes un sitio interactivo listo para desplegar.",
        "Soporte opcional para dominio y servidor disponible."
      ]
    },
    deliverables: {
      eyebrow: "Lo Que Recibes",
      heading: "Entrega completa, lista para desplegar y con propiedad total.",
      items: [
        "Sitio interactivo totalmente responsive",
        "Visualizaciones 3D inmersivas de platos",
        "Idiomas de menú: español, inglés, francés, portugués, italiano, alemán, japonés, coreano y chino.",
        "Indicadores claros de dieta y alérgenos",
        "Estructura narrativa para detalle de platos",
        "Direccion visual y estilo de marca personalizado",
        "Soporte de despliegue (opcional)",
        "Propiedad total de los archivos entregados"
      ]
    },
    collaboration: {
      eyebrow: "Opciones de Colaboración",
      heading: "Modelo de colaboracion selectivo",
      intro: [
        "Creativivid Studio trabaja con un número limitado de espacios gastronómicos independientes por trimestre para mantener excelencia creativa y técnica.",
        "El precio se estructura de forma transparente con una tarifa base simple y el número de platos incluidos. Los restaurantes pueden comenzar con una selección enfocada y ampliar la experiencia con el tiempo."
      ],
      standardPricing: {
        title: "Precio estándar del proyecto",
        items: [
          {
            label: "Configuración base",
            price: "€500",
            body: "Configuración del proyecto, estructura del menú interactivo, configuración del entorno visual y preparación para el despliegue."
          },
          {
            label: "Digitalización por plato",
            price: "€100 por plato",
            body: "Captura o procesamiento del plato, optimización visual e integración en el menú interactivo."
          },
          {
            label: "Inversión típica del proyecto",
            price: "€1,200 – €3,000",
            body: "El precio final depende principalmente del número de platos incluidos.",
            emphasis: true
          }
        ],
        examplesTitle: "Ejemplos de precio",
        examples: [
          { label: "10 platos", price: "€1,500" },
          { label: "15 platos", price: "€2,000" },
          { label: "25 platos", price: "€3,000" }
        ]
      },
      included: {
        title: "Incluido en cada proyecto",
        items: [
          "Sitio web de menú interactivo",
          "Integración visual de platos",
          "Soporte de menú multilenguaje",
          "Asistencia de despliegue",
          "1 año de actualizaciones del menú incluido"
        ]
      },
      updatesIncluded: {
        title: "1 año de actualizaciones del menú incluido",
        items: [
          "Cambios de precio",
          "Ajustes en nombres de platos",
          "Ediciones de descripciones",
          "Cambios en el fondo de presentación",
          "Refinamientos estacionales"
        ],
        body: "Estas actualizaciones están incluidas para mantener el menú preciso y alineado con la evolución de tu oferta.",
        note: "Los platos nuevos no están incluidos en estas actualizaciones."
      },
      newDishes: {
        title: "Agregar nuevos platos después",
        items: [
          { label: "Adición estándar", price: "€100 por plato nuevo" },
          { label: "Paquete estacional", price: "€400 por 5 platos" }
        ],
        body: "El paquete es útil para actualizaciones estacionales del menú o nuevas secciones."
      },
      launchOffer: {
        title: "Oferta de lanzamiento — Primeros 5 restaurantes",
        items: [
          "Sin tarifa de configuración de €500",
          "€70 por plato digitalizado",
          "1 año de actualizaciones del menú incluido",
          "Disponibilidad limitada"
        ],
        body: "Esta oferta está pensada para los primeros restaurantes que participen en la etapa de lanzamiento del formato de menú interactivo del estudio."
      },
      aftercareNote:
        "Después del primer año, las actualizaciones continuas del menú y el mantenimiento están disponibles por €100 al año, incluyendo hosting, mantenimiento técnico y actualizaciones continuas del menú."
    },
    faq: {
      eyebrow: "Preguntas Frecuentes",
      heading: "Respuestas claras antes de empezar",
      items: [
        {
          q: "Los clientes necesitan descargar una app?",
          a: "No. Todo funciona directamente en el navegador, en movil y desktop."
        },
        {
          q: "Podemos actualizar platos despues?",
          a: "Sí. Durante el primer año se incluyen ajustes de texto, precio y presentación. Los platos nuevos pueden añadirse después con precio por plato."
        },
        {
          q: "Que pasa si no tenemos equipo profesional de grabacion?",
          a: "Entregamos una guia practica de captura remota y validamos calidad antes de producir."
        },
        {
          q: "Esto es solo para restaurantes de lujo?",
          a: "Es para restaurantes y espacios gastronómicos independientes que valoran presentación, historia y diferenciación."
        }
      ]
    },
    about: {
      eyebrow: "Sobre el Estudio",
      heading: "Precisión de ingeniería con presentación cinemática.",
      body:
        "Creativivid Studio combina experiencia en IA y visión por computadora con narrativa visual para crear experiencias de menú interactivas premium."
    },
    consultation: {
      heading: "Eleva la forma en que tus clientes viven tu menú.",
      body:
        "Si tu marca valora presentación, historia y diferenciación, conversemos tu concepto y evaluemos si hay encaje estratégico."
    }
  },
  de: {
    hero: {
      eyebrow: "Studio für Immersive 3D Experiences",
      headline: "Gestaltet, um begehrt zu werden.",
      subheadline:
        "Immersive interaktive 3D-Menüs für moderne Restaurants, die Gäste schon vor dem ersten Bissen begeistern wollen.",
      microValue: "Mehrsprachig. Visuell. Story-basiert. Allergen-sensibel."
    },
    credibility: [
      "Mit Sitz in Deutschland arbeiten wir international mit unabhängigen Restaurants und Dining Venues zusammen.",
      "Menüsprachen: Spanisch, Englisch, Französisch, Portugiesisch, Italienisch, Deutsch, Japanisch, Koreanisch, Chinesisch.",
      "Kein Abo erforderlich. Vollständig übergebene Dateien.",
      "Selektives Studio: begrenzte Projekte pro Quartal für hohe Qualität."
    ],
    problem: {
      eyebrow: "Das Eigentliche Problem",
      heading: "Statische Menüs erzeugen selten Emotion.",
      bodyA:
        "In Deutschland und Europa setzen viele Restaurants noch auf Papiermenüs oder statische PDFs. Für internationale Gäste sorgen unbekannte Zutaten und unklarer Allergenkontext für Reibung beim Bestellen.",
      bodyB:
        "Wenn Gäste nicht sehen können, was sie bestellen, steigt Unsicherheit und die Premium-Wahrnehmung sinkt. Präsentation ist nicht Dekoration. Präsentation ist Positionierung.",
      listHeading: "Was Restaurants durch statische Präsentation verlieren",
      points: [
        "Emotionale Dynamik und Appetitimpuls",
        "Klarheit bei Zutaten und Allergenen",
        "Story-Tiefe hinter Signature-Gerichten",
        "Ein digitaler Eindruck, der in Erinnerung bleibt"
      ]
    },
    experience: {
      eyebrow: "Die Experience",
      heading: "Gäste lesen dein Menü nicht nur. Sie erkunden es.",
      body: "Eine moderne interaktive Ebene aus 3D-Visualisierung, Sprachflexibilität, Ernährungskontext und Storytelling.",
      cards: [
        {
          title: "Immersive Dish Preview",
          body: "Langsame, taktile Produktansicht für mehr Vorfreude vor der Bestellung.",
          mediaType: "poster",
          src: FEATURED_DISH_ASSETS.poster,
          alt: "MarryGo Gerichtsvorschau"
        },
        {
          title: "Interaktive Bewegungsebene",
          body: "Fließende interaktive Vorschau, die Tiefe und Details beim Erkunden sichtbar macht.",
          mediaType: "spriteSheet",
          src: FEATURED_DISH_ASSETS.spriteHq,
          spriteMeta: SPRITE_META,
          alt: "MarryGo interaktive Tiefenvorschau"
        },
        {
          title: "Visueller Appetit-Trigger",
          body: "Echte Textur und visuelle Atmosphäre helfen bei schnelleren und sichereren Entscheidungen.",
          mediaType: "animatedWebp",
          src: FEATURED_DISH_ASSETS.spriteMd,
          alt: "CafeBrunch Gerichtsanimation"
        }
      ]
    },
    demos: {
      eyebrow: "Live-Demos",
      heading: "Veröffentlichte Demo-Erlebnisse"
    },
    hospitality: {
      eyebrow: "Für visuell starke Dining Venues entwickelt",
      heading: "Für unabhängige Locations, in denen Präsentation Teil der Experience ist.",
      body:
        "Creativivid Studio entwickelt immersive Menü-Erlebnisse für Boutique-Cafes, Brunch-Studios, Cocktail- oder Speakeasy-Bars, Dessert-Konzepte, chefgeführte Dining Venues und Irish Pubs.",
      lines: ["Es ist Experience.", "Es ist Kultur.", "Es ist Story.", "Es ist deine Marke - greifbar gemacht."]
    },
    impact: {
      eyebrow: "Warum es funktioniert",
      heading: "Business Impact statt visueller Lärm.",
      body:
        "Interaktive 3D-Showcases steigern Engagement, reduzieren Bestellunsicherheit und erhöhen die Premium-Wahrnehmung.",
      items: [
        {
          title: "Mehr Engagement-Zeit",
          body: "Gäste verbringen mehr Zeit mit der Erkundung von Gerichten, Stories und Details."
        },
        {
          title: "Stärkere Premium-Wahrnehmung",
          body: "Präsentation signalisiert Qualität schon vor dem ersten Bissen."
        },
        {
          title: "Klarer Wettbewerbsvorteil",
          body: "Viele Restaurants nutzen weiterhin statische Menüs; immersive Interaktion differenziert sofort."
        },
        {
          title: "Mehr Social Sharing",
          body: "Visuelle Erlebnisse erzeugen Screenshots, Gespräche und organische Erwähnungen."
        },
        {
          title: "Weniger Unsicherheit bei Bestellungen",
          body: "Mehr Klarheit zum Gericht verkürzt die Entscheidungszeit internationaler Gäste."
        },
        {
          title: "Mehr Sicherheit für Gäste",
          body: "Allergen- und Ernährungshinweise machen Bestellungen klarer und angenehmer."
        }
      ]
    },
    howItWorks: {
      eyebrow: "So funktioniert es",
      heading: "Zwei Capture-Wege. Ein Produktionsfluss.",
      body: "Wir übernehmen die technische Komplexität end-to-end, damit dein Team beim Gästeerlebnis bleiben kann.",
      pathATitle: "Option 1: Capture vor Ort",
      pathASubtitle: "Ideal für Venues mit Wunsch nach voller Produktionsbegleitung",
      pathAIntroSteps: ["Wir besuchen deine Location.", "Wir erfassen deine Gerichte professionell."],
      pathBTitle: "Option 2: Remote Capture",
      pathBSubtitle: "Ideal für schnellere, flexible Zeitpläne",
      pathBIntroSteps: ["Du zeichnest pro Item einen gefuehrten Kurzclip auf."],
      sharedTitle: "Gemeinsamer Produktions- und Delivery-Flow",
      sharedSteps: [
        "Wir verarbeiten immersive 3D-Assets.",
        "Wir bauen dein interaktives Web-Erlebnis.",
        "Du erhältst eine sofort einsetzbare interaktive Website.",
        "Optionale Hilfe bei Domain- und Server-Setup verfügbar."
      ]
    },
    deliverables: {
      eyebrow: "Was du erhältst",
      heading: "Vollständige Ownership und deployment-fähige Lieferung.",
      items: [
        "Voll responsive interaktive Website",
        "Immersive 3D-Gerichtsvisualisierungen",
        "Menüsprachen: Spanisch, Englisch, Französisch, Portugiesisch, Italienisch, Deutsch, Japanisch, Koreanisch, Chinesisch.",
        "Klare Vegan- und Allergenhinweise",
        "Story-starke Struktur für Gerichtsdetails",
        "Individuelle Brand-Gestaltung",
        "Deployment-Unterstuetzung (optional)",
        "Vollständige Dateiübergabe"
      ]
    },
    collaboration: {
      eyebrow: "Zusammenarbeitsoptionen",
      heading: "Selektives Engagement-Modell",
      intro: [
        "Creativivid Studio arbeitet pro Quartal mit einer begrenzten Zahl unabhängiger Dining Venues, um kreative und technische Exzellenz zu sichern.",
        "Die Preisgestaltung ist transparent aufgebaut: mit einer einfachen Grundgebühr und der Anzahl der eingebundenen Gerichte. Restaurants können mit einer fokussierten Auswahl starten und die Experience später erweitern."
      ],
      standardPricing: {
        title: "Standard-Projektpreis",
        items: [
          {
            label: "Basis-Setup",
            price: "€500",
            body: "Projektsetup, Struktur des interaktiven Menüs, Konfiguration der visuellen Umgebung und Vorbereitung des Deployments."
          },
          {
            label: "Gerichtsdigitalisierung",
            price: "€100 pro Gericht",
            body: "Erfassung oder Verarbeitung des Gerichts, visuelle Optimierung und Integration in das interaktive Menü."
          },
          {
            label: "Typische Projektinvestition",
            price: "€1,200 – €3,000",
            body: "Der Endpreis hängt vor allem von der Anzahl der eingebundenen Gerichte ab.",
            emphasis: true
          }
        ],
        examplesTitle: "Preisbeispiele",
        examples: [
          { label: "10 Gerichte", price: "€1,500" },
          { label: "15 Gerichte", price: "€2,000" },
          { label: "25 Gerichte", price: "€3,000" }
        ]
      },
      included: {
        title: "In jedem Projekt enthalten",
        items: [
          "Interaktive Menü-Website",
          "Visuelle Gerichtsintegration",
          "Mehrsprachige Menüunterstützung",
          "Deployment-Unterstützung",
          "1 Jahr Menüupdates inklusive"
        ]
      },
      updatesIncluded: {
        title: "1 Jahr Menüupdates inklusive",
        items: [
          "Preisänderungen",
          "Anpassungen von Gerichtsnamen",
          "Änderungen an Beschreibungen",
          "Änderungen des Präsentationshintergrunds",
          "Saisonale Verfeinerungen"
        ],
        body: "Diese Anpassungen sind inklusive, damit dein Menü korrekt bleibt und zu deinem sich entwickelnden Angebot passt.",
        note: "Neue Gerichte sind in diesen Updates nicht enthalten."
      },
      newDishes: {
        title: "Neue Gerichte später ergänzen",
        items: [
          { label: "Standard-Ergänzung", price: "€100 pro neues Gericht" },
          { label: "Saisonales Bundle", price: "€400 für 5 Gerichte" }
        ],
        body: "Das Bundle eignet sich für saisonale Kartenupdates oder neue Menübereiche."
      },
      launchOffer: {
        title: "Launch-Angebot — Erste 5 Restaurants",
        items: [
          "Keine €500 Setup-Gebühr",
          "€70 pro digitalisiertem Gericht",
          "1 Jahr Menüupdates inklusive",
          "Begrenzte Verfügbarkeit"
        ],
        body: "Dieses Angebot ist für die ersten Restaurants gedacht, die sich in der Launch-Phase am interaktiven Menüformat des Studios beteiligen."
      },
      aftercareNote:
        "Nach dem ersten Jahr sind laufende Menüupdates und Wartung für €100 pro Jahr verfügbar, inklusive Hosting, technischer Wartung und fortlaufenden Menüupdates."
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Klare Antworten vor dem Start",
      items: [
        {
          q: "Müssen Gäste eine App herunterladen?",
          a: "Nein. Alles läuft direkt im Browser auf Mobile und Desktop."
        },
        {
          q: "Können wir Gerichte später aktualisieren?",
          a: "Ja. Im ersten Jahr sind Text-, Preis- und Präsentationsanpassungen inklusive. Neue Gerichte können später separat pro Gericht ergänzt werden."
        },
        {
          q: "Was, wenn wir kein professionelles Aufnahme-Equipment haben?",
          a: "Wir liefern eine praxisnahe Remote-Capture-Anleitung und Qualitätschecks vor Produktionsstart."
        },
        {
          q: "Ist das nur für Luxusrestaurants?",
          a: "Es ist für unabhängige Restaurants und Dining Venues, die Präsentation, Storytelling und Differenzierung schätzen."
        }
      ]
    },
    about: {
      eyebrow: "Über das Studio",
      heading: "Engineering-Präzision trifft cineastische Präsentation.",
      body:
        "Creativivid Studio verbindet KI- und Computer-Vision-Expertise mit visueller Story, um premium interaktive Menü-Erlebnisse zu gestalten."
    },
    consultation: {
      heading: "Steigere, wie Gäste dein Menü erleben.",
      body:
        "Wenn deine Marke Präsentation, Story und Differenzierung schätzt, sprechen wir über dein Konzept und prüfen den strategischen Fit."
    }
  }
};

const UI_TEXT_BY_LOCALE = {
  en: {
    meta: {
      title: "Creativivid Studio | Immersive 3D Menus",
      description: "Creativivid Studio creates immersive 3D menu experiences for independent restaurants and dining venues in Germany and beyond."
    },
    skipLink: "Skip to content",
    brandAria: "Creativivid Studio home",
    nav: {
      aria: "Main navigation",
      experience: "Experience",
      demos: "Demos",
      pricing: "Pricing",
      consultation: "Consultation"
    },
    locale: {
      label: "Language"
    },
    hero: {
      ctaDemo: "View Interactive Demo",
      ctaConsult: "Book a Consultation",
      chipLanguages: "9 menu languages",
      chipDietary: "Dietary & allergen tags",
      chipScroll: "Drag or swipe to rotate",
      dragHint: "Drag or swipe to rotate"
    },
    media: {
      loadingAria: "Loading visual asset"
    },
    demos: {
      countLabel: "Showing {visible} of {total} demos",
      searchLabel: "Find a demo",
      searchPlaceholder: "Type a demo name...",
      cardCta: "Open demo",
      previewFrameTitle: "Preview of {name}",
      emptyState: "No demos available yet. Publish exports to /demos/ first.",
      noResults: "No demos match your search.",
      untitled: "Untitled demo",
      publishedDemo: "Published demo",
      statusFallback: "Using local fallback manifest ({manifestUrl} unavailable).",
      statusError: "Could not load demos manifest from {manifestUrl}."
    },
    collaboration: {
      applyCta: "Request a Consultation"
    },
    about: {
      signatureLine:
        "Built by an international engineering-led team with experience across Mexico, the USA, and Germany in agency, enterprise, and product environments."
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
      optionalDetailsSummary: "Optional details (helps us prepare the consultation)",
      cityCountryLabel: "City / Country",
      estimatedMenuSizeLabel: "Estimated Menu Size",
      estimatedMenuSize1to10: "1-10 dishes",
      estimatedMenuSize10to25: "10-25 dishes",
      estimatedMenuSize25plus: "25+ dishes",
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
      submitIdle: "Send Consultation Request",
      submitSending: "Sending...",
      reassuranceText: "No obligation - just a short conversation about possibilities.",
      statusSending: "Sending your request...",
      statusRequired: "Please complete menu situation, restaurant/brand, contact name, and email.",
      statusInvalidEmail: "Please provide a valid email address.",
      statusNoConsent: "Please provide consent to continue.",
      statusEndpoint:
        "Consultation form is not connected yet. Replace FORM_ENDPOINT in app.js with your Formspree endpoint.",
      statusSuccess: "Thank you. Your consultation request has been received.",
      statusError: "Request failed. Please try again shortly.",
      successHeadline: "Your consultation request has been received.",
      successBodyLine1: "Thank you for reaching out to Creativivid Studio.",
      successBodyLine2:
        "We'll review your message and respond shortly to discuss how we can elevate your restaurant's menu experience.",
      successFootnote: "Typical response time: within 24 hours.",
      successDemoText: "While you wait, explore one of our interactive demos.",
      successDemoCta: "View Interactive Demo"
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
      title: "Creativivid Studio | Menus 3D Inmersivos",
      description: "Creativivid Studio crea experiencias de menú 3D inmersivas para restaurantes y espacios gastronómicos independientes en Alemania y más allá."
    },
    skipLink: "Saltar al contenido",
    brandAria: "Inicio de Creativivid Studio",
    nav: {
      aria: "Navegación principal",
      experience: "Experiencia",
      demos: "Demos",
      pricing: "Precios",
      consultation: "Consulta"
    },
    locale: {
      label: "Idioma"
    },
    hero: {
      ctaDemo: "Ver demo interactiva",
      ctaConsult: "Reservar una consulta",
      chipLanguages: "9 idiomas de menú",
      chipDietary: "Etiquetas dietarias y de alérgenos",
      chipScroll: "Arrastra o desliza para rotar",
      dragHint: "Arrastra o desliza para rotar"
    },
    media: {
      loadingAria: "Cargando recurso visual"
    },
    demos: {
      countLabel: "Mostrando {visible} de {total} demos",
      searchLabel: "Buscar una demo",
      searchPlaceholder: "Escribe el nombre de una demo...",
      cardCta: "Abrir demo",
      previewFrameTitle: "Vista previa de {name}",
      emptyState: "Aun no hay demos disponibles. Publica exportaciones en /demos/ primero.",
      noResults: "Ninguna demo coincide con tu busqueda.",
      untitled: "Demo sin titulo",
      publishedDemo: "Demo publicada",
      statusFallback: "Usando manifiesto local de respaldo ({manifestUrl} no disponible).",
      statusError: "No se pudo cargar el manifiesto de demos desde {manifestUrl}."
    },
    collaboration: {
      applyCta: "Solicitar una consulta"
    },
    about: {
      signatureLine:
        "Creado por un equipo internacional con enfoque de ingeniería y experiencia en México, Estados Unidos y Alemania en entornos de agencia, empresa y producto."
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
      optionalDetailsSummary: "Detalles opcionales (nos ayudan a preparar la consulta)",
      cityCountryLabel: "Ciudad / País",
      estimatedMenuSizeLabel: "Tamaño estimado del menú",
      estimatedMenuSize1to10: "1-10 platos",
      estimatedMenuSize10to25: "10-25 platos",
      estimatedMenuSize25plus: "25+ platos",
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
      submitIdle: "Enviar solicitud de consulta",
      submitSending: "Enviando...",
      reassuranceText: "Sin compromiso: solo una breve conversación sobre posibilidades.",
      statusSending: "Enviando tu solicitud...",
      statusRequired: "Completa situación del menú, restaurante/marca, nombre de contacto y correo electrónico.",
      statusInvalidEmail: "Ingresa un correo electrónico válido.",
      statusNoConsent: "Debes otorgar consentimiento para continuar.",
      statusEndpoint:
        "El formulario aún no está conectado. Reemplaza FORM_ENDPOINT en app.js con tu endpoint de Formspree.",
      statusSuccess: "Gracias. Tu solicitud de consulta fue recibida.",
      statusError: "La solicitud falló. Inténtalo de nuevo en breve.",
      successHeadline: "Tu solicitud de consulta ha sido recibida.",
      successBodyLine1: "Gracias por contactar a Creativivid Studio.",
      successBodyLine2:
        "Revisaremos tu mensaje y te responderemos pronto para hablar sobre cómo elevar la experiencia del menú de tu restaurante.",
      successFootnote: "Tiempo de respuesta habitual: dentro de 24 horas.",
      successDemoText: "Mientras esperas, explora una de nuestras demos interactivas.",
      successDemoCta: "Ver demo interactiva"
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
      title: "Creativivid Studio | Immersive 3D-Menüs",
      description: "Creativivid Studio entwickelt immersive 3D-Menü-Erlebnisse für unabhängige Restaurants und Dining Venues in Deutschland und darüber hinaus."
    },
    skipLink: "Zum Inhalt springen",
    brandAria: "Startseite Creativivid Studio",
    nav: {
      aria: "Hauptnavigation",
      experience: "Experience",
      demos: "Demos",
      pricing: "Preise",
      consultation: "Beratung"
    },
    locale: {
      label: "Sprache"
    },
    hero: {
      ctaDemo: "Interaktive Demo ansehen",
      ctaConsult: "Beratung buchen",
      chipLanguages: "9 Menüsprachen",
      chipDietary: "Ernährungs- und Allergenhinweise",
      chipScroll: "Ziehen oder wischen zum Drehen",
      dragHint: "Ziehen oder wischen zum Drehen"
    },
    media: {
      loadingAria: "Visuelles Asset wird geladen"
    },
    demos: {
      countLabel: "{visible} von {total} Demos angezeigt",
      searchLabel: "Demo finden",
      searchPlaceholder: "Demo-Namen eingeben...",
      cardCta: "Demo öffnen",
      previewFrameTitle: "Vorschau von {name}",
      emptyState: "Noch keine Demos verfügbar. Veröffentliche zuerst Exporte nach /demos/.",
      noResults: "Keine Demos passen zu deiner Suche.",
      untitled: "Demo ohne Titel",
      publishedDemo: "Veröffentlichte Demo",
      statusFallback: "Lokales Fallback-Manifest wird verwendet ({manifestUrl} nicht verfügbar).",
      statusError: "Demo-Manifest konnte nicht von {manifestUrl} geladen werden."
    },
    collaboration: {
      applyCta: "Beratung anfragen"
    },
    about: {
      signatureLine:
        "Erstellt von einem internationalen, engineering-orientierten Team mit Erfahrung in Mexiko, den USA und Deutschland in Agentur-, Enterprise- und Produktumfeldern."
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
      optionalDetailsSummary: "Optionale Details (helfen uns bei der Vorbereitung)",
      cityCountryLabel: "Stadt / Land",
      estimatedMenuSizeLabel: "Geschätzte Menügröße",
      estimatedMenuSize1to10: "1-10 Gerichte",
      estimatedMenuSize10to25: "10-25 Gerichte",
      estimatedMenuSize25plus: "25+ Gerichte",
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
      submitIdle: "Beratungsanfrage senden",
      submitSending: "Wird gesendet...",
      reassuranceText: "Unverbindlich - nur ein kurzes Gespräch über Möglichkeiten.",
      statusSending: "Deine Anfrage wird gesendet...",
      statusRequired: "Bitte Menüsituation, Restaurant/Marke, Ansprechperson und E-Mail ausfüllen.",
      statusInvalidEmail: "Bitte eine gültige E-Mail-Adresse eingeben.",
      statusNoConsent: "Bitte Zustimmung erteilen, um fortzufahren.",
      statusEndpoint:
        "Das Formular ist noch nicht verbunden. Ersetze FORM_ENDPOINT in app.js durch deinen Formspree-Endpoint.",
      statusSuccess: "Danke. Deine Beratungsanfrage wurde erhalten.",
      statusError: "Anfrage fehlgeschlagen. Bitte versuche es in Kürze erneut.",
      successHeadline: "Deine Beratungsanfrage ist eingegangen.",
      successBodyLine1: "Danke, dass du Creativivid Studio kontaktiert hast.",
      successBodyLine2:
        "Wir prüfen deine Nachricht und melden uns zeitnah, um zu besprechen, wie wir das Menüerlebnis deines Restaurants aufwerten können.",
      successFootnote: "Typische Antwortzeit: innerhalb von 24 Stunden.",
      successDemoText: "Während du wartest, sieh dir eine unserer interaktiven Demos an.",
      successDemoCta: "Interaktive Demo ansehen"
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

let currentLocale = DEFAULT_LOCALE;
let manifestEntries = [];
let manifestStatusState = null;
const demoPreviewImageCache = new Map();
let demoPreviewObserver = null;
const assetStateByKey = new Map(
  Object.keys(FEATURED_DISH_ASSETS).map((key) => [key, "idle"])
);
const assetStateSubscribersByKey = new Map(
  Object.keys(FEATURED_DISH_ASSETS).map((key) => [key, new Set()])
);
const assetImageCacheByKey = new Map();
const assetPromiseByKey = new Map();
let landingAssetPreloadStarted = false;
let landingMediaDisposers = [];

const htmlEscape = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const formatTemplate = (template, values = {}) =>
  String(template ?? "").replace(/\{([a-zA-Z0-9_]+)\}/g, (_, key) => String(values[key] ?? ""));

const getByPath = (source, path) => {
  const parts = String(path ?? "").split(".").filter(Boolean);
  let current = source;
  for (const part of parts) {
    if (!current || typeof current !== "object") return "";
    current = current[part];
  }
  return typeof current === "string" ? current : "";
};

const getFeaturedDishAssetKeyBySrc = (src) =>
  Object.entries(FEATURED_DISH_ASSETS).find(([, value]) => value === src)?.[0] ?? "poster";

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
  if (!(assetKey in FEATURED_DISH_ASSETS)) {
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
    image.src = FEATURED_DISH_ASSETS[assetKey];
  });

  const wrappedTask = task.finally(() => {
    assetPromiseByKey.delete(assetKey);
  });

  assetPromiseByKey.set(assetKey, wrappedTask);
  return wrappedTask;
};

const startLandingAssetPreload = () => {
  if (landingAssetPreloadStarted) return;
  landingAssetPreloadStarted = true;

  void (async () => {
    await loadLandingAssetImage("spriteHq").catch(() => {});
    await loadLandingAssetImage("spriteMd").catch(() => {});
    await loadLandingAssetImage("poster").catch(() => {});
  })();
};

const setMediaStageState = (stage, state) => {
  if (!stage) return;
  stage.classList.toggle("is-loading-media", state === "loading");
  stage.classList.toggle("is-media-ready", state === "ready");
  stage.classList.toggle("is-media-error", state === "error");
};

const attachDemoParityDragInteractions = (target, callbacks = {}) => {
  let pointerId = null;
  let lastX = 0;

  const onPointerDown = (event) => {
    pointerId = event.pointerId;
    lastX = event.clientX;
    callbacks.onStart?.(event);
    try {
      target.setPointerCapture(pointerId);
    } catch {}
    target.classList.add("is-dragging");
    event.preventDefault();
  };

  const onPointerMove = (event) => {
    if (pointerId !== event.pointerId) return;
    const deltaX = event.clientX - lastX;
    lastX = event.clientX;
    callbacks.onMove?.(deltaX, event);
    event.preventDefault();
  };

  const onPointerRelease = (event) => {
    if (pointerId === null || pointerId !== event.pointerId) return;
    try {
      target.releasePointerCapture(pointerId);
    } catch {}
    pointerId = null;
    target.classList.remove("is-dragging");
    callbacks.onEnd?.(event);
  };

  target.addEventListener("pointerdown", onPointerDown);
  target.addEventListener("pointermove", onPointerMove);
  target.addEventListener("pointerup", onPointerRelease);
  target.addEventListener("pointercancel", onPointerRelease);
  window.addEventListener("pointerup", onPointerRelease);
  window.addEventListener("pointercancel", onPointerRelease);
  target.addEventListener("contextmenu", (event) => event.preventDefault());
  target.addEventListener("dragstart", (event) => event.preventDefault());

  return () => {
    target.removeEventListener("pointerdown", onPointerDown);
    target.removeEventListener("pointermove", onPointerMove);
    target.removeEventListener("pointerup", onPointerRelease);
    target.removeEventListener("pointercancel", onPointerRelease);
    window.removeEventListener("pointerup", onPointerRelease);
    window.removeEventListener("pointercancel", onPointerRelease);
    target.classList.remove("is-dragging");
  };
};

const animateValue = (from, to, durationMs, onUpdate, isCancelled) =>
  new Promise((resolve) => {
    const startAt = performance.now();
    const easing = (value) =>
      value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;

    const step = (now) => {
      if (isCancelled()) {
        resolve(false);
        return;
      }
      const elapsed = Math.max(0, now - startAt);
      const progress = Math.min(1, elapsed / durationMs);
      const eased = easing(progress);
      onUpdate(from + (to - from) * eased);
      if (progress < 1) {
        window.requestAnimationFrame(step);
        return;
      }
      resolve(true);
    };

    window.requestAnimationFrame(step);
  });

const delayIfActive = (durationMs, isCancelled) =>
  new Promise((resolve) => {
    const timer = window.setTimeout(() => resolve(!isCancelled()), durationMs);
    if (isCancelled()) {
      window.clearTimeout(timer);
      resolve(false);
    }
  });

const getDemoParityPixelsPerFrame = () =>
  window.matchMedia("(pointer: coarse)").matches
    ? DEMO_PARITY_PIXELS_PER_FRAME.coarse
    : DEMO_PARITY_PIXELS_PER_FRAME.fine;

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

  if (!rerender) return;

  hydrateLanding();
  hydrateFooterYear();
  refreshManifestStatus();
  renderDemosFiltered();
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
  const offset = Math.max(64, headerHeight + 2);
  document.documentElement.style.setProperty("--header-offset", `${offset}px`);
};

const scrollToSectionWithOffset = (hash, behavior = "smooth") => {
  if (!hash || !hash.startsWith("#")) return;
  const target = document.querySelector(hash);
  if (!target) return;

  const header = document.querySelector(".site-header");
  const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
  const targetTop = window.scrollY + target.getBoundingClientRect().top;
  const scrollTop = Math.max(0, targetTop - headerHeight - 2);

  if (behavior === "instant") {
    window.scrollTo(0, scrollTop);
  } else {
    window.scrollTo({ top: scrollTop, behavior });
  }

  if (history.replaceState) {
    history.replaceState(null, "", hash);
  } else {
    window.location.hash = hash;
  }
};

const setupStickyNavAnchors = () => {
  const headerLinks = Array.from(document.querySelectorAll(".site-header a[href^='#']"));
  if (!headerLinks.length) return;
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const behavior = prefersReducedMotion ? "instant" : "smooth";

  headerLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      if (!document.querySelector(hash)) return;

      event.preventDefault();
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

const renderCredibility = () => {
  const content = getLandingContent();
  const list = document.getElementById("credibility-list");
  if (!list) return;
  list.innerHTML = content.credibility.map((item) => `<li>${htmlEscape(item)}</li>`).join("");
};

const renderProblemList = () => {
  const content = getLandingContent();
  const list = document.getElementById("problem-list");
  if (!list) return;
  list.innerHTML = content.problem.points.map((item) => `<li>${htmlEscape(item)}</li>`).join("");
};

const renderExperience = () => {
  const content = getLandingContent();
  const ui = getUiText();
  const grid = document.getElementById("experience-grid");
  if (!grid) return;
  grid.innerHTML = content.experience.cards
    .map((card) => {
      const mediaType = card.mediaType ?? "poster";
      const mediaKey = getFeaturedDishAssetKeyBySrc(card.src);
      const canvasMarkup =
        mediaType === "spriteSheet"
          ? '<canvas class="landing-media-canvas experience-media-canvas" data-experience-media-canvas hidden></canvas>'
          : "";

      return `
      <article class="experience-card">
        <div class="landing-media-stage experience-media-stage" data-experience-media-stage data-media-type="${htmlEscape(mediaType)}" data-media-key="${htmlEscape(mediaKey)}">
          <div class="landing-media-loader" role="status" aria-live="polite" aria-label="${htmlEscape(ui.media.loadingAria)}">
            <span class="landing-media-loader__spinner" aria-hidden="true"></span>
          </div>
          <img class="landing-media-fallback experience-media-image" src="${htmlEscape(FEATURED_DISH_ASSETS.poster)}" alt="${htmlEscape(card.alt)}" loading="lazy" decoding="async" draggable="false" />
          ${canvasMarkup}
        </div>
        <div class="experience-card-body">
          <h3>${htmlEscape(card.title)}</h3>
          <p>${htmlEscape(card.body)}</p>
        </div>
      </article>
    `;
    })
    .join("");
};

const teardownLandingMedia = () => {
  landingMediaDisposers.forEach((dispose) => {
    try {
      dispose();
    } catch {}
  });
  landingMediaDisposers = [];
};

const createImageStageController = ({ stage, imageNode, primaryAssetKey, fallbackAssetKey = "poster" }) => {
  if (!stage || !(imageNode instanceof HTMLImageElement)) return () => {};
  let disposed = false;
  const unsubscribe = subscribeToAssetState(primaryAssetKey, (state) => {
    if (disposed) return;
    if (state === "loading") setMediaStageState(stage, "loading");
  });

  const applyImageSource = (assetKey) => {
    imageNode.src = FEATURED_DISH_ASSETS[assetKey] ?? FEATURED_DISH_ASSETS.poster;
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
  hintNode,
  assetKey,
  spriteMeta = SPRITE_META,
  cueEnabled = true,
  interactiveEnabled = true,
  cueProfile = SPRITE_CUE_PROFILE_CALM,
  hintReshowIdleMs
}) => {
  if (!stage || !(canvas instanceof HTMLCanvasElement)) return () => {};
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) {
    setMediaStageState(stage, "error");
    return () => {};
  }

  let disposed = false;
  let dragging = false;
  let hintIdleTimer = null;
  let detachDrag = null;
  let cueTimer = null;
  let cueToken = 0;
  const resolvedCueProfile = { ...SPRITE_CUE_PROFILE_CALM, ...(cueProfile ?? {}) };
  const resolvedHintReshowIdleMs = Number.isFinite(Number(hintReshowIdleMs))
    ? Number(hintReshowIdleMs)
    : resolvedCueProfile.hintReshowIdleMs;
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const frameCount = Math.max(
    2,
    Math.min(
      Number(spriteMeta.totalFrames) || SPRITE_META.totalFrames,
      (Number(spriteMeta.columns) || SPRITE_META.columns) * (Number(spriteMeta.rows) || SPRITE_META.rows)
    )
  );
  const centerFrame = Math.floor(frameCount / 2);
  const cueOffset = Math.max(
    Number(resolvedCueProfile.minOffsetFrames) || 3,
    Math.round(frameCount * (Number(resolvedCueProfile.offsetRatio) || 0.1))
  );
  let frameCursor = centerFrame;
  const unsubscribe = subscribeToAssetState(assetKey, (state) => {
    if (disposed) return;
    if (state === "loading") setMediaStageState(stage, "loading");
  });

  canvas.width = Number(spriteMeta.frameWidth) || SPRITE_META.frameWidth;
  canvas.height = Number(spriteMeta.frameHeight) || SPRITE_META.frameHeight;

  const showFallback = () => {
    if (fallbackImage instanceof HTMLElement) fallbackImage.classList.remove("is-hidden");
  };

  const hideFallback = () => {
    if (fallbackImage instanceof HTMLElement) fallbackImage.classList.add("is-hidden");
  };

  const clearHintTimer = () => {
    if (hintIdleTimer) {
      window.clearTimeout(hintIdleTimer);
      hintIdleTimer = null;
    }
  };

  const showHint = () => {
    if (!(hintNode instanceof HTMLElement)) return;
    hintNode.classList.remove("is-hidden");
  };

  const hideHint = () => {
    if (!(hintNode instanceof HTMLElement)) return;
    hintNode.classList.add("is-hidden");
  };

  const scheduleHintReshow = () => {
    if (!(hintNode instanceof HTMLElement)) return;
    clearHintTimer();
    hintIdleTimer = window.setTimeout(() => {
      hintIdleTimer = null;
      if (disposed || dragging) return;
      showHint();
    }, resolvedHintReshowIdleMs);
  };

  const clearCue = () => {
    cueToken += 1;
    if (cueTimer) {
      window.clearTimeout(cueTimer);
      cueTimer = null;
    }
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

  const scheduleCue = (spriteImage, delayMs = resolvedCueProfile.startDelayMs) => {
    if (disposed || prefersReducedMotion || !cueEnabled) return;
    clearCue();
    const token = cueToken;
    cueTimer = window.setTimeout(() => {
      if (disposed || dragging || token !== cueToken) return;
      void runCue(spriteImage, token);
    }, delayMs);
  };

  const runCue = async (spriteImage, token) => {
    const cancelled = () => disposed || dragging || token !== cueToken;
    const cueBaseFrame = frameCursor;
    const cueTargetFrame = cueBaseFrame + cueOffset;
    for (let repeat = 0; repeat < 2; repeat += 1) {
      const forward = await animateValue(cueBaseFrame, cueTargetFrame, resolvedCueProfile.forwardMs, (value) => {
        frameCursor = value;
        drawFrame(spriteImage, frameCursor);
      }, cancelled);
      if (!forward) return;

      const back = await animateValue(cueTargetFrame, cueBaseFrame, resolvedCueProfile.returnMs, (value) => {
        frameCursor = value;
        drawFrame(spriteImage, frameCursor);
      }, cancelled);
      if (!back) return;

      const waited = await delayIfActive(resolvedCueProfile.turnPauseMs, cancelled);
      if (!waited) return;
    }

    cueTimer = window.setTimeout(() => {
      if (cancelled()) return;
      void runCue(spriteImage, token);
    }, resolvedCueProfile.loopIdleMs);
  };

  setMediaStageState(stage, "loading");
  canvas.hidden = true;
  showFallback();

  void loadLandingAssetImage(assetKey)
    .then((spriteImage) => {
      if (disposed) return;
      frameCursor = centerFrame;
      drawFrame(spriteImage, frameCursor);
      canvas.hidden = false;
      hideFallback();
      if (interactiveEnabled) {
        stage.classList.add("is-interactive-ready");
      } else {
        stage.classList.remove("is-interactive-ready");
      }
      setMediaStageState(stage, "ready");

      showHint();
      if (interactiveEnabled) {
        detachDrag = attachDemoParityDragInteractions(canvas, {
          onStart: () => {
            dragging = true;
            hideHint();
            scheduleHintReshow();
            clearCue();
          },
          onMove: (deltaX) => {
            const pixelsPerFrame = getDemoParityPixelsPerFrame();
            frameCursor += (deltaX / pixelsPerFrame) * -1;
            drawFrame(spriteImage, frameCursor);
            hideHint();
            scheduleHintReshow();
          },
          onEnd: () => {
            dragging = false;
            hideHint();
            scheduleHintReshow();
            scheduleCue(spriteImage, resolvedCueProfile.startDelayMs);
          }
        });
      }

      scheduleCue(spriteImage, resolvedCueProfile.startDelayMs);
    })
    .catch(() => {
      if (disposed) return;
      canvas.hidden = true;
      showFallback();
      stage.classList.remove("is-interactive-ready");
      setMediaStageState(stage, "error");
    });

  return () => {
    disposed = true;
    unsubscribe();
    clearCue();
    clearHintTimer();
    if (detachDrag) detachDrag();
    canvas.hidden = true;
    hideHint();
    stage.classList.remove("is-interactive-ready");
    showFallback();
  };
};

const observeStageOnce = (stage, callback) => {
  if (!("IntersectionObserver" in window)) {
    callback();
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (!visible) return;
      observer.disconnect();
      callback();
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  observer.observe(stage);
  return () => observer.disconnect();
};

const setupHeroMediaStage = () => {
  const stage = document.querySelector("[data-hero-media-stage]");
  if (!(stage instanceof HTMLElement)) return;
  const fallbackImage = stage.querySelector("[data-hero-media-fallback]");
  const canvas = stage.querySelector("[data-hero-media-canvas]");
  const hintNode = stage.querySelector("[data-hero-drag-hint]");
  if (hintNode instanceof HTMLElement) hintNode.classList.remove("is-hidden");
  const dispose = createSpriteStageController({
    stage,
    fallbackImage,
    canvas,
    hintNode,
    assetKey: "spriteHq",
    spriteMeta: SPRITE_META,
    cueEnabled: true,
    interactiveEnabled: true,
    cueProfile: SPRITE_CUE_PROFILE_CALM,
    hintReshowIdleMs: SPRITE_CUE_PROFILE_CALM.hintReshowIdleMs
  });
  landingMediaDisposers.push(dispose);
};

const setupExperienceMediaStages = () => {
  const stages = Array.from(document.querySelectorAll("[data-experience-media-stage]"));
  stages.forEach((stage) => {
    if (!(stage instanceof HTMLElement)) return;
    const initStage = () => {
      const mediaType = stage.dataset.mediaType ?? "poster";
      const mediaKey = stage.dataset.mediaKey ?? "poster";
      const imageNode = stage.querySelector(".landing-media-fallback");
      if (imageNode instanceof HTMLImageElement) imageNode.src = FEATURED_DISH_ASSETS.poster;

      if (mediaType === "spriteSheet") {
        const canvas = stage.querySelector("[data-experience-media-canvas]");
        const dispose = createSpriteStageController({
          stage,
          fallbackImage: imageNode,
          canvas,
          hintNode: null,
          assetKey: mediaKey,
          spriteMeta: SPRITE_META,
          cueEnabled: true,
          interactiveEnabled: false,
          cueProfile: SPRITE_CUE_PROFILE_CALM
        });
        landingMediaDisposers.push(dispose);
        return;
      }

      const fallbackKey = mediaType === "animatedWebp" ? "poster" : mediaKey;
      const dispose = createImageStageController({
        stage,
        imageNode,
        primaryAssetKey: mediaKey,
        fallbackAssetKey: fallbackKey
      });
      landingMediaDisposers.push(dispose);
    };

    const detachObserver = observeStageOnce(stage, initStage);
    landingMediaDisposers.push(detachObserver);
  });
};

const setupLandingMedia = () => {
  teardownLandingMedia();
  startLandingAssetPreload();
  setupHeroMediaStage();
  setupExperienceMediaStages();
};

const renderHospitalityLines = () => {
  const content = getLandingContent();
  const target = document.getElementById("hospitality-lines");
  if (!target) return;
  target.innerHTML = content.hospitality.lines.map((line) => `<p>${htmlEscape(line)}</p>`).join("");
};

const renderImpact = () => {
  const content = getLandingContent();
  const target = document.getElementById("impact-list");
  if (!target) return;
  target.innerHTML = content.impact.items
    .map(
      (item) => `
      <li>
        <h3>${htmlEscape(item.title)}</h3>
        <p>${htmlEscape(item.body)}</p>
      </li>
    `
    )
    .join("");
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
      </article>
    </div>
  `;
};

const renderDeliverables = () => {
  const content = getLandingContent();
  const target = document.getElementById("deliverables-list");
  if (!target) return;
  target.innerHTML = content.deliverables.items.map((item) => `<li>${htmlEscape(item)}</li>`).join("");
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
          <h4>${htmlEscape(section.included.title)}</h4>
          <ul class="collaboration-checklist">
            ${section.included.items.map((item) => `<li>${htmlEscape(item)}</li>`).join("")}
          </ul>
        </div>

        <div class="collaboration-detail-columns">
          <section class="collaboration-block collaboration-detail-block">
            <h4>${htmlEscape(section.updatesIncluded.title)}</h4>
            <ul class="collaboration-checklist">
              ${section.updatesIncluded.items.map((item) => `<li>${htmlEscape(item)}</li>`).join("")}
            </ul>
            <p class="collaboration-block-copy">${htmlEscape(section.updatesIncluded.body)}</p>
            <p class="collaboration-note">${htmlEscape(section.updatesIncluded.note)}</p>
          </section>

          <section class="collaboration-block collaboration-detail-block">
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
          </section>
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

const refreshManifestStatus = () => {
  const status = document.getElementById("manifest-status");
  if (!status) return;

  if (!manifestStatusState) {
    status.hidden = true;
    status.textContent = "";
    return;
  }

  const ui = getUiText();
  const template =
    manifestStatusState.key === "fallback" ? ui.demos.statusFallback : ui.demos.statusError;
  status.textContent = formatTemplate(template, manifestStatusState.params ?? {});
  status.hidden = false;
};

const setManifestStatus = (key = null, params = {}) => {
  manifestStatusState = key ? { key, params } : null;
  refreshManifestStatus();
};

const updateCount = (visible, total) => {
  const ui = getUiText();
  const count = document.getElementById("visible-count");
  if (!count) return;
  count.textContent = formatTemplate(ui.demos.countLabel, { visible, total });
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

const renderDemoCards = (demos, total) => {
  const ui = getUiText();
  const list = document.getElementById("demos-list");
  if (!list) return;

  if (total === 0) {
    list.innerHTML = `<li class="empty-state">${htmlEscape(ui.demos.emptyState)}</li>`;
    updateCount(0, 0);
    return;
  }

  if (!Array.isArray(demos) || demos.length === 0) {
    list.innerHTML = `<li class="empty-state">${htmlEscape(ui.demos.noResults)}</li>`;
    updateCount(0, total);
    return;
  }

  list.innerHTML = demos
    .map((demo, index) => {
      const rawName = String(demo?.name ?? demo?.folder ?? ui.demos.untitled);
      const name = htmlEscape(rawName);
      const href = htmlEscape(toAbsoluteHref(demo?.href ?? ""));
      const previewImage = htmlEscape(String(demo?.previewImage ?? "").trim());
      const search = htmlEscape(String(demo?.name ?? demo?.folder ?? "").toLowerCase());
      const previewFrameTitle = htmlEscape(
        formatTemplate(ui.demos.previewFrameTitle ?? "{name}", {
          name: rawName
        })
      );
      return `
        <li data-site-card data-search="${search}">
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
  updateCount(demos.length, total);
};

const renderDemosFiltered = () => {
  const input = document.getElementById("demo-search");
  const query = String(input?.value ?? "").trim().toLowerCase();

  if (!Array.isArray(manifestEntries) || manifestEntries.length === 0) {
    renderDemoCards([], 0);
    return;
  }

  const filtered = manifestEntries.filter((demo) => {
    const search = String(demo?.name ?? demo?.folder ?? "").toLowerCase();
    return !query || search.includes(query);
  });

  renderDemoCards(filtered, manifestEntries.length);
};

const setupSearch = () => {
  const input = document.getElementById("demo-search");
  if (!input) return;
  if (input.dataset.searchBound === "true") return;

  input.dataset.searchBound = "true";
  input.addEventListener("input", () => renderDemosFiltered());
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
    const manifest = await fetchJson(manifestUrl);
    setManifestStatus(null);
    return manifest;
  } catch {
    try {
      const fallback = await fetchJson("./demos-manifest.example.json");
      setManifestStatus("fallback", { manifestUrl });
      return fallback;
    } catch {
      setManifestStatus("error", { manifestUrl });
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
      estimated_menu_size: String(data.get("estimated_menu_size") ?? "").trim(),
      project_scope: String(data.get("project_scope") ?? "").trim(),
      timeline: String(data.get("timeline") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      consent: data.get("consent") === "on"
    };
  };

  const emailLooksValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

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

    submitButton.disabled = true;
    submitButton.textContent = ui.form.submitSending;
    setFormStatus(ui.form.statusSending);
    const submitStart = performance.now();

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const elapsed = performance.now() - submitStart;
      const remainingDelay = Math.max(0, CONSULTATION_MIN_LOADING_MS - elapsed);
      if (remainingDelay > 0) await wait(remainingDelay);

      form.reset();
      setFormStatus(ui.form.statusSuccess, "success");
      revealSuccessPanel();
      submitButton.textContent = getUiText().form.submitIdle;
    } catch {
      setFormStatus(getUiText().form.statusError, "error");
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
  renderCredibility();
  renderProblemList();
  renderExperience();
  renderHospitalityLines();
  renderImpact();
  renderTimeline();
  renderDeliverables();
  renderCollaborationSection();
  renderFaq();
  setupLandingMedia();
};

const main = async () => {
  currentLocale = resolveInitialLocale();
  setupLocaleSwitchers();
  setLocale(currentLocale, { persist: true, updateUrl: false, rerender: false });

  syncHeaderOffset();
  window.addEventListener("resize", syncHeaderOffset, { passive: true });
  if (document.fonts?.ready) {
    document.fonts.ready.then(syncHeaderOffset).catch(() => {});
  }

  setupStickyNavAnchors();
  setupBackToTop();

  hydrateLanding();
  setupRevealAnimation();

  hydrateFooterYear();
  const manifest = await loadManifest();
  manifestEntries = Array.isArray(manifest?.demos) ? manifest.demos : [];

  setupSearch();
  renderDemosFiltered();
  setupHeroDemoCta();
  setupConsultationForm();
};

main();
