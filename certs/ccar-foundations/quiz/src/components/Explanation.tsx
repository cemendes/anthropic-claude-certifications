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
    <div className="bg-card-2 border border-border border-t-[4px] border-t-correct rounded-xl shadow-lg mt-6 overflow-hidden">
      <div className="p-6 md:p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2 text-correct">
          <span className="material-symbols-outlined text-xl">lightbulb</span>
          <h3 className="text-lg font-bold">Explanation</h3>
        </div>
        
        <div className="flex flex-col gap-4">
          {question.keyConcept && (
            <div className="bg-bg/80 border border-primary/20 rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 shadow-inner">
              <span className="font-bold text-primary text-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                Key Concept:
              </span>
              <span className="font-semibold text-on-surface text-sm leading-snug">
                {renderInlineCode(question.keyConcept)}
              </span>
            </div>
          )}

          <div className="text-on-surface-variant leading-relaxed space-y-4">
            {segments.map((seg, i) => {
              if (seg.type === 'code') {
                return (
                  <div key={i} className="rounded-lg overflow-hidden border border-border my-4">
                    {seg.lang && seg.lang !== 'text' && (
                      <div className="bg-bg px-4 py-1.5 text-[11px] text-on-surface-variant uppercase tracking-wider font-mono border-b border-border">
                        {seg.lang}
                      </div>
                    )}
                    <pre className="bg-bg p-4 overflow-x-auto text-[13px] leading-relaxed">
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
          <div>
            <h4 className="font-bold text-incorrect mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">warning</span>
              Distractor Analysis
            </h4>
            <ul className="flex flex-col gap-3">
              {Object.entries(question.distractorAnalysis).map(([key, analysis]) => (
                <li key={key} className="flex gap-3 text-sm text-on-surface-variant">
                  <span className="font-bold text-on-surface min-w-[20px]">{key}:</span>
                  <span>{renderInlineCode(
                    (analysis as string).replace(/\\n/g, '\n').replace(/\\'/g, "'")
                  )}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {question.references && question.references.length > 0 && (
          <div className="pt-4 border-t border-border">
            <h4 className="font-bold text-on-surface text-sm mb-3">References</h4>
            <div className="flex flex-col gap-2">
              {question.references.map((ref, i) => (
                <a 
                  key={i} 
                  href={ref.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary-container transition-colors w-fit"
                >
                  <span className="material-symbols-outlined text-[16px]">link</span>
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
