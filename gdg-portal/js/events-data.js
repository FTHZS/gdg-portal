/**
 * Upcoming events — sourced from gdgvitc.tech's "what's on" section.
 * Dates are 2026, no explicit start times published on the source site,
 * so each defaults to a 6pm campus slot for the calendar export.
 */
const EVENTS = [
  { id: "open-day", title: "GDG Open Day", date: "2026-08-04", venue: "Nethaji Auditorium" },
  { id: "game-arcade", title: "Game Arcade", date: "2026-08-28", venue: "Kasturba Hall" },
  { id: "web2-web3", title: "Web2 + Web3 Hackathon", date: "2026-09-11", venue: "Nethaji Auditorium" },
  { id: "figma-workshop", title: "Figma Workshop", date: "2026-09-18", venue: "Nethaji Auditorium" },
  { id: "ai-pm-summit", title: "AI Product Management Summit", date: "2026-10-05", venue: "Nethaji Auditorium" },
  { id: "flutter-wars", title: "Flutter Wars", date: "2026-10-12", venue: "Nethaji Auditorium" },
  { id: "algo-wars", title: "Algo Wars", date: "2026-10-20", venue: "Nethaji Auditorium" }
];

function isUpcoming(ev) {
  const [y, m, d] = ev.date.split("-").map(Number);
  const end = new Date(y, m - 1, d, 23, 59, 59);
  return end >= new Date();
}

function formatEventDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return {
    month: dt.toLocaleString(undefined, { month: "short" }).toUpperCase(),
    day: String(d).padStart(2, "0"),
    full: dt.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })
  };
}

/**
 * Builds a downloadable .ics file so a user can add an event straight to
 * their calendar app of choice — no external calendar API needed.
 */
function downloadICS(ev) {
  const [y, m, d] = ev.date.split("-").map(Number);
  const pad = (n) => String(n).padStart(2, "0");
  const startLocal = `${y}${pad(m)}${pad(d)}T180000`;
  const endLocal = `${y}${pad(m)}${pad(d)}T200000`;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GDG VIT Chennai//Recruitment Portal//EN",
    "BEGIN:VEVENT",
    `UID:${ev.id}-${stamp}@gdgvitc`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${startLocal}`,
    `DTEND:${endLocal}`,
    `SUMMARY:${ev.title}`,
    `LOCATION:${ev.venue}, VIT Chennai`,
    "DESCRIPTION:Hosted by GDG on Campus, VIT Chennai.",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ev.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
