export interface ProjectCapability {
  icon: string
  title: string
  description: string
  keyConcepts: string[]
}

export interface ProjectMediaItem {
  label: string
  src?: string
  type?: 'video' | 'image'
}

export type ProjectMedia = ProjectMediaItem | string

export interface Project {
  id: string
  title: string
  hook: string
  role: string
  highlights: string[]
  technologies: string[]
  media: ProjectMedia[]
  links: {
    github?: string
    live?: string
  }
  sectionTitle?: string
  capabilities?: ProjectCapability[]
  architectureHighlights?: string[]
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}

export const projects: Project[] = [
  {
    id: 'aria',
    title: 'ARIA – Adaptive Reasoning & Intelligent Assistant',
    hook: 'An AI-powered assistant designed to understand user intent, automate tasks, and provide intelligent recommendations.',
    role: 'Full Stack Developer & AI Developer',
    highlights: [
      'Developed intelligent intent classification and task management features.',
      'Integrated external APIs for automation workflows.',
      'Built a scalable architecture for future AI capabilities.',
      'Focused on creating a personalized productivity assistant.',
    ],
    technologies: ['Python', 'REST APIs', 'AI', 'Automation'],
    media: [
      { label: 'Hero Overview', src: '/videos/aria_vid.mp4', type: 'video' },
      'Dashboard Screenshot',
      'Architecture Diagram',
      'Demo Video',
    ],
    links: {
      github: '#',
      live: '#',
    },
    sectionTitle: 'What ARIA Can Do',
    capabilities: [
      {
        icon: '✦',
        title: 'AI Conversation',
        description:
          'Natural-language conversations using locally hosted or cloud LLMs through Ollama and Groq, with live-streamed responses for real-time interaction and step-by-step assistance.',
        keyConcepts: ['Ollama', 'Groq', 'LLM chat', 'Streaming responses'],
      },
      {
        icon: '✦',
        title: 'Communication Automation',
        description:
          'Draft and send WhatsApp messages and emails, including voice-based messaging and AI-generated message templates.',
        keyConcepts: ['WhatsApp', 'Gmail', 'Voice messaging', 'AI templates'],
      },
      {
        icon: '✦',
        title: 'PC & Task Automation',
        description:
          'Control desktop applications through commands, automate mouse and keyboard actions, run commands and macros, and capture screenshots for vision-based tasks.',
        keyConcepts: ['Desktop control', 'Macros', 'Screenshots', 'Vision prompts'],
      },
      {
        icon: '✦',
        title: 'Memory & Productivity',
        description:
          'Persistent memory and conversation history allow ARIA to remember context, manage project notes, assist with code, and handle scheduling.',
        keyConcepts: ['Persistent memory', 'Project context', 'Code agent', 'Calendar'],
      },
    ],
    architectureHighlights: [
      'Intelligent intent classification and task routing.',
      'LLM orchestration with real-time streaming.',
      'External API integrations for automation workflows.',
      'Persistent memory and conversation history.',
      'Modular automation architecture designed for future AI capabilities.',
    ],
  },
  {
    id: 'india-signal',
    title: 'India Signal – Geopolitical Intelligence Platform',
    hook: 'A real-time geopolitical intelligence platform that transforms global events into actionable alerts, interactive maps, executive metrics, and regional insights.',
    role: 'Full Stack Developer',
    highlights: [
      'Built interactive dashboards for geopolitical analysis.',
      'Integrated multiple data sources for intelligent insights.',
      'Designed scalable backend APIs.',
      'Developed modern UI focused on data visualization.',
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Leaflet', 'REST APIs'],
    media: [
      { label: 'Hero Overview', src: '/videos/ind_sig.mp4', type: 'video' },
      'Landing Page',
      'Interactive Map',
      'Dashboard',
    ],
    links: {
      github: '#',
      live: '#',
    },
    sectionTitle: 'What IndiaSignal Can Do',
    capabilities: [
      {
        icon: '✦',
        title: 'Real-Time Alerts Feed',
        description:
          'Monitor incoming intelligence through a live alerts stream with severity and category indicators, filtering, and quick actions for rapid situational awareness.',
        keyConcepts: ['Live Feed', 'Severity', 'Categories', 'Filtering', 'Quick Actions'],
      },
      {
        icon: '✦',
        title: 'Interactive Global Map',
        description:
          'Visualize geopolitical events and pressure points through a Leaflet-powered interactive map with custom popups, legends, and map controls.',
        keyConcepts: ['Leaflet', 'Global Events', 'Pressure Points', 'Custom Popups', 'Map Controls'],
      },
      {
        icon: '✦',
        title: 'Executive Dashboard & Metrics',
        description:
          'Surface key KPIs, summary indicators, and trend changes through an executive-focused dashboard designed for rapid scanning and decision-making.',
        keyConcepts: ['KPIs', 'Trend Analysis', 'Summary Metrics', 'Executive View'],
      },
      {
        icon: '✦',
        title: 'Regional Analysis & Reports',
        description:
          'Explore region-specific intelligence through dedicated analysis cards and report summaries, with categorized insights designed for deeper investigation and sharing.',
        keyConcepts: ['Regional Analysis', 'Reports', 'Categorized Insights', 'Shareable Summaries'],
      },
    ],
    architectureHighlights: [
      'Intelligence aggregation and alert processing pipeline.',
      'Interactive Leaflet-based geospatial visualization.',
      'Data-driven dashboard architecture for KPIs and trend indicators.',
      'Regional analysis and report-summary workflows.',
      'Categorization and severity-based filtering for rapid information discovery.',
      'Modular architecture designed for expanding intelligence sources.',
    ],
  },
  {
    id: 'shivantra',
    title: 'Shivantra – AI Voice Assistant',
    hook: 'A voice-first AI assistant built with Flutter and FastAPI, combining Gemini and LLaMA-powered intelligence with persistent memory, offline fallback, and cross-platform device integration.',
    role: 'AI Developer',
    highlights: [
      'Built conversational AI workflows.',
      'Designed modular architecture for future expansion.',
      'Implemented intelligent command handling.',
      'Focused on creating a human-like AI experience.',
    ],
    technologies: ['Flutter', 'FastAPI', 'Dart', 'Python', 'Gemini', 'Groq', 'LLaMA', 'REST APIs', 'Speech Recognition', 'TTS'],
    media: [
      { label: 'Live Demo', src: '/videos/shivantra_vid.mp4', type: 'video' },
      'Conversation Demo',
      'Voice Animation',
    ],
    links: {
      github: '#',
    },
    sectionTitle: 'What Shivantra Can Do',
    capabilities: [
      {
        icon: '✦',
        title: 'Voice-First Conversation',
        description:
          'Interact with Shivantra through real-time speech-to-text and on-device text-to-speech, enhanced by a reactive Arc Reactor-style visualizer.',
        keyConcepts: ['Speech-to-Text', 'Text-to-Speech', 'Voice UI', 'Arc Reactor'],
      },
      {
        icon: '✦',
        title: 'Dual-AI Backend',
        description:
          'A FastAPI-powered backend integrates Google Gemini and Groq-hosted LLaMA models through a unified REST API.',
        keyConcepts: ['Gemini', 'LLaMA', 'Groq', 'FastAPI', 'REST API'],
      },
      {
        icon: '✦',
        title: 'Long-Term Memory',
        description:
          'Shivantra maintains persistent facts, reminders, and conversational context through a JSON-backed memory system, with an offline intent detector that keeps core functionality available without API keys.',
        keyConcepts: ['Persistent Memory', 'JSON Store', 'Offline Intent Detection', 'Local Fallback'],
      },
      {
        icon: '✦',
        title: 'Cross-Platform Assistant',
        description:
          'Built with Flutter for Android, iOS, Web, Windows, macOS, and Linux, with platform-specific OS integration such as opening applications and websites on Windows.',
        keyConcepts: ['Flutter', 'Android', 'iOS', 'Web', 'Desktop', 'OS Integration'],
      },
    ],
    architectureHighlights: [
      'Flutter frontend with voice-first conversational UI and reactive Arc Reactor visualization.',
      'FastAPI backend exposing REST endpoints for AI interaction.',
      'Dual-model AI architecture using Google Gemini and Groq-hosted LLaMA.',
      'JSON-backed persistent memory for facts, reminders, and conversational context.',
      'Offline intent detection and local fallback for core functionality without API keys.',
      'Platform-aware OS integration for supported desktop actions.',
      'Configurable API credentials through application settings.',
    ],
  },
  {
    id: 'obsidian',
    title: 'Obsidian',
    hook: 'A resilient AI chat platform featuring adaptive persona switching, persistent cross-session memory, multi-provider failover, and real-time token streaming.',
    role: 'Full Stack Developer',
    highlights: [
      'Designed a unique AI personality.',
      'Built conversational web interface.',
      'Focused on user engagement and immersive interactions.',
      'Developed scalable architecture for future features.',
    ],
    technologies: ['TypeScript', 'React', 'Next.js', 'Gemini', 'Groq', 'LLaMA', 'Supabase', 'SSE', 'REST APIs'],
    media: [
      { label: 'Hero Overview', src: '/videos/obsidian_vid.mp4', type: 'video' },
      'Homepage',
      'Chat Interface',
    ],
    links: {
      github: '#',
      live: 'https://askobsidian.vercel.app',
    },
    sectionTitle: 'What Makes Obsidian Different',
    capabilities: [
      {
        icon: '✦',
        title: 'Adaptive AI Persona',
        description:
          'Obsidian uses an intentionally cold, razor-sharp personality with concise and sarcastic responses by default. A sensitive-context detector automatically overrides the persona and switches to a supportive, safety-first mode when crisis-related content is detected.',
        keyConcepts: ['Persona Engine', 'Context Detection', 'Sensitive Mode', 'Safety Override'],
      },
      {
        icon: '✦',
        title: 'Multi-Key & Provider Failover',
        description:
          'Obsidian supports multiple Gemini API keys with automatic rotation when quota or rate-limit errors occur, with an optional Groq-hosted LLaMA fallback for additional resilience.',
        keyConcepts: ['Gemini', 'Multi-Key Rotation', '429 Recovery', 'Groq', 'LLaMA'],
      },
      {
        icon: '✦',
        title: 'Cross-Session AI Memory',
        description:
          'Conversation summaries are persisted in Supabase and injected into future conversations alongside recent-session context, giving Obsidian durable memory without continuously sending entire conversation histories to the model.',
        keyConcepts: ['Supabase', 'Summarized Memory', 'Context Retrieval', 'User Isolation'],
      },
      {
        icon: '✦',
        title: 'Real-Time Streaming & Recovery',
        description:
          'Obsidian streams Gemini responses token-by-token using SSE and asynchronous streaming, while detecting interrupted responses so incomplete generations can be recovered or regenerated.',
        keyConcepts: ['SSE', 'Token Streaming', 'Async Generator', 'Stream Recovery'],
      },
    ],
    architectureHighlights: [
      'Adaptive persona and sensitive-context detection pipeline.',
      'Multi-key Gemini failover with automatic quota and rate-limit recovery.',
      'Optional Groq-hosted LLaMA provider fallback.',
      'Supabase-backed cross-session summarized memory.',
      'Per-user conversation isolation and persistent context retrieval.',
      'SSE-based token streaming using asynchronous response pipelines.',
      'Interrupted-stream detection and incomplete-response recovery.',
    ],
  },
]
