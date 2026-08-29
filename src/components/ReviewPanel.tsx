import type { QuizState } from '../types';

interface Props {
  state: QuizState;
  onClearFlags: () => void;
  onUnflag: (id: number) => void;
  onBack: () => void;
}

export const ReviewPanel: React.FC<Props> = ({ state, onClearFlags, onUnflag, onBack }) => {
  const flaggedQuestions = state.questions.filter(q => state.flagged.has(q.id));

  const copyToClipboard = () => {
    let markdown = '# Flagged Questions Review\\n\\n';
    flaggedQuestions.forEach((q, i) => {
      markdown += `## Q${i + 1}: ${q.scenario}\\n${q.question}\\n\\n`;
      markdown += `**Your Answer:** ${state.answers[q.id] || 'None'}\\n`;
      markdown += `**Correct Answer:** ${q.correctAnswer}\\n\\n`;
      markdown += `**Explanation:** ${q.explanation}\\n\\n---\\n\\n`;
    });
    navigator.clipboard.writeText(markdown).then(() => alert('Copied to clipboard!'));
  };

  if (flaggedQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-border rounded-xl bg-card-1 shadow-lg">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">task</span>
        <h2 className="text-2xl font-bold text-on-surface mb-2">No flagged questions!</h2>
        <p className="text-on-surface-variant mb-8">You haven't flagged any questions for review.</p>
        <button 
          onClick={onBack}
          className="px-6 py-2.5 rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-surface font-medium transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-on-surface">
          <span className="material-symbols-outlined text-tertiary">flag</span>
          Review Flagged
        </h2>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={copyToClipboard}
            className="px-4 py-2 rounded-lg border border-outline-variant text-sm font-medium hover:bg-card-2 flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">content_copy</span>
            Export Markdown
          </button>
          <button 
            onClick={onClearFlags}
            className="px-4 py-2 rounded-lg border border-outline-variant text-sm font-medium hover:bg-card-2 flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">clear_all</span>
            Clear All
          </button>
          <button 
            onClick={onBack}
            className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary-container/90 text-sm font-medium shadow flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            Home
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {flaggedQuestions.map((q) => (
          <div key={q.id} className="bg-card-1 border border-border rounded-xl shadow-lg p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                ${q.domain === 1 ? 'bg-domain-1/10 text-domain-1' : ''}
                ${q.domain === 2 ? 'bg-domain-2/10 text-domain-2' : ''}
                ${q.domain === 3 ? 'bg-domain-3/10 text-domain-3' : ''}
                ${q.domain === 4 ? 'bg-domain-4/10 text-domain-4' : ''}
                ${q.domain === 5 ? 'bg-domain-5/10 text-domain-5' : ''}
              `}>
                <span className="material-symbols-outlined text-[14px]">category</span>
                D{q.domain}: {q.domainName}
              </div>
              <button 
                onClick={() => onUnflag(q.id)}
                className="text-sm font-medium text-on-surface-variant hover:text-on-surface flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">bookmark_remove</span>
                Unflag
              </button>
            </div>
            
            <div className="bg-bg border border-border rounded-lg p-4 text-sm text-on-surface-variant line-clamp-2">
              {q.scenario}
            </div>
            
            <p className="font-semibold text-on-surface">{q.question}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-card-2 border border-outline-variant rounded-lg p-3">
                <span className="text-xs text-on-surface-variant uppercase font-semibold block mb-1">Your Answer</span>
                <span className="font-medium text-on-surface">{state.answers[q.id] || 'None'}</span>
              </div>
              <div className="bg-correct/10 border border-correct/30 rounded-lg p-3">
                <span className="text-xs text-correct uppercase font-semibold block mb-1">Correct Answer</span>
                <span className="font-medium text-correct">{q.correctAnswer}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="text-sm font-bold text-on-surface mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">lightbulb</span>
                Explanation
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {q.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
