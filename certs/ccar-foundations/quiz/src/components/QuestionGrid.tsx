import React, { useState } from 'react';
import type { QuizState } from '../types';

interface Props {
  state: QuizState;
  onJump: (index: number) => void;
  showExplanation?: boolean;
  alwaysExpanded?: boolean;
}

export const QuestionGrid: React.FC<Props> = ({ state, onJump, showExplanation = false, alwaysExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(alwaysExpanded || !showExplanation);
  const [prevShowExplanation, setPrevShowExplanation] = useState(showExplanation);

  if (!alwaysExpanded && showExplanation !== prevShowExplanation) {
    setPrevShowExplanation(showExplanation);
    if (showExplanation) {
      setIsExpanded(false);
    }
  }

  const expanded = alwaysExpanded || isExpanded;

  return (
    <div className="bg-card-1 border border-border rounded-xl shadow-lg overflow-hidden transition-all">
      {!alwaysExpanded && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between text-on-surface hover:bg-card-2/50 transition-colors cursor-pointer"
          aria-expanded={expanded}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px] text-primary-container">grid_view</span>
            <h3 className="font-bold text-xs uppercase tracking-wider">Questions Map</h3>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-card-2 border border-outline-variant text-[11px] font-medium text-on-surface-variant">
              {Object.keys(state.answers).length}/{state.questions.length}
            </span>
          </div>
          <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>
      )}

      {expanded && (
        <div className={`px-4 pb-4 pt-3 ${!alwaysExpanded ? 'border-t border-border/60' : ''} flex flex-col gap-3`}>
          {alwaysExpanded && (
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary-container">grid_view</span>
                <span className="font-bold text-xs uppercase tracking-wider text-on-surface">Questions Map</span>
              </div>
              <span className="text-[11px] font-medium text-on-surface-variant">
                {Object.keys(state.answers).length} / {state.questions.length} answered
              </span>
            </div>
          )}
          <div className="grid grid-cols-6 sm:grid-cols-7 gap-1.5 max-h-60 overflow-y-auto pr-1">
            {state.questions.map((q, idx) => {
              const isAnswered = !!state.answers[q.id];
              const isFlagged = state.flagged.has(q.id);
              const isCurrent = state.currentIndex === idx;
              
              let className = "w-full aspect-square rounded-md flex items-center justify-center text-[11px] font-semibold cursor-pointer transition-all hover:brightness-110 ";
              
              if (isCurrent) {
                className += "ring-2 ring-primary ring-offset-1 ring-offset-card-1 ";
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
          
          <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[11px] text-on-surface-variant font-medium">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-primary-container"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-tertiary"></div>
              <span>Flagged</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-card-2 border border-outline-variant"></div>
              <span>Unanswered</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
