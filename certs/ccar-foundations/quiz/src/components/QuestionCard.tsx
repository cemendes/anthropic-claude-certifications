import type { Question } from '../types';

interface Props {
  question: Question;
  selectedAnswer?: string;
  onSelect: (answer: string) => void;
  showFeedback: boolean;
}

export const QuestionCard: React.FC<Props> = ({ question, selectedAnswer, onSelect, showFeedback }) => {
  return (
    <div className="bg-card-1 border border-border rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] overflow-hidden relative">
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary-container/40"></div>

      <div className="p-4 sm:p-5 flex flex-col gap-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold
            ${question.domain === 1 ? 'bg-domain-1/10 text-domain-1' : ''}
            ${question.domain === 2 ? 'bg-domain-2/10 text-domain-2' : ''}
            ${question.domain === 3 ? 'bg-domain-3/10 text-domain-3' : ''}
            ${question.domain === 4 ? 'bg-domain-4/10 text-domain-4' : ''}
            ${question.domain === 5 ? 'bg-domain-5/10 text-domain-5' : ''}
          `}>
            <span className="material-symbols-outlined text-[13px]">category</span>
            D{question.domain}: {question.domainName}
          </div>
          <span className="text-[11px] font-mono text-on-surface-variant">#{question.id}</span>
        </div>

        {/* De-boxed Scenario with sleek left-accent border callout */}
        <div className="border-l-2 border-primary-container pl-3.5 py-0.5 my-0.5">
          <p className="text-primary text-[11px] mb-1 font-bold tracking-wider uppercase">Scenario</p>
          <p className="text-on-surface/95 text-[13px] sm:text-[13.5px] leading-relaxed">{question.scenario}</p>
        </div>

        <div>
          <h3 className="text-[15px] sm:text-base font-semibold text-on-surface leading-snug mb-3">{question.question}</h3>
          <div className="flex flex-col gap-2">
            {question.options.map((opt) => {
              const isSelected = selectedAnswer === opt.label;
              const isCorrect = showFeedback && opt.label === question.correctAnswer;
              const isWrong = showFeedback && isSelected && !isCorrect;
              
              let containerClass = "flex items-start gap-3 py-2.5 px-3.5 rounded-lg border transition-all cursor-pointer ";
              
              if (showFeedback) {
                if (isCorrect) {
                  containerClass += "border-correct bg-correct/10";
                } else if (isWrong) {
                  containerClass += "border-incorrect bg-incorrect/10 opacity-75";
                } else {
                  containerClass += "border-border/70 opacity-65";
                }
              } else {
                if (isSelected) {
                  containerClass += "border-primary-container bg-primary-container/10 shadow-sm";
                } else {
                  containerClass += "border-outline-variant/80 hover:border-primary-container/50 hover:bg-card-2/70";
                }
              }

              return (
                <label key={opt.label} className={containerClass}>
                  <div className="flex items-start gap-2.5 w-full">
                    <div className="shrink-0 relative flex items-center justify-center mt-0.5">
                      <input 
                        type="radio" 
                        name={`question-${question.id}`}
                        value={opt.label}
                        checked={isSelected}
                        onChange={() => !showFeedback && onSelect(opt.label)}
                        disabled={showFeedback}
                        className="peer sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                        ${showFeedback ? (isCorrect ? 'border-correct bg-correct' : (isWrong ? 'border-incorrect' : 'border-outline-variant')) : (isSelected ? 'border-primary-container bg-primary-container' : 'border-outline-variant')}
                      `}>
                        {showFeedback && isCorrect && <span className="material-symbols-outlined text-[11px] text-bg font-bold">check</span>}
                        {!showFeedback && isSelected && <div className="w-2 h-2 rounded-full bg-bg"></div>}
                      </div>
                    </div>
                    <span className="font-semibold text-[13px] w-4 shrink-0 text-on-surface-variant">{opt.label}.</span>
                    <span className="flex-1 text-[13px] sm:text-[13.5px] leading-snug text-on-surface">{opt.text}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
