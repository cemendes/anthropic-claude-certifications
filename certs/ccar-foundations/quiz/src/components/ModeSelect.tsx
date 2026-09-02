import type { QuizMode, TrackType } from '../types';

interface Stats {
  totalAnswered: number;
  accuracy: number;
  lastSession: Date | null;
}

interface Props {
  track: TrackType;
  onSelectTrack: (track: TrackType) => void;
  onSelectMode: (mode: QuizMode) => void;
  stats: Stats;
}

export const ModeSelect: React.FC<Props> = ({ track, onSelectTrack, onSelectMode, stats }) => {
  const isCCDV = track === 'ccdv-f';

  return (
    <div className="flex flex-col gap-8 w-full max-w-[800px] mx-auto">
      {/* Track Selector Tabs */}
      <div className="flex bg-card-1 p-1.5 rounded-xl border border-border shadow-sm">
        <button
          onClick={() => onSelectTrack('ccar-f')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            !isCCDV ? 'bg-primary-container text-on-surface shadow-md' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">architecture</span>
          Certified Architect (CCAR-F)
        </button>
        <button
          onClick={() => onSelectTrack('ccdv-f')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            isCCDV ? 'bg-primary-container text-on-surface shadow-md' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">terminal</span>
          Certified Developer (CCDV-F)
        </button>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-card-1 border border-border p-6 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-on-surface">
            {isCCDV ? 'Certified Developer: Foundations' : 'Certified Architect: Foundations'}
          </h2>
          <p className="text-on-surface-variant">
            {isCCDV ? 'Master Messages API, Tool Calling & Prompt Caching' : 'Master Multi-Agent loops, MCP & Workflow Patterns'}
          </p>
        </div>
        <div className="relative z-10 mt-6 sm:mt-0 flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm text-on-surface-variant">Track Accuracy</span>
            <span className="text-xl font-semibold text-correct">{stats.accuracy}%</span>
          </div>
          <svg className="w-16 h-16 transform -rotate-90">
            <circle cx="32" cy="32" r="28" fill="none" className="stroke-card-2" strokeWidth="8" />
            <circle 
              cx="32" cy="32" r="28" fill="none" 
              className="stroke-correct" strokeWidth="8"
              strokeDasharray="175" strokeDashoffset={175 - (175 * stats.accuracy) / 100}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Study Mode */}
        <button 
          onClick={() => onSelectMode('study')}
          className="group md:col-span-2 text-left bg-card-1 border border-border rounded-xl p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl relative overflow-hidden flex flex-col gap-4"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-container to-primary-container/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mb-2 text-primary-container">
            <span className="material-symbols-outlined text-3xl">menu_book</span>
          </div>
          <h3 className="text-2xl font-bold text-on-surface">Study Mode</h3>
          <p className="text-on-surface-variant text-base flex-1">
            Learn at your own pace. Explanations and distractor analyses are provided after every question. Filter by specific domains to focus your revision.
          </p>
          <div className="flex items-center gap-2 text-primary-container font-semibold mt-4">
            Start Studying <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </div>
        </button>

        {/* Exam Mode */}
        <button 
          onClick={() => onSelectMode('exam')}
          className="group text-left bg-card-1 border border-border rounded-xl p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl relative overflow-hidden flex flex-col gap-3"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-container to-primary-container/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container mb-2">
            <span className="material-symbols-outlined">timer</span>
          </div>
          <h3 className="text-xl font-bold text-on-surface">Exam Simulation</h3>
          <p className="text-on-surface-variant text-sm flex-1">
            60 questions. 120 minutes. No immediate feedback. Real proctored exam conditions.
          </p>
        </button>

        {/* Review Mode */}
        <button 
          onClick={() => onSelectMode('review')}
          className="group text-left bg-card-1 border border-border rounded-xl p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl relative overflow-hidden flex flex-col gap-3"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-container to-primary-container/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary mb-2">
            <span className="material-symbols-outlined">flag</span>
          </div>
          <h3 className="text-xl font-bold text-on-surface">Review Flagged</h3>
          <p className="text-on-surface-variant text-sm flex-1">
            Review questions you've flagged or missed in previous study sessions.
          </p>
        </button>
      </div>
    </div>
  );
};
