/**
 * Single source of truth for all portfolio content.
 * Keeping copy out of components keeps the JSX clean and makes the
 * site trivially editable for the founder later on.
 */

export const profile = {
  name: "Daddy MUPHASA",
  fullName: "Adams-Okorie Testimony Oguchukwuluru",
  title: "Creative Technologist",
  tagline:
    "I combine engineering, AI, art, music, and storytelling to build products that create entirely new immersive digital experiences.",
  secondary: "Founder of PAPAGEDON Labs",
  location: "Enugu, Nigeria",
  vision:
    "Building the future of immersive entertainment through AI, games, music and digital art.",
};

export const about = {
  summary:
    "I combine engineering, artificial intelligence, art, music, and storytelling to build products that create entirely new immersive digital experiences. My work spans AI systems, game development, interactive media, digital art, and creative technologies, with a focus on shaping the future of entertainment.",
  pillars: [
    {
      k: "Engineering",
      v: "Systems, tooling and cross-platform game builds from the ground up.",
    },
    {
      k: "Artificial Intelligence",
      v: "Agents, assistants and generative pipelines that feel alive.",
    },
    {
      k: "Art & Music",
      v: "Award-winning digital art and audio-visual world building.",
    },
    {
      k: "Storytelling",
      v: "Narrative-driven products that turn technology into experience.",
    },
  ],
};

export type SkillGroup = {
  label: string;
  tag: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Programming",
    tag: "01",
    items: ["C++", "C#", "Python", "JavaScript", "HTML", "CSS", "Git"],
  },
  {
    label: "Artificial Intelligence",
    tag: "02",
    items: ["OpenAI API", "MCP", "ElevenLabs", "Local LLMs", "AI Agents"],
  },
  {
    label: "Game Development",
    tag: "03",
    items: [
      "Unreal Engine",
      "Unity",
      "Three.js",
      "VoxEdit",
      "Sandbox Game Maker",
    ],
  },
  {
    label: "Creative",
    tag: "04",
    items: ["Photoshop", "Blender", "Digital Art", "Creative Direction"],
  },
  {
    label: "Cloud",
    tag: "05",
    items: ["AWS", "Supabase"],
  },
];

export type Project = {
  name: string;
  status: "In Development" | "Live" | "Shipped";
  flagship?: boolean;
  tag: string;
  summary: string;
  detail: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    name: "PAPAGEDON",
    status: "In Development",
    flagship: true,
    tag: "Flagship · Coming Soon",
    summary: "AI-powered immersive entertainment platform.",
    detail:
      "The flagship of PAPAGEDON Labs — a platform fusing AI, games, music and digital art into a single immersive entertainment experience. Currently in active development.",
    tech: ["AI Systems", "Real-time 3D", "Generative Audio", "Interactive Media"],
  },
  {
    name: "Waka AI",
    status: "Live",
    tag: "AI Assistant",
    summary: "WhatsApp AI assistant & community moderator.",
    detail:
      "A conversational AI that lives inside WhatsApp — assisting users and moderating communities at scale with natural, context-aware responses.",
    tech: ["OpenAI API", "WhatsApp", "AI Agents", "Automation"],
  },
  {
    name: "OMNIGENT AI",
    status: "Live",
    tag: "AI Assistant",
    summary: "Advanced AI assistant for scheduling & automation.",
    detail:
      "An advanced AI assistant capable of scheduling meetings, setting reminders, generating summaries and automating everyday workflows end to end.",
    tech: ["AI Agents", "Automation", "MCP", "LLMs"],
  },
];

/** Early-access signup for the PAPAGEDON flagship — now closed. */
export const waitlist = {
  label: "WAITLIST CLOSED",
  note: "Sign-ups are no longer open.",
};

export const music = {
  title: "CHAOS & ORDER",
  status: "New Release",
  tag: "Out Now",
  cover: "/chaos-and-order.webp",
  href: "https://audiomack.com/daddy-muphasa/song/chaosandor",
  platform: "Audiomack",
  description:
    "My latest release — a sonic collision of chaos and order, of the sacred and the machine. Streaming now on Audiomack, with all major platforms to follow.",
  note: "Coming to all platforms soon.",
};

/** OBASED — the game, given its own spotlight beat. */
export const obased = {
  title: "OBASED",
  status: "Shipped",
  tag: "Playable",
  tagline: "Reality: hard mode.",
  poster: "/obased-poster.webp",
  description:
    "A cross-engine endless runner with a reactive audio-visual system — you, a VR headset, and a bear that very much wants a word. Originally engineered in Unreal Engine, then fully re-implemented in Unity to master both pipelines.",
  tech: ["Unreal Engine 5", "Unity", "VR", "Audio-Visual System", "Cross-Engine"],
};

export const art = {
  title: "Two Days Before Yesterday",
  award: "Onchain Summer Art Contest — Winner",
  theme: "2087: From Africa With Love",
  description:
    "An Afrofuturist artwork imagining where yesterday meets tomorrow — a vision of Africa rendered in the language of the future, honoured as a winner of the Onchain Summer Art Contest.",
};

export type Experience = {
  role: string;
  org: string;
  period: string;
  note?: string;
};

export const experience: Experience[] = [
  {
    role: "Project Manager & Lead AI Engineer",
    org: "Waka Social AI",
    period: "2025 — 2026",
  },
  {
    role: "Lead Game Builder & Instructor",
    org: "Sandbox Nigeria",
    period: "2025 — 2026",
  },
  {
    role: "Freelance Game Developer",
    org: "TSUJI · Earthereum",
    period: "2024 — Present",
    note: "Independent contract game development.",
  },
  {
    role: "Administrator & AR Project Coordinator",
    org: "3rd Retail",
    period: "2023 — 2024",
  },
  {
    role: "Digital Artist",
    org: "Blocverse",
    period: "2021 — 2022",
  },
];

export const education = {
  school: "Alex Ekwueme Federal University Ndufu-Alike (AE-FUNAI)",
  degree: "B.Sc. Geology",
  period: "2018 — 2023",
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  primary?: boolean;
};

export const contact = {
  email: "papagedonlabs@gmail.com",
  phone: "+2349075390376",
  website: "https://papagedon.com",
  links: [
    { label: "Email", value: "papagedonlabs@gmail.com", href: "mailto:papagedonlabs@gmail.com", primary: true },
    { label: "Phone", value: "+234 907 539 0376", href: "tel:+2349075390376" },
    { label: "Website", value: "papagedon.com", href: "https://papagedon.com" },
    { label: "GitHub", value: "Daddymuphas", href: "https://github.com/Daddymuphas" },
    {
      label: "LinkedIn",
      value: "Adams-Okorie Testimony",
      href: "https://www.linkedin.com/in/adams-okorie-testimony-a82a36255",
    },
    { label: "X", value: "@daddy_muphasa", href: "https://x.com/daddy_muphasa" },
    { label: "Instagram", value: "@daddy_muphasa", href: "https://instagram.com/daddy_muphasa" },
    { label: "TikTok", value: "@daddy_muphasa", href: "https://tiktok.com/@daddy_muphasa" },
    {
      label: "YouTube",
      value: "Daddy MUPHASA",
      href: "https://www.youtube.com/channel/UClKzTUNoiGXumhjuwRWW6EQ",
    },
    { label: "Telegram", value: "@daddymuphasa", href: "https://t.me/daddymuphasa" },
    { label: "WhatsApp", value: "Message me", href: "https://wa.me/message/RNIQEPKTXQRWG1" },
    { label: "Behance", value: "adamstestimony", href: "https://www.behance.net/adamstestimony" },
    { label: "Audiomack", value: "daddy-muphasa", href: "https://audiomack.com/daddy-muphasa" },
    { label: "OpenSea", value: "PAPAGEDON", href: "https://opensea.io/collection/papagedon" },
  ] as ContactLink[],
};

/**
 * Legal identity and policy metadata.
 * `entity` is the name that appears in the copyright line and both policies —
 * if PAPAGEDON Labs is registered with the CAC, add the RC number to `registration`.
 */
export const legal = {
  entity: "PAPAGEDON Labs",
  operator: "Adams-Okorie Testimony Oguchukwuluru",
  registration: "",
  jurisdiction: "Federal Republic of Nigeria",
  venue: "Enugu State, Nigeria",
  email: "papagedonlabs@gmail.com",
  updated: "9 August 2026",
  pages: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};

export const nav = [
  { label: "Music", href: "#music" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Art", href: "#art" },
  { label: "Experience", href: "#experience" },
  { label: "Vision", href: "#vision" },
  { label: "Contact", href: "#contact" },
];

/**
 * The ordered sections that drive the Oracle experience.
 * `index` maps a scrolled section to a holographic panel in the ring
 * (index 0 is the neutral intro state). `x`/`y` are the panel's anchor
 * as a % of the Oracle stage; `look` is the nun's turn direction toward it.
 */
export type OracleSection = {
  index: number;
  id: string;
  label: string;
  caption: string;
  x: number;
  y: number;
  look: number; // -1 turn left · 0 forward · 1 turn right (viewer perspective)
};

export const oracleSections: OracleSection[] = [
  { index: 1, id: "music", label: "Music", caption: "Now Playing", x: 51, y: 76, look: 0 },
  { index: 2, id: "about", label: "About", caption: "The Founder", x: 20, y: 48, look: -1 },
  { index: 3, id: "skills", label: "Skills", caption: "Capabilities", x: 24, y: 25, look: -1 },
  { index: 4, id: "projects", label: "Projects", caption: "Selected Work", x: 40, y: 10, look: 0 },
  { index: 5, id: "obased", label: "OBASED", caption: "The Game", x: 62, y: 10, look: 0 },
  { index: 6, id: "art", label: "Art", caption: "Digital Art", x: 78, y: 25, look: 1 },
  { index: 7, id: "experience", label: "Experience", caption: "Trajectory", x: 82, y: 48, look: 1 },
  { index: 8, id: "vision", label: "Vision", caption: "The Future", x: 71, y: 68, look: 1 },
  { index: 9, id: "contact", label: "Contact", caption: "Let's Talk", x: 31, y: 68, look: -1 },
];
