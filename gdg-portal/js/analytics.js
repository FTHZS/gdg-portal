/**
 * Small SVG chart renderers. No chart library — a handful of divs/paths
 * is plenty for two charts, and it keeps the whole site dependency-free
 * (works fully offline, which matters once the PWA cache is in play).
 */

function renderDeptBarChart(containerId, submissions) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const counts = {};
  DEPARTMENTS.forEach((d) => (counts[d.slug] = 0));
  submissions.forEach((s) => { if (counts[s.department] !== undefined) counts[s.department]++; });

  const entries = DEPARTMENTS.map((d) => ({ label: d.name, tone: d.tone, count: counts[d.slug] }))
    .sort((a, b) => b.count - a.count);

  const max = Math.max(1, ...entries.map((e) => e.count));
  const barH = 26, gap = 10, leftW = 150, chartW = 380;
  const height = entries.length * (barH + gap);

  const bars = entries.map((e, i) => {
    const y = i * (barH + gap);
    const w = Math.round((e.count / max) * chartW);
    return `
      <text x="0" y="${y + barH / 2 + 4}" fill="var(--text-muted)" font-size="11" font-family="var(--font)">${escapeXML(e.label)}</text>
      <rect x="${leftW}" y="${y}" width="${chartW}" height="${barH}" rx="6" fill="var(--border)" opacity="0.4"></rect>
      <rect x="${leftW}" y="${y}" width="${w}" height="${barH}" rx="6" fill="${e.tone}"></rect>
      <text x="${leftW + chartW + 10}" y="${y + barH / 2 + 4}" fill="var(--text-faint)" font-size="11" font-family="var(--font)">${e.count}</text>
    `;
  }).join("");

  el.innerHTML = `<svg viewBox="0 0 ${leftW + chartW + 40} ${height}" width="100%" style="overflow:visible; font-family: var(--font);">${bars}</svg>`;
}

function renderTimeSeriesChart(containerId, submissions) {
  const el = document.getElementById(containerId);
  if (!el) return;

  if (!submissions.length) {
    el.innerHTML = `<p style="color:var(--text-faint); font-size:0.85rem;">No submissions yet — this fills in once applications start coming in.</p>`;
    return;
  }

  // Bucket by day.
  const byDay = {};
  submissions.forEach((s) => {
    const day = s.createdAt.slice(0, 10);
    byDay[day] = (byDay[day] || 0) + 1;
  });
  const days = Object.keys(byDay).sort();
  const counts = days.map((d) => byDay[d]);
  const max = Math.max(1, ...counts);

  const w = 560, h = 160, pad = 24;
  const stepX = days.length > 1 ? (w - pad * 2) / (days.length - 1) : 0;

  const points = counts.map((c, i) => {
    const x = pad + i * stepX;
    const y = h - pad - (c / max) * (h - pad * 2);
    return `${x},${y}`;
  });

  const linePath = "M " + points.join(" L ");
  const areaPath = `M ${pad},${h - pad} L ${points.join(" L ")} L ${pad + (days.length - 1) * stepX},${h - pad} Z`;

  const dots = points.map((p, i) => {
    const [x, y] = p.split(",");
    return `<circle cx="${x}" cy="${y}" r="3.5" fill="#8ab4f8"><title>${days[i]}: ${counts[i]}</title></circle>`;
  }).join("");

  const labelEvery = Math.ceil(days.length / 6) || 1;
  const labels = days.map((d, i) => {
    if (i % labelEvery !== 0 && i !== days.length - 1) return "";
    const x = pad + i * stepX;
    const short = d.slice(5); // MM-DD
    return `<text x="${x}" y="${h - 4}" font-size="9" fill="var(--text-faint)" text-anchor="middle">${short}</text>`;
  }).join("");

  el.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" width="100%" style="overflow:visible; font-family: var(--font);">
      <path d="${areaPath}" fill="#8ab4f8" opacity="0.12"></path>
      <path d="${linePath}" fill="none" stroke="#8ab4f8" stroke-width="2"></path>
      ${dots}
      ${labels}
    </svg>
  `;
}

function renderAnalytics(submissions) {
  renderDeptBarChart("chart-by-dept", submissions);
  renderTimeSeriesChart("chart-over-time", submissions);
}

function escapeXML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
