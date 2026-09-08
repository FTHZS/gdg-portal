document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("admin-tbody");
  const filterBar = document.getElementById("admin-filter");
  const statTotal = document.getElementById("stat-total");
  const statShortlisted = document.getElementById("stat-shortlisted");
  const statDepts = document.getElementById("stat-depts");

  let activeFilter = "all";

  function buildFilters() {
    const depts = DEPARTMENTS;
    filterBar.innerHTML = `<button class="dept-filter active" data-filter="all" aria-pressed="true">All</button>`;
    depts.forEach((d) => {
      const btn = document.createElement("button");
      btn.className = "dept-filter";
      btn.dataset.filter = d.slug;
      btn.setAttribute("aria-pressed", "false");
      btn.textContent = d.name;
      filterBar.appendChild(btn);
    });
  }

  function timeAgo(iso) {
    const diffMs = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  function render() {
    const all = Store.getAll();
    const list = activeFilter === "all" ? all : all.filter((s) => s.department === activeFilter);

    statTotal.textContent = all.length;
    statShortlisted.textContent = all.filter((s) => s.shortlisted).length;
    statDepts.textContent = new Set(all.map((s) => s.department)).size;

    renderAnalytics(all);

    if (!list.length) {
      tbody.innerHTML = `
        <tr><td colspan="6">
          <div class="admin-empty">
            No submissions yet${activeFilter !== "all" ? " for this department" : ""}.
            Submit a test application from the <a href="departments.html">departments page</a> to see it here.
          </div>
        </td></tr>
      `;
      return;
    }

    tbody.innerHTML = list
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((s) => `
        <tr>
          <td>
            <div>${escapeHTML(s.name)}</div>
            <div class="muted">${escapeHTML(s.email)}</div>
          </td>
          <td><span class="tag">${escapeHTML(s.departmentName)}</span></td>
          <td>${escapeHTML(s.regNo)}</td>
          <td class="muted">${escapeHTML(s.phone)}</td>
          <td class="muted">${timeAgo(s.createdAt)}</td>
          <td><button class="toggle ${s.shortlisted ? "on" : ""}" data-id="${s.id}" aria-label="Toggle shortlist for ${escapeHTML(s.name)}" aria-pressed="${s.shortlisted ? "true" : "false"}"></button></td>
          <td><button class="btn btn-ghost event-tag view-btn" data-id="${s.id}">View</button></td>
        </tr>
      `)
      .join("");
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str ?? "";
    return div.innerHTML;
  }

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".dept-filter");
    if (!btn) return;
    filterBar.querySelectorAll(".dept-filter").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    activeFilter = btn.dataset.filter;
    render();
  });

  tbody.addEventListener("click", (e) => {
    const toggle = e.target.closest(".toggle");
    if (toggle) {
      const id = toggle.dataset.id;
      const nowOn = !toggle.classList.contains("on");
      Store.setShortlisted(id, nowOn);
      render();
      return;
    }

    const viewBtn = e.target.closest(".view-btn");
    if (viewBtn) {
      openDetail(viewBtn.dataset.id);
    }
  });

  // --- Application detail modal ---
  const detailOverlay = document.createElement("div");
  detailOverlay.className = "cmdk-overlay detail-overlay";
  detailOverlay.innerHTML = `
    <div class="cmdk-box detail-box" role="dialog" aria-modal="true" aria-labelledby="detail-title">
      <div class="detail-header">
        <div>
          <h3 id="detail-title"></h3>
          <p class="detail-sub"></p>
        </div>
        <button class="icon-btn detail-close" aria-label="Close">✕</button>
      </div>
      <div class="detail-body"></div>
    </div>
  `;
  document.body.appendChild(detailOverlay);
  let detailLastFocused = null;

  function openDetail(id) {
    const record = Store.getAll().find((s) => s.id === id);
    if (!record) return;
    const dept = getDepartmentBySlug(record.department);
    const questions = dept ? dept.questions : record.answers.map((_, i) => `Question ${i + 1}`);

    detailOverlay.querySelector("#detail-title").textContent = record.name;
    detailOverlay.querySelector(".detail-sub").textContent =
      `${record.email} · ${record.regNo} · ${record.phone} · ${record.departmentName}`;

    const qaHtml = (record.answers || []).map((answer, i) => `
      <div class="qa-pair">
        <p class="qa-q">${escapeHTML(questions[i] || `Question ${i + 1}`)}</p>
        <p class="qa-a">${escapeHTML(answer)}</p>
      </div>
    `).join("") || `<p style="color:var(--text-faint);">No answers recorded for this application.</p>`;

    detailOverlay.querySelector(".detail-body").innerHTML = qaHtml;

    detailLastFocused = document.activeElement;
    window.gdgCloseOtherOverlays?.(detailOverlay);
    detailOverlay.classList.add("open");
    setTimeout(() => detailOverlay.querySelector(".detail-close").focus(), 30);
  }

  function closeDetail() {
    detailOverlay.classList.remove("open");
    if (detailLastFocused && detailLastFocused.focus) detailLastFocused.focus();
  }

  detailOverlay.querySelector(".detail-close").addEventListener("click", closeDetail);
  detailOverlay.addEventListener("click", (e) => {
    if (e.target === detailOverlay) closeDetail();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && detailOverlay.classList.contains("open")) closeDetail();
  });
  document.addEventListener("focusin", (e) => {
    if (detailOverlay.classList.contains("open") && !detailOverlay.contains(e.target)) {
      detailOverlay.querySelector(".detail-close").focus();
    }
  });

  document.getElementById("export-btn").addEventListener("click", () => {
    const csv = Store.exportCSV();
    if (!csv) {
      alert("No submissions to export yet.");
      return;
    }
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gdg-applicants.csv";
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("seed-btn").addEventListener("click", () => {
    const result = Store.seedDemo();
    if (!result.ok) {
      alert(result.message);
      return;
    }
    render();
  });

  document.getElementById("clear-btn").addEventListener("click", () => {
    if (!confirm("This clears all locally stored submissions on this device. Continue?")) return;
    Store.clearAll();
    render();
  });

  function renderPosts() {
    const list = document.getElementById("post-list");
    const posts = Announcements.getAll();
    if (!posts.length) {
      list.innerHTML = `<p style="color:var(--text-faint); font-size:0.85rem;">No announcements yet.</p>`;
      return;
    }
    list.innerHTML = posts.map((p) => `
      <div class="event-row" style="align-items:flex-start;">
        <div class="event-info">
          <h4>${escapeHTML(p.title)}</h4>
          <p>${escapeHTML(p.body)}</p>
          <p class="muted" style="margin-top:6px;">${new Date(p.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}</p>
        </div>
        <button class="btn btn-ghost event-tag" data-remove="${p.id}">Delete</button>
      </div>
    `).join("");
  }

  document.getElementById("post-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("post-title").value.trim();
    const body = document.getElementById("post-body").value.trim();
    if (!title || !body) return;
    Announcements.add({ title, body });
    e.target.reset();
    renderPosts();
  });

  document.getElementById("post-list").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove]");
    if (!btn) return;
    Announcements.remove(btn.dataset.remove);
    renderPosts();
  });

  buildFilters();
  render();
  renderPosts();
});
