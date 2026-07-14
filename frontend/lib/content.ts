import { ExperienceEntry, Profile, Publication, SkillCategory } from "./types";

export const profile: Profile = {
  name: "Isaac Kargar",
  title:
    "AI Consultant & Researcher | Founder of Nazmi & Lerim | Robotics, LLMs, RL and Multi-Agent Systems",
  summary:
    "AI researcher with 10+ years building machine learning systems across LLMs, agentic AI, reinforcement learning, and autonomous driving. Currently leading independent AI consulting through Nazmi and building Lerim, an open-source context compiler for AI agent workflows.",
  location: "Helsinki, Uusimaa, Finland",
  email: "kargarisaac@gmail.com",
  linkedin: "https://www.linkedin.com/in/isaac-kargar/",
};

export const highlights = [
  "Founded Nazmi, an independent AI consulting practice for enterprise ML and LLM systems",
  "Founded and maintain Lerim, an open-source context compiler for AI agent workflows",
  "Designed event-driven multi-agent systems with layered memory and tool integration at In Parallel",
  "Co-founded Resoniks and helped secure EUR 2.65M in seed funding",
  "Published multi-agent RL work with 82.4% crash reduction in complex scenarios",
];

export const experience: ExperienceEntry[] = [
  {
    company: "Nazmi",
    title: "Founder & AI Consultant",
    timeframe: "2026–Present · Helsinki, Finland",
    summary:
      "Independent AI consulting practice focused on helping enterprise clients design and build practical ML, LLM, and data-intensive AI systems.",
    context: [
      "Designed and implemented ML workflows using Azure Machine Learning and Databricks for an enterprise technology engagement in the telecommunications sector.",
      "Built recommender-system and AI-agent capabilities for a retail technology engagement, focusing on experimentation, production constraints, and maintainable system design.",
      "Advised clients on AI/ML architecture, MLOps, LLM application design, and delivery planning from prototype to production.",
      "Worked hands-on across Python, Azure ML, Databricks, LLM frameworks, data pipelines, and modern ML infrastructure.",
    ],
  },
  {
    company: "Lerim",
    title: "Founder & Maintainer",
    timeframe: "2026–Present · Helsinki, Finland",
    summary:
      "Open-source context compiler for AI agent workflows. Turns completed agent sessions into cited, reusable context records so future agents can recover decisions, constraints, and evidence without replaying raw traces.",
    context: [
      "Designed the core trace-to-context pipeline for ingesting completed agent sessions, normalizing traces, extracting reusable records, and serving context back to future agents.",
      "Built developer-facing interfaces including CLI workflows, MCP tools, context briefs, retrieval-backed answers, and native coding-agent adapters.",
      "Implemented evidence-backed context records and a derived context graph linking decisions, constraints, facts, preferences, and handoffs to source sessions.",
      "Worked across Python, SQLite, BAML, LangGraph, MCP, CLI tooling, retrieval systems, context engineering, and LLM evaluation.",
    ],
  },
  {
    company: "In Parallel",
    title: "Principal AI Scientist",
    timeframe: "2025–2026 · Helsinki, Finland",
    summary:
      "Led architecture and hands-on development of agentic AI systems for strategic planning, execution monitoring, organizational learning, and decision support.",
    context: [
      "Designed event-driven multi-agent workflows where agents responded to internal and external signals, updated plans, extracted learning, and supported human-in-the-loop decision-making.",
      "Built memory and context systems combining session memory, working memory, long-term organizational knowledge, graph data, and retrieved documents.",
      "Developed planning, replanning, learning, monitoring, Graph-RAG, competitor analysis, obstacle extraction, and financial analysis agents.",
      "Integrated data from Linear, GitHub, Slack, Teams, Jira, Notion, Snowflake, meeting transcripts, and external market sources.",
      "Worked with Claude Agent SDK, AWS AgentCore, Flyte, DSPy, LangGraph, LangChain, BAML, KuzuDB, and AWS.",
    ],
  },
  {
    company: "Resoniks",
    title: "Co-Founder & CIO/CAIO",
    timeframe: "2022–2025 · Helsinki, Finland",
    summary:
      "Part of the founding team building an AI-based industrial inspection product. Contributed to the company's EUR 2.65M seed funding round.",
    context: [
      "Led AI and software development across product architecture, ML systems, MLOps, and production deployment.",
      "Helped grow and manage a cross-functional software and ML team of 15 people.",
      "Designed and implemented MLOps infrastructure across hybrid cloud and on-premises environments, improving deployment speed and supporting reliable ML inference.",
      "Developed acoustic anomaly detection models for industrial quality inspection, with low false-positive rates and sub-100ms inference.",
      "Built an acoustic measurement pipeline with strong predictive performance (R2 > 0.95) and real-time inference capability.",
    ],
  },
  {
    company: "Silo AI",
    title: "AI Engineer",
    timeframe: "2021–2022 · Helsinki, Finland",
    summary:
      "Delivered AI consulting work for robotics and autonomous driving customers, focusing on simulation-based validation and decision-making systems.",
    context: [
      "Built and improved autonomous vehicle testing workflows in realistic simulation environments, reducing test iteration time from days to hours.",
      "Integrated planning algorithms into virtual traffic scenarios to evaluate vehicle behavior across different driving conditions.",
      "Worked closely with customer teams to turn research-oriented autonomous driving methods into usable engineering workflows.",
    ],
  },
  {
    company: "Aalto University",
    title: "PhD Researcher & Teaching Assistant",
    timeframe: "2019–Present · Espoo, Finland",
    summary:
      "Researching decision-making for autonomous vehicles using deep reinforcement learning, multi-agent learning, vision transformers, offline RL, and LLM-based agent frameworks.",
    context: [
      "Developed reinforcement learning methods for autonomous driving, including curriculum learning, multi-task representation learning, multi-agent RL, and offline RL.",
      "Published research on multi-agent cooperative policy optimization, vision-transformer-based driving policies, and multi-task representation learning for autonomous vehicles.",
      "Built and evaluated autonomous driving models in simulation, with focus areas including crash reduction, transfer learning, sample efficiency, and behavior in complex traffic scenarios.",
      "Contributed to Aalto University's autonomous driving research platform, including system architecture, sensor integration, and Autoware-based real-world testing.",
      "Supported teaching and student supervision in machine learning, robotics, and autonomous systems.",
    ],
  },
  {
    company: "AIDrivers LTD",
    title: "Machine Learning and Computer Vision Engineer",
    timeframe: "2018–2019 · Remote, United Kingdom",
    summary:
      "Worked on computer vision and perception systems for autonomous driving, focusing on 3D object detection and point cloud processing.",
    context: [
      "Developed and evaluated 3D object detection models, including AVOD and PointPillars, using TensorFlow and PyTorch.",
      "Built point cloud processing pipelines with PCL and integrated them with deep learning models for edge-oriented deployment.",
      "Optimized perception workflows to reduce computational cost while maintaining real-time inference requirements.",
    ],
  },
  {
    company: "Sarveen Technology",
    title: "Deep Learning and Machine Learning Engineer",
    timeframe: "2016–2018",
    summary:
      "Worked on applied machine learning systems for mobile and sensor-based applications, focusing on activity recognition, sensor fusion, and deployment workflows.",
    context: [
      "Built a human activity recognition system using deep learning and sensor fusion, achieving 94% classification accuracy.",
      "Implemented heading estimation methods using sensor data, reaching approximately 1.5-degree estimation error.",
      "Developed ML pipelines for training, evaluating, and deploying models across mobile platforms.",
      "Improved model deployment workflows and reduced iteration time for mobile ML applications.",
    ],
  },
];

export const skills: SkillCategory[] = [
  {
    label: "Strengths",
    description: "Core strengths grounded in roles and research output.",
    items: [
      "Large language models and agentic AI systems",
      "Multi-agent system architecture",
      "Reinforcement learning and multi-agent RL",
      "Computer vision and autonomous driving",
      "MLOps and production ML deployment",
      "Anomaly detection and time-series modeling",
      "Retrieval-augmented generation (RAG and Graph-RAG)",
      "Context engineering for AI agent workflows",
    ],
  },
  {
    label: "Moderate",
    description: "Adjacent depth across data platforms, cloud infrastructure, and orchestration tools.",
    items: [
      "Knowledge graphs and graph-based retrieval (KuzuDB, Neo4j)",
      "Vector search systems (OpenSearch, FAISS, Pinecone, Qdrant)",
      "LLM orchestration (LangChain, LangGraph, LlamaIndex, DSPy, BAML)",
      "Agent SDKs (Claude Agent SDK, OpenAI Agents SDK, PydanticAI, CrewAI, Smolagents)",
      "Cloud platforms (AWS, Azure Machine Learning, Databricks, Vertex AI)",
      "Distributed workflows (Flyte, AWS AgentCore)",
      "Data systems (Snowflake, PostgreSQL, Athena, Kafka, S3)",
      "Robotics (ROS, Autoware, sensor fusion)",
    ],
  },
  {
    label: "Gaps",
    description: "Areas not explicitly covered in recent roles or research.",
    items: [
      "Frontend and UI development beyond basic TypeScript",
      "Large-scale distributed pretraining infrastructure",
      "Embedded systems and hardware-level ML optimization (FPGA, TPU)",
    ],
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
  {
    title:
      "KoMA-GIAM: A Graph-based Multi-agent Framework for Safety-Enhanced Autonomous Driving with Large Language Models",
    venue: "IEEE Transactions on Intelligent Vehicles (Under Review)",
    year: "2025",
  },
  {
    title:
      "COSBO: Conservative Offline Simulation-Based Policy Optimization",
    venue: "Manuscript in preparation",
    year: "2025",
  },
  {
    title:
      "Learning-Based High-Level Decision-Making for Abortable Overtaking in Autonomous Vehicles",
    venue: "IEEE Transactions on Intelligent Transportation Systems",
    year: "2024",
  },
  {
    title:
      "Using an encoder-decoder convolutional neural network to predict the solid holdup patterns in a pseudo-2D fluidized bed",
    venue: "Chemical Engineering Science",
    year: "2024",
  },
];
