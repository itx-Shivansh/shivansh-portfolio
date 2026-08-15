export interface Skill {
  name: string
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface SkillGroup {
  category: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming',
    skills: [
      { name: 'Java', level: 'intermediate' },
      { name: 'Python', level: 'advanced' },
      { name: 'JavaScript', level: 'advanced' },
      { name: 'SQL', level: 'intermediate' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML', level: 'advanced' },
      { name: 'CSS', level: 'advanced' },
      { name: 'React', level: 'advanced' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 'intermediate' },
      { name: 'Express.js', level: 'intermediate' },
      { name: 'REST APIs', level: 'advanced' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MongoDB', level: 'intermediate' },
      { name: 'Firebase', level: 'intermediate' },
    ],
  },
  {
    category: 'Artificial Intelligence',
    skills: [
      { name: 'Large Language Models (LLMs)', level: 'advanced' },
      { name: 'Prompt Engineering', level: 'advanced' },
      { name: 'AI Assistants', level: 'advanced' },
      { name: 'Workflow Automation', level: 'intermediate' },
      { name: 'Google Gemini API', level: 'advanced' },
      { name: 'Ollama', level: 'intermediate' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', level: 'advanced' },
      { name: 'GitHub', level: 'advanced' },
      { name: 'VS Code', level: 'expert' },
      { name: 'Postman', level: 'intermediate' },
    ],
  },
]
