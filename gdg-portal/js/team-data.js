/**
 * Team roster — sourced from gdgvitc.tech's "the crew" section.
 * Photos are intentionally not reproduced here (they belong to the real
 * individuals); each person renders as an initials avatar instead.
 */
const TEAM = {
  board: [
    { name: "Pranav Prashant Shewale", role: "Board Member" },
    { name: "Ishita Chauhan", role: "Board Member" },
    { name: "Sagnik Sen", role: "Board Member" },
    { name: "Anay Patil", role: "Board Member" }
  ],
  heads: [
    { name: "V Srivatsan", role: "Projects Head" },
    { name: "Aditi Singh", role: "Technical Head" }
  ],
  leads: [
    { name: "Varun Achary", role: "Management Lead" },
    { name: "Dhyan", role: "Management Lead" },
    { name: "Aayush Talukdar", role: "CP Lead" },
    { name: "Rahul Chowdhary", role: "CP Lead" },
    { name: "Adarsh B Poduval", role: "Outreach Lead" },
    { name: "Sumedh Patange", role: "Outreach Lead" },
    { name: "Adil O", role: "UI/UX Lead" },
    { name: "Surjyadip Sen", role: "Webdev Lead" },
    { name: "V Srivatsan", role: "Cloud & DevOps Lead" },
    { name: "Hardik Prem", role: "App Dev Lead" },
    { name: "Kingshuk", role: "GameDev Lead" },
    { name: "Kanha Arjun Jain", role: "GameDev Lead" },
    { name: "Vedanti", role: "Publicity Lead" },
    { name: "Sadhana", role: "Creatives Co-Lead" },
    { name: "Samriddhi", role: "Creatives Lead" },
    { name: "Ananya Harithas", role: "Publicity Lead" },
    { name: "Srivarshini S", role: "Data Science Lead" },
    { name: "Aditi Singh", role: "Blockchain Lead" }
  ]
};

function initialsOf(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

// Deterministic color per person so the same name always gets the same tone.
const AVATAR_TONES = ["#8ab4f8", "#ff7a6b", "#ffd45e", "#6ee7a0"];
function toneFor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) % 997;
  return AVATAR_TONES[hash % AVATAR_TONES.length];
}
