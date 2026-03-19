const FORM_ENDPOINT = "https://formspree.io/f/xyknpdjv";
const FORM_ENDPOINT_PLACEHOLDER = "REPLACE_WITH_YOUR_FORM_ID";
const CONSULTATION_MIN_LOADING_MS = 1200;
const TURNSTILE_SITE_KEY = "0x4AAAAAACqP0xV6NCSkGF91";
const TURNSTILE_TOKEN_FIELD = "cf-turnstile-response";

const SUPPORTED_LOCALES = ["en", "es", "de"];
const DEFAULT_LOCALE = "en";
const LOCALE_STORAGE_KEY = "cv_locale";
const COMPACT_HEADER_MEDIA_QUERY = "(max-width: 760px), ((max-width: 1040px) and (orientation: landscape))";
const HERO_SAMPLE_ID = "short-ribs";
const DEFAULT_EXPERIENCE_SAMPLE_ID = "sushi";
const LANDING_DISH_MEDIA = {
  "short-ribs": {
    posterSrc: "./Short-Ribs-int-poster.webp",
    teaserMdSrc: "./Short-Ribs-int-sprite-md.webp",
    interactiveSpriteSrc: "./Short-Ribs-int-sprite.webp"
  },
  sushi: {
    posterSrc: "./Sushi-int-poster.webp",
    teaserMdSrc: "./Sushi-int-sprite-md.webp",
    interactiveSpriteSrc: "./Sushi-int-sprite.webp"
  },
  "strawberry-croissant": {
    posterSrc: "./Strawberry-Croissant-int-poster.webp",
    teaserMdSrc: "./Strawberry-Croissant-int-sprite-md.webp",
    interactiveSpriteSrc: "./Strawberry-Croissant-int-sprite.webp"
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
  ...Object.entries(LANDING_DISH_MEDIA).flatMap(([sampleId, media]) => [
    [`${sampleId}:poster`, media.posterSrc],
    [`${sampleId}:teaser`, media.teaserMdSrc],
    [`${sampleId}:interactive`, media.interactiveSpriteSrc]
  ]),
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
        "Interactive visual menus designed for restaurants with international visitors.",
      microValue:
        "Help guests order with confidence by showing them exactly what each dish looks like."
    },
    whyItMatters: {
      eyebrow: "Why It Matters",
      heading: "Why this matters for restaurants",
      intro: [
        "Across Germany and Europe, many restaurants still rely on paper menus or static PDFs. For international guests, unfamiliar ingredients and unclear allergen context create friction at the point of ordering.",
        "When guests cannot clearly visualize what they are ordering, hesitation rises and premium perception drops. Presentation is not decoration. Presentation is positioning."
      ],
      fitLabel: "Best fit for",
      fitText:
        "independent restaurants, boutique dining venues, and tourist-area concepts where visual clarity helps guests decide faster.",
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
          title: "Reduce Ordering Hesitation",
          body: "Dish clarity and context shorten decision time for international guests."
        },
        {
          title: "Improve Guest Confidence",
          body: "Allergen and dietary cues make ordering clearer and more comfortable."
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
          body: "Guests get a better idea."
        },
        {
          title: "IMMERSIVE MENU",
          body: "Guests see the dish, understand it, and want it."
        }
      ],
      samples: {
        "short-ribs": {
          ...LANDING_DISH_MEDIA["short-ribs"],
          name: "Braised Beef Short Ribs",
          shortDescription: "Slow-cooked beef short rib served with mash, vegetables, and its own sauce.",
          longDescription:
            "Short ribs are prized for their rich flavor and silky texture when cooked slowly. Long braising allows the collagen to break down, making the meat especially tender. In contemporary cooking they are often paired with root vegetable purées, carrots, or squash, whose natural sweetness balances the depth of the meat juices.",
          badges: [],
          allergensText: "Dairy",
          price: 26.8,
          currency: "EUR",
          alt: "Braised beef short ribs presentation"
        },
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
        },
        "strawberry-croissant": {
          ...LANDING_DISH_MEDIA["strawberry-croissant"],
          name: "Strawberry Cream Croissant",
          shortDescription: "Flaky croissant filled with cream and finished with strawberry and powdered sugar.",
          longDescription:
            "The croissant is one of the great icons of Viennese and French baking. It is made with laminated dough, whose light, flaky texture comes from alternating layers of dough and butter. In this dessert version it is filled with cream and finished with fresh fruit, creating a contrast between buttery pastry, smooth filling, and the natural brightness of strawberry.",
          badges: [],
          allergensText: "Gluten, Dairy, Egg",
          price: 5,
          currency: "EUR",
          alt: "Strawberry cream croissant presentation"
        }
      }
    },
    demos: {
      eyebrow: "Live Demos",
      heading: "Published demo experiences",
      body: "A focused selection of published demos to show how the interactive menu experience feels in practice."
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
          "Full ownership of delivered files",
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
    consultation: {
      heading: "Elevate how guests experience your menu.",
      body:
        "If your brand values presentation, story, and differentiation, let's discuss your concept and evaluate strategic fit."
    }
  },
  es: {
    hero: {
      eyebrow: "Menús visuales para restaurantes",
      headline: "Permite que los comensales vean lo que están a punto de pedir.",
      subheadline:
        "Menús visuales interactivos diseñados para restaurantes con visitantes internacionales.",
      microValue:
        "Ayuda a los comensales a pedir con confianza mostrándoles exactamente cómo luce cada plato."
    },
    whyItMatters: {
      eyebrow: "Por Qué Importa",
      heading: "Por qué esto importa para los restaurantes",
      intro: [
        "En Alemania y Europa, muchos restaurantes aún dependen de menús impresos o PDF estáticos. Para clientes internacionales, ingredientes poco familiares y contexto de alérgenos poco claro generan fricción al ordenar.",
        "Cuando los clientes no pueden visualizar con claridad lo que piden, aumenta la duda y baja la percepción premium. La presentación no es decoración. La presentación es posicionamiento."
      ],
      fitLabel: "Ideal para",
      fitText:
        "restaurantes independientes, espacios boutique y conceptos en zonas turísticas donde la claridad visual ayuda a decidir más rápido.",
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
          title: "Reduce la duda al ordenar",
          body: "La claridad del plato y su contexto reducen el tiempo de decisión de clientes internacionales."
        },
        {
          title: "Mejora la confianza del cliente",
          body: "Indicadores de dieta y alérgenos hacen el pedido más claro y seguro."
        }
      ]
    },
    experience: {
      eyebrow: "La Experiencia",
      heading: "El futuro de los menús es visual.",
      body: "Descubre cómo el mismo plato se vuelve más claro, más atractivo y más deseable.",
      defaultSampleId: DEFAULT_EXPERIENCE_SAMPLE_ID,
      steps: [
        {
          title: "MENÚ DE TEXTO",
          body: "Los comensales adivinan qué van a recibir."
        },
        {
          title: "MENÚ CON FOTO",
          body: "Los comensales se hacen una mejor idea."
        },
        {
          title: "MENÚ INMERSIVO",
          body: "Los comensales ven el plato, lo entienden y lo desean."
        }
      ],
      samples: {
        "short-ribs": {
          ...LANDING_DISH_MEDIA["short-ribs"],
          name: "Short ribs braseadas",
          shortDescription: "Costilla de res cocinada lentamente, servida con puré, verduras y su jugo.",
          longDescription:
            "Las short ribs son un corte muy apreciado por su sabor intenso y su textura melosa cuando se cocinan a fuego lento. El braseado prolongado permite que el colágeno se transforme y vuelva la carne especialmente tierna. En cocina contemporánea suelen acompañarse con purés de raíz, zanahorias o calabaza, porque sus notas dulces equilibran la profundidad del jugo de carne.",
          badges: [],
          allergensText: "Lácteos",
          price: 26.8,
          currency: "EUR",
          alt: "Presentación de short ribs braseadas"
        },
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
        },
        "strawberry-croissant": {
          ...LANDING_DISH_MEDIA["strawberry-croissant"],
          name: "Croissant relleno de crema y fresa",
          shortDescription: "Croissant hojaldrado relleno de crema y decorado con fresa y azúcar glas.",
          longDescription:
            "El croissant es uno de los grandes íconos de la panadería vienesa y francesa. Se elabora con masa laminada, cuya textura ligera y hojaldrada surge de alternar capas de masa y mantequilla. En esta versión se presenta como postre, con relleno cremoso y fruta fresca, una combinación que aporta contraste entre la mantequilla del hojaldre, la suavidad de la crema y la acidez natural de la fresa.",
          badges: [],
          allergensText: "Gluten, Lácteos, Huevo",
          price: 5,
          currency: "EUR",
          alt: "Presentación de croissant con crema y fresa"
        }
      }
    },
    demos: {
      eyebrow: "Demos en Vivo",
      heading: "Experiencias demo publicadas",
      body: "Una selección enfocada de demos publicadas para mostrar cómo se siente la experiencia de menú interactivo."
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
          "Propiedad total de los archivos entregados",
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
    consultation: {
      heading: "Eleva la forma en que tus clientes viven tu menú.",
      body:
        "Si tu marca valora presentación, historia y diferenciación, conversemos tu concepto y evaluemos si hay encaje estratégico."
    }
  },
  de: {
    hero: {
      eyebrow: "Visuelle Menüs für Restaurants",
      headline: "Lassen Sie Gäste sehen, was sie gleich bestellen.",
      subheadline:
        "Interaktive visuelle Menüs für Restaurants mit internationalen Gästen.",
      microValue:
        "Helfen Sie Gästen, sicherer zu bestellen, indem Sie genau zeigen, wie jedes Gericht aussieht."
    },
    whyItMatters: {
      eyebrow: "Warum es wichtig ist",
      heading: "Warum das für Restaurants wichtig ist",
      intro: [
        "In Deutschland und Europa setzen viele Restaurants noch auf Papiermenüs oder statische PDFs. Für internationale Gäste sorgen unbekannte Zutaten und unklarer Allergenkontext für Reibung beim Bestellen.",
        "Wenn Gäste nicht klar erkennen können, was sie bestellen, steigt Unsicherheit und die Premium-Wahrnehmung sinkt. Präsentation ist nicht Dekoration. Präsentation ist Positionierung."
      ],
      fitLabel: "Ideal für",
      fitText:
        "unabhängige Restaurants, Boutique-Konzepte und Standorte in touristischen Lagen, in denen visuelle Klarheit schnellere Entscheidungen unterstützt.",
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
          title: "Weniger Unsicherheit bei Bestellungen",
          body: "Mehr Klarheit zum Gericht verkürzt die Entscheidungszeit internationaler Gäste."
        },
        {
          title: "Mehr Sicherheit für Gäste",
          body: "Allergen- und Ernährungshinweise machen Bestellungen klarer und angenehmer."
        }
      ]
    },
    experience: {
      eyebrow: "Die Experience",
      heading: "Die Zukunft von Menüs ist visuell.",
      body: "Erlebe, wie dasselbe Gericht klarer, reichhaltiger und begehrenswerter wird.",
      defaultSampleId: DEFAULT_EXPERIENCE_SAMPLE_ID,
      steps: [
        {
          title: "TEXTMENÜ",
          body: "Gäste ahnen, was sie bekommen."
        },
        {
          title: "FOTOMENÜ",
          body: "Gäste bekommen eine bessere Vorstellung."
        },
        {
          title: "IMMERSIVES MENÜ",
          body: "Gäste sehen das Gericht, verstehen es und wollen es."
        }
      ],
      samples: {
        "short-ribs": {
          ...LANDING_DISH_MEDIA["short-ribs"],
          name: "Geschmorte Rinder-Short-Ribs",
          shortDescription: "Langsam geschmorte Rinder-Short-Rib mit Püree, Gemüse und Bratensauce.",
          longDescription:
            "Short Ribs werden wegen ihres kräftigen Geschmacks und ihrer zarten, saftigen Konsistenz geschätzt, wenn sie langsam geschmort werden. Durch langes Garen wandelt sich das Kollagen und macht das Fleisch besonders weich. In der modernen Küche werden sie oft mit Pürees aus Wurzelgemüse, Karotten oder Kürbis serviert, deren Süße die intensive Sauce ausgleicht.",
          badges: [],
          allergensText: "Milchprodukte",
          price: 26.8,
          currency: "EUR",
          alt: "Präsentation geschmorter Short Ribs"
        },
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
        },
        "strawberry-croissant": {
          ...LANDING_DISH_MEDIA["strawberry-croissant"],
          name: "Croissant mit Erdbeere und Creme",
          shortDescription: "Blättriges Croissant mit Cremefüllung, Erdbeere und Puderzucker.",
          longDescription:
            "Das Croissant gehört zu den großen Klassikern der Wiener und französischen Backkunst. Es wird aus laminiertem Teig hergestellt, dessen leichte, blättrige Struktur durch viele Schichten aus Teig und Butter entsteht. In dieser Dessertvariante ist es mit Creme gefüllt und mit frischer Frucht garniert – ein Zusammenspiel aus buttrigem Gebäck, weicher Füllung und frischer Erdbeere.",
          badges: [],
          allergensText: "Gluten, Milchprodukte, Ei",
          price: 5,
          currency: "EUR",
          alt: "Präsentation eines Croissants mit Erdbeere und Creme"
        }
      }
    },
    demos: {
      eyebrow: "Live-Demos",
      heading: "Veröffentlichte Demo-Erlebnisse",
      body: "Eine fokussierte Auswahl veröffentlichter Demos, damit das interaktive Menüerlebnis direkt greifbar wird."
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
          "Vollständige Dateiübergabe",
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
      consultation: "Consultation",
      menuOpen: "Open menu",
      menuClose: "Close menu"
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
      applyCta: "Request a Consultation"
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
      statusCaptchaRequired: "Complete the security check to continue.",
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
      consultation: "Consulta",
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú"
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
      applyCta: "Solicitar una consulta"
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
      statusCaptchaRequired: "Completa la verificación de seguridad para continuar.",
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
      consultation: "Beratung",
      menuOpen: "Menü öffnen",
      menuClose: "Menü schließen"
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
      applyCta: "Beratung anfragen"
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
      statusCaptchaRequired: "Bitte schließe die Sicherheitsprüfung ab, um fortzufahren.",
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
let landingAssetPreloadStarted = false;
let heroMediaDispose = null;
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

const startLandingAssetPreload = () => {
  if (landingAssetPreloadStarted) return;
  landingAssetPreloadStarted = true;

  void (async () => {
    await loadLandingAssetImage(`${HERO_SAMPLE_ID}:teaser`).catch(() => {});
    await loadLandingAssetImage(`${HERO_SAMPLE_ID}:poster`).catch(() => {});
  })();
};

const setMediaStageState = (stage, state) => {
  if (!stage) return;
  stage.classList.toggle("is-loading-media", state === "loading");
  stage.classList.toggle("is-media-ready", state === "ready");
  stage.classList.toggle("is-media-error", state === "error");
};

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

const scrollToSectionWithOffset = (hash, behavior = "smooth", headerOffsetOverride = null, targetTopAdjustment = 0) => {
  if (!hash || !hash.startsWith("#")) return;
  const target = document.querySelector(hash);
  if (!target) return;

  const header = document.querySelector(".site-header");
  const headerHeight =
    typeof headerOffsetOverride === "number"
      ? headerOffsetOverride
      : header
        ? Math.ceil(header.getBoundingClientRect().height)
        : 0;
  const targetTop = window.scrollY + target.getBoundingClientRect().top + targetTopAdjustment;
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
    <div class="why-fit-band">
      <span class="why-fit-label">${htmlEscape(section.fitLabel)}</span>
      <p>${htmlEscape(section.fitText)}</p>
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

const setupHeroMediaStage = () => {
  const stage = document.querySelector("[data-hero-media-stage]");
  if (!(stage instanceof HTMLElement)) return;
  if (heroMediaDispose) {
    try {
      heroMediaDispose();
    } catch {}
  }
  const imageNode = stage.querySelector("[data-hero-media-image]");
  heroMediaDispose = createImageStageController({
    stage,
    imageNode,
    primaryAssetKey: `${HERO_SAMPLE_ID}:teaser`,
    fallbackAssetKey: `${HERO_SAMPLE_ID}:poster`
  });
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

  setupStickyNavAnchors();
  setupBackToTop();

  hydrateLanding();
  startLandingAssetPreload();
  setupHeroMediaStage();
  setupRevealAnimation();

  hydrateFooterYear();
  const manifest = await loadManifest();
  manifestEntries = Array.isArray(manifest?.demos) ? manifest.demos : [];

  renderPublishedDemos();
  setupHeroDemoCta();
  setupConsultationForm();
};

main();
