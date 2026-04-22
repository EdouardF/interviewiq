import { create } from 'zustand'
import type { Interview, Transcript, Insight, PainPoint } from '../types'

interface AppState {
  interviews: Interview[]; transcripts: Transcript[]; insights: Insight[]; painPoints: PainPoint[]; error: string | null
  addInterview: (i: Interview) => void; updateInterview: (id: string, u: Partial<Interview>) => void; deleteInterview: (id: string) => void
  addTranscript: (t: Transcript) => void; deleteTranscript: (id: string) => void
  addInsight: (i: Insight) => void; updateInsight: (id: string, u: Partial<Insight>) => void; deleteInsight: (id: string) => void
  addPainPoint: (p: PainPoint) => void; updatePainPoint: (id: string, u: Partial<PainPoint>) => void; deletePainPoint: (id: string) => void
  setError: (m: string | null) => void; reset: () => void
}

const init = { interviews: [], transcripts: [], insights: [], painPoints: [], error: null }
export const useAppStore = create<AppState>((set) => ({
  ...init,
  addInterview: (i) => set((s) => ({ interviews: [...s.interviews, i] })),
  updateInterview: (id, u) => set((s) => ({ interviews: s.interviews.map((i) => i.id === id ? { ...i, ...u } : i) })),
  deleteInterview: (id) => set((s) => ({ interviews: s.interviews.filter((i) => i.id !== id) })),
  addTranscript: (t) => set((s) => ({ transcripts: [...s.transcripts, t] })),
  deleteTranscript: (id) => set((s) => ({ transcripts: s.transcripts.filter((t) => t.id !== id) })),
  addInsight: (i) => set((s) => ({ insights: [...s.insights, i] })),
  updateInsight: (id, u) => set((s) => ({ insights: s.insights.map((i) => i.id === id ? { ...i, ...u } : i) })),
  deleteInsight: (id) => set((s) => ({ insights: s.insights.filter((i) => i.id !== id) })),
  addPainPoint: (p) => set((s) => ({ painPoints: [...s.painPoints, p] })),
  updatePainPoint: (id, u) => set((s) => ({ painPoints: s.painPoints.map((p) => p.id === id ? { ...p, ...u } : p) })),
  deletePainPoint: (id) => set((s) => ({ painPoints: s.painPoints.filter((p) => p.id !== id) })),
  setError: (m) => set({ error: m }),
  reset: () => set(init),
}))