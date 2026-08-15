export interface Identity {
  name: string
  roles: string[]
  positioningStatement: string
  toneWords: string[]
}

export const identity: Identity = {
  name: 'Shivansh Raj',
  roles: [
    'AI Developer',
    'Software Engineer',
    'Full-Stack Developer',
    'Automation Builder',
  ],
  positioningStatement:
    'Engineering student at Delhi Technological University (DTU) passionate about building intelligent software, AI-powered applications, and immersive digital experiences that solve real-world problems.',
  toneWords: ['Cinematic', 'Futuristic', 'Minimal', 'Premium', 'Intelligent'],
}
