import { InterviewList } from './InterviewList'
import { InsightExtractor } from './InsightExtractor'
import { PriorityMatrix } from './PriorityMatrix'

export function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-800 px-6 py-4">
        <h1 className="text-xl font-bold">InterviewIQ</h1>
        <p className="text-sm text-slate-500">AI User Interview Analyzer</p>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div><h2 className="text-sm font-medium text-slate-400 mb-3">Interviews</h2><InterviewList /></div>
        <div><h2 className="text-sm font-medium text-slate-400 mb-3">Insights</h2><InsightExtractor /></div>
        <div><h2 className="text-sm font-medium text-slate-400 mb-3">Priority Matrix</h2><PriorityMatrix /></div>
      </main>
    </div>
  )
}