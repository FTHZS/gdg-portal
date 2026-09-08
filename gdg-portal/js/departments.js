document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("dept-grid");
  const toolbar = document.getElementById("dept-toolbar");

  // Build "type" groups so filtering has real meaning rather than being decorative.
  const GROUPS = {
    all: "All",
    build: "Build",
    design: "Design",
    ops: "Operations"
  };
  const GROUP_OF = {
    "web-dev": "build", "app-dev": "build", "game-dev": "build",
    "data-science": "build", "blockchain": "build", "cloud-devops": "build",
    "competitive-programming": "build",
    "ui-ux": "design", "creatives": "design",
    "management": "ops", "outreach": "ops", "publicity": "ops"
  };

  Object.keys(GROUPS).slice(1).forEach((key) => {
    const btn = document.createElement("button");
    btn.className = "dept-filter";
    btn.dataset.filter = key;
    btn.setAttribute("aria-pressed", "false");
    btn.textContent = GROUPS[key];
    toolbar.appendChild(btn);
  });

  function render(filter) {
    grid.innerHTML = "";
    const list = DEPARTMENTS.filter((d) => filter === "all" || GROUP_OF[d.slug] === filter);

    if (!list.length) {
      grid.innerHTML = `<div class="dept-empty">No departments match that filter.</div>`;
      return;
    }

    list.forEach((d) => {
      const card = document.createElement("a");
      card.href = `dept.html?dept=${d.slug}`;
      card.className = "dept-card";
      card.style.setProperty("--tone", d.tone);
      card.innerHTML = `
        <div class="dept-icon"><img src="assets/icons/${d.icon}" alt="" /></div>
        <h3>${d.name}</h3>
        <p>${d.description}</p>
        <span class="dept-lead">Led by ${d.lead}</span>
        <span class="dept-apply">View department <span class="arrow">→</span></span>
      `;
      grid.appendChild(card);
    });
  }

  toolbar.addEventListener("click", (e) => {
    const btn = e.target.closest(".dept-filter");
    if (!btn) return;
    toolbar.querySelectorAll(".dept-filter").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    render(btn.dataset.filter);
  });

  render("all");
});
