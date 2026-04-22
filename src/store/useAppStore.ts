import { create } from 'zustand'
import type { Interview, Transcript, Insight, PainPoint, InterviewStatus, InsightPriority } from '../types'

type SortKey = 'date' | 'participant'

interface AppState {
  interviews: Interview[]; transcripts: Transcript[]; insights: Insight[]; painPoints: PainPoint[]
  selectedInterview: string | null; searchQuery: string; filterStatus: InterviewStatus | ''; filterPriority: InsightPriority | ''; sortBy: SortKey
  error: string | null
  addInterview: (i: Interview) => void; updateInterview: (id: string, u: Partial<Interview>) => void; deleteInterview: (id: string) => void; setSelectedInterview: (id: string | null) => void
  addTranscript: (t: Transcript) => void; deleteTranscript: (id: string) => void
  addInsight: (i: Insight) => void; updateInsight: (id: string, u: Partial<Insight>) => void; deleteInsight: (id: string) => void
  addPainPoint: (p: PainPoint) => void; updatePainPoint: (id: string, u: Partial<PainPoint>) => void; deletePainPoint: (id: string) => void
  setSearchQuery: (q: string) => void; setFilterStatus: (s: InterviewStatus | '') => void; setFilterPriority: (p: InsightPriority | '') => void; setSortBy: (s: SortKey) => void
  setError: (m: string | null) => void; reset: () => void
}

const init = { interviews: [], transcripts: [], insights: [], painPoints: [], selectedInterview: null, searchQuery: '', filterStatus: '' as InterviewStatus | '', filterPriority: '' as InsightPriority | '', sortBy: 'date' as SortKey, error: null }
export const useAppStore = create<AppState>((set) => ({
  ...init,
  addInterview: (i) => set((s) => ({ interviews: [...s.interviews, i] })),
  updateInterview: (id, u) => set((s) => ({ interviews: s.interviews.map((x) => x.id === id ? { ...x, ...u } : x) })),
  deleteInterview: (id) => set((s) => ({ interviews: s.interviews.filter((x) => x.id !== id) })),
  setSelectedInterview: (id) => set({ selectedInterview: id }),
  addTranscript: (t) => set((s) => ({ transcripts: [...s.transcripts, t] })),
  deleteTranscript: (id) => set((s) => ({ transcripts: s.transcripts.filter((t) => t.id !== id) })),
  addInsight: (i) => set((s) => ({ insights: [...s.insights, i] })),
  updateInsight: (id, u) => set((s) => ({ insights: s.insights.map((x) => x.id === id ? { ...x, ...u } : x) })),
  deleteInsight: (id) => set((s) => ({ insights: s.insights.filter((x) => x.id !== id) })),
  addPainPoint: (p) => set((s) => ({ painPoints: [...s.painPoints, p] })),
  updatePainPoint: (id, u) => set((s) => ({ painPoints: s.painPoints.map((x) => x.id === id ? { ...x, ...u } : x) })),
  deletePainPoint: (id) => set((s) => ({ painPoints: s.painPoints.filter((x) => x.id !== id) })),
  setSearchQuery: (q) => set({ searchQuery: q }), setFilterStatus: (s) => set({ filterStatus: s }), setFilterPriority: (p) => set({ filterPriority: p }), setSortBy: (s) => set({ sortBy: s }),
  setError: (m) => set({ error: m }), reset: () => set(init),
}))

export const useFilteredInterviews = () => useAppStore((s) => {
  let result = [...s.interviews]
  if (s.searchQuery) { const q = s.searchQuery.toLowerCase(); result = result.filter((i) => i.participant.toLowerCase().includes(q) || (i.notes?.toLowerCase().includes(q) ?? false)) }
  if (s.filterStatus) result = result.filter((i) => i.status === s.filterStatus)
  if (s.sortBy === 'date') result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  else result.sort((a, b) => a.participant.localeCompare(b.participant))
  return result
})

export const useInterviewStats = () => useAppStore((s) => ({
  total: s.interviews.length,
  analyzed: s.interviews.filter((i) => i.status === 'analyzed').length,
  insights: s.insights.length,
}))