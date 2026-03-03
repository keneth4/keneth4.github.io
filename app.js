const DEFAULT_PROFILE = {
  name: "Your Name",
  title: "Interactive Demo Creator",
  tagline: "Curated demo collection for client presentations.",
  email: "you@example.com",
  phone: "+00 000 000 0000",
  location: "Your City",
  photo: "./profile-photo.jpg",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "GitHub", href: "https://github.com/" }
  ],
  theme: {
    accent: "#50586C",
    accentSoft: "#DCE2F0"
  }
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

const looksLikeColor = (value) => /^#[0-9a-fA-F]{6}$/.test(String(value ?? ""));
const htmlEscape = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const initialsFrom = (value) => {
  const parts = String(value ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  if (!parts.length) return "MM";
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
};

const setTheme = (theme) => {
  const accent = looksLikeColor(theme?.accent) ? theme.accent : DEFAULT_PROFILE.theme.accent;
  const accentSoft = looksLikeColor(theme?.accentSoft) ? theme.accentSoft : DEFAULT_PROFILE.theme.accentSoft;
  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--accent-soft", accentSoft);
};

const setText = (id, value) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = String(value ?? "");
};

const setHrefText = (id, href, text) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.href = href;
  el.textContent = text;
};

const renderLinks = (links) => {
  const target = document.getElementById("profile-links");
  if (!target) return;
  target.innerHTML = "";

  for (const link of Array.isArray(links) ? links : []) {
    if (!link || typeof link !== "object") continue;
    const label = String(link.label ?? "").trim();
    const href = String(link.href ?? "").trim();
    if (!label || !href) continue;

    const anchor = document.createElement("a");
    anchor.className = "quick-link";
    anchor.href = href;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.textContent = label;
    target.append(anchor);
  }
};

const configurePhoto = (name, photo) => {
  const img = document.getElementById("profile-photo");
  const fallback = document.getElementById("photo-fallback");
  if (!img || !fallback) return;

  img.alt = `Profile photo of ${name}`;
  img.src = photo;
  fallback.textContent = initialsFrom(name);

  img.addEventListener("error", () => {
    img.style.display = "none";
    fallback.style.display = "grid";
  });
  img.addEventListener("load", () => {
    img.style.display = "block";
    fallback.style.display = "none";
  });
};

const setStatus = (message = "", visible = false) => {
  const status = document.getElementById("manifest-status");
  if (!status) return;
  status.textContent = message;
  status.hidden = !visible;
};

const updateCount = (visible, total) => {
  const count = document.getElementById("visible-count");
  if (!count) return;
  count.textContent = `Showing ${visible} of ${total}`;
};

const toAbsoluteHref = (href) => {
  const value = String(href ?? "").trim();
  if (!value) return "#";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return value;
  return `/${value.replace(/^\.?\//, "")}`;
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
    .map((demo) => {
      const name = htmlEscape(demo?.name ?? demo?.folder ?? "Untitled demo");
      const href = htmlEscape(toAbsoluteHref(demo?.href ?? ""));
      const search = htmlEscape(String(demo?.name ?? demo?.folder ?? "").toLowerCase());
      return `
        <li data-site-card data-search="${search}">
          <a class="demo-card" href="${href}">
            <span class="demo-name">${name}</span>
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

  input.addEventListener("input", (event) => {
    applyFilter(event.target.value);
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
    try {
      return await fetchJson("./profile.example.json");
    } catch {
      return DEFAULT_PROFILE;
    }
  }
};

const loadManifest = async () => {
  try {
    return await fetchJson(manifestUrl);
  } catch {
    try {
      const fallback = await fetchJson("./demos-manifest.example.json");
      setStatus(`Using local fallback manifest (${manifestUrl} unavailable).`, true);
      return fallback;
    } catch {
      setStatus(`Could not load demos manifest from ${manifestUrl}.`, true);
      return DEFAULT_MANIFEST;
    }
  }
};

const hydrateProfile = (profile) => {
  const merged = {
    ...DEFAULT_PROFILE,
    ...(profile ?? {}),
    theme: {
      ...DEFAULT_PROFILE.theme,
      ...(profile?.theme ?? {})
    }
  };

  setTheme(merged.theme);
  setText("profile-name", merged.name);
  setText("profile-title", merged.title);
  setText("profile-tagline", merged.tagline);
  setHrefText("profile-email", `mailto:${merged.email}`, merged.email);
  setHrefText("profile-phone", `tel:${String(merged.phone).replace(/\s+/g, "")}`, merged.phone);
  setText("profile-location", merged.location);
  configurePhoto(merged.name, merged.photo);
  renderLinks(merged.links);
};

const main = async () => {
  const [profile, manifest] = await Promise.all([loadProfile(), loadManifest()]);
  hydrateProfile(profile);
  renderDemos(Array.isArray(manifest?.demos) ? manifest.demos : []);
  setupSearch();
};

main();
