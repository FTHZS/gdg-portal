document.addEventListener("DOMContentLoaded", () => {
  renderTeam();
  renderEvents();
  animateCounters();
});

function renderTeam() {
  const root = document.getElementById("team-root");
  if (!root) return;

  const groups = [
    { key: "board", label: "Board members" },
    { key: "heads", label: "Heads" },
    { key: "leads", label: "Leads" }
  ];

  root.innerHTML = groups.map(({ key, label }) => `
    <div class="team-group">
      <p class="team-group-label">${label}</p>
      <div class="team-grid">
        ${TEAM[key].map((p) => `
          <div class="team-card">
            <div class="avatar" style="background:${toneFor(p.name)}">${initialsOf(p.name)}</div>
            <span class="name">${p.name}</span>
            <span class="role">${p.role}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function renderEvents(containerId = "events-root", { showToggle = true, limit = null } = {}) {
  const root = document.getElementById(containerId);
  if (!root) return;

  const RSVP_KEY = "gdg_event_rsvps_v1";
  const getRSVPs = () => {
    try { return JSON.parse(localStorage.getItem(RSVP_KEY)) || []; }
    catch { return []; }
  };
  const toggleRSVP = (id) => {
    const set = new Set(getRSVPs());
    set.has(id) ? set.delete(id) : set.add(id);
    localStorage.setItem(RSVP_KEY, JSON.stringify([...set]));
    return set.has(id);
  };

  let showPast = false;

  function draw() {
    let list = EVENTS.filter((ev) => showPast || isUpcoming(ev));
    if (limit) list = list.slice(0, limit);
    const rsvps = new Set(getRSVPs());

    if (!list.length) {
      root.innerHTML = `<p style="color:var(--text-faint);">No events to show.</p>`;
      return;
    }

    root.innerHTML = list.map((ev) => {
      const { month, day, full } = formatEventDate(ev.date);
      const upcoming = isUpcoming(ev);
      const going = rsvps.has(ev.id);
      return `
        <div class="event-row ${upcoming ? "" : "past"}">
          <div class="event-date"><div class="month">${month}</div><div class="day">${day}</div></div>
          <div class="event-info">
            <h4>${ev.title}</h4>
            <p>${ev.venue} · ${full}</p>
          </div>
          <div class="event-actions">
            ${upcoming ? `
              <button class="btn btn-ghost event-tag rsvp-btn" data-id="${ev.id}" aria-pressed="${going ? "true" : "false"}">${going ? "✓ Going" : "I'm interested"}</button>
              <button class="btn btn-ghost event-tag ics-btn" data-id="${ev.id}" title="Add to calendar">＋ Calendar</button>
            ` : `<span class="pill">Past event</span>`}
          </div>
        </div>
      `;
    }).join("");
  }

  root.addEventListener("click", (e) => {
    const rsvpBtn = e.target.closest(".rsvp-btn");
    const icsBtn = e.target.closest(".ics-btn");
    if (rsvpBtn) {
      toggleRSVP(rsvpBtn.dataset.id);
      draw();
    }
    if (icsBtn) {
      const ev = EVENTS.find((e2) => e2.id === icsBtn.dataset.id);
      if (ev) downloadICS(ev);
    }
  });

  const toggleBtn = document.getElementById("events-toggle-past");
  if (toggleBtn && showToggle) {
    toggleBtn.addEventListener("click", () => {
      showPast = !showPast;
      toggleBtn.textContent = showPast ? "Show upcoming only" : "Show past events too";
      draw();
    });
  }

  draw();
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-count-to]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.countTo, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1100;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => io.observe(c));
  } else {
    counters.forEach(animate);
  }
}
