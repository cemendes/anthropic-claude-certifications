import type { Question } from '../types';

interface Props {
  question: Question;
  selectedAnswer?: string;
  onSelect: (answer: string) => void;
  showFeedback: boolean;
}

export const QuestionCard: React.FC<Props> = ({ question, selectedAnswer, onSelect, showFeedback }) => {
  return (
    <div className="bg-card-1 border border-border rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden relative">
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary-container/30"></div>

      <div className="p-6 md:p-8 flex flex-col gap-6">
        <div className="flex items-center">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
            ${question.domain === 1 ? 'bg-domain-1/10 text-domain-1' : ''}
            ${question.domain === 2 ? 'bg-domain-2/10 text-domain-2' : ''}
            ${question.domain === 3 ? 'bg-domain-3/10 text-domain-3' : ''}
            ${question.domain === 4 ? 'bg-domain-4/10 text-domain-4' : ''}
            ${question.domain === 5 ? 'bg-domain-5/10 text-domain-5' : ''}
          `}>
            <span className="material-symbols-outlined text-[14px]">category</span>
            D{question.domain}: {question.domainName}
          </div>
        </div>

        <div className="bg-bg border border-border rounded-lg p-5">
          <p className="text-on-surface-variant text-sm mb-2 font-semibold tracking-wide uppercase">Scenario</p>
          <p className="text-on-surface leading-relaxed">{question.scenario}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-on-surface leading-relaxed mb-6">{question.question}</h3>
          <div className="flex flex-col gap-3">
            {question.options.map((opt) => {
              const isSelected = selectedAnswer === opt.label;
              const isCorrect = showFeedback && opt.label === question.correctAnswer;
              const isWrong = showFeedback && isSelected && !isCorrect;
              
              let containerClass = "flex items-start gap-4 p-4 rounded-lg border transition-all cursor-pointer ";
              
              if (showFeedback) {
                if (isCorrect) {
                  containerClass += "border-correct bg-correct/5";
                } else if (isWrong) {
                  containerClass += "border-incorrect bg-incorrect/5 opacity-70";
                } else {
                  containerClass += "border-border opacity-70";
                }
              } else {
                if (isSelected) {
                  containerClass += "border-primary-container border-2 bg-primary-container/5";
                } else {
                  containerClass += "border-outline-variant hover:border-primary-container/50 hover:bg-card-2";
                }
              }

              return (
                <label key={opt.label} className={containerClass}>
                  <div className="flex items-center gap-3 w-full">
                    <div className="shrink-0 relative flex items-center justify-center">
                      <input 
                        type="radio" 
                        name={`question-${question.id}`}
                        value={opt.label}
                        checked={isSelected}
                        onChange={() => !showFeedback && onSelect(opt.label)}
                        disabled={showFeedback}
                        className="peer sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${showFeedback ? (isCorrect ? 'border-correct bg-correct' : (isWrong ? 'border-incorrect' : 'border-outline-variant')) : (isSelected ? 'border-primary-container bg-primary-container' : 'border-outline-variant')}
                      `}>
                        {showFeedback && isCorrect && <span className="material-symbols-outlined text-[14px] text-bg font-bold">check</span>}
                        {!showFeedback && isSelected && <div className="w-2.5 h-2.5 rounded-full bg-bg"></div>}
                      </div>
                    </div>
                    <span className="font-semibold w-6 shrink-0">{opt.label}.</span>
                    <span className="flex-1 leading-relaxed text-on-surface">{opt.text}</span>
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
