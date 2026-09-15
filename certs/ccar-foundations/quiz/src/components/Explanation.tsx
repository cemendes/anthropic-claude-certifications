import type { Question } from '../types';

interface Props {
  question: Question;
}

/**
 * Parse text containing markdown-style code blocks (```lang\n...\n```)
 * into segments of plain text and code blocks.
 */
function parseExplanation(text: string): Array<{ type: 'text' | 'code'; content: string; lang?: string }> {
  const segments: Array<{ type: 'text' | 'code'; content: string; lang?: string }> = [];
  // Split on code fence boundaries: ```lang\n...\n```
  const parts = text.split(/(```\w*\n[\s\S]*?```)/g);

  for (const part of parts) {
    if (!part) continue;
    const codeMatch = part.match(/^```(\w*)\n([\s\S]*?)```$/);
    if (codeMatch) {
      segments.push({ type: 'code', content: codeMatch[2].trimEnd(), lang: codeMatch[1] || 'text' });
    } else {
      segments.push({ type: 'text', content: part });
    }
  }
  return segments;
}

/** Render inline backtick code (`code`) within text */
function renderInlineCode(text: string): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    const inlineMatch = part.match(/^`([^`]+)`$/);
    if (inlineMatch) {
      return (
        <code key={i} className="bg-bg px-1.5 py-0.5 rounded text-primary text-[13px] font-mono">
          {inlineMatch[1]}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export const Explanation: React.FC<Props> = ({ question }) => {
  // Normalize escaped newlines from the data files
  const rawExplanation = question.explanation
    .replace(/\\n/g, '\n')
    .replace(/\\'/g, "'");

  const segments = parseExplanation(rawExplanation);

  return (
    <div className="bg-card-2 border border-border border-t-[3px] border-t-correct rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] overflow-hidden lg:h-full lg:flex lg:flex-col">
      <div className="p-4 sm:p-5 flex flex-col gap-4 lg:overflow-y-auto lg:flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-correct">
            <span className="material-symbols-outlined text-lg">lightbulb</span>
            <h3 className="text-base font-bold">Explanation</h3>
          </div>
          <span className="px-2 py-0.5 rounded bg-correct/15 text-correct text-[11px] font-bold">
            Answer: {question.correctAnswer}
          </span>
        </div>
        
        <div className="flex flex-col gap-3">
          {question.keyConcept && (
            <div className="bg-bg/80 border border-primary/25 rounded-lg px-3.5 py-2.5 flex flex-col gap-1 shadow-inner">
              <span className="font-bold text-primary text-[11px] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                Key Concept
              </span>
              <span className="font-semibold text-on-surface text-[13px] leading-snug">
                {renderInlineCode(question.keyConcept)}
              </span>
            </div>
          )}

          <div className="text-on-surface-variant text-[13px] sm:text-[13.5px] leading-relaxed space-y-3">
            {segments.map((seg, i) => {
              if (seg.type === 'code') {
                return (
                  <div key={i} className="rounded-lg overflow-hidden border border-border my-2.5">
                    {seg.lang && seg.lang !== 'text' && (
                      <div className="bg-bg px-3 py-1 text-[10px] text-on-surface-variant uppercase tracking-wider font-mono border-b border-border">
                        {seg.lang}
                      </div>
                    )}
                    <pre className="bg-bg p-3 overflow-x-auto text-[12px] leading-relaxed">
                      <code className="text-primary font-mono whitespace-pre">{seg.content}</code>
                    </pre>
                  </div>
                );
              }
              // Text segments — split into paragraphs
              return seg.content.split('\n\n').filter(p => p.trim()).map((para, j) => (
                <p key={`${i}-${j}`}>{renderInlineCode(para.trim())}</p>
              ));
            })}
          </div>
        </div>

        {Object.keys(question.distractorAnalysis).length > 0 && (
          <div className="pt-2 border-t border-border/60">
            <h4 className="font-bold text-incorrect text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px]">warning</span>
              Distractor Analysis
            </h4>
            <ul className="flex flex-col gap-2">
              {Object.entries(question.distractorAnalysis).map(([key, analysis]) => (
                <li key={key} className="flex gap-2.5 text-[12.5px] sm:text-[13px] text-on-surface-variant leading-snug">
                  <span className="font-bold text-on-surface min-w-[18px]">{key}:</span>
                  <span>{renderInlineCode(
                    (analysis as string).replace(/\\n/g, '\n').replace(/\\'/g, "'")
                  )}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {question.references && question.references.length > 0 && (
          <div className="pt-3 border-t border-border/60">
            <h4 className="font-bold text-on-surface text-xs uppercase tracking-wider mb-2">References</h4>
            <div className="flex flex-col gap-1.5">
              {question.references.map((ref, i) => (
                <a 
                  key={i} 
                  href={ref.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs sm:text-[13px] text-primary hover:text-primary-container transition-colors w-fit"
                >
                  <span className="material-symbols-outlined text-[15px]">link</span>
                  {ref.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
