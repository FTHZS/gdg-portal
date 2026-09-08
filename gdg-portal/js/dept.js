document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("dept-root");
  const slug = new URLSearchParams(window.location.search).get("dept");
  const dept = getDepartmentBySlug(slug);

  document.title = dept ? `${dept.name} — GDG VIT Chennai` : "Department not found — GDG VIT Chennai";

  if (!dept) {
    root.innerHTML = `
      <div class="dept-notfound">
        <h2>Department not found</h2>
        <p style="color:var(--text-muted); margin:10px 0 26px;">That link doesn't match any of our 12 departments.</p>
        <a href="departments.html" class="btn btn-primary">Browse departments</a>
      </div>
    `;
    return;
  }

  root.innerHTML = `
    <div class="dept-hero">
      <div class="dept-icon" style="background:color-mix(in srgb, ${dept.tone} 18%, transparent)">
        <img src="assets/icons/${dept.icon}" alt="" />
      </div>
      <div>
        <h1>${dept.name}</h1>
        <p>${dept.description}</p>
      </div>
    </div>

    <div class="dept-detail-grid">
      <div>
        <h3 style="margin-bottom:14px;">Stack &amp; tools</h3>
        <div class="stack-list">
          ${dept.stack.map((s) => `<span class="stack-pill">${s}</span>`).join("")}
        </div>

        <h3 style="margin-bottom:14px;">What the department has worked on</h3>
        ${dept.projects.map((p) => `
          <div class="project-card">
            <h4>${p.title}</h4>
            <p>${p.blurb}</p>
          </div>
        `).join("")}

        ${dept.hasLeaderboard ? `
          <div class="project-card" style="border-color:${dept.tone};">
            <h4>🏆 Department leaderboard</h4>
            <p>Track how the CP department ranks on contests and problem counts.</p>
            <a href="leaderboard.html" class="btn btn-ghost" style="margin-top:12px;">View leaderboard →</a>
          </div>
        ` : ""}
      </div>

      <aside class="dept-sidebar">
        <h3>Led by</h3>
        ${dept.leads.map((l) => `
          <div class="team-card" style="flex-direction:row; text-align:left; justify-content:flex-start;">
            <div class="avatar" style="background:${toneFor(l.name)}; width:44px; height:44px; font-size:0.85rem;">${initialsOf(l.name)}</div>
            <div>
              <div class="name">${l.name}</div>
              <div class="role">${l.role}</div>
            </div>
          </div>
        `).join("")}
        <a href="apply.html?dept=${dept.slug}" class="btn btn-primary btn-block">Apply to ${dept.name}</a>
        <a href="departments.html" class="btn btn-ghost btn-block">← All departments</a>
      </aside>
    </div>
  `;
});
