const FORM_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID";
const FORM_ENDPOINT_PLACEHOLDER = "REPLACE_WITH_YOUR_FORM_ID";

const LANDING_CONTENT = {
  hero: {
    eyebrow: "Immersive 3D Experience Studio",
    headline: "Designed to Be Desired.",
    subheadline:
      "Immersive interactive 3D menus designed for modern restaurants that want to attract, inform, and excite guests before the first bite.",
    microValue: "Multi-language. Visual. Story-driven. Allergen-aware."
  },
  credibility: [
    "Designed for independent restaurants and dining venues in Germany.",
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
    heading: "Guests don\'t just read your menu. They explore it.",
    body: "A modern interactive layer that blends 3D dish visualization, language flexibility, dietary context, and storytelling.",
    cards: [
      {
        title: "Immersive Dish Preview",
        body: "Slow, tactile product viewing designed to create anticipation before ordering.",
        image:
          "/demos/Demo%20-%20Keneth%27s%20Collection/assets/items/360MarryGo-int-poster.webp",
        alt: "MarryGo dish poster"
      },
      {
        title: "Interactive Motion Layer",
        body: "A fluid interactive preview that reveals depth and detail as guests explore.",
        image:
          "/demos/Demo%20-%20Keneth%27s%20Collection/assets/items/360MarryGo-int-sprite-md.webp",
        alt: "MarryGo interactive depth preview"
      },
      {
        title: "Visual Appetite Trigger",
        body: "Real food texture and atmosphere to help guests decide faster with more confidence.",
        image:
          "/demos/Demo%20-%20CafeBrunch%20Menu/assets/derived/items/blue-berry-pancakes-6028f0-md.gif",
        alt: "CafeBrunch dish animation"
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
    lines: ["It\'s experience.", "It\'s culture.", "It\'s story.", "It\'s your brand, made tangible."]
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
    body: "Creativivid Studio works with a limited number of independent dining venues per quarter to maintain creative and technical excellence.",
    packages: [
      {
        title: "Starter — Pilot Experience",
        subtitle: "Ideal for testing immersive presentation with focused scope.",
        priceRange: "€1,500 - €2,000",
        bullets: ["Up to 5 items", "Interactive website", "Remote capture workflow"]
      },
      {
        title: "Premium — Brand Elevation",
        subtitle: "For visually-driven restaurants ready to differentiate.",
        priceRange: "€3,000 - €4,500",
        bullets: ["Up to 15 items", "Advanced styling", "On-site capture available", "Deployment support"]
      },
      {
        title: "Signature — Full Immersive Concept",
        subtitle: "For signature restaurants seeking a statement experience.",
        priceRange: "€6,000+",
        bullets: [
          "20+ items",
          "Custom design direction",
          "On-site professional capture",
          "Priority delivery",
          "Full deployment and domain assistance"
        ]
      }
    ]
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
        a: "Yes. Iterative updates can be requested based on your menu changes and campaigns."
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
      "Creativivid Studio blends AI and computer vision expertise with visual storytelling, informed by work across Mexico, the USA, and Germany."
  },
  consultation: {
    eyebrow: "Final CTA",
    heading: "Elevate how guests experience your menu.",
    body:
      "If your brand values presentation, story, and differentiation, let\'s discuss your concept and evaluate strategic fit."
  }
};

const DEFAULT_PROFILE = {
  name: "Keneth Ibarra",
  title: "Founder",
  email: "k.ent@hotmail.com",
  phone: "+49 15257403004",
  links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/keneth4/" }]
};

const DEFAULT_MANIFEST = {
  schemaVersion: 1,
  basePath: "/demos",
  total: 0,
  demos: []
};

const params = new URLSearchParams(window.location.search);
const manifestUrl = params.get("manifest") ?? "/demos/demos-manifest.json";
const profileUrl = params.get("profile") ?? "./profile.json";

const htmlEscape = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const getByPath = (source, path) => {
  const parts = String(path ?? "").split(".").filter(Boolean);
  let current = source;
  for (const part of parts) {
    if (!current || typeof current !== "object") return "";
    current = current[part];
  }
  return typeof current === "string" ? current : "";
};

const setText = (selector, value) => {
  const target = document.querySelector(selector);
  if (!target) return;
  target.textContent = value;
};

const hydrateContentText = () => {
  const targets = document.querySelectorAll("[data-content]");
  targets.forEach((target) => {
    const key = target.getAttribute("data-content");
    target.textContent = getByPath(LANDING_CONTENT, key);
  });
};

const renderCredibility = () => {
  const list = document.getElementById("credibility-list");
  if (!list) return;
  list.innerHTML = LANDING_CONTENT.credibility.map((item) => `<li>${htmlEscape(item)}</li>`).join("");
};

const renderProblemList = () => {
  const list = document.getElementById("problem-list");
  if (!list) return;
  list.innerHTML = LANDING_CONTENT.problem.points.map((item) => `<li>${htmlEscape(item)}</li>`).join("");
};

const renderExperience = () => {
  const grid = document.getElementById("experience-grid");
  if (!grid) return;
  grid.innerHTML = LANDING_CONTENT.experience.cards
    .map(
      (card) => `
      <article class="experience-card">
        <img src="${htmlEscape(card.image)}" alt="${htmlEscape(card.alt)}" loading="lazy" />
        <div class="experience-card-body">
          <h3>${htmlEscape(card.title)}</h3>
          <p>${htmlEscape(card.body)}</p>
        </div>
      </article>
    `
    )
    .join("");
};

const renderHospitalityLines = () => {
  const target = document.getElementById("hospitality-lines");
  if (!target) return;
  target.innerHTML = LANDING_CONTENT.hospitality.lines.map((line) => `<p>${htmlEscape(line)}</p>`).join("");
};

const renderImpact = () => {
  const target = document.getElementById("impact-list");
  if (!target) return;
  target.innerHTML = LANDING_CONTENT.impact.items
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
  const target = document.getElementById("timeline-grid");
  if (!target) return;
  const section = LANDING_CONTENT.howItWorks;

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
        <p>Both paths merge here.</p>
        <ol>
          ${section.sharedSteps.map((step) => `<li>${htmlEscape(step)}</li>`).join("")}
        </ol>
      </article>
    </div>
  `;
};

const renderDeliverables = () => {
  const target = document.getElementById("deliverables-list");
  if (!target) return;
  target.innerHTML = LANDING_CONTENT.deliverables.items.map((item) => `<li>${htmlEscape(item)}</li>`).join("");
};

const renderPackages = () => {
  const target = document.getElementById("package-grid");
  if (!target) return;
  target.innerHTML = LANDING_CONTENT.collaboration.packages
    .map(
      (item) => `
      <article class="package-card">
        <h3>${htmlEscape(item.title)}</h3>
        <p class="tier-subtitle">${htmlEscape(item.subtitle)}</p>
        <p class="price-range">${htmlEscape(item.priceRange)}</p>
        <ul>
          ${item.bullets.map((bullet) => `<li>${htmlEscape(bullet)}</li>`).join("")}
        </ul>
      </article>
    `
    )
    .join("");
};

const renderFaq = () => {
  const target = document.getElementById("faq-list");
  if (!target) return;

  target.innerHTML = LANDING_CONTENT.faq.items
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

const setManifestStatus = (message = "", visible = false) => {
  const status = document.getElementById("manifest-status");
  if (!status) return;
  status.textContent = message;
  status.hidden = !visible;
};

const updateCount = (visible, total) => {
  const count = document.getElementById("visible-count");
  if (!count) return;
  count.textContent = `Showing ${visible} of ${total} demos`;
};

const renderDemos = (demos) => {
  const list = document.getElementById("demos-list");
  if (!list) return;

  if (!Array.isArray(demos) || demos.length === 0) {
    list.innerHTML =
      '<li class="empty-state">No demos available yet. Publish exports to <code>/demos/</code> first.</li>';
    updateCount(0, 0);
    return;
  }

  list.innerHTML = demos
    .map((demo, index) => {
      const name = htmlEscape(demo?.name ?? demo?.folder ?? "Untitled demo");
      const href = htmlEscape(toAbsoluteHref(demo?.href ?? ""));
      const folder = htmlEscape(demo?.folder ?? "Published demo");
      const search = htmlEscape(String(demo?.name ?? demo?.folder ?? "").toLowerCase());
      return `
        <li data-site-card data-search="${search}">
          <a class="demo-card" href="${href}" ${index === 0 ? 'data-featured-demo="true"' : ""}>
            <span class="demo-name">${name}</span>
            <span class="demo-meta">${folder}</span>
            <span class="demo-cta">Open demo</span>
          </a>
        </li>
      `;
    })
    .join("");

  updateCount(demos.length, demos.length);
};

const setupSearch = () => {
  const input = document.getElementById("demo-search");
  const list = document.getElementById("demos-list");
  if (!input || !list) return;

  const cards = Array.from(list.querySelectorAll("[data-site-card]"));
  const total = cards.length;

  const applyFilter = (value) => {
    const query = String(value ?? "").trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const search = card.getAttribute("data-search") ?? "";
      const matches = !query || search.includes(query);
      card.hidden = !matches;
      if (matches) visible += 1;
    });

    updateCount(visible, total);
  };

  input.addEventListener("input", (event) => applyFilter(event.target.value));
};

const setupHeroDemoCta = () => {
  const trigger = document.getElementById("hero-demo-cta");
  if (!trigger) return;

  trigger.addEventListener("click", () => {
    window.setTimeout(() => {
      const featured = document.querySelector('[data-featured-demo="true"]');
      if (!featured) return;
      featured.classList.add("is-highlight");
      window.setTimeout(() => featured.classList.remove("is-highlight"), 1600);
    }, 220);
  });
};

const fetchJson = async (url) => {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.json();
};

const loadProfile = async () => {
  try {
    return await fetchJson(profileUrl);
  } catch {
    return DEFAULT_PROFILE;
  }
};

const loadManifest = async () => {
  try {
    return await fetchJson(manifestUrl);
  } catch {
    try {
      const fallback = await fetchJson("./demos-manifest.example.json");
      setManifestStatus(`Using local fallback manifest (${manifestUrl} unavailable).`, true);
      return fallback;
    } catch {
      setManifestStatus(`Could not load demos manifest from ${manifestUrl}.`, true);
      return DEFAULT_MANIFEST;
    }
  }
};

const normalizePhoneToDigits = (phone) => String(phone ?? "").replace(/\D+/g, "");

const hydrateProfile = (profile) => {
  const merged = {
    ...DEFAULT_PROFILE,
    ...(profile ?? {})
  };

  const founder = document.getElementById("about-founder");
  if (founder) founder.textContent = merged.name;

  const emailLink = document.getElementById("contact-email-link");
  if (emailLink) {
    emailLink.href = `mailto:${merged.email}`;
    emailLink.textContent = merged.email;
  }

  const whatsapp = document.getElementById("contact-whatsapp-link");
  if (whatsapp) {
    const digits = normalizePhoneToDigits(merged.phone);
    if (digits) {
      whatsapp.href = `https://wa.me/${digits}`;
    }
  }

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
  const form = document.getElementById("consultation-form");
  const submitButton = document.getElementById("consultation-submit");
  if (!form || !submitButton) return;

  const readPayload = () => {
    const data = new FormData(form);
    return {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      restaurant: String(data.get("restaurant") ?? "").trim(),
      city_country: String(data.get("city_country") ?? "").trim(),
      budget_range: String(data.get("budget_range") ?? "").trim(),
      timeline: String(data.get("timeline") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      consent: data.get("consent") === "on"
    };
  };

  const emailLooksValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = readPayload();

    if (!payload.name || !payload.email || !payload.message) {
      setFormStatus("Please complete Name, Email, and Project Details.", "error");
      return;
    }

    if (!emailLooksValid(payload.email)) {
      setFormStatus("Please provide a valid email address.", "error");
      return;
    }

    if (!payload.consent) {
      setFormStatus("Please provide consent to continue.", "error");
      return;
    }

    if (!isEndpointConfigured()) {
      setFormStatus(
        "Consultation form is not connected yet. Replace FORM_ENDPOINT in app.js with your Formspree endpoint.",
        "error"
      );
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    setFormStatus("Sending your request...");

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

      form.reset();
      setFormStatus("Thank you. Your consultation request has been sent.", "success");
    } catch {
      setFormStatus("Request failed. Please email us directly at k.ent@hotmail.com.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Consultation Request";
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
  renderPackages();
  renderFaq();
};

const main = async () => {
  hydrateLanding();
  setupRevealAnimation();

  const [profile, manifest] = await Promise.all([loadProfile(), loadManifest()]);
  hydrateProfile(profile);
  renderDemos(Array.isArray(manifest?.demos) ? manifest.demos : []);

  setupSearch();
  setupHeroDemoCta();
  setupConsultationForm();
};

main();
