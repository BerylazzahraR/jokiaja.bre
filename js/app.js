/* ==========================================================
   APP — interaksi situs. Bergantung pada config.js & data.js
   ========================================================== */
(() => {
  "use strict";

  const CFG = window.SITE_CONFIG;
  const DATA = window.SITE_DATA;
  if (!CFG || !DATA) { console.error("config.js / data.js belum termuat."); return; }

  /* ---------- Helper ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rupiah = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
  const ic = (name) => `<iconify-icon icon="${name}" aria-hidden="true"></iconify-icon>`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const catById = Object.fromEntries(DATA.categories.map((c) => [c.id, c]));
  const svcById = Object.fromEntries(DATA.services.map((s) => [s.id, s]));
  const waNumber = String(CFG.whatsappNumber).replace(/\D/g, "");

  /* ---------- Toast ---------- */
  const toastBox = $("#toasts");
  function toast(message, icon = "lucide:circle-check") {
    if (!toastBox) return;
    while (toastBox.children.length >= 3) toastBox.firstElementChild.remove();
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `${ic(icon)}<span>${esc(message)}</span>`;
    toastBox.appendChild(el);
    setTimeout(() => {
      el.classList.add("out");
      setTimeout(() => el.remove(), 320);
    }, 2800);
  }

  /* ---------- WhatsApp ---------- */
  function openWhatsApp(text) {
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    const a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
    document.body.appendChild(a); a.click(); a.remove();
    toast("Membuka WhatsApp…", "simple-icons:whatsapp");
  }
  function orderService(id) {
    const s = svcById[id]; if (!s) return;
    openWhatsApp(CFG.messages.order(s.name, catById[s.category].label, `Mulai dari ${rupiah(s.price)}`));
  }
  const consult = () => openWhatsApp(CFG.messages.consult);

  /* ---------- Identitas & footer dari konfigurasi ---------- */
  function applyBrand() {
    $$("[data-brand-name]").forEach((el) => (el.textContent = CFG.brandName));
    $$("[data-tagline]").forEach((el) => (el.textContent = CFG.tagline + ". Konsultasi, editing, desain, dan teknologi untuk mahasiswa."));
    document.title = `${CFG.brandName} — Layanan Akademik & Produktivitas Mahasiswa`;
    $("#year").textContent = new Date().getFullYear();
    $("#fWa").href = `https://wa.me/${waNumber}`;
    $("#fIg").href = CFG.instagramUrl; $("#fIg span").textContent = "@" + CFG.instagramHandle;
    $("#fMail").href = `mailto:${CFG.email}`; $("#fMail span").textContent = CFG.email;
    $("#footerCats").innerHTML = DATA.categories
      .map((c) => `<li><button type="button" data-filter-cat="${c.id}">${esc(c.label)}</button></li>`).join("");
  }

  /* ---------- Tema ---------- */
  const root = document.documentElement;
  const themeMeta = $('meta[name="theme-color"]');
  function setTheme(t, persist) {
    root.setAttribute("data-theme", t);
    if (themeMeta) themeMeta.content = t === "dark" ? "#0B0D12" : "#F7F8FC";
    if (persist) { try { localStorage.setItem("site-theme", t); } catch (e) {} }
  }
  function initTheme() {
    setTheme(root.getAttribute("data-theme") || "dark", false);
    $("#themeToggle").addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.classList.add("theme-anim");
      setTheme(next, true);
      setTimeout(() => root.classList.remove("theme-anim"), 450);
      toast(next === "dark" ? "Mode gelap aktif" : "Mode terang aktif", next === "dark" ? "lucide:moon" : "lucide:sun");
    });
    // Ikuti perubahan tema sistem selama pengguna belum memilih manual
    matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
      let saved = null; try { saved = localStorage.getItem("site-theme"); } catch (err) {}
      if (!saved) setTheme(e.matches ? "light" : "dark", false);
    });
  }

  /* ---------- Navbar ---------- */
  const nav = $("#nav"), navLinks = $("#navLinks"), burger = $("#burger");
  function setMenu(open) {
    navLinks.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  }
  function initNav() {
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    burger.addEventListener("click", () => setMenu(!navLinks.classList.contains("is-open")));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
    matchMedia("(min-width: 961px)").addEventListener("change", () => setMenu(false));

    // Tandai menu aktif sesuai section yang terlihat
    const map = {};
    $$("#navLinks a[data-link]").forEach((a) => { if (!a.classList.contains("btn")) map[a.getAttribute("href").slice(1)] = a; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        Object.values(map).forEach((a) => a.classList.remove("is-active"));
        map[en.target.id]?.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- Scroll mulus & transisi halaman ---------- */
  const pageBar = $("#pageBar");
  function flashBar() {
    if (reduceMotion) return;
    pageBar.classList.remove("run"); void pageBar.offsetWidth; pageBar.classList.add("run");
  }
  function goTo(hash) {
    const el = hash === "#" || hash === "#home" ? document.body : document.querySelector(hash);
    if (!el) return;
    flashBar();
    if (el === document.body) window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    else el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    try { history.pushState(null, "", hash); } catch (e) {}
  }

  /* ---------- Reveal & counter ---------- */
  function initReveal() {
    const targets = $$(".reveal, .principles li");
    if (reduceMotion || !("IntersectionObserver" in window)) { targets.forEach((t) => t.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    targets.forEach((t) => io.observe(t));
  }

  function renderStats() {
    const items = [
      { value: DATA.services.length, label: "Layanan tersedia" },
      { value: DATA.categories.length, label: "Kategori layanan" },
      { value: CFG.responseMinutes, prefix: "≤ ", suffix: " menit", label: "Respons awal" }
    ];
    $("#heroStats").innerHTML = items.map((s) =>
      `<div><dt>${esc(s.label)}</dt><dd data-count="${s.value}" data-prefix="${s.prefix || ""}" data-suffix="${s.suffix || ""}">${s.prefix || ""}${s.value}${s.suffix || ""}</dd></div>`).join("");
  }
  function initCounters() {
    const els = $$("[data-count]");
    const fmt = (el, v) => `${el.dataset.prefix}${Math.round(v)}${el.dataset.suffix}`;
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    els.forEach((el) => (el.textContent = fmt(el, 0)));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const el = en.target, end = +el.dataset.count, dur = 1400, t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(el, end * e);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    els.forEach((el) => io.observe(el));
  }

  /* ==========================================================
     KATALOG
     ========================================================== */
  const LIMIT = 10;
  const state = { q: "", cat: "all", price: "all", sort: "newest", showAll: false };
  const grid = $("#grid"), emptyEl = $("#empty"), countEl = $("#resultCount"), moreEl = $("#catalogMore"), moreBtn = $("#showMoreBtn");
  const qInput = $("#q"), qClear = $("#qClear"), priceSel = $("#priceFilter"), sortSel = $("#sortBy");
  let skeletonTimer;

  const isNew = (s) => (Date.now() - new Date(s.addedAt).getTime()) / 864e5 <= 30;

  function getFiltered() {
    const q = state.q.trim().toLowerCase();
    let [min, max] = state.price === "all" ? [0, Infinity] : state.price.split("-").map((v, i) => (v === "" ? (i ? Infinity : 0) : +v));
    let list = DATA.services.filter((s) => {
      const inCat = state.cat === "all" || s.category === state.cat;
      const inPrice = s.price >= min && s.price < max;
      const inText = !q || (s.name + " " + s.desc + " " + catById[s.category].label).toLowerCase().includes(q);
      return inCat && inPrice && inText;
    });
    const sorters = {
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      newest: (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
    };
    return list.sort(sorters[state.sort]);
  }

  function cardHTML(s, i, allowWide) {
    const cat = catById[s.category];
    const wide = Boolean(s.featured && allowWide);
    const badges = `<div class="badges">${isNew(s) ? '<span class="badge badge--new">Baru</span>' : ""}<span class="badge">${esc(cat.short)}</span></div>`;
    const side = wide ? `<aside class="card__side"><h4>Yang Anda dapatkan</h4><ul>${s.features.map((f) => `<li>${ic("lucide:check")}<span>${esc(f)}</span></li>`).join("")}</ul></aside>` : "";
    return `
      <article class="card ${wide ? "card--wide" : ""}" data-cat="${s.category}" style="--i:${i}">
        <div class="card__top"><span class="card__icon">${ic(s.icon)}</span>${badges}</div>
        <h3>${esc(s.name)}</h3>
        <p class="card__desc">${esc(s.desc)}</p>
        <dl class="card__meta">
          <div><dt>Mulai dari</dt><dd class="price">${rupiah(s.price)}</dd></div>
          <div><dt>Estimasi</dt><dd>${esc(s.duration)}</dd></div>
        </dl>
        <div class="card__actions">
          <button class="btn btn--ghost" type="button" data-detail="${s.id}" aria-label="Lihat detail ${esc(s.name)}">Lihat Detail</button>
          <button class="btn btn--primary" type="button" data-order="${s.id}" aria-label="Pesan ${esc(s.name)}">Pesan Layanan ${ic("lucide:arrow-up-right")}</button>
        </div>
        ${side}
      </article>`;
  }

  function renderGrid() {
    const list = getFiltered();
    const visible = state.showAll ? list : list.slice(0, LIMIT);
    grid.setAttribute("aria-busy", "false");
    grid.innerHTML = visible.map((s, i) => cardHTML(s, i, visible.length > 2)).join("");
    grid.hidden = list.length === 0;
    emptyEl.hidden = list.length !== 0;
    if (moreEl && moreBtn) {
      moreEl.hidden = list.length <= LIMIT;
      moreBtn.innerHTML = state.showAll
        ? `Tampilkan lebih sedikit ${ic("lucide:chevron-up")}`
        : `Cari yang lain (${list.length - LIMIT} lagi) ${ic("lucide:chevron-down")}`;
    }
    countEl.textContent = list.length
      ? `Menampilkan ${visible.length} dari ${list.length} layanan`
      : "Tidak ada layanan yang cocok dengan filter";
    qClear.hidden = !state.q;
  }

  function renderSkeleton(n = 6) {
    grid.hidden = false; emptyEl.hidden = true;
    if (moreEl) moreEl.hidden = true;
    grid.setAttribute("aria-busy", "true");
    grid.innerHTML = Array.from({ length: n }, () => '<div class="sk" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>').join("");
  }

  function update({ skeleton = true } = {}) {
    clearTimeout(skeletonTimer);
    if (skeleton && !reduceMotion) { renderSkeleton(); skeletonTimer = setTimeout(renderGrid, 260); }
    else renderGrid();
  }

  function renderChips() {
    const total = DATA.services.length;
    const all = [{ id: "all", label: "Semua", icon: "lucide:layout-grid", n: total }]
      .concat(DATA.categories.map((c) => ({ id: c.id, label: c.label, icon: c.icon, n: DATA.services.filter((s) => s.category === c.id).length })));
    $("#chips").innerHTML = all.map((c) =>
      `<button class="chip" type="button" ${c.id !== "all" ? `data-cat="${c.id}"` : ""} data-chip="${c.id}" aria-pressed="${state.cat === c.id}">${ic(c.icon)}${esc(c.label)}<span class="chip__n">${c.n}</span></button>`).join("");
  }
  function syncChips() { $$("#chips .chip").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.chip === state.cat))); }

  function setCategory(id) { state.cat = id; state.showAll = false; syncChips(); update(); }

  function enhanceSelect(sel) {
    const wrap = sel.closest(".select");
    if (!wrap) return () => {};
    sel.hidden = true;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cselect__btn";
    btn.setAttribute("aria-haspopup", "listbox");
    btn.setAttribute("aria-expanded", "false");

    const menu = document.createElement("div");
    menu.className = "cselect__menu";
    menu.setAttribute("role", "listbox");
    menu.hidden = true;

    const opts = Array.from(sel.options).map((o) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cselect__opt";
      b.setAttribute("role", "option");
      b.dataset.value = o.value;
      b.innerHTML = `<span>${esc(o.textContent)}</span>${ic("lucide:check")}`;
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        if (sel.value !== o.value) {
          sel.value = o.value;
          sel.dispatchEvent(new Event("change"));
        }
        sync();
        closeAll();
      });
      menu.appendChild(b);
      return b;
    });

    const sync = () => {
      const active = sel.options[sel.selectedIndex];
      btn.textContent = active ? active.textContent : "";
      opts.forEach((b) => {
        const on = b.dataset.value === sel.value;
        b.classList.toggle("is-selected", on);
        b.setAttribute("aria-selected", String(on));
      });
    };

    const setOpen = (open) => {
      wrap.classList.toggle("is-open", open);
      menu.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
    };

    const closeAll = () => {
      $$(".select.is-open").forEach((w) => {
        w.classList.remove("is-open");
        const m = $(".cselect__menu", w);
        const b = $(".cselect__btn", w);
        if (m) m.hidden = true;
        if (b) b.setAttribute("aria-expanded", "false");
      });
    };

    wrap.insertBefore(btn, sel);
    wrap.appendChild(menu);
    wrap.addEventListener("click", (e) => {
      if (e.target.closest(".cselect__menu")) return;
      e.preventDefault();
      const willOpen = menu.hidden;
      closeAll();
      if (willOpen) setOpen(true);
    });

    sync();
    return sync;
  }

  const syncSelects = [];

  function resetFilters() {
    Object.assign(state, { q: "", cat: "all", price: "all", sort: "newest", showAll: false });
    qInput.value = ""; priceSel.value = "all"; sortSel.value = "newest";
    syncSelects.forEach((fn) => fn());
    syncChips(); update();
    toast("Filter diatur ulang", "lucide:rotate-ccw");
  }

  function initCatalog() {
    renderChips();
    renderSkeleton();
    setTimeout(renderGrid, reduceMotion ? 0 : 650);

    syncSelects.push(enhanceSelect(priceSel), enhanceSelect(sortSel));
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".select")) {
        $$(".select.is-open").forEach((w) => {
          w.classList.remove("is-open");
          const m = $(".cselect__menu", w);
          const b = $(".cselect__btn", w);
          if (m) m.hidden = true;
          if (b) b.setAttribute("aria-expanded", "false");
        });
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        $$(".select.is-open").forEach((w) => {
          w.classList.remove("is-open");
          const m = $(".cselect__menu", w);
          const b = $(".cselect__btn", w);
          if (m) m.hidden = true;
          if (b) b.setAttribute("aria-expanded", "false");
        });
      }
    });

    let debounce;
    qInput.addEventListener("input", () => {
      state.q = qInput.value; state.showAll = false; qClear.hidden = !state.q;
      clearTimeout(debounce); debounce = setTimeout(() => update({ skeleton: false }), 120);
    });
    qClear.addEventListener("click", () => { qInput.value = ""; state.q = ""; state.showAll = false; qClear.hidden = true; update({ skeleton: false }); qInput.focus(); });
    priceSel.addEventListener("change", () => { state.price = priceSel.value; state.showAll = false; update(); });
    sortSel.addEventListener("change", () => { state.sort = sortSel.value; state.showAll = false; update(); });
    $("#resetFilters").addEventListener("click", resetFilters);
    $("#chips").addEventListener("click", (e) => { const b = e.target.closest("[data-chip]"); if (b) setCategory(b.dataset.chip); });
    if (moreBtn) moreBtn.addEventListener("click", () => { state.showAll = !state.showAll; renderGrid(); });
  }

  /* ==========================================================
     MODAL DETAIL
     ========================================================== */
  const dlg = $("#detail"), dlgBody = $("#detailBody");

  function openDetail(id) {
    const s = svcById[id]; if (!s) return;
    const cat = catById[s.category];
    dlg.setAttribute("data-cat", s.category);
    dlgBody.innerHTML = `
      <button class="icon-btn modal__close" type="button" data-close aria-label="Tutup detail">${ic("lucide:x")}</button>
      <div class="m-head">
        <div class="card__top"><span class="card__icon">${ic(s.icon)}</span><div class="badges">${isNew(s) ? '<span class="badge badge--new">Baru</span>' : ""}<span class="badge">${esc(cat.label)}</span></div></div>
        <h2 id="dTitle">${esc(s.name)}</h2>
        <p>${esc(s.long)}</p>
      </div>
      <div class="m-body">
        <div class="m-facts">
          <div class="m-fact"><small>Harga mulai dari</small><b>${rupiah(s.price)}</b></div>
          <div class="m-fact"><small>Estimasi pengerjaan</small><b>${esc(s.duration)}</b></div>
          <div class="m-fact"><small>Kategori</small><b>${esc(cat.short)}</b></div>
        </div>
        <div class="m-cols">
          <section class="m-sec"><h4>Fasilitas</h4><ul>${s.features.map((f) => `<li>${ic("lucide:check")}<span>${esc(f)}</span></li>`).join("")}</ul></section>
          <section class="m-sec"><h4>Persyaratan pemesanan</h4><ul>${(s.requirements || cat.requirements).map((r) => `<li>${ic("lucide:file-check-2")}<span>${esc(r)}</span></li>`).join("")}</ul></section>
        </div>
        <section class="m-sec m-faq"><h4>Pertanyaan tentang layanan ini</h4>
          ${(s.faqs || cat.faqs).map((f) => `<details><summary>${esc(f.q)}${ic("lucide:chevron-down")}</summary><p>${esc(f.a)}</p></details>`).join("")}
        </section>
        <p class="section__sub" style="font-size:.84rem;margin:0">Harga akhir dapat berbeda sesuai jumlah halaman, tingkat kesulitan, dan tenggat. Rinciannya disepakati sebelum pengerjaan dimulai.</p>
      </div>
      <div class="m-foot">
        <div class="price-line"><small>Mulai dari</small><b>${rupiah(s.price)}</b></div>
        <button class="btn btn--primary btn--lg" type="button" data-order="${s.id}">${ic("simple-icons:whatsapp")} Pesan via WhatsApp</button>
      </div>`;
    dlgBody.scrollTop = 0;
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    root.classList.add("modal-open");
  }
  function closeDetail() { if (dlg.open) dlg.close(); }
  function initModal() {
    dlg.addEventListener("click", (e) => { if (e.target === dlg) closeDetail(); });
    dlg.addEventListener("close", () => root.classList.remove("modal-open"));
  }

  /* ==========================================================
     SECTION LAIN (dirender dari data)
     ========================================================== */
  function renderSteps() {
    $("#timeline").innerHTML = DATA.steps.map((s, i) =>
      `<li class="reveal" style="--d:${i * 70}ms"><span class="step__n">${String(i + 1).padStart(2, "0")}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></li>`).join("");
  }
  function renderBenefits() {
    $("#bento").innerHTML = DATA.benefits.map((b, i) =>
      `<article class="tile reveal" style="--d:${i * 60}ms"><span class="tile__ic">${ic(b.icon)}</span><div><h3>${esc(b.title)}</h3><p>${esc(b.text)}</p></div></article>`).join("");
  }
  function renderAbout() {
    $("#aboutQuote").textContent = DATA.about.quote;
    $("#aboutText").innerHTML = DATA.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
    $("#principles").innerHTML = DATA.about.principles.map((p, i) =>
      `<li style="--d:${i * 90}ms"><span class="n">${p.n}</span><div><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div></li>`).join("");
  }

  /* ---------- FAQ accordion ---------- */
  function renderFaq() {
    const box = $("#accordion");
    box.innerHTML = DATA.faqs.map((f, i) => `
      <div class="acc ${i === 0 ? "is-open" : ""}">
        <h3><button class="acc__q" type="button" id="aq${i}" aria-expanded="${i === 0}" aria-controls="ap${i}"><span>${esc(f.q)}</span><span class="acc__plus" aria-hidden="true"></span></button></h3>
        <div class="acc__a" id="ap${i}" role="region" aria-labelledby="aq${i}"><div><p>${esc(f.a)}</p></div></div>
      </div>`).join("");
    box.addEventListener("click", (e) => {
      const btn = e.target.closest(".acc__q"); if (!btn) return;
      const item = btn.closest(".acc"), willOpen = !item.classList.contains("is-open");
      $$(".acc", box).forEach((a) => { a.classList.remove("is-open"); $(".acc__q", a).setAttribute("aria-expanded", "false"); });
      if (willOpen) { item.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); }
    });
  }

  /* ---------- Carousel testimoni ---------- */
  function renderTestimonials() {
    const car = $("#carousel");
    const stars = (n) => Array.from({ length: 5 }, (_, i) => `<span class="${i < n ? "" : "off"}">${ic("mdi:star")}</span>`).join("");
    const initials = (n) => n.replace(/^Contoh:\s*/, "").split(" ").map((w) => w[0]).join("").slice(0, 2);
    car.innerHTML = DATA.testimonials.map((t) => `
      <article class="tcard">
        <div class="stars" role="img" aria-label="Rating ${t.rating} dari 5">${stars(t.rating)}</div>
        <blockquote>${esc(t.text)}</blockquote>
        <footer>
          <span class="avatar">
            ${t.avatar ? `<img src="${esc(t.avatar)}" alt="Foto ${esc(t.name)}" loading="lazy" onerror="this.remove()">` : ""}
            <span aria-hidden="true">${esc(initials(t.name))}</span>
          </span>
          <div><cite>${esc(t.name)}</cite><small>${esc(t.role)}</small></div>
          <span class="tag">${esc(t.service)}</span>
        </footer>
      </article>`).join("");

    const dots = $("#dots");
    dots.innerHTML = DATA.testimonials.map(() => "<i></i>").join("");
    const slides = $$(".tcard", car);
    const step = () => slides[0].getBoundingClientRect().width + 16;
    const current = () => Math.min(slides.length - 1, Math.round(car.scrollLeft / step()));
    const paintDots = () => $$("i", dots).forEach((d, i) => d.classList.toggle("is-on", i === current()));
    let ticking = false;
    car.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { paintDots(); ticking = false; }); } }, { passive: true });
    paintDots();

    const go = (dir) => {
      const atEnd = car.scrollLeft + car.clientWidth >= car.scrollWidth - 4;
      if (dir > 0 && atEnd) car.scrollTo({ left: 0, behavior: reduceMotion ? "auto" : "smooth" });
      else car.scrollBy({ left: dir * step(), behavior: reduceMotion ? "auto" : "smooth" });
    };
    $("#prevT").addEventListener("click", () => go(-1));
    $("#nextT").addEventListener("click", () => go(1));

    // Putar otomatis: berhenti saat dihover/difokus, tidak jalan bila gerak dikurangi
    if (reduceMotion) return;
    let paused = false, visible = false;
    ["mouseenter", "focusin", "touchstart"].forEach((ev) => car.addEventListener(ev, () => (paused = true), { passive: true }));
    ["mouseleave", "focusout"].forEach((ev) => car.addEventListener(ev, () => (paused = false)));
    new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0.4 }).observe(car);
    setInterval(() => { if (!paused && visible && !document.hidden) go(1); }, 6500);
  }

  /* ==========================================================
     EVENT GLOBAL (delegasi)
     ========================================================== */
  function initEvents() {
    document.addEventListener("click", (e) => {
      const t = e.target;
      const detail = t.closest("[data-detail]");   if (detail) return openDetail(detail.dataset.detail);
      const order = t.closest("[data-order]");     if (order) return orderService(order.dataset.order);
      if (t.closest("[data-consult]"))             return consult();
      if (t.closest("[data-close]"))               return closeDetail();
      const fcat = t.closest("[data-filter-cat]");
      if (fcat) {
        setCategory(fcat.dataset.filterCat); goTo("#katalog");
        return toast(`Kategori: ${catById[fcat.dataset.filterCat].label}`, "lucide:filter");
      }
      const link = t.closest('a[href^="#"]');
      if (link) {
        const hash = link.getAttribute("href");
        if (hash.length > 1 || hash === "#") { e.preventDefault(); setMenu(false); goTo(hash); }
      }
    });
    $("#toTop").addEventListener("click", () => goTo("#home"));
  }

  /* ---------- Mulai ---------- */
  function init() {
    applyBrand();
    initTheme();
    initNav();
    renderStats();
    renderSteps();
    renderBenefits();
    renderAbout();
    renderFaq();
    renderTestimonials();
    initCatalog();
    initModal();
    initEvents();
    initReveal();
    initCounters();
    requestAnimationFrame(() => document.body.classList.add("is-loaded"));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
