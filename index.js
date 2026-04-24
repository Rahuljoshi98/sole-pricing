/* =========================================
   NewPricing – index.js
   Fetches plans from backend API
   ========================================= */

(function () {
  "use strict";

  /* ---- Config ---- */
  const API_BASE = "https://mignode.soleapp.com.au/api";
  const SIGNUP_URL = "https://webapp.soleapp.com.au/login";

  /* ---- Static data ---- */
  const tradeIndustryLabels = new Set([
    "Plumbing - Domestic & Commercial Plumbers, Drainers, Gas Fitters",
    "Electrical - Electricians, Test & Tag, Appliance Installers",
    "Carpentry / Joinery - Builders, Cabinetmakers, Fit-Out Specialists",
    "Painting & Decorating - Painters, Wallpaperers, Coating Specialists",
    "Tiling & Flooring - Tile Layers, Flooring Installers, Surface Prep",
    "Plastering - Walls, Ceilings, Repairs & Finishing",
    "Roofing & Guttering - Repairs, Re-Gutters, Flashing",
    "Air Conditioning / Refrigeration - HVAC Installers & Service Techs",
    "Automotive / Mobile Mechanics - Repairs, Servicing, Detailing",
    "Metal Fabrication & Welding - Workshops, Gates, Repairs",
    "Landscaping & Fencing - Lawns, Retaining Walls, Paving, Fences",
    "Concrete & Paving - Driveways, Slabs, Decorative Surfaces",
    "Excavation & Earthmoving - Mini Diggers, Trenching, Site Prep",
    "Pest Control - Licensed Treatment & Management",
    "Glazing & Windows - Glass Replacement, Shower Screens, Installers",
    "Locksmithing & Security Systems - Locks, Alarms, CCTV Installation",
    "Cabinet Making / Shopfitting - Built-in Furniture, Retail Fit-outs",
    "Waterproofing - Membranes, Bathrooms, Balconies",
    "Gas Fitting - LPG & Natural Gas Installation / Repairs",
    "Handyman / General Maintenance - Multi-Trade & Small Jobs",
    "General Tradesperson - Catch-all for Unlisted Trades (e.g. Scaffolders, Bricklayers, Solar Installers, etc.)",
  ]);

  const industries = [
    {
      label: "Personal Trainer (Fitness)",
      keywords: ["trainer", "fitness"],
    },
    {
      label: "Hairdressers (rent a chair)",
      keywords: ["hairdresser", "salon", "rent", "chair"],
    },
    {
      label: "NDIS (Health & Social Care)",
      keywords: ["ndis", "health", "social", "care"],
    },
    {
      label: "Creatives (Artist / Designer / Writer)",
      keywords: ["creative", "artist", "designer", "writer"],
    },
    {
      label: "Contractors & Professional Services",
      keywords: ["contractor", "professional", "services"],
    },
    { label: "Cleaning Services", keywords: ["cleaning", "cleaner"] },
    {
      label: "Education & Tutoring",
      keywords: ["education", "tutoring", "tutor"],
    },
    {
      label: "Transport, Delivery & People Movers",
      keywords: ["transport", "delivery", "movers", "people movers"],
    },
    { label: "Property Management", keywords: ["property", "management"] },
    {
      label: "Retail (sole operator / stallholder)",
      keywords: ["retail", "stallholder", "stall holder"],
    },
    {
      label: "Real Estate (independent agent / buyer's advocate)",
      keywords: ["real estate", "agent", "buyers advocate", "buyer's advocate"],
    },
    {
      label: "eCommerce (solo seller / drop-shipper)",
      keywords: ["ecommerce", "seller", "drop shipper", "dropshipper"],
    },
    {
      label: "General Business (no category)",
      keywords: ["general", "business", "other"],
    },
    {
      label: "Arts (freelance artist / performer)",
      keywords: ["arts", "artist", "performer", "freelance"],
    },
    {
      label: "Construction (general contractor / renovator)",
      keywords: ["construction", "contractor", "renovator"],
    },
    {
      label: "Finance (advisor / broker)",
      keywords: ["finance", "advisor", "broker"],
    },
    {
      label: "Media (freelancer / journalist / content creator)",
      keywords: ["media", "freelancer", "journalist", "content creator"],
    },
    {
      label: "Transport (owner-driver / courier)",
      keywords: ["transport", "owner driver", "courier"],
    },
    {
      label: "Wholesaler (Independent Distributor / Agent)",
      keywords: ["wholesaler", "distributor", "agent", "wholesale"],
    },
    {
      label: "Manufacturers (Maker / Craftsperson)",
      keywords: ["manufacturer", "maker", "craftsperson"],
    },
    {
      label: "Admin Services (Virtual Assistant / Bookkeeper)",
      keywords: ["admin", "virtual assistant", "bookkeeper"],
    },
    { label: "Gardening", keywords: ["garden", "gardening"] },
    {
      label: "Photographers & Videographers",
      keywords: ["photographer", "videographer", "photography", "video"],
    },
    {
      label: "Influencers (Content Creator / Brand Partner)",
      keywords: ["influencer", "content creator", "brand partner"],
    },
    {
      label: "Agriculture (Farmer / Grower / Contractor)",
      keywords: ["agriculture", "farmer", "grower", "contractor"],
    },
    {
      label: "Hair & Beauty (Makeup Artists / Beauty Therapists)",
      keywords: [
        "hair",
        "beauty",
        "makeup",
        "makeup artist",
        "beauty therapist",
      ],
    },
    {
      label: "Hospitality (Catering / Food Truck / Barista / Chef)",
      keywords: ["hospitality", "catering", "food truck", "barista", "chef"],
    },
    {
      label: "Consulting (Business / Strategy / Specialist Advisory)",
      keywords: ["consulting", "business", "strategy", "advisory"],
    },
    {
      label: "Plumbing - Domestic & Commercial Plumbers, Drainers, Gas Fitters",
      keywords: [
        "plumbing",
        "plumber",
        "drainer",
        "gas fitter",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label: "Electrical - Electricians, Test & Tag, Appliance Installers",
      keywords: [
        "electrical",
        "electrician",
        "test and tag",
        "appliance installer",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label:
        "Carpentry / Joinery - Builders, Cabinetmakers, Fit-Out Specialists",
      keywords: [
        "carpentry",
        "joinery",
        "builder",
        "cabinetmaker",
        "fit out",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label:
        "Painting & Decorating - Painters, Wallpaperers, Coating Specialists",
      keywords: [
        "painting",
        "decorating",
        "painter",
        "wallpaperer",
        "coating",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label:
        "Tiling & Flooring - Tile Layers, Flooring Installers, Surface Prep",
      keywords: [
        "tiling",
        "flooring",
        "tile layer",
        "flooring installer",
        "surface prep",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label: "Plastering - Walls, Ceilings, Repairs & Finishing",
      keywords: [
        "plastering",
        "walls",
        "ceilings",
        "finishing",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label: "Roofing & Guttering - Repairs, Re-Gutters, Flashing",
      keywords: [
        "roofing",
        "guttering",
        "regutters",
        "re gutters",
        "flashing",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label:
        "Air Conditioning / Refrigeration - HVAC Installers & Service Techs",
      keywords: [
        "air conditioning",
        "refrigeration",
        "hvac",
        "installer",
        "service tech",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label: "Automotive / Mobile Mechanics - Repairs, Servicing, Detailing",
      keywords: [
        "automotive",
        "mobile mechanic",
        "mechanic",
        "repairs",
        "servicing",
        "detailing",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label: "Metal Fabrication & Welding - Workshops, Gates, Repairs",
      keywords: [
        "metal fabrication",
        "welding",
        "workshop",
        "gates",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label: "Landscaping & Fencing - Lawns, Retaining Walls, Paving, Fences",
      keywords: [
        "landscaping",
        "fencing",
        "lawns",
        "retaining walls",
        "paving",
        "fences",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label: "Concrete & Paving - Driveways, Slabs, Decorative Surfaces",
      keywords: [
        "concrete",
        "paving",
        "driveways",
        "slabs",
        "decorative surfaces",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label: "Excavation & Earthmoving - Mini Diggers, Trenching, Site Prep",
      keywords: [
        "excavation",
        "earthmoving",
        "mini diggers",
        "trenching",
        "site prep",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label: "Pest Control - Licensed Treatment & Management",
      keywords: [
        "pest control",
        "treatment",
        "management",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label:
        "Glazing & Windows - Glass Replacement, Shower Screens, Installers",
      keywords: [
        "glazing",
        "windows",
        "glass replacement",
        "shower screens",
        "installer",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label:
        "Locksmithing & Security Systems - Locks, Alarms, CCTV Installation",
      keywords: [
        "locksmith",
        "security systems",
        "locks",
        "alarms",
        "cctv",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label:
        "Cabinet Making / Shopfitting - Built-in Furniture, Retail Fit-outs",
      keywords: [
        "cabinet making",
        "shopfitting",
        "built in furniture",
        "retail fit outs",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label: "Waterproofing - Membranes, Bathrooms, Balconies",
      keywords: [
        "waterproofing",
        "membranes",
        "bathrooms",
        "balconies",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label: "Gas Fitting - LPG & Natural Gas Installation / Repairs",
      keywords: [
        "gas fitting",
        "lpg",
        "natural gas",
        "installation",
        "repairs",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label: "Handyman / General Maintenance - Multi-Trade & Small Jobs",
      keywords: [
        "handyman",
        "general maintenance",
        "multi trade",
        "small jobs",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label:
        "General Tradesperson - Catch-all for Unlisted Trades (e.g. Scaffolders, Bricklayers, Solar Installers, etc.)",
      keywords: [
        "general tradesperson",
        "unlisted trades",
        "scaffolder",
        "bricklayer",
        "solar installer",
        "trade",
        "trades",
        "tradie",
        "tradies",
      ],
    },
    {
      label: "Investment Property Management",
      keywords: ["investment", "property", "management"],
    },
  ];

  const VISIBLE_LIMIT = 14;

  /* ---- State ---- */
  const state = {
    // Default selection: Business (if available from API)
    selectedPlan: "business",
    selectedAddOns: new Set(),
    billing: "monthly",
    search: "",
    selectedIndustry: "",
    showAll: false,
    showCalculation: false,
    // Populated from API
    packages: [],
    addons: [],
    config: { annual_discount_percent: 20, trial_days: 30, currency: "AUD" },
  };

  /* ---- Cached DOM refs ---- */
  const els = {
    chipsContainer: document.getElementById("chips-container"),
    plansGrid: document.getElementById("plans-grid"),
    addonsList: document.getElementById("addons-list"),
    addonsWrapper: document.getElementById("addons-wrapper"),
    addonsRight: document.getElementById("addons-right"),
    totalPrice: document.getElementById("total-price"),
    searchInput: document.getElementById("industry-search"),
    billingBtns: document.querySelectorAll(".billing-btn"),
  };

  /* ---- SVG helpers ---- */
  function checkSVG(cls) {
    return `<svg class="${cls}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <polyline points="20 6 9 17 4 12" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  function xSVG(cls) {
    return `<svg class="${cls}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <line x1="18" y1="6" x2="6" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  function chipCheckSVG() {
    return `<span class="chip-check">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polyline points="20 6 9 17 4 12" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>`;
  }

  /* ---- API fetch ---- */
  async function fetchPlans() {
    try {
      const res = await fetch(`${API_BASE}/subscription/plans`);
      const json = await res.json();
      if (!json.success)
        throw new Error(json.message || "Failed to fetch plans");

      const { packages, addons, config } = json.data;
      if (config) state.config = config;

      state.packages = groupBySlug(packages);
      state.addons = groupBySlug(addons);
    } catch (err) {
      console.error("Failed to fetch plans from API:", err.message);
      els.plansGrid.innerHTML =
        '<p style="grid-column:1/-1;text-align:center;color:#666;">Unable to load plans. Please try again later.</p>';
    }
  }

  /**
   * Group flat plan rows (from API) by slug.
   * Each slug may have a monthly row, an annual row, or a null-interval row (free).
   */
  function groupBySlug(rows) {
    const map = {};
    for (const row of rows) {
      const slug = row.slug;
      if (!map[slug]) {
        let features = row.features;
        if (typeof features === "string") {
          try {
            features = JSON.parse(features);
          } catch (_) {
            features = { includes: [], excludes: [] };
          }
        }
        map[slug] = {
          slug,
          name: (row.name || slug).replace(/ \((Monthly|Annual)\)$/, ""),
          badge: row.badge || null,
          discountPercent: row.discount_percent || null,
          features: features || { includes: [], excludes: [] },
          desc: row.description || null,
          comingSoon: !!row.coming_soon,
          sortOrder: row.sort_order || 0,
          monthly: null,
          annual: null,
        };
      }

      const entry = {
        price: parseFloat(row.price) || 0,
        id: row.id,
        stripePriceId: row.stripe_price_id,
      };

      if (row.plan_interval === "monthly") {
        map[slug].monthly = entry;
      } else if (row.plan_interval === "annual") {
        map[slug].annual = entry;
      } else {
        // Free plan (null interval) — same price either way
        map[slug].monthly = entry;
        map[slug].annual = entry;
      }

      // Keep highest discount_percent found across rows
      if (
        row.discount_percent &&
        (!map[slug].discountPercent ||
          row.discount_percent > map[slug].discountPercent)
      ) {
        map[slug].discountPercent = row.discount_percent;
      }
    }

    return Object.values(map).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  /* ---- Price helpers ---- */
  function getPlanPrice(planSlug) {
    const pkg = state.packages.find((p) => p.slug === planSlug);
    if (!pkg) return 0;
    if (state.billing === "annual" && pkg.annual) {
      return pkg.annual.price / 12;
    }
    return pkg.monthly ? pkg.monthly.price : 0;
  }

  function getAddonPrice(addonSlug) {
    const addon = state.addons.find((a) => a.slug === addonSlug);
    if (!addon) return 0;
    if (state.billing === "annual" && addon.annual) {
      return addon.annual.price / 12;
    }
    return addon.monthly ? addon.monthly.price : 0;
  }

  function getTotal() {
    const planPrice = state.selectedPlan ? getPlanPrice(state.selectedPlan) : 0;
    if (state.selectedPlan === "free" || !state.selectedPlan)
      return (0).toFixed(2);

    let total = planPrice;
    if (state.selectedPlan === "bundle") {
      const extras = [...state.selectedAddOns].filter(
        (s) => s !== "accounting",
      );
      const paidExtras = Math.max(0, extras.length - 2);
      const sampleAddon = state.addons.find((a) => a.slug !== "accounting");
      const addonUnit = sampleAddon ? getAddonPrice(sampleAddon.slug) : 4.99;
      total += paidExtras * addonUnit;
    } else {
      total += [...state.selectedAddOns].reduce(
        (acc, slug) => acc + getAddonPrice(slug),
        0,
      );
    }
    return total.toFixed(2);
  }

  function fmt(amount) {
    return parseFloat(amount).toFixed(2);
  }

  function normalizeSearchText(value) {
    return value
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function getSearchTokens(value) {
    const normalized = normalizeSearchText(value);
    return normalized ? normalized.split(/\s+/) : [];
  }

  function isTradeQuery(tokens) {
    return tokens.some((token) =>
      ["trade", "trades", "tradie", "tradies"].includes(token),
    );
  }

  function matchesIndustry(industry, tokens) {
    if (!tokens.length) return true;

    const searchWords = [
      ...getSearchTokens(industry.label),
      ...industry.keywords.flatMap((keyword) => getSearchTokens(keyword)),
    ];

    const matchesTokens = tokens.every((token) =>
      searchWords.some((word) => word.includes(token)),
    );

    if (matchesTokens) return true;

    if (isTradeQuery(tokens) && tradeIndustryLabels.has(industry.label)) {
      const nonTradeTokens = tokens.filter(
        (token) => !["trade", "trades", "tradie", "tradies"].includes(token),
      );

      return nonTradeTokens.every((token) =>
        searchWords.some((word) => word.includes(token)),
      );
    }

    return false;
  }

  /* ---- Render: Industry Chips ---- */
  function renderChips() {
    const tokens = getSearchTokens(state.search);
    const filtered = industries.filter((industry) =>
      matchesIndustry(industry, tokens),
    );
    const visible = state.showAll ? filtered : filtered.slice(0, VISIBLE_LIMIT);
    const hidden =
      filtered.length > VISIBLE_LIMIT && !state.showAll
        ? filtered.length - VISIBLE_LIMIT
        : 0;

    const html = visible
      .map(({ label }) => {
        const selected = state.selectedIndustry === label;
        return `<button
        class="chip${selected ? " selected" : ""}"
        data-industry="${label}"
        aria-pressed="${selected}"
      >${label}${selected ? chipCheckSVG() : ""}</button>`;
      })
      .join("");

    const moreBtn =
      hidden > 0
        ? `<button class="chip-more" id="show-more-btn">+${hidden}</button>`
        : "";

    els.chipsContainer.innerHTML = html + moreBtn;

    els.chipsContainer.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const industry = btn.dataset.industry;
        state.selectedIndustry =
          state.selectedIndustry === industry ? "" : industry;
        renderChips();
      });
    });

    const showMoreBtn = document.getElementById("show-more-btn");
    if (showMoreBtn) {
      showMoreBtn.addEventListener("click", () => {
        state.showAll = true;
        renderChips();
      });
    }
  }

  function applySelectedPlanSideEffects(planSlug) {
    if (planSlug === "free") {
      state.selectedAddOns.clear();
      return;
    }
    if (planSlug === "bundle") {
      state.selectedAddOns.clear();
      state.addons.forEach((a) => {
        if (a.slug !== "accounting" && !a.comingSoon) {
          state.selectedAddOns.add(a.slug);
        }
      });
      return;
    }
    state.selectedAddOns.clear();
  }

  function ensureDefaultSelectedPlan() {
    if (!state.packages.length) return;

    const hasSelected = state.packages.some((p) => p.slug === state.selectedPlan);
    if (!hasSelected) {
      const business =
        state.packages.find((p) => p.slug === "business") ||
        state.packages.find((p) => /business/i.test(p.name || ""));
      const free = state.packages.find((p) => p.slug === "free");
      state.selectedPlan = business
        ? business.slug
        : free
          ? "free"
          : state.packages[0].slug;
    }

    applySelectedPlanSideEffects(state.selectedPlan);
  }

  /* ---- Render: Pricing Plans ---- */
  function renderPlans() {
    if (!state.packages.length) return;

    els.plansGrid.innerHTML = state.packages
      .map((pkg) => {
        const selected = state.selectedPlan === pkg.slug;
        const price = getPlanPrice(pkg.slug);
        const features = pkg.features || { includes: [], excludes: [] };
        const includes = features.includes || [];
        const excludes = features.excludes || [];

        return `
        <div
          class="plan-card${selected ? " selected" : ""}"
          data-plan="${pkg.slug}"
          role="radio"
          aria-checked="${selected}"
          tabindex="0"
        >
          <div>
            <div class="plan-card-top">
              <div class="plan-card-title-wrap">
                <p class="plan-title">${pkg.name}</p>
                ${pkg.badge ? `<div class="plan-banner">${pkg.badge}</div>` : ""}
              </div>
              <div class="plan-radio${selected ? " selected" : ""}">
                <div class="plan-radio-dot"></div>
              </div>
            </div>

            <p class="plan-price">$${fmt(price)}${price > 0 ? '<span class="per-month">/month</span>' : ""}</p>
            <hr class="plan-divider" />

            <div class="plan-features">
              ${includes
                .map(
                  (item) => `
                <div class="plan-feature-item">
                  ${checkSVG("plan-check-icon")}
                  <p class="plan-feature-text">${item}</p>
                </div>`,
                )
                .join("")}
              ${excludes
                .map(
                  (item) => `
                <div class="plan-feature-item plan-feature-excluded">
                  ${xSVG("plan-x-icon")}
                  <p class="plan-feature-text">${item}</p>
                </div>`,
                )
                .join("")}
            </div>
          </div>
        </div>`;
      })
      .join("");

    els.plansGrid.querySelectorAll(".plan-card").forEach((card) => {
      const activate = () => {
        const newPlan = card.dataset.plan;
        if (state.selectedPlan !== newPlan) {
          state.selectedPlan = newPlan;
          applySelectedPlanSideEffects(newPlan);
          renderAddons();
        }
        checkShowCalculation();
        renderPlans();
        updateTotal();
      };
      card.addEventListener("click", activate);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      });
    });
  }

  /* ---- Render: Add-Ons ---- */
  function renderAddons() {
    if (!state.addons.length) return;

    els.addonsList.innerHTML = state.addons
      .map((addon) => {
        const isBundleForced =
          state.selectedPlan === "bundle" && addon.slug === "accounting";
        const checked = isBundleForced || state.selectedAddOns.has(addon.slug);
        const disabled = state.selectedPlan === "free" || isBundleForced;
        const monthlyPrice = addon.monthly ? addon.monthly.price : 0;
        const displayPrice = getAddonPrice(addon.slug);
        const isAnnual = state.billing === "annual";

        let priceHtml = "";
        if (
          isBundleForced ||
          (state.selectedPlan === "bundle" &&
            checked &&
            [...state.selectedAddOns]
              .filter((s) => s !== "accounting")
              .indexOf(addon.slug) < 2)
        ) {
          priceHtml =
            '<p class="addon-new-price" style="color:#059669;font-size:13px;">Included</p>';
        } else {
          priceHtml = `<p class="addon-new-price">$${fmt(displayPrice)}<span class="per-month">/mo</span></p>`;
        }

        return `
        <div
          class="addon-card${checked ? " selected" : ""}${addon.comingSoon ? " coming-soon" : ""}${disabled && !checked ? " disabled" : ""}"
          data-addon="${addon.slug}"
          role="checkbox"
          aria-checked="${checked}"
          tabindex="0"
          ${addon.comingSoon || disabled ? 'aria-disabled="true"' : ""}
          ${disabled && !checked ? 'style="opacity:0.6; cursor:not-allowed;"' : ""}
        >
          <input
            type="checkbox"
            class="addon-checkbox"
            ${checked ? "checked" : ""}
            ${addon.comingSoon || disabled ? "disabled" : ""}
            tabindex="-1"
            aria-hidden="true"
            readonly
          />
          <div class="addon-body">
            <div class="addon-row">
              <p class="addon-name">${addon.name}${addon.comingSoon ? ' <span class="addon-coming-soon-tag">Coming Soon</span>' : ""}</p>
              ${isAnnual && monthlyPrice > 0 ? `<p class="addon-old-price">$${fmt(monthlyPrice)}</p>` : ""}
            </div>
            <div class="addon-row">
              <p class="addon-desc">${addon.desc || ""}</p>
              ${addon.comingSoon ? "" : priceHtml}
            </div>
          </div>
        </div>`;
      })
      .join("");

    els.addonsList
      .querySelectorAll(".addon-card:not(.coming-soon)")
      .forEach((card) => {
        const activate = () => {
          if (state.selectedPlan === "free") return;
          const slug = card.dataset.addon;
          if (state.selectedPlan === "bundle" && slug === "accounting") return;

          if (state.selectedAddOns.has(slug)) {
            state.selectedAddOns.delete(slug);
          } else {
            state.selectedAddOns.add(slug);
          }

          if (
            state.selectedPlan &&
            state.selectedPlan !== "bundle" &&
            state.selectedPlan !== "free"
          ) {
            const hasAccounting = state.selectedAddOns.has("accounting");
            const others = [...state.selectedAddOns].filter(
              (s) => s !== "accounting",
            );
            if (hasAccounting && others.length >= 2) {
              state.selectedPlan = "bundle";
              state.selectedAddOns.delete("accounting");
            }
          }

          checkShowCalculation();
          renderPlans();
          renderAddons();
          updateTotal();
        };
        card.addEventListener("click", activate);
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            activate();
          }
        });
      });
  }

  /* ---- Build signup URL with selection as query params ---- */
  function buildSignupUrl() {
    const params = new URLSearchParams();
    if (state.selectedPlan) params.set("plan", state.selectedPlan);
    params.set("billing", state.billing);

    let finalAddons = new Set(state.selectedAddOns);
    if (state.selectedPlan === "bundle") {
      finalAddons.add("accounting");
    }
    if (finalAddons.size > 0) {
      params.set("addons", [...finalAddons].join(","));
    }

    return `${SIGNUP_URL}?${params.toString()}`;
  }

  /* ---- Show/hide add-ons area and calculation panel ---- */
  function checkShowCalculation() {
    const hasSelectedPlan = Boolean(state.selectedPlan);
    state.showCalculation = hasSelectedPlan;

    els.addonsWrapper.style.display = hasSelectedPlan ? "grid" : "none";
    els.addonsRight.style.display = state.showCalculation ? "flex" : "none";
    els.addonsWrapper.classList.toggle("split", state.showCalculation);

    const infoText = document.querySelector(".addons-info-banner p");
    if (infoText) {
      infoText.textContent =
        state.selectedPlan === "free"
          ? "Add-ons are available on paid plans"
          : "Select add-ons";
    }
  }

  /* ---- Update total price display ---- */
  function updateTotal() {
    const total = getTotal();
    const suffix =
      state.billing === "annual" ? "/mo (billed annually)" : "/month";
    els.totalPrice.innerHTML = `$${total}<span class="per-month">${suffix}</span>`;

    // Update trial button link
    const trialBtn = document.getElementById("trial-btn");
    if (trialBtn) {
      trialBtn.href = buildSignupUrl();
    }
  }

  /* ---- Billing toggle ---- */
  function initBillingToggle() {
    els.billingBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.billing = btn.dataset.billing === "annual" ? "annual" : "monthly";
        els.billingBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderPlans();
        renderAddons();
        updateTotal();
      });
    });
  }

  /* ---- Search ---- */
  function initSearch() {
    els.searchInput.addEventListener("input", (e) => {
      state.search = e.target.value;
      state.showAll = false;
      renderChips();
    });
  }

  /* ---- Init ---- */
  async function init() {
    renderChips();
    initBillingToggle();
    initSearch();
    await fetchPlans();
    ensureDefaultSelectedPlan();
    renderPlans();
    renderAddons();
    checkShowCalculation();
    updateTotal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
