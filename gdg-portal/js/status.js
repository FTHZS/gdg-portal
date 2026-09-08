document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("status-form");
  const results = document.getElementById("status-results");
  const note = document.getElementById("status-note");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const fieldEl = form.querySelector('[data-field="email"]');
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    fieldEl.classList.toggle("invalid", !valid);
    if (!valid) return;

    note.style.display = "block";
    const matches = Store.getByEmail(email);

    if (!matches.length) {
      results.innerHTML = `
        <div class="state-banner warn">
          <div>
            <strong>No applications found</strong>
            <p>Nothing on file for that email in this browser. Double-check the address, or apply from <a href="departments.html">the departments page</a>.</p>
          </div>
        </div>
      `;
      return;
    }

    results.innerHTML = matches
      .map((s) => {
        const dept = getDepartmentBySlug(s.department);
        const statusLabel = s.shortlisted ? "Shortlisted" : "Under review";
        const statusClass = s.shortlisted ? "success" : "warn";
        return `
          <div class="state-banner ${statusClass}" style="align-items:center;">
            <div style="flex:1;">
              <strong>${dept ? dept.name : s.departmentName}</strong>
              <p>Submitted ${new Date(s.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}</p>
            </div>
            <span class="tag">${statusLabel}</span>
          </div>
        `;
      })
      .join("");
  });
});
