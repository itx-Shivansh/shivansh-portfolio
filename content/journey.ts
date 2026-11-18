export interface EducationItem {
  id: string
  institution: string
  degree: string
  specialization?: string
  period: string
}

export const educationHistory: EducationItem[] = [
  {
    id: 'dtu',
    institution: 'Delhi Technological University (DTU)',
    degree: 'B.Tech in Mechanical Engineering',
    specialization: 'Specialization in Automotive (AE)',
    period: '2024 – 2028',
  },
  {
    id: 'khms-senior',
    institution: 'Kulachi Hansraj Model School',
    degree: 'Senior Secondary (CBSE) – PCM',
    period: '2024',
  },
  {
    id: 'khms-secondary',
    institution: 'Kulachi Hansraj Model School',
    degree: 'Secondary (CBSE)',
    period: '2022',
  },
]
