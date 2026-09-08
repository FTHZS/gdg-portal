/**
 * Mock leaderboard data for the Competitive Programming department.
 * These are illustrative demo entries, not real member data.
 * Tiers follow the familiar Codeforces rating-color convention.
 */
const LEADERBOARD = [
  { handle: "quantum_leap", rating: 2134, solved: 812, tier: "purple" },
  { handle: "byte_wrangler", rating: 1987, solved: 640, tier: "blue" },
  { handle: "null_terminator", rating: 1875, solved: 598, tier: "blue" },
  { handle: "recur_sion", rating: 1690, solved: 511, tier: "cyan" },
  { handle: "heap_of_trouble", rating: 1622, solved: 470, tier: "cyan" },
  { handle: "greedy_algo", rating: 1488, solved: 402, tier: "green" },
  { handle: "dp_dreamer", rating: 1401, solved: 355, tier: "green" },
  { handle: "segfault_sam", rating: 1210, solved: 260, tier: "gray" },
  { handle: "two_pointers", rating: 1145, solved: 214, tier: "gray" },
  { handle: "off_by_one", rating: 980, solved: 150, tier: "gray" }
];

const TIER_COLORS = {
  gray: "#9a9aa5",
  green: "#6ee7a0",
  cyan: "#7bdff2",
  blue: "#8ab4f8",
  purple: "#c58af9",
  orange: "#ffb454",
  red: "#ff7a6b"
};
