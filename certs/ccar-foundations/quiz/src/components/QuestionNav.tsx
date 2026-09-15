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
    <div className="flex items-center justify-between mt-3 border-t border-border/70 pt-3 shrink-0">
      <div className="flex items-center gap-2.5">
        <button 
          onClick={onPrev} 
          disabled={currentIndex === 0}
          className="flex items-center justify-center w-9 h-9 sm:w-auto sm:px-3.5 sm:py-1.5 rounded-lg border border-outline-variant text-on-surface hover:bg-card-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Previous Question"
        >
          <span className="material-symbols-outlined text-lg sm:mr-1.5">arrow_back</span>
          <span className="hidden sm:inline font-medium text-xs sm:text-sm">Back</span>
        </button>
        
        <button 
          onClick={onToggleFlag}
          className={`flex items-center justify-center w-9 h-9 sm:w-auto sm:px-3.5 sm:py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-colors
            ${isFlagged ? 'border-tertiary bg-tertiary/10 text-tertiary' : 'border-outline-variant text-on-surface hover:bg-card-2'}
          `}
          title={isFlagged ? "Unflag" : "Flag for Review"}
        >
          <span className="material-symbols-outlined text-lg sm:mr-1.5">flag</span>
          <span className="hidden sm:inline">{isFlagged ? 'Flagged' : 'Flag'}</span>
        </button>
      </div>
      
      <div className="flex items-center gap-2.5">
        {needsCheck ? (
          <button 
            onClick={onNext}
            className="flex items-center px-4 py-1.5 bg-correct hover:bg-correct/90 text-bg rounded-lg text-xs sm:text-sm font-bold shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg mr-1.5">check_circle</span>
            Check Answer
          </button>
        ) : (
          isLast ? (
            <button 
              onClick={onSubmit}
              className="flex items-center px-4 py-1.5 bg-primary-container hover:bg-primary-container/90 text-on-surface rounded-lg text-xs sm:text-sm font-bold shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              Finish Exam
              <span className="material-symbols-outlined text-lg ml-1.5">task_alt</span>
            </button>
          ) : (
            <button 
              onClick={onNext}
              disabled={!hasAnswered && mode === 'exam'}
              className="flex items-center px-4 py-1.5 bg-primary-container hover:bg-primary-container/90 disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed text-on-surface rounded-lg text-xs sm:text-sm font-bold shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              Next
              <span className="material-symbols-outlined text-lg ml-1.5">arrow_forward</span>
            </button>
          )
        )}
      </div>
    </div>
  );
};
