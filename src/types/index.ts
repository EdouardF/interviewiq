export type InterviewStatus = 'scheduled' | 'recording' | 'transcribed' | 'analyzed'
export type InsightPriority = 'low' | 'medium' | 'high' | 'critical'
export type PainPointType = 'usability' | 'performance' | 'feature_gap' | 'onboarding' | 'other'

export interface Interview {
  id: string
  participant: string
  status: InterviewStatus
  duration?: number
  date: string
  notes?: string
}

export interface Transcript {
  id: string
  interviewId: string
  text: string
  timestamp: string
}

export interface Insight {
  id: string
  interviewId: string
  title: string
  description: string
  priority: InsightPriority
  painPointType: PainPointType
  quotes: string[]
}

export interface PainPoint {
  id: string
  title: string
  type: PainPointType
  frequency: number
  severity: InsightPriority
  interviews: string[]
}