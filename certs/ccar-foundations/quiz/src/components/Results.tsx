import React from 'react';
import type { QuizState } from '../types';
import { getTrackDomainNames } from '../hooks/useQuiz';

interface Props {
  state: QuizState;
  onReset: () => void;
  onReview: () => void;
}

const DOMAIN_COLORS: Record<number, string> = {
  1: 'bg-domain-1',
  2: 'bg-domain-2',
  3: 'bg-domain-3',
  4: 'bg-domain-4',
  5: 'bg-domain-5',
};

export const Results: React.FC<Props> = ({ state, onReset, onReview }) => {
  const domainNames = getTrackDomainNames(state.track);
  let score = 0;
  const domainScores: Record<number, { correct: number, total: number }> = {
    1: { correct: 0, total: 0 },
    2: { correct: 0, total: 0 },
    3: { correct: 0, total: 0 },
    4: { correct: 0, total: 0 },
    5: { correct: 0, total: 0 },
  };

  state.questions.forEach(q => {
    if (domainScores[q.domain]) {
      domainScores[q.domain].total += 1;
      if (state.answers[q.id] === q.correctAnswer) {
        score += 1;
        domainScores[q.domain].correct += 1;
      }
    }
  });

  const totalQuestions = state.questions.length || 1;
  const scaledScore = Math.round((score / totalQuestions) * 1000);
  const passed = scaledScore >= 720;
  const maxScore = state.questions.length;

  const weakestDomain = Object.entries(domainScores).reduce((acc, [domain, data]) => {
    const percentage = data.total > 0 ? (data.correct / data.total) : 1;
    if (!acc || percentage < acc.percentage) {
      return { id: parseInt(domain), percentage };
    }
    return acc;
  }, null as { id: number, percentage: number } | null);

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score Card */}
        <div className="bg-card-1 border border-border p-8 rounded-xl shadow-lg flex flex-col items-center justify-center gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-container/5 blur-3xl pointer-events-none"></div>
          <h2 className="text-xl text-on-surface-variant font-medium relative z-10">Final Score</h2>
          <div className="text-5xl font-bold text-on-surface relative z-10">{score} <span className="text-2xl text-on-surface-variant">/ {maxScore}</span></div>
          <div className="text-sm text-on-surface-variant bg-card-2 px-4 py-1.5 rounded-full border border-outline-variant relative z-10">
            Scaled: {scaledScore} / 1000
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-card-1 border border-border p-8 rounded-xl shadow-lg flex flex-col items-center justify-center gap-4">
          <div className={`px-6 py-2 rounded-full text-lg font-bold border-2 ${passed ? 'bg-correct/10 text-correct border-correct/20' : 'bg-incorrect/10 text-incorrect border-incorrect/20'}`}>
            {passed ? 'PASSED' : 'FAILED'}
          </div>
          <div className="text-sm text-on-surface-variant text-center px-4">
            Passing score is 720 / 1000 (72%).
          </div>
        </div>
      </div>

      {/* Domain Performance */}
      <div className="bg-card-1 border border-border rounded-xl shadow-lg p-6 md:p-8">
        <h3 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container">analytics</span>
          Performance by Domain
        </h3>
        
        <div className="flex flex-col gap-6">
          {[1, 2, 3, 4, 5].map(domain => {
            const data = domainScores[domain];
            if (!data || data.total === 0) return null;
            const percentage = Math.round((data.correct / data.total) * 100);
            
            return (
              <div key={domain} className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-on-surface">D{domain}: {domainNames[domain]}</span>
                  <span className="text-on-surface-variant">{percentage}% ({data.correct}/{data.total})</span>
                </div>
                <div className="h-1.5 w-full bg-card-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${DOMAIN_COLORS[domain]}`} 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {weakestDomain && (
          <div className="mt-8 bg-card-2 border border-outline-variant p-4 rounded-lg flex items-start gap-3">
            <span className="material-symbols-outlined text-tertiary">tips_and_updates</span>
            <div>
              <strong className="text-on-surface block mb-1">Recommended Focus</strong>
              <span className="text-sm text-on-surface-variant">Review the {domainNames[weakestDomain.id]} domain before your next attempt.</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
        <button 
          onClick={onReset}
          className="px-6 py-3 rounded-lg border border-outline-variant text-on-surface hover:bg-card-2 font-medium transition-colors"
        >
          Return to Home
        </button>
        <button 
          onClick={onReview}
          className="px-6 py-3 rounded-lg bg-primary-container text-on-surface hover:bg-primary-container/90 font-medium shadow-lg transition-transform hover:-translate-y-0.5"
        >
          Review Incorrect & Flagged
        </button>
      </div>
    </div>
  );
};
