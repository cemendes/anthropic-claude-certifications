import type { QuizMode } from '../types';

interface Props {
  currentIndex: number;
  total: number;
  isFlagged: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleFlag: () => void;
  onSubmit: () => void;
  isLast: boolean;
  mode: QuizMode;
  hasAnswered: boolean;
  showExplanation: boolean;
}

export const QuestionNav: React.FC<Props> = ({
  currentIndex, isFlagged, onPrev, onNext, onToggleFlag, onSubmit, isLast, mode, hasAnswered, showExplanation
}) => {
  const needsCheck = mode === 'study' && hasAnswered && !showExplanation;

  return (
    <div className="flex items-center justify-between mt-8 border-t border-border pt-6">
      <div className="flex items-center gap-3">
        <button 
          onClick={onPrev} 
          disabled={currentIndex === 0}
          className="flex items-center justify-center w-10 h-10 md:w-auto md:px-4 md:py-2 rounded-lg border border-outline-variant text-on-surface hover:bg-card-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Previous Question"
        >
          <span className="material-symbols-outlined text-xl md:mr-2">arrow_back</span>
          <span className="hidden md:inline font-medium text-sm">Back</span>
        </button>
        
        <button 
          onClick={onToggleFlag}
          className={`flex items-center justify-center w-10 h-10 md:w-auto md:px-4 md:py-2 rounded-lg border text-sm font-medium transition-colors
            ${isFlagged ? 'border-tertiary bg-tertiary/10 text-tertiary' : 'border-outline-variant text-on-surface hover:bg-card-2'}
          `}
          title={isFlagged ? "Unflag" : "Flag for Review"}
        >
          <span className="material-symbols-outlined text-xl md:mr-2">flag</span>
          <span className="hidden md:inline">{isFlagged ? 'Flagged' : 'Flag'}</span>
        </button>
      </div>
      
      <div className="flex items-center gap-3">
        {needsCheck ? (
          <button 
            onClick={onNext}
            className="flex items-center px-6 py-2.5 bg-correct hover:bg-correct/90 text-bg rounded-lg font-bold shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined mr-2">check_circle</span>
            Check Answer
          </button>
        ) : (
          isLast ? (
            <button 
              onClick={onSubmit}
              className="flex items-center px-6 py-2.5 bg-primary-container hover:bg-primary-container/90 text-on-surface rounded-lg font-bold shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Finish Exam
              <span className="material-symbols-outlined ml-2">task_alt</span>
            </button>
          ) : (
            <button 
              onClick={onNext}
              disabled={!hasAnswered && mode === 'exam'}
              className="flex items-center px-6 py-2.5 bg-primary-container hover:bg-primary-container/90 disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed text-on-surface rounded-lg font-bold shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Next
              <span className="material-symbols-outlined ml-2">arrow_forward</span>
            </button>
          )
        )}
      </div>
    </div>
  );
};
