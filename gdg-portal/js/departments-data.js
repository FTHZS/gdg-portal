/**
 * Department data for GDG on Campus · VIT Chennai recruitment.
 * Names/leads sourced from the live chapter site (gdgvitc.tech) —
 * the original archive's constants file had this data corrupted,
 * so it's been rebuilt here from the real source. `projects` and
 * `stack` are illustrative/demo content, clearly not scraped facts.
 */
const DEPARTMENTS = [
  {
    slug: "web-dev",
    name: "Web Development",
    tone: "#8ab4f8",
    icon: "web-dev.svg",
    lead: "Surjyadip Sen",
    leads: [{ name: "Surjyadip Sen", role: "Webdev Lead" }],
    description: "Modern frontends, full-stack apps, and the open web.",
    stack: ["JavaScript", "React", "Node.js", "Next.js", "Tailwind CSS"],
    projects: [
      { title: "This recruitment portal", blurb: "Yes — the very site you're looking at was built and is maintained by this department." },
      { title: "GDG VITC chapter site", blurb: "The public-facing gdgvitc.tech, redesigned each year by incoming web dev members." },
      { title: "Internal event check-in tool", blurb: "A QR-based check-in system used at DevFest and Open Day." }
    ],
    questions: [
      "What's a web project you've built or contributed to, and what did you use to build it?",
      "Describe a bug you struggled with recently. How did you eventually track it down?",
      "Pick a website you use often — what would you change about how it's built?"
    ]
  },
  {
    slug: "app-dev",
    name: "App Development",
    tone: "#8ab4f8",
    icon: "app-dev.svg",
    lead: "Hardik Prem",
    leads: [{ name: "Hardik Prem", role: "App Dev Lead" }],
    description: "Android & cross-platform apps with Kotlin & Flutter.",
    stack: ["Kotlin", "Flutter", "Jetpack Compose", "Firebase"],
    projects: [
      { title: "Campus Nav", blurb: "An indoor wayfinding app prototype for first-years navigating VIT Chennai." },
      { title: "GDG Companion app", blurb: "A Flutter app for event schedules and speaker info, built during a hack week." }
    ],
    questions: [
      "Have you built or attempted a mobile app before? Tell us about it.",
      "What's a mobile app (any platform) you think has great UX, and why?",
      "How comfortable are you with Kotlin, Java, Flutter, or React Native? Be specific."
    ]
  },
  {
    slug: "game-dev",
    name: "Game Development",
    tone: "#ff7a6b",
    icon: "game-dev.svg",
    lead: "Kingshuk & Kanha Arjun Jain",
    leads: [
      { name: "Kingshuk", role: "GameDev Lead" },
      { name: "Kanha Arjun Jain", role: "GameDev Lead" }
    ],
    description: "Building games with Unity, Godot & the web.",
    stack: ["Unity", "Godot", "C#", "GDScript"],
    projects: [
      { title: "Game Arcade showcase titles", blurb: "A rotating set of student-built browser and Unity games shown at Game Arcade." },
      { title: "48-hour game jam entries", blurb: "Small jam games built by department members, several later polished into portfolio pieces." }
    ],
    questions: [
      "What game engines or tools have you used, if any?",
      "Describe a game concept you'd want to prototype in a weekend.",
      "What's your experience with C#, GDScript, or JavaScript-based game dev?"
    ]
  },
  {
    slug: "data-science",
    name: "Data Science",
    tone: "#ffd45e",
    icon: "data-science.svg",
    lead: "Srivarshini S",
    leads: [{ name: "Srivarshini S", role: "Data Science Lead" }],
    description: "ML, analytics & making sense of messy data.",
    stack: ["Python", "pandas", "scikit-learn", "PyTorch"],
    projects: [
      { title: "Event turnout predictor", blurb: "A small model estimating RSVP-to-attendance conversion from past event data." },
      { title: "Campus sentiment mini-study", blurb: "A text-analysis pass over anonymized feedback forms from past workshops." }
    ],
    questions: [
      "What's a dataset or ML problem you've explored, even informally?",
      "Which libraries/tools have you used — pandas, scikit-learn, PyTorch, etc.?",
      "How would you explain overfitting to someone with no ML background?"
    ]
  },
  {
    slug: "blockchain",
    name: "Blockchain",
    tone: "#6ee7a0",
    icon: "blockchain.svg",
    lead: "Aditi Singh",
    leads: [{ name: "Aditi Singh", role: "Blockchain Lead" }],
    description: "Web3, smart contracts & decentralized apps.",
    stack: ["Solidity", "Hardhat", "Ethers.js"],
    projects: [
      { title: "Campus credential badge (demo)", blurb: "A proof-of-concept NFT-based badge for workshop completion." },
      { title: "Web2 + Web3 Hackathon", blurb: "The department co-runs this flagship hackathon each September." }
    ],
    questions: [
      "What draws you to blockchain/web3 specifically?",
      "Have you written or read a smart contract before? In what language?",
      "What's one real-world problem you think web3 could actually solve well?"
    ]
  },
  {
    slug: "cloud-devops",
    name: "Cloud & DevOps",
    tone: "#8ab4f8",
    icon: "open-source.svg",
    lead: "V Srivatsan",
    leads: [{ name: "V Srivatsan", role: "Cloud & DevOps Lead" }],
    description: "Everything about backend infrastructure and deployment.",
    stack: ["Docker", "GCP", "GitHub Actions", "Firebase"],
    projects: [
      { title: "Chapter site CI/CD", blurb: "Automated deploy pipeline for gdgvitc.tech and the recruitment portal." },
      { title: "Internal uptime dashboard", blurb: "A lightweight status page for chapter-run services." }
    ],
    questions: [
      "What cloud platforms or tools have you used — AWS, GCP, Docker, CI/CD?",
      "Describe a time something you deployed broke, and how you fixed it.",
      "What's the difference between horizontal and vertical scaling, in your own words?"
    ]
  },
  {
    slug: "competitive-programming",
    name: "Competitive Programming",
    tone: "#ff7a6b",
    icon: "cp.svg",
    lead: "Aayush Talukdar & Rahul Chowdhary",
    leads: [
      { name: "Aayush Talukdar", role: "CP Lead" },
      { name: "Rahul Chowdhary", role: "CP Lead" }
    ],
    description: "DSA, contests & cracking that dream internship.",
    stack: ["C++", "Codeforces", "LeetCode"],
    projects: [
      { title: "Algo Wars", blurb: "The department's flagship on-campus contest, run each October." },
      { title: "Weekly DSA sheets", blurb: "Curated problem sets shared with the department each week." }
    ],
    hasLeaderboard: true,
    questions: [
      "What's your current Codeforces/LeetCode rating or handle, if any?",
      "Which topic in DSA do you find hardest, and what have you tried to improve it?",
      "Solve in words: how would you find the longest palindromic substring efficiently?"
    ]
  },
  {
    slug: "ui-ux",
    name: "UI / UX",
    tone: "#ffd45e",
    icon: "ui-ux.svg",
    lead: "Adil O",
    leads: [{ name: "Adil O", role: "UI/UX Lead" }],
    description: "Research, wireframes & interfaces people love.",
    stack: ["Figma", "Adobe XD", "user research"],
    projects: [
      { title: "Recruitment portal design system", blurb: "The design tokens and layouts this very site is built from." },
      { title: "Figma Workshop", blurb: "An annual hands-on session teaching prototyping basics to the whole chapter." }
    ],
    questions: [
      "Link or describe a design (yours or someone else's) you think works really well. Why?",
      "What tools do you use to design — Figma, Adobe XD, pen and paper?",
      "Walk us through how you'd approach redesigning a confusing form."
    ]
  },
  {
    slug: "creatives",
    name: "Creatives",
    tone: "#ff7a6b",
    icon: "design.svg",
    lead: "Sadhana & Samriddhi",
    leads: [
      { name: "Sadhana", role: "Creatives Co-Lead" },
      { name: "Samriddhi", role: "Creatives Lead" }
    ],
    description: "Branding, posters & the visual identity of GDG VITC.",
    stack: ["Illustrator", "Photoshop", "Procreate"],
    projects: [
      { title: "DevFest'26 brand kit", blurb: "Posters, banners, and social templates for the chapter's flagship event." },
      { title: "Merch design", blurb: "T-shirts and stickers handed out at Open Day each year." }
    ],
    questions: [
      "Share a piece of design work you're proud of, or describe your process.",
      "What tools do you use — Illustrator, Photoshop, Canva, Procreate?",
      "What's a brand identity (any company) you admire and why?"
    ]
  },
  {
    slug: "management",
    name: "Management",
    tone: "#6ee7a0",
    icon: "management.svg",
    lead: "Varun Achary & Dhyan",
    leads: [
      { name: "Varun Achary", role: "Management Lead" },
      { name: "Dhyan", role: "Management Lead" }
    ],
    description: "Operations, logistics and the people who make events happen.",
    stack: ["event ops", "budgeting", "vendor coordination"],
    projects: [
      { title: "DevFest'26", blurb: "500+ attendee flagship event — venue, logistics, and run-of-show." },
      { title: "Weekly ops calendar", blurb: "The internal system keeping every department's events from colliding." }
    ],
    questions: [
      "Describe a time you organized or helped run an event, of any size.",
      "How do you stay on top of multiple deadlines at once?",
      "What would you do differently if an event's turnout was lower than expected?"
    ]
  },
  {
    slug: "outreach",
    name: "Outreach",
    tone: "#8ab4f8",
    icon: "outreach.svg",
    lead: "Adarsh B Poduval & Sumedh Patange",
    leads: [
      { name: "Adarsh B Poduval", role: "Outreach Lead" },
      { name: "Sumedh Patange", role: "Outreach Lead" }
    ],
    description: "Partnerships, sponsors & sister communities.",
    stack: ["partnerships", "sponsor decks", "community relations"],
    projects: [
      { title: "DevFest sponsorships", blurb: "Secured venue and swag sponsors for the flagship event." },
      { title: "Sister-chapter exchange", blurb: "Joint sessions with other GDG on Campus chapters in Chennai." }
    ],
    questions: [
      "Have you reached out to a company, club, or speaker before? What happened?",
      "How would you pitch GDG VITC to a potential sponsor in 3 sentences?",
      "What's a partnership or collaboration you think GDG VITC should pursue?"
    ]
  },
  {
    slug: "publicity",
    name: "Publicity",
    tone: "#ffd45e",
    icon: "marketing.svg",
    lead: "Vedanti & Ananya Harithas",
    leads: [
      { name: "Vedanti", role: "Publicity Lead" },
      { name: "Ananya Harithas", role: "Publicity Lead" }
    ],
    description: "Our voice online — reels, posts & campaigns.",
    stack: ["Instagram", "Canva", "content calendars"],
    projects: [
      { title: "DevFest'26 campaign", blurb: "The reel and post series that drove sign-ups for the flagship event." },
      { title: "Weekly recap posts", blurb: "Recurring content recapping each week's workshops and wins." }
    ],
    questions: [
      "What social platforms do you enjoy creating content for, and why?",
      "Share a post/reel/campaign (anyone's) you thought was genuinely well done.",
      "How would you announce a hackathon happening in 2 weeks, in one caption?"
    ]
  }
];

function getDepartmentBySlug(slug) {
  return DEPARTMENTS.find((d) => d.slug === slug) || null;
}
