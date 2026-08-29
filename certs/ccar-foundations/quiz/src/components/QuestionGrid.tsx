import type { QuizState } from '../types';

interface Props {
  state: QuizState;
  onJump: (index: number) => void;
}

export const QuestionGrid: React.FC<Props> = ({ state, onJump }) => {
  return (
    <div className="bg-card-1 border border-border rounded-xl p-5 shadow-lg flex flex-col gap-4">
      <h3 className="font-bold text-on-surface flex items-center gap-2 text-sm uppercase tracking-wider">
        <span className="material-symbols-outlined text-[18px]">grid_view</span>
        Questions Map
      </h3>
      
      <div className="grid grid-cols-5 gap-2">
        {state.questions.map((q, idx) => {
          const isAnswered = !!state.answers[q.id];
          const isFlagged = state.flagged.has(q.id);
          const isCurrent = state.currentIndex === idx;
          
          let className = "w-full aspect-square rounded-md flex items-center justify-center text-xs font-medium cursor-pointer transition-all hover:brightness-110 ";
          
          if (isCurrent) {
            className += "ring-2 ring-primary ring-offset-2 ring-offset-card-1 ";
          }
          
          if (isFlagged) {
            className += "bg-tertiary text-bg";
          } else if (isAnswered) {
            className += "bg-primary-container text-on-surface";
          } else {
            className += "bg-card-2 text-on-surface-variant hover:bg-outline-variant";
          }
          
          return (
            <div 
              key={q.id} 
              className={className}
              onClick={() => onJump(idx)}
              title={`Question ${idx + 1}`}
            >
              {idx + 1}
            </div>
          );
        })}
      </div>
      
      <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-border text-xs text-on-surface-variant font-medium">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-primary-container"></div>
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-tertiary"></div>
          <span>Flagged</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-card-2 border border-outline-variant"></div>
          <span>Unanswered</span>
        </div>
      </div>
    </div>
  );
};
