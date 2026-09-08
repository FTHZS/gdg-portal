document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("lb-tbody");
  const ranked = [...LEADERBOARD].sort((a, b) => b.rating - a.rating);

  tbody.innerHTML = ranked.map((row, i) => `
    <tr>
      <td class="lb-rank">#${i + 1}</td>
      <td class="lb-handle">${row.handle}</td>
      <td>${row.rating}</td>
      <td>${row.solved}</td>
      <td>
        <span class="lb-tier">
          <span class="lb-dot" style="background:${TIER_COLORS[row.tier]}"></span>
          ${row.tier}
        </span>
      </td>
    </tr>
  `).join("");
});
