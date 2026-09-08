/**
 * i18n demo: English / Tamil.
 *
 * SCOPE NOTE: this translates the site chrome (nav, footer, language/theme
 * controls) everywhere, plus the full homepage. It intentionally does NOT
 * translate department descriptions, admin tooling, or form questions —
 * translating those well needs a native-speaker review pass, and this is
 * meant to demonstrate the pattern, not ship as a finished localization.
 * Extending coverage is just a matter of adding more `data-i18n` keys
 * below and tagging more elements — the mechanism already supports it.
 *
 * Tamil strings here are AI-assisted, not reviewed by a native speaker —
 * treat them as a starting point, not production copy.
 */
const TRANSLATIONS = {
  en: {
    "nav.home": "Home",
    "nav.team": "Team",
    "nav.departments": "Departments",
    "nav.events": "Events",
    "nav.updates": "Updates",
    "nav.status": "Check status",
    "nav.admin": "Admin",
    "nav.apply_cta": "Apply now",

    "hero.eyebrow": "Recruitment cycle · 2026",
    "hero.title": "Twelve departments. One application. Real projects from day one.",
    "hero.lede": "GDG on Campus VIT Chennai is a student-led developer community backed by Google Developers. Pick a track, tell us what you'd build, and we'll take it from there.",
    "hero.browse": "Browse departments",
    "hero.about_btn": "What is GDG?",
    "hero.stat_departments": "departments",
    "hero.stat_members": "members",
    "hero.stat_events": "events a year",
    "hero.stat_apps": "max applications",
    "hero.ticket_label": "Applications close in",
    "hero.ticket_dept": "Recruitment round 2026",
    "hero.ticket_note": "Every application is reviewed by the department's own leads — not a form-filter.",
    "hero.d": "days", "hero.h": "hrs", "hero.m": "min", "hero.s": "sec",

    "info.signin_title": "Sign in once",
    "info.signin_body": "Use one email across your applications — we track your submissions by it.",
    "info.limit_title": "Up to 2 departments",
    "info.limit_body": "Apply to at most two departments so leads can actually get to know you.",
    "info.honest_title": "Short, honest answers",
    "info.honest_body": "We'd rather read 3 true sentences than 3 polished paragraphs.",
    "info.hear_title": "You'll hear back",
    "info.hear_body": "Shortlists go out by department, straight to your email.",

    "about.eyebrow": "// ABOUT",
    "about.title": "A home for builders on campus",
    "about.body": "We run hands-on workshops, hackathons, and speaker sessions — no experience required, just curiosity and a slightly reckless will to build. Part of GDG on Campus chapters worldwide.",
    "about.see_all": "See all 12 departments",

    "team.eyebrow": "// THE PEOPLE",
    "team.title": "The crew behind it all",
    "team.body": "From the campus organiser to project heads and department leads — the people who keep the community moving.",

    "events.eyebrow": "// WHAT'S ON",
    "events.title": "Upcoming events",
    "events.body": "RSVP or drop it straight into your calendar — no sign-in needed.",
    "events.toggle": "Show past events too",

    "recap.eyebrow": "// LOOKING BACK",
    "recap.title": "Devshouse'26, and everything after",
    "recap.body": "Our flagship day brought together hundreds of students and a room that stayed full till midnight — one of many moments from a year of building together.",
    "recap.attendees": "Attendees",
    "recap.teams": "Hackathon teams",
    "recap.speakers": "Speakers",

    "cta.title": "Ready to build with us?",
    "cta.body": "Membership is open to every VIT Chennai student. Join, show up, and start shipping things.",
    "cta.member": "Become a member",
    "cta.event": "Join our next event",

    "footer.about": "A student developer community at Vellore Institute of Technology, Chennai — learning and building with Google technologies.",
    "footer.explore": "Explore",
    "footer.about_link": "About the chapter",
    "footer.people": "The people",
    "footer.departments": "Departments",
    "footer.events": "Upcoming events",
    "footer.updates": "Updates",
    "footer.contact": "Get in touch",
    "footer.location": "VIT Chennai, Kelambakkam",
    "footer.community": "GDG Community page ↗",
    "footer.status": "Check application status"
  },

  ta: {
    "nav.home": "முகப்பு",
    "nav.team": "குழு",
    "nav.departments": "துறைகள்",
    "nav.events": "நிகழ்வுகள்",
    "nav.updates": "புதுப்பிப்புகள்",
    "nav.status": "நிலை சரிபார்க்க",
    "nav.admin": "நிர்வாகி",
    "nav.apply_cta": "இப்போது விண்ணப்பிக்க",

    "hero.eyebrow": "ஆட்சேர்ப்பு சுழற்சி · 2026",
    "hero.title": "பன்னிரண்டு துறைகள். ஒரே விண்ணப்பம். முதல் நாளிலிருந்தே உண்மையான திட்டங்கள்.",
    "hero.lede": "GDG on Campus VIT Chennai என்பது Google Developers ஆதரவுடன் மாணவர்களால் நடத்தப்படும் டெவலப்பர் சமூகம். ஒரு துறையைத் தேர்ந்தெடுத்து, நீங்கள் என்ன உருவாக்க விரும்புகிறீர்கள் எனச் சொல்லுங்கள் — மீதியை நாங்கள் பார்த்துக்கொள்கிறோம்.",
    "hero.browse": "துறைகளைப் பார்க்க",
    "hero.about_btn": "GDG என்றால் என்ன?",
    "hero.stat_departments": "துறைகள்",
    "hero.stat_members": "உறுப்பினர்கள்",
    "hero.stat_events": "வருடத்திற்கு நிகழ்வுகள்",
    "hero.stat_apps": "அதிகபட்ச விண்ணப்பங்கள்",
    "hero.ticket_label": "விண்ணப்பங்கள் முடியும் நேரம்",
    "hero.ticket_dept": "ஆட்சேர்ப்பு சுற்று 2026",
    "hero.ticket_note": "ஒவ்வொரு விண்ணப்பமும் அந்தந்த துறைத் தலைவர்களால் நேரடியாகப் பரிசீலிக்கப்படுகிறது — வடிகட்டி மென்பொருள் அல்ல.",
    "hero.d": "நாட்கள்", "hero.h": "மணி", "hero.m": "நிமிடம்", "hero.s": "விநாடி",

    "info.signin_title": "ஒருமுறை உள்நுழையவும்",
    "info.signin_body": "உங்கள் அனைத்து விண்ணப்பங்களுக்கும் ஒரே மின்னஞ்சலைப் பயன்படுத்துங்கள் — அதன் மூலம் நாங்கள் கண்காணிக்கிறோம்.",
    "info.limit_title": "அதிகபட்சம் 2 துறைகள்",
    "info.limit_body": "தலைவர்கள் உங்களை நன்கு அறிந்துகொள்ள, அதிகபட்சம் இரண்டு துறைகளுக்கு மட்டும் விண்ணப்பியுங்கள்.",
    "info.honest_title": "சுருக்கமான, நேர்மையான பதில்கள்",
    "info.honest_body": "மெருகூட்டப்பட்ட 3 பத்திகளை விட, உண்மையான 3 வாக்கியங்களைப் படிக்க விரும்புகிறோம்.",
    "info.hear_title": "உங்களுக்குப் பதில் வரும்",
    "info.hear_body": "சுருக்கப் பட்டியல்கள் துறை வாரியாக, நேரடியாக உங்கள் மின்னஞ்சலுக்கு அனுப்பப்படும்.",

    "about.eyebrow": "// எங்களைப் பற்றி",
    "about.title": "வளாகத்தில் உருவாக்குநர்களுக்கான இல்லம்",
    "about.body": "முன் அனுபவம் தேவையில்லை — ஆர்வமும் கொஞ்சம் துணிச்சலும் இருந்தால் போதும். செயல்முறை பட்டறைகள், ஹேக்கத்தான்கள், பேச்சாளர் அமர்வுகள் நடத்துகிறோம். உலகம் முழுவதும் உள்ள GDG on Campus சாப்டர்களின் ஒரு பகுதி.",
    "about.see_all": "அனைத்து 12 துறைகளையும் காண்க",

    "team.eyebrow": "// நபர்கள்",
    "team.title": "இதன் பின்னணியில் உள்ள குழு",
    "team.body": "வளாக ஒருங்கிணைப்பாளர் முதல் திட்டத் தலைவர்கள் மற்றும் துறைத் தலைவர்கள் வரை — சமூகத்தை இயக்கும் நபர்கள்.",

    "events.eyebrow": "// நடக்கவிருப்பவை",
    "events.title": "வரவிருக்கும் நிகழ்வுகள்",
    "events.body": "பங்கேற்க உறுதி செய்யவும் அல்லது நேரடியாக உங்கள் காலெண்டரில் சேர்க்கவும் — உள்நுழைவு தேவையில்லை.",
    "events.toggle": "கடந்த நிகழ்வுகளையும் காட்டு",

    "recap.eyebrow": "// கடந்து வந்த பாதை",
    "recap.title": "Devshouse'26, அதற்குப் பின் நடந்தவை",
    "recap.body": "எங்கள் முதன்மை நாள் நூற்றுக்கணக்கான மாணவர்களை ஒன்றிணைத்தது, அரங்கம் நள்ளிரவு வரை நிறைந்திருந்தது — ஒன்றாக உருவாக்கிய ஆண்டின் பல தருணங்களில் ஒன்று.",
    "recap.attendees": "பங்கேற்பாளர்கள்",
    "recap.teams": "ஹேக்கத்தான் குழுக்கள்",
    "recap.speakers": "பேச்சாளர்கள்",

    "cta.title": "எங்களுடன் உருவாக்கத் தயாரா?",
    "cta.body": "VIT சென்னையின் ஒவ்வொரு மாணவருக்கும் உறுப்பினர் சேர்க்கை திறந்திருக்கிறது. சேருங்கள், வாருங்கள், உருவாக்கத் தொடங்குங்கள்.",
    "cta.member": "உறுப்பினராகுங்கள்",
    "cta.event": "அடுத்த நிகழ்வில் சேருங்கள்",

    "footer.about": "வேலூர் தொழில்நுட்பக் கழகம், சென்னையில் உள்ள மாணவர் டெவலப்பர் சமூகம் — Google தொழில்நுட்பங்களுடன் கற்றுக்கொண்டு உருவாக்குகிறோம்.",
    "footer.explore": "ஆராயுங்கள்",
    "footer.about_link": "சாப்டர் பற்றி",
    "footer.people": "நபர்கள்",
    "footer.departments": "துறைகள்",
    "footer.events": "வரவிருக்கும் நிகழ்வுகள்",
    "footer.updates": "புதுப்பிப்புகள்",
    "footer.contact": "தொடர்பு கொள்ள",
    "footer.location": "VIT சென்னை, கெலம்பாக்கம்",
    "footer.community": "GDG Community பக்கம் ↗",
    "footer.status": "விண்ணப்ப நிலையை சரிபார்க்கவும்"
  }
};

function applyLanguage(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });
  document.documentElement.setAttribute("lang", lang === "ta" ? "ta" : "en");
  const toggle = document.querySelector(".lang-toggle");
  if (toggle) toggle.textContent = lang === "ta" ? "EN" : "த";
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("gdg_lang") || "en";
  applyLanguage(saved);

  const toggle = document.querySelector(".lang-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const current = localStorage.getItem("gdg_lang") || "en";
    const next = current === "ta" ? "en" : "ta";
    localStorage.setItem("gdg_lang", next);
    applyLanguage(next);
  });
});
