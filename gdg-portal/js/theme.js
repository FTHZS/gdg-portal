document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  const syncState = () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    btn.setAttribute("aria-pressed", isLight ? "true" : "false");
  };
  syncState();

  btn.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("gdg_theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("gdg_theme", "light");
    }
    syncState();
  });
});
