// PWA: register service worker for offline support.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.warn("Service worker registration failed:", err);
    });
  });
}

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initYear();
  initPageFade();
  if (!REDUCED_MOTION) {
    initRevealAnimations();
    initHeroGlow();
  }
});

/**
 * Shared mutual-exclusion helper for overlay-style UI (command palette,
 * admin detail modal, etc). Without this, two overlays with their own
 * focus traps can both be "open" at once and fight over focus —
 * each one's focusin listener steals focus back from the other in a
 * loop, which throws "Maximum call stack size exceeded" and locks up
 * keyboard input. Every overlay should call this before opening itself.
 */
window.gdgCloseOtherOverlays = function (exceptEl) {
  document.querySelectorAll(".cmdk-overlay.open").forEach((el) => {
    if (el !== exceptEl) el.classList.remove("open");
  });
};

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  // Close the mobile menu after picking a link.
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function initYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/**
 * Simple whole-page fade: body fades in on load, and fades out briefly
 * before following an internal link, so page-to-page navigation feels
 * like a transition rather than a hard cut. Skipped entirely for anyone
 * with reduced-motion preferences, hash links, external links, or
 * anything opening in a new tab.
 */
function initPageFade() {
  requestAnimationFrame(() => document.body.classList.add("page-loaded"));

  if (REDUCED_MOTION) return;

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || link.target === "_blank") return;
    if (link.origin && link.origin !== window.location.origin) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    e.preventDefault();
    document.body.classList.add("page-leaving");
    setTimeout(() => { window.location.href = href; }, 180);
  });
}

/**
 * Reveal-on-scroll for cards/sections. Uses a MutationObserver so it
 * still catches content injected later by page-specific scripts
 * (department cards, team roster, events list) regardless of script
 * load order — no need to hand-wire this into every renderer.
 */
const REVEAL_SELECTOR = [
  ".section-head", ".dept-card", ".team-card", ".event-row",
  ".project-card", ".ticket", ".info-item", ".track-chip",
  ".form-card", ".chart-card", ".admin-table-wrap", ".recap",
  ".success-card"
].join(", ");

function initRevealAnimations() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  function bind(el) {
    if (el.dataset.revealBound) return;
    el.dataset.revealBound = "1";
    el.classList.add("reveal");
    io.observe(el);
  }

  function scan(root) {
    if (root.nodeType !== 1) return;
    if (root.matches && root.matches(REVEAL_SELECTOR)) bind(root);
    root.querySelectorAll?.(REVEAL_SELECTOR).forEach(bind);
  }

  scan(document.body);

  new MutationObserver((mutations) => {
    mutations.forEach((m) => m.addedNodes.forEach(scan));
  }).observe(document.body, { childList: true, subtree: true });
}

/** Subtle cursor-follow glow on the homepage hero. Desktop pointer only. */
function initHeroGlow() {
  const hero = document.querySelector(".hero");
  if (!hero || !window.matchMedia("(pointer: fine)").matches) return;
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    hero.style.setProperty("--my", `${e.clientY - rect.top}px`);
  });
}
