(function () {
  const ITEMS = [
    { label: "Home", meta: "Page", icon: "🏠", href: "index.html" },
    { label: "Departments", meta: "Page", icon: "🧭", href: "departments.html" },
    { label: "The Crew (Team)", meta: "Section", icon: "👥", href: "index.html#team" },
    { label: "Upcoming Events", meta: "Section", icon: "📅", href: "index.html#events" },
    { label: "Chapter Updates", meta: "Page", icon: "📣", href: "updates.html" },
    { label: "Check application status", meta: "Page", icon: "🔎", href: "status.html" },
    { label: "Admin dashboard", meta: "Page", icon: "🛠", href: "admin.html" },
    { label: "CP Leaderboard", meta: "Page", icon: "🏆", href: "leaderboard.html" },
    ...(typeof DEPARTMENTS !== "undefined" ? DEPARTMENTS.map((d) => ({
      label: d.name,
      meta: "Department",
      icon: "▸",
      href: `dept.html?dept=${d.slug}`
    })) : []),
    ...(typeof DEPARTMENTS !== "undefined" ? DEPARTMENTS.map((d) => ({
      label: `Apply — ${d.name}`,
      meta: "Apply",
      icon: "✎",
      href: `apply.html?dept=${d.slug}`
    })) : [])
  ];

  let activeIndex = 0;
  let filtered = ITEMS;

  document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.createElement("div");
    overlay.className = "cmdk-overlay";
    overlay.innerHTML = `
      <div class="cmdk-box" role="dialog" aria-modal="true" aria-label="Quick navigation">
        <div class="cmdk-input-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input class="cmdk-input" type="text" placeholder="Jump to a page, department, or section…" autocomplete="off" />
          <span class="cmdk-hint">Esc</span>
        </div>
        <div class="cmdk-results"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = overlay.querySelector(".cmdk-input");
    const results = overlay.querySelector(".cmdk-results");

    function render() {
      if (!filtered.length) {
        results.innerHTML = `<div class="cmdk-empty">No matches. Try a department or page name.</div>`;
        return;
      }
      results.innerHTML = filtered.map((item, i) => `
        <div class="cmdk-item ${i === activeIndex ? "active" : ""}" data-index="${i}">
          <span class="cmdk-icon">${item.icon}</span>
          <span>${item.label}</span>
          <span class="cmdk-meta">${item.meta}</span>
        </div>
      `).join("");
    }

    let lastFocused = null;

    function open() {
      window.gdgCloseOtherOverlays?.(overlay);
      lastFocused = document.activeElement;
      overlay.classList.add("open");
      input.value = "";
      filtered = ITEMS;
      activeIndex = 0;
      render();
      setTimeout(() => input.focus(), 30);
    }

    function close() {
      overlay.classList.remove("open");
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function go(item) {
      if (!item) return;
      window.location.href = item.href;
    }

    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      filtered = q
        ? ITEMS.filter((item) => item.label.toLowerCase().includes(q) || item.meta.toLowerCase().includes(q))
        : ITEMS;
      activeIndex = 0;
      render();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!filtered.length) return;
        activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
        render();
        results.querySelector(".cmdk-item.active")?.scrollIntoView({ block: "nearest" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!filtered.length) return;
        activeIndex = Math.max(activeIndex - 1, 0);
        render();
        results.querySelector(".cmdk-item.active")?.scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered.length) go(filtered[activeIndex]);
      } else if (e.key === "Escape") {
        close();
      }
    });

    results.addEventListener("click", (e) => {
      const el = e.target.closest(".cmdk-item");
      if (!el) return;
      go(filtered[Number(el.dataset.index)]);
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });

    // Focus trap: while the palette is open, keep focus inside it.
    document.addEventListener("focusin", (e) => {
      if (overlay.classList.contains("open") && !overlay.contains(e.target)) {
        input.focus();
      }
    });

    function isTypingContext(el) {
      if (!el) return false;
      const tag = el.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
    }

    document.addEventListener("keydown", (e) => {
      const isK = e.key.toLowerCase() === "k";
      const cmdK = (e.metaKey || e.ctrlKey) && isK;
      // "/" is a more reliable trigger than Ctrl/Cmd+K, which some browsers
      // intercept for their own address-bar/search shortcut before page JS
      // ever sees it — that's the "search sometimes doesn't open" bug.
      const slashKey = e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey && !isTypingContext(e.target);

      if (cmdK || slashKey) {
        e.preventDefault();
        overlay.classList.contains("open") ? close() : open();
      }
      if (e.key === "Escape" && overlay.classList.contains("open")) close();
    });

    const trigger = document.querySelector(".search-trigger");
    if (trigger) trigger.addEventListener("click", open);
  });
})();
