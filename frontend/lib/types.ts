export type Profile = {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  linkedin: string;
};

export type ExperienceEntry = {
  company: string;
  title: string;
  timeframe: string;
  summary: string;
  context: string[];
};

export type SkillCategory = {
  label: "Strengths" | "Moderate" | "Gaps";
  description: string;
  items: string[];
};

export type Publication = {
  title: string;
  venue: string;
  year: string;
  link?: string;
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type JobFitResult = {
  rating: "Strong" | "Moderate" | "Weak";
  summary: string;
  evidence: string[];
  gaps: string[];
};
