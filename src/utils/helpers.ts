import type { InterviewStatus, InsightPriority, PainPointType } from '../types'

export const INTERVIEW_STATUS_LABELS: Record<InterviewStatus, string> = { scheduled: 'Scheduled', recording: 'Recording', transcribed: 'Transcribed', analyzed: 'Analyzed' }
export const INTERVIEW_STATUS_COLORS: Record<InterviewStatus, string> = { scheduled: 'bg-slate-500/20 text-slate-400', recording: 'bg-rose-500/20 text-rose-400', transcribed: 'bg-blue-500/20 text-blue-400', analyzed: 'bg-emerald-500/20 text-emerald-400' }

export const PRIORITY_LABELS: Record<InsightPriority, string> = { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' }
export const PRIORITY_COLORS: Record<InsightPriority, string> = { low: 'bg-slate-500/20 text-slate-400', medium: 'bg-blue-500/20 text-blue-400', high: 'bg-amber-500/20 text-amber-400', critical: 'bg-rose-500/20 text-rose-400' }

export const PAINPOINT_LABELS: Record<PainPointType, string> = { usability: 'Usability', performance: 'Performance', feature_gap: 'Feature Gap', onboarding: 'Onboarding', other: 'Other' }
export const PAINPOINT_COLORS: Record<PainPointType, string> = { usability: 'text-blue-400', performance: 'text-amber-400', feature_gap: 'text-purple-400', onboarding: 'text-emerald-400', other: 'text-slate-400' }

export function formatDate(dateStr: string): string { const d = new Date(dateStr); return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
export function formatDuration(minutes: number): string { return `${Math.floor(minutes / 60)}h ${minutes % 60}m` }
export function generateId(): string { return Math.random().toString(36).substring(2, 10) + Date.now().toString(36) }