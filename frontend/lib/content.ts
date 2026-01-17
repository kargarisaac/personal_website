import { ExperienceEntry, Profile, Publication, SkillCategory } from "./types";

export const profile: Profile = {
  name: "Isaac Kargar",
  title:
    "AI Researcher | Principal AI Scientist | Robotics, LLMs, RL and Multi-Agent Systems",
  summary:
    "AI researcher with 10+ years building machine learning systems across LLMs, agentic AI, reinforcement learning, and autonomous driving. Focused on turning research into scalable, real-world systems for strategic decision support.",
  location: "Helsinki, Uusimaa, Finland",
  email: "kargarisaac@gmail.com",
  linkedin: "https://www.linkedin.com/in/isaac-kargar/",
};

export const highlights = [
  "Designed event-driven multi-agent systems with layered memory and tool integration",
  "Co-founded Resoniks and helped secure EUR 2.65M in seed funding",
  "Published multi-agent RL work with 82.4% crash reduction in complex scenarios",
];

export const experience: ExperienceEntry[] = [
  {
    company: "In Parallel",
    title: "Principal AI Scientist",
    timeframe: "May 2025–Present · Helsinki, Finland",
    summary:
      "Designing agentic AI systems for strategic intelligence, multi-agent orchestration, and decision support.",
    context: [
      "Built retrieval-augmented reasoning systems that blend knowledge graphs with semantic search.",
      "Orchestrated multi-agent LLM workflows for planning and internal analytics.",
      "Focused on scalable, production-ready AI platforms for strategic decision-making.",
    ],
  },
  {
    company: "Resoniks",
    title: "Co-Founder & Chief AI Officer",
    timeframe: "May 2022–Jan 2025 · Helsinki, Finland",
    summary:
      "Developed high-performance acoustic anomaly detection and scaled the AI product.",
    context: [
      "Delivered a production-grade anomaly detection system with near-zero false positives.",
      "Scaled MVP to production and helped secure EUR 2.65M in seed funding.",
      "Led AI strategy and ML R&D while growing a cross-functional team.",
    ],
  },
  {
    company: "Aalto University",
    title: "PhD Researcher & TA",
    timeframe: "May 2019–Present · Espoo, Finland",
    summary:
      "Researching multi-agent RL and autonomous driving decision-making.",
    context: [
      "Published MACRPO with 82.4% crash reduction in multi-agent scenarios.",
      "Built vision transformer policies for driving with 5% crash rates.",
      "Proposed multi-agent LLM frameworks for coordinated autonomous vehicles.",
    ],
  },
];

export const skills: SkillCategory[] = [
  {
    label: "Strengths",
    description: "Core strengths grounded in roles and research output.",
    items: [
      "Large language models and agentic AI",
      "Multi-agent system architecture",
      "Reinforcement learning and multi-agent RL",
      "Computer vision and autonomous driving",
      "MLOps and production ML deployment",
      "Anomaly detection and time-series modeling",
    ],
  },
  {
    label: "Moderate",
    description: "Adjacent depth across data platforms and orchestration tools.",
    items: [
      "Knowledge graphs and graph-based retrieval",
      "Vector search systems (OpenSearch, FAISS, Pinecone)",
      "LLM orchestration (LangChain, LangGraph, LlamaIndex, DSPy)",
      "Distributed workflows (Flyte, AWS AgentCore)",
    ],
  },
  {
    label: "Gaps",
    description: "Not explicitly specified in the CV or LinkedIn.",
    items: ["Not specified"],
  },
];

export const publications: Publication[] = [
  {
    title: "MACRPO: Multi-Agent Cooperative Recurrent Policy Optimization",
    venue: "Frontiers in Robotics and AI",
    year: "2024",
  },
  {
    title:
      "Increasing the Efficiency of Policy Learning for Autonomous Vehicles by Multi-Task Representation Learning",
    venue: "IEEE Transactions on Intelligent Vehicles",
    year: "2023",
  },
  {
    title:
      "Vision Transformer for Learning Driving Policies in Complex and Dynamic Environments",
    venue: "IEEE Intelligent Vehicles Symposium",
    year: "2023",
  },
];
