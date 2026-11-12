/* 暢遊澳門街 — app shell, routing, maps, storage */
(function () {
  "use strict";

  const DATA = window.MACA_DATA;
  const LS_FAV = "maca_favorites_v1";
  const LS_COM = "maca_comments_v1";

  const state = {
    favs: load(LS_FAV, []),
    comments: load(LS_COM, {}),
    userPos: null,
    geo: "idle",
    from: "plan",
    themeIndex: {},
    newsIndex: 0,
    map: null,
    dir: "fwd"
  };
  let pageAborts = new AbortController();

  const appEl = document.getElementById("app");
  const navEl = document.getElementById("nav");
  const deviceEl = document.getElementById("device");
  const stageEl = document.getElementById("stage");
  const lightboxEl = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  function load(key, fallback) {
    try {
      const v = JSON.parse(localStorage.getItem(key));
      return v == null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode */ }
  }

  /* ---------- icons (24x24, currentColor unless painted) ---------- */
  const I = {
    pin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5c-3.6 0-6.5 2.8-6.5 6.3 0 4.7 6.5 12.7 6.5 12.7s6.5-8 6.5-12.7c0-3.5-2.9-6.3-6.5-6.3zm0 8.6a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6z"/></svg>`,
    tree: `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="11" rx="7.5" ry="6.5" fill="currentColor"/><rect x="10.6" y="15" width="2.8" height="6.2" rx=".6" fill="currentColor"/></svg>`,
    arch: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 20 V11.5 A8 8 0 0 1 20 11.5 V20 h-3.2 V12.2 a4.8 4.8 0 0 0-9.6 0 V20 z"/></svg>`,
    bulb: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.8a6.2 6.2 0 0 0-3.6 11.2v1.4h7.2v-1.4A6.2 6.2 0 0 0 12 2.8zM9.8 17.2h4.4v1.3H9.8zm.7 2.1h3V21h-3z"/></svg>`,
    swirl: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 16c0-5 5.2-6.2 7.4-8.2 1.5-1.4 1.4-3.4-.4-3.6-2.3-.2-3.6 2-3.6 2s-.2-3.4 3.2-3.6c3.4-.2 5.4 2.6 4.6 5.4-.7 2.6-3.4 3.8-5 5.4-1.4 1.4-1.6 3.2-.4 3.6 2 .6 3.4-1.6 3.4-1.6s1 3.2-2.6 3.6C9.2 19.4 7 18.2 7 16z"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.2" fill="none" stroke="#54C6C7" stroke-width="2"/><path d="M12 7.2 V12.2 L16 14.4" fill="none" stroke="#54C6C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    arm: `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="6.3" cy="6.1" rx="3.1" ry="2.9" fill="#3B9FE0"/><path fill="#3B9FE0" d="M7.6 8c1.8-.3 4.2.2 6.2 1.8 2.2 1.8 3.5 4.5 2.6 6.6-.8 1.8-3 2.6-5.3 2.1-1.2-.3-2.2-1-2.8-1.8L6.8 19.2c-.4.9-1.5 1.3-2.4.9s-1.3-1.5-.9-2.4l1.8-4.2C5 12.3 5.2 10.4 6 9.2c.4-.6 1-.9 1.6-1.2z"/></svg>`,
    food: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#DB618A" d="M7 16c0-5 5.2-6.2 7.4-8.2 1.5-1.4 1.4-3.4-.4-3.6-2.3-.2-3.6 2-3.6 2s-.2-3.4 3.2-3.6c3.4-.2 5.4 2.6 4.6 5.4-.7 2.6-3.4 3.8-5 5.4-1.4 1.4-1.6 3.2-.4 3.6 2 .6 3.4-1.6 3.4-1.6s1 3.2-2.6 3.6C9.2 19.4 7 18.2 7 16z"/></svg>`,
    treeC: `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="11" rx="7.5" ry="6.5" fill="#82C75D"/><rect x="10.6" y="15" width="2.8" height="6.2" rx=".6" fill="#82C75D"/></svg>`,
    archC: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#E8D28A" stroke="#C8B56A" stroke-width=".6" d="M5 20 V11.2 A7 7 0 0 1 19 11.2 V20 h-2.8 V12 a4.2 4.2 0 0 0-8.4 0 V20 z"/></svg>`,
    route: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="7" r="2.2" fill="currentColor"/><circle cx="15" cy="11" r="2.2" fill="currentColor"/><circle cx="9" cy="18" r="2.2" fill="currentColor"/><path d="M7.6 8.5 L13.4 10.2 M13.6 12.9 L10.4 16.2" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 20s-6.5-4.2-8.8-8.1C1.4 8.7 3.1 5.5 6.2 5.2c1.7-.2 3.3.7 4.2 2.1 1-1.4 2.5-2.3 4.2-2.1 3.1.3 4.8 3.5 3 6.7C18.5 15.8 12 20 12 20z"/></svg>`,
    heartO: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="#F1879E" stroke-width="1.8" stroke-linejoin="round" d="M12 20s-6.5-4.2-8.8-8.1C1.4 8.7 3.1 5.5 6.2 5.2c1.7-.2 3.3.7 4.2 2.1 1-1.4 2.5-2.3 4.2-2.1 3.1.3 4.8 3.5 3 6.7C18.5 15.8 12 20 12 20z"/></svg>`,
    spark: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M12 3 v4 M12 17 v4 M3 12 h4 M17 12 h4 M6 6 l2.4 2.4 M15.6 15.6 L18 18 M18 6 l-2.4 2.4 M8.4 15.6 L6 18"/><circle cx="12" cy="12" r="2.2" fill="currentColor"/></svg>`,
    map: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" opacity=".9" d="M4.5 6.2 9 4.5v15.2L4.5 21.2z"/><path fill="currentColor" d="m9 4.5 6 2.2v15.1l-6-2.1z"/><path fill="currentColor" opacity=".75" d="m15 6.7 4.5-1.5v15.1L15 21.8z"/><circle cx="8.2" cy="8.2" r="2.3" fill="#fff" opacity=".85"/><path d="M8.2 6.6 v1.6 l1.1.7" fill="none" stroke="#5E5F63" stroke-width="1"/></svg>`,
    pics: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="1.6" fill="currentColor"/><circle cx="8" cy="11" r="1.6" fill="#fff"/><path fill="#fff" d="m7 19 5-6 3 3.2 2-2.2 4 5z"/><path fill="#82C75D" d="M15.2 10.2c0-2 2.6-3.2 2.6-3.2s2.6 1.2 2.6 3.2c0 1.2-1 2-2.6 3.2-1.6-1.2-2.6-2-2.6-3.2z"/></svg>`,
    bubble: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 5.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-4.5 3.2V17.5H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z"/></svg>`,
    form: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3.5" width="11" height="15" rx="1.2" fill="#D5D6D8" stroke="#9A9A9E"/><path d="M7.2 7.5 h7 M7.2 10 h7 M7.2 12.5 h5" stroke="#9A9A9E" stroke-width="1.2"/><path fill="#C0C0C4" d="M14 13.5 20.5 8.2 22 9.8 15.6 15.2 13.4 15.8z"/></svg>`,
    back: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 L8 12 L15 19" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    chevL: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 5 L8.5 12 L14.5 19" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    chevR: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 5 L15.5 12 L9.5 19" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    close: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`
  };

  function themeById(id) { return DATA.themes.find((t) => t.id === id); }
  function routeById(id) { return DATA.routes.find((r) => r.id === id); }
  function routesByTheme(id) { return DATA.routes.filter((r) => r.theme === id); }

  function isFav(id) { return state.favs.indexOf(id) !== -1; }
  function toggleFav(id) {
    if (isFav(id)) state.favs = state.favs.filter((x) => x !== id);
    else state.favs.push(id);
    save(LS_FAV, state.favs);
  }

  function allComments(route) {
    return (route.seedComments || []).concat(state.comments[route.id] || []);
  }
  function routeMetrics(route) {
    const crowd = allComments(route);
    const base = [route.metrics].concat(crowd);
    const avg = (k) => {
      const v = base.map((x) => Number(x[k])).filter((n) => !isNaN(n));
      return Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10;
    };
    return {
      walk: route.metrics.walk,
      energy: avg("energy"),
      food: avg("food"),
      green: avg("green"),
      heritage: avg("heritage")
    };
  }

  function haversine(a, b) {
    const R = 6371000;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const s =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
  }
  function centroid(route) {
    const s = route.stops;
    return {
      lat: s.reduce((a, x) => a + x.lat, 0) / s.length,
      lng: s.reduce((a, x) => a + x.lng, 0) / s.length
    };
  }
  function formatDist(m) {
    if (m < 1000) return "附近 " + Math.round(m) + " 米";
    return "附近 " + (m / 1000).toFixed(1) + " 公里";
  }
  function routeDistance(route) {
    if (state.userPos) {
      const first = route.stops[0];
      const mid = centroid(route);
      return Math.min(haversine(state.userPos, first), haversine(state.userPos, mid));
    }
    return route.fallbackDistance;
  }

  function requestGeo() {
    if (!navigator.geolocation) {
      state.geo = "denied";
      return Promise.resolve(null);
    }
    state.geo = "pending";
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          state.userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          state.geo = "ok";
          resolve(state.userPos);
        },
        () => {
          state.geo = "denied";
          resolve(null);
        },
        { enableHighAccuracy: false, timeout: 7000, maximumAge: 300000 }
      );
    });
  }

  /* ---------- DOM helpers ---------- */
  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  function destroyMap() {
    if (state.map) {
      try { state.map.remove(); } catch (e) { /* ignore */ }
      state.map = null;
    }
  }

  function metricRow(m) {
    return `<div class="metrics">
      <div class="metric">${I.clock}<span class="n">${m.walk}</span><span class="u">分鐘</span></div>
      <div class="metric">${I.arm}<span class="n">${m.energy}</span></div>
      <div class="metric">${I.food}<span class="n">${m.food}</span></div>
      <div class="metric">${I.treeC}<span class="n">${m.green}</span></div>
      <div class="metric">${I.archC}<span class="n">${m.heritage}</span></div>
    </div>`;
  }

  function routeCardBody(route, opts) {
    opts = opts || {};
    const m = routeMetrics(route);
    const dist = opts.distance != null
      ? `<div class="nearby-dist">${escapeHtml(formatDist(opts.distance))}</div>`
      : "";
    return `${opts.hero === false ? "" : `<img class="hero" src="${route.hero}" alt="${escapeHtml(route.name)}">`}
      <div class="body">
        ${dist}
        <h2 class="route-name">${I.route}<span>${escapeHtml(route.name)}</span></h2>
        <p class="route-stops">${escapeHtml(route.stopsSummary)}......</p>
        ${metricRow(m)}
        <button type="button" class="more-link" data-open="${route.id}">more...</button>
      </div>`;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function deco(theme) {
    const icon = theme ? I[theme.icon] || I.route : I.route;
    return `<div class="deco" aria-hidden="true">${icon}</div>`;
  }


  function bindOpen(root, from) {
    root.querySelectorAll("article[data-open], .route-card[data-open], .nearby-card[data-open]").forEach((n) => {
      n.addEventListener("click", () => {
        if (n.dataset.suppressClick === "1") return;
        const id = n.getAttribute("data-open");
        if (id) openRoute(id, from);
      });
    });
  }

  /* ---------- Screens ---------- */
  function renderHome() {
    navEl.hidden = true;
    stageEl.setAttribute("data-section", "home");
    appEl.innerHTML = "";
    const s = el(`<section class="screen home active" data-screen="home">
      <div class="home-header">
        <div class="home-title-1">暢遊</div>
        <div class="home-title-2">澳門街</div>
      </div>
      <div class="home-actions">
        <button type="button" class="home-btn home-btn--news" data-go="#/news">
          <span class="ico">${I.spark}</span>最新推介
        </button>
        <button type="button" class="home-btn home-btn--plan" data-go="#/plan">
          <span class="ico">${I.route}</span>路線規劃
        </button>
        <button type="button" class="home-btn home-btn--fav" data-go="#/favorites">
          <span class="ico">${I.heart}</span>我的收藏
        </button>
      </div>
      <div class="home-skyline">
        <img src="img/home-skyline.svg" alt="大三巴、燈塔與議事亭前地波浪紋石仔路插畫">
      </div>
    </section>`);
    appEl.appendChild(s);
  }

  function renderPlan() {
    showNav("plan");
    stageEl.setAttribute("data-section", "plan");
    const items = DATA.themes.map((t) => {
      return `<button type="button" class="theme-item" data-go="#/plan/${t.id}">
        <span class="theme-icon" style="background:${t.color};color:#fff">${I[t.icon]}</span>
        <span>${escapeHtml(t.name)}</span>
      </button>`;
    }).join("");
    appEl.innerHTML = "";
    appEl.appendChild(el(`<section class="screen has-nav active" data-screen="plan">
      <header class="page-header hdr-plan">
        ${deco({ icon: "route" })}
        <h1>路線規劃</h1>
      </header>
      <div class="scroll">
        <div class="theme-list">${items}</div>
      </div>
    </section>`));
  }

  function renderTheme(themeId) {
    if (themeId === "nearby") return renderNearby();
    const theme = themeById(themeId);
    if (!theme) return go("#/plan");
    showNav("plan");
    stageEl.setAttribute("data-section", themeId);
    const list = routesByTheme(themeId);
    const start = state.themeIndex[themeId] || 0;
    const light = theme.headerText === "#454547";
    appEl.innerHTML = "";
    const slides = list.map((r) =>
      `<div class="carousel-slide"><article class="route-card" data-open="${r.id}">${routeCardBody(r)}</article></div>`
    ).join("");
    const dots = list.map((_, i) => `<b class="${i === start ? "on" : ""}" data-dot="${i}"></b>`).join("");
    const sec = el(`<section class="screen has-nav active" data-screen="theme">
      <header class="page-header hdr-${theme.id} ${light ? "light" : ""}">
        ${deco(theme)}
        <h1>${escapeHtml(theme.name)}</h1>
      </header>
      <div class="carousel">
        <div class="carousel-viewport">
          <div class="carousel-track">${slides}</div>
        </div>
        <div class="dots">${dots}</div>
      </div>
    </section>`);
    appEl.appendChild(sec);
    bindCarousel(sec.querySelector(".carousel"), list.length, start, (i) => {
      state.themeIndex[themeId] = i;
    });
    bindOpen(sec, "theme:" + themeId);
  }

  function renderNearby() {
    showNav("plan");
    stageEl.setAttribute("data-section", "nearby");
    const theme = themeById("nearby");
    const list = DATA.routes
      .filter((r) => r.nearby)
      .map((r) => ({ route: r, d: routeDistance(r) }))
      .sort((a, b) => a.d - b.d);
    const cards = list.map(({ route, d }) =>
      `<article class="nearby-card route-card" data-open="${route.id}">${routeCardBody(route, { hero: false, distance: d })}</article>`
    ).join("");
    appEl.innerHTML = "";
    appEl.appendChild(el(`<section class="screen has-nav active" data-screen="nearby">
      <header class="page-header hdr-nearby">
        ${deco(theme)}
        <h1>附近路線</h1>
      </header>
      <div class="scroll"><div class="nearby-list">${cards}</div></div>
    </section>`));
    bindOpen(appEl, "nearby");
    if (state.geo === "idle" || state.geo === "denied" && !state.userPos) {
      requestGeo().then((pos) => {
        if (pos && location.hash === "#/plan/nearby") renderNearby();
      });
    }
  }

  function renderNews() {
    showNav("news");
    stageEl.setAttribute("data-section", "news");
    const list = DATA.promos;
    const start = Math.min(state.newsIndex, list.length - 1);
    const slides = list.map((p) =>
      `<div class="carousel-slide"><article class="news-card">
        <h2>${escapeHtml(p.title)}</h2>
        <img class="hero" src="${p.photo}" alt="${escapeHtml(p.title)}">
        <p>${escapeHtml(p.body)}</p>
        <button type="button" class="related" data-related="${p.relatedRoute}">相關路線...</button>
      </article></div>`
    ).join("");
    const dots = list.map((_, i) => `<b class="${i === start ? "on" : ""}" data-dot="${i}"></b>`).join("");
    appEl.innerHTML = "";
    const sec = el(`<section class="screen has-nav active" data-screen="news">
      <header class="page-header hdr-news">
        ${deco({ icon: "spark" })}
        <h1>最新推介</h1>
      </header>
      <div class="carousel">
        <div class="carousel-viewport">
          <div class="carousel-track">${slides}</div>
        </div>
        <div class="dots">${dots}</div>
      </div>
    </section>`);
    appEl.appendChild(sec);
    bindCarousel(sec.querySelector(".carousel"), list.length, start, (i) => {
      state.newsIndex = i;
    });
    sec.querySelectorAll("[data-related]").forEach((b) => {
      b.addEventListener("click", () => {
        openRoute(b.getAttribute("data-related"), "news");
      });
    });
  }

  function renderFav() {
    showNav("fav");
    stageEl.setAttribute("data-section", "fav");
    const list = state.favs.map(routeById).filter(Boolean);
    appEl.innerHTML = "";
    if (!list.length) {
      appEl.appendChild(el(`<section class="screen has-nav active" data-screen="fav">
        <header class="page-header hdr-fav">
          ${deco({ icon: "heart" })}
          <h1>我的收藏</h1>
        </header>
        <div class="scroll">
          <div class="empty">
            <div class="heart">${I.heart}</div>
            <p>尚未收藏任何路線。<br>在路線詳細資料按 ♡，即可在這裏找回你興趣的路線。</p>
          </div>
        </div>
      </section>`));
      return;
    }
    const start = Math.min(state.themeIndex.fav || 0, list.length - 1);
    const slides = list.map((r) =>
      `<div class="carousel-slide"><article class="route-card" data-open="${r.id}">${routeCardBody(r)}</article></div>`
    ).join("");
    const dots = list.map((_, i) => `<b class="${i === start ? "on" : ""}" data-dot="${i}"></b>`).join("");
    const sec = el(`<section class="screen has-nav active" data-screen="fav">
      <header class="page-header hdr-fav">
        ${deco({ icon: "heart" })}
        <h1>我的收藏</h1>
      </header>
      <div class="carousel">
        <div class="carousel-viewport"><div class="carousel-track">${slides}</div></div>
        <div class="dots">${dots}</div>
      </div>
    </section>`);
    appEl.appendChild(sec);
    bindCarousel(sec.querySelector(".carousel"), list.length, start, (i) => {
      state.themeIndex.fav = i;
    });
    bindOpen(sec, "fav");
  }

  function renderDetail(id, tab) {
    const route = routeById(id);
    if (!route) return go("#/plan");
    showNav(state.from === "fav" ? "fav" : state.from === "news" ? "news" : "plan");
    const theme = themeById(route.theme);
    const light = theme.headerText === "#454547";
    tab = tab || "map";
    stageEl.setAttribute("data-section", route.theme);
    const favOn = isFav(route.id);
    appEl.innerHTML = "";
    const sec = el(`<section class="screen has-nav active" data-screen="detail">
      <div class="detail-theme-bar hdr-${theme.id} ${light ? "light" : ""}" style="color:${theme.headerText}">
        ${deco(theme)}
        <span>${escapeHtml(theme.name)}</span>
      </div>
      <div class="detail-title-bar">
        <div class="name">${I.route}<span>${escapeHtml(route.name)}</span></div>
        <button type="button" class="heart-btn ${favOn ? "is-on" : ""}" data-fav="${route.id}" aria-label="${favOn ? "移出收藏" : "加入我的收藏"}" aria-pressed="${favOn}">
          ${favOn ? I.heart : I.heartO}
        </button>
      </div>
      <div class="detail-body">
        <div class="side-tabs">
          <button type="button" data-tab="map" class="${tab === "map" ? "is-on" : ""}" aria-label="地圖">${I.map}</button>
          <button type="button" data-tab="photos" class="${tab === "photos" ? "is-on" : ""}" aria-label="圖片">${I.pics}</button>
          <button type="button" data-tab="ratings" class="${tab === "ratings" ? "is-on" : ""}" aria-label="評分">${I.bubble}</button>
          <button type="button" class="go-tab" data-go-tour="${route.id}" aria-label="開始導覽">go</button>
        </div>
        <div class="detail-panel" id="detail-panel"></div>
      </div>
    </section>`);
    appEl.appendChild(sec);
    fillDetailPanel(route, tab);
    sec.querySelectorAll("[data-tab]").forEach((b) => {
      b.addEventListener("click", () => {
        const t = b.getAttribute("data-tab");
        state.dir = "fwd";
        location.hash = "#/route/" + route.id + (t === "map" ? "" : "/" + t);
      });
    });
    sec.querySelector("[data-go-tour]").addEventListener("click", () => {
      go("#/tour/" + route.id + "/0");
    });
    sec.querySelector("[data-fav]").addEventListener("click", (e) => {
      const btn = e.currentTarget;
      toggleFav(route.id);
      const on = isFav(route.id);
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", on);
      btn.setAttribute("aria-label", on ? "移出收藏" : "加入我的收藏");
      btn.innerHTML = on ? I.heart : I.heartO;
      if (on) btn.classList.remove("is-on"); // restart anim
      void btn.offsetWidth;
      if (on) btn.classList.add("is-on");
    });
  }

  function fillDetailPanel(route, tab) {
    destroyMap();
    const panel = document.getElementById("detail-panel");
    if (tab === "photos") {
      const shots = route.photos.map((src, i) =>
        `<img class="shot" src="${src}" alt="${escapeHtml(route.name)} 圖片 ${i + 1}" data-full="${src}">`
      ).join("");
      panel.innerHTML = `<div class="gallery"><div class="grid">${shots}</div></div>`;
      panel.querySelectorAll("[data-full]").forEach((img) => {
        img.addEventListener("click", () => openLightbox(img.getAttribute("data-full"), img.alt));
      });
      return;
    }
    if (tab === "ratings") {
      panel.innerHTML = renderRatings(route);
      bindRatings(route, panel);
      return;
    }
    // map + description
    const pages = (route.descriptions && route.descriptions.length ? route.descriptions : [""])
      .map((t) => `<div class="desc-page">${escapeHtml(t)}</div>`).join("");
    panel.innerHTML = `<div class="map" id="route-map" role="application" aria-label="路線地圖"></div>
      <div class="detail-desc">
        <div class="desc-viewport"><div class="desc-track">${pages}</div></div>
        ${route.descriptions && route.descriptions.length > 1 ? `<div class="dots">${route.descriptions.map((_, i) => `<b class="${i === 0 ? "on" : ""}"></b>`).join("")}</div>` : ""}
      </div>`;
    mountMap(document.getElementById("route-map"), route.stops, -1);
    if (route.descriptions && route.descriptions.length > 1) {
      bindDescSwipe(panel.querySelector(".detail-desc"), route.descriptions.length);
    }
  }

  function renderRatings(route) {
    const m = routeMetrics(route);
    const comments = allComments(route);
    const list = comments.map((c) =>
      `<article class="comment">
        <div class="who">來自${escapeHtml(c.from || "澳門")}的${escapeHtml(c.name)}說：</div>
        <div class="txt">${escapeHtml(c.text)}</div>
        <div class="when">${escapeHtml(c.date)}</div>
      </article>`
    ).join("") || `<p class="empty" style="padding:16px 0">尚未有其他使用者的意見，歡迎留下你的評分。</p>`;
    return `<div class="ratings">
      <div class="avg-row" aria-label="眾人評分的平均值">
        ${metricRow(m)}
      </div>
      <div class="comment-list">${list}</div>
      <form class="rate-form" id="rate-form" novalidate>
        <h3>${I.form}加入你的評分和意見</h3>
        <p class="form-msg" id="form-msg"></p>
        <div class="rate-grid">
          <label class="rate-field">${I.food}<input type="number" name="food" min="1" max="5" inputmode="numeric" aria-label="美食豐富度"><span class="hint">(1-5)</span></label>
          <label class="rate-field">${I.treeC}<input type="number" name="green" min="1" max="5" inputmode="numeric" aria-label="綠化含量"><span class="hint">(1-5)</span></label>
          <label class="rate-field">${I.arm}<input type="number" name="energy" min="1" max="5" inputmode="numeric" aria-label="體力需求"><span class="hint">(1-5)</span></label>
          <label class="rate-field">${I.archC}<input type="number" name="heritage" min="1" max="5" inputmode="numeric" aria-label="古蹟豐富度"><span class="hint">(1-5)</span></label>
        </div>
        <div class="form-row"><label for="c-text">評價：</label><textarea id="c-text" name="text" required></textarea></div>
        <div class="form-row"><label for="c-name">姓名：</label><input id="c-name" name="name" maxlength="20"></div>
        <div class="form-row"><label for="c-from">來自：</label><input id="c-from" name="from" maxlength="20"></div>
        <div class="form-foot"><button type="submit" class="ok-btn">ok</button></div>
      </form>
    </div>`;
  }

  function bindRatings(route, panel) {
    const form = panel.querySelector("#rate-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const num = (k) => Number(fd.get(k));
      const fields = ["food", "green", "energy", "heritage"];
      const msg = panel.querySelector("#form-msg");
      for (const k of fields) {
        const v = num(k);
        if (!v || v < 1 || v > 5) {
          msg.textContent = "請為四個項目填寫 1 至 5 的評分。";
          return;
        }
      }
      const text = String(fd.get("text") || "").trim();
      if (!text) {
        msg.textContent = "請填寫評價。";
        return;
      }
      const today = new Date();
      const date =
        today.getFullYear() +
        "/" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "/" +
        String(today.getDate()).padStart(2, "0");
      const item = {
        name: String(fd.get("name") || "").trim() || "遊客",
        from: String(fd.get("from") || "").trim() || "澳門",
        text,
        date,
        food: num("food"),
        green: num("green"),
        energy: num("energy"),
        heritage: num("heritage")
      };
      const arr = (state.comments[route.id] || []).concat([item]);
      state.comments[route.id] = arr;
      save(LS_COM, state.comments);
      panel.innerHTML = renderRatings(route);
      bindRatings(route, panel);
    });
  }

  function renderTour(id, stopIndex) {
    const route = routeById(id);
    if (!route) return go("#/plan");
    showNav(state.from === "fav" ? "fav" : state.from === "news" ? "news" : "plan");
    const i = Math.max(0, Math.min(route.stops.length - 1, Number(stopIndex) || 0));
    const stop = route.stops[i];
    const no = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮".charAt(i) || String(i + 1);
    stageEl.setAttribute("data-section", route.theme);
    appEl.innerHTML = "";
    const photos = (stop.photos || []).map((src, n) =>
      `<img src="${src}" alt="${escapeHtml(stop.name)} 圖片 ${n + 1}" data-full="${src}">`
    ).join("");
    const sec = el(`<section class="screen has-nav active" data-screen="tour">
      <div class="tour-top">${I.route}<span>${escapeHtml(route.name)}</span></div>
      <div class="tour-switch">
        <button type="button" data-step="-1" aria-label="上一節點" ${i === 0 ? "disabled" : ""}>${I.chevL}</button>
        <div class="cur"><span class="dots-inline">··</span> ${no} ${escapeHtml(stop.name)} <span class="dots-inline">··</span></div>
        <button type="button" data-step="1" aria-label="下一節點" ${i === route.stops.length - 1 ? "disabled" : ""}>${I.chevR}</button>
      </div>
      <div class="tour-map">
        <div class="map" id="tour-map" role="application" aria-label="節點地圖" style="height:100%"></div>
        <a class="map-open" target="_blank" rel="noopener" href="https://www.google.com/maps?q=${stop.lat},${stop.lng}">在地圖開啟</a>
      </div>
      <div class="tour-photos">${photos}</div>
      <div class="tour-intro">${escapeHtml(stop.intro)}</div>
    </section>`);
    appEl.appendChild(sec);
    mountMap(document.getElementById("tour-map"), route.stops, i);
    sec.querySelectorAll("[data-step]").forEach((b) => {
      b.addEventListener("click", () => {
        const n = i + Number(b.getAttribute("data-step"));
        if (n >= 0 && n < route.stops.length) go("#/tour/" + route.id + "/" + n);
      });
    });
    sec.querySelectorAll("[data-full]").forEach((img) => {
      img.addEventListener("click", () => openLightbox(img.getAttribute("data-full"), img.alt));
    });
  }

  /* ---------- Map ---------- */
  function mountMap(node, stops, currentIndex) {
    destroyMap();
    if (!node) return;
    const map = L.map(node, { zoomControl: true, attributionControl: true });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
      maxZoom: 19
    }).addTo(map);
    const latlngs = stops.map((s) => [s.lat, s.lng]);
    const line = L.polyline(latlngs, { color: "#8A8A8A", weight: 3, opacity: 0.9 }).addTo(map);
    stops.forEach((s, i) => {
      const cur = i === currentIndex;
      const icon = L.divIcon({
        className: "mac-mark",
        html: `<div class="map-marker${cur ? " current" : ""}"></div>`,
        iconSize: cur ? [22, 22] : [18, 18],
        iconAnchor: cur ? [11, 11] : [9, 9]
      });
      const marker = L.marker([s.lat, s.lng], { icon, zIndexOffset: cur ? 600 : 0 }).addTo(map);
      marker.bindTooltip(s.name, {
        permanent: !!cur,
        direction: "right",
        offset: [12, 0],
        className: "marker-label",
        opacity: 0.95
      });
      if (!cur) marker.bindPopup(s.name);
    });
    map.fitBounds(line.getBounds(), { padding: [28, 28], maxZoom: 17 });
    state.map = map;
    requestAnimationFrame(() => {
      map.invalidateSize();
      setTimeout(() => map.invalidateSize(), 160);
    });
  }

  /* ---------- Carousel / swipe ---------- */
  function bindCarousel(root, count, start, onChange) {
    const viewport = root.querySelector(".carousel-viewport");
    const track = root.querySelector(".carousel-track");
    const dots = root.querySelectorAll(".dots b");
    let index = start || 0;
    let x0 = 0, y0 = 0, dx = 0, dragging = false, locked = null, width = 1;

    function layout() {
      width = viewport.clientWidth || 1;
      track.style.transform = "translateX(" + (-index * width) + "px)";
    }
    function goTo(i, anim) {
      index = Math.max(0, Math.min(count - 1, i));
      track.classList.toggle("anim", !!anim);
      layout();
      dots.forEach((d, n) => d.classList.toggle("on", n === index));
      if (onChange) onChange(index);
    }
    layout();
    goTo(index, false);

    const sig = { signal: pageAborts.signal };
    viewport.addEventListener("pointerdown", (e) => {
      if (e.button && e.button !== 0) return;
      dragging = true;
      locked = null;
      x0 = e.clientX; y0 = e.clientY; dx = 0;
      track.classList.remove("anim");
      width = viewport.clientWidth || 1;
      try { viewport.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    }, sig);
    viewport.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const mx = e.clientX - x0, my = e.clientY - y0;
      if (locked == null && Math.abs(mx) + Math.abs(my) > 8) {
        locked = Math.abs(mx) > Math.abs(my) ? "h" : "v";
      }
      if (locked !== "h") return;
      e.preventDefault();
      dx = mx;
      const resist = (index === 0 && dx > 0) || (index === count - 1 && dx < 0) ? 0.35 : 1;
      track.style.transform = "translateX(" + (-index * width + dx * resist) + "px)";
    }, sig);
    function end() {
      if (!dragging) return;
      dragging = false;
      const swiped = locked === "h" && Math.abs(dx) > width * 0.18;
      if (swiped) {
        goTo(index + (dx < 0 ? 1 : -1), true);
        viewport.querySelectorAll("[data-open]").forEach((n) => {
          n.dataset.suppressClick = "1";
          setTimeout(() => { n.dataset.suppressClick = "0"; }, 250);
        });
      } else {
        goTo(index, true);
      }
      dx = 0; locked = null;
    }
    viewport.addEventListener("pointerup", end, sig);
    viewport.addEventListener("pointercancel", end, sig);
    dots.forEach((d) => d.addEventListener("click", () => goTo(Number(d.getAttribute("data-dot")), true), sig));
    window.addEventListener("resize", layout, sig);
  }

  function bindDescSwipe(root, count) {
    // reuse carousel logic on desc-viewport
    const fake = {
      querySelector: (sel) => {
        if (sel === ".carousel-viewport") return root.querySelector(".desc-viewport");
        if (sel === ".carousel-track") return root.querySelector(".desc-track");
        if (sel === ".dots b") return null;
        return root.querySelector(sel);
      },
      querySelectorAll: (sel) => root.querySelectorAll(sel === ".dots b" ? ".dots b" : sel)
    };
    bindCarousel(fake, count, 0, null);
  }

  /* ---------- Lightbox ---------- */
  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "圖片放大";
    lightboxEl.classList.add("on");
  }
  function closeLightbox() {
    lightboxEl.classList.remove("on");
    lightboxImg.src = "";
  }
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  lightboxEl.addEventListener("click", (e) => {
    if (e.target === lightboxEl) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------- Navigation ---------- */
  function showNav(active) {
    navEl.hidden = false;
    navEl.querySelectorAll("button[data-act]").forEach((b) => {
      b.classList.toggle("is-on", b.getAttribute("data-act") === active);
    });
  }

  function go(hash) {
    if (location.hash === hash) route();
    else location.hash = hash;
  }
  function openRoute(id, from) {
    state.from = from || "plan";
    go("#/route/" + id);
  }

  function logicalBack() {
    const r = parseHash();
    if (r.name === "tour") {
      go("#/route/" + r.id);
      return;
    }
    if (r.name === "detail") {
      if (state.from === "news") return go("#/news");
      if (state.from === "fav") return go("#/favorites");
      if (state.from === "nearby") return go("#/plan/nearby");
      if (String(state.from).indexOf("theme:") === 0) return go("#/plan/" + state.from.split(":")[1]);
      return go("#/plan");
    }
    if (r.name === "theme" || r.name === "nearby") return go("#/plan");
    if (r.name === "plan" || r.name === "news" || r.name === "fav") return go("#/");
    go("#/");
  }

  navEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-act]");
    if (!btn) return;
    const act = btn.getAttribute("data-act");
    if (act === "back") logicalBack();
    else if (act === "news") go("#/news");
    else if (act === "plan") go("#/plan");
    else if (act === "fav") go("#/favorites");
  });

  appEl.addEventListener("click", (e) => {
    const g = e.target.closest("[data-go]");
    if (g) {
      e.preventDefault();
      go(g.getAttribute("data-go"));
    }
  });

  function parseHash() {
    const h = (location.hash || "#/").replace(/^#/, "");
    const p = h.replace(/^\/+/, "").split("/").filter(Boolean);
    if (!p.length) return { name: "home" };
    if (p[0] === "news") return { name: "news" };
    if (p[0] === "favorites") return { name: "fav" };
    if (p[0] === "plan" && p[1]) return p[1] === "nearby" ? { name: "nearby" } : { name: "theme", theme: p[1] };
    if (p[0] === "plan") return { name: "plan" };
    if (p[0] === "route" && p[1]) return { name: "detail", id: p[1], tab: p[2] || "map" };
    if (p[0] === "tour" && p[1]) return { name: "tour", id: p[1], stop: p[2] || "0" };
    return { name: "home" };
  }

  function route() {
    closeLightbox();
    destroyMap();
    pageAborts.abort();
    pageAborts = new AbortController();
    const r = parseHash();
    if (r.name === "home") renderHome();
    else if (r.name === "plan") renderPlan();
    else if (r.name === "theme") renderTheme(r.theme);
    else if (r.name === "nearby") renderNearby();
    else if (r.name === "news") renderNews();
    else if (r.name === "fav") renderFav();
    else if (r.name === "detail") renderDetail(r.id, r.tab);
    else if (r.name === "tour") renderTour(r.id, r.stop);
    else renderHome();
  }

  function fitDevice() {
    if (window.matchMedia("(max-width: 519px)").matches) {
      deviceEl.style.transform = "";
      return;
    }
    const maxH = window.innerHeight - 48;
    const scale = Math.min(1, maxH / 844);
    deviceEl.style.transform = scale < 0.999 ? "scale(" + scale + ")" : "";
  }

  window.addEventListener("hashchange", route);
  window.addEventListener("resize", fitDevice);
  fitDevice();
  route();
  // Quietly try geolocation so nearby is ready later; ignore failures.
  if (navigator.geolocation) {
    setTimeout(() => { if (state.geo === "idle") requestGeo(); }, 800);
  }
})();
