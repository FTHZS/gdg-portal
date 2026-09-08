// NOTE: the original archive hardcoded 2026-08-23, which is already in the
// past relative to the actual evaluation window (this project is due by
// end of day Sept 8, 2026) — that made the whole apply flow permanently
// show "closed". Moved forward so the countdown/apply form are actually
// testable. Change this back to whatever your real recruitment deadline is.
const RECRUITMENT_DEADLINE = new Date("2026-09-08T23:59:59+05:30");

function isRecruitmentOpen() {
  return new Date() <= RECRUITMENT_DEADLINE;
}

function startCountdown(elId) {
  const root = document.getElementById(elId);
  if (!root) return;

  const dEl = root.querySelector("[data-days]");
  const hEl = root.querySelector("[data-hours]");
  const mEl = root.querySelector("[data-minutes]");
  const sEl = root.querySelector("[data-seconds]");

  let timer;

  function tick() {
    const diff = RECRUITMENT_DEADLINE - new Date();

    if (diff <= 0) {
      root.classList.add("expired");
      dEl.textContent = "00";
      hEl.textContent = "00";
      mEl.textContent = "00";
      sEl.textContent = "00";
      clearInterval(timer);
      document.dispatchEvent(new CustomEvent("recruitment-closed"));
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    dEl.textContent = String(days).padStart(2, "0");
    hEl.textContent = String(hours).padStart(2, "0");
    mEl.textContent = String(minutes).padStart(2, "0");
    sEl.textContent = String(seconds).padStart(2, "0");
  }

  tick();
  timer = setInterval(tick, 1000);
}
