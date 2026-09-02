import { useQuiz } from './hooks/useQuiz';
import { ModeSelect } from './components/ModeSelect';
import { QuestionCard } from './components/QuestionCard';
import { Explanation } from './components/Explanation';
import { QuestionNav } from './components/QuestionNav';
import { ExamTimer } from './components/ExamTimer';
import { ProgressBar } from './components/ProgressBar';
import { DomainFilter } from './components/DomainFilter';
import { Results } from './components/Results';
import { ReviewPanel } from './components/ReviewPanel';
import { QuestionGrid } from './components/QuestionGrid';

import './styles/global.css';

function App() {
  const { 
    state, stats, setTrack, startQuiz, selectAnswer, toggleFlag, clearAllFlags,
    nextQuestion, prevQuestion, jumpToQuestion, 
    submitQuiz, resetQuiz 
  } = useQuiz();

  const isCCDV = state.track === 'ccdv-f';
  const trackTitle = isCCDV ? 'CCDV-F Practice Quiz' : 'CCAR-F Practice Quiz';

  if (state.mode === null) {
    return (
      <div className="min-h-screen bg-bg text-on-surface">
        <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-outline-variant px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">terminal</span>
            <h1 className="font-semibold text-lg">{trackTitle}</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-card-2 border border-outline-variant flex items-center justify-center">
            <span className="material-symbols-outlined text-sm text-on-surface-variant">person</span>
          </div>
        </header>
        <main className="max-w-[800px] mx-auto p-4 md:p-6 lg:p-8">
          <ModeSelect 
            track={state.track}
            onSelectTrack={setTrack}
            onSelectMode={startQuiz} 
            stats={stats} 
          />
        </main>
      </div>
    );
  }

  if (state.mode === 'review') {
    return (
      <div className="min-h-screen bg-bg text-on-surface">
        <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-outline-variant px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">terminal</span>
            <h1 className="font-semibold text-lg">{trackTitle}</h1>
          </div>
        </header>
        <main className="max-w-[800px] mx-auto p-4 md:p-6 lg:p-8">
          <ReviewPanel 
            state={state} 
            onClearFlags={clearAllFlags} 
            onUnflag={(id) => toggleFlag(id)} 
            onBack={resetQuiz} 
          />
        </main>
      </div>
    );
  }

  if (state.submitted) {
    return (
      <div className="min-h-screen bg-bg text-on-surface">
        <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-outline-variant px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">terminal</span>
            <h1 className="font-semibold text-lg">{trackTitle}</h1>
          </div>
        </header>
        <main className="max-w-[800px] mx-auto p-4 md:p-6 lg:p-8">
          <Results state={state} onReset={resetQuiz} onReview={() => startQuiz('review')} />
        </main>
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentIndex];
  if (!currentQuestion) return null;

  const answeredCount = Object.keys(state.answers).length;

  return (
    <div className="min-h-screen bg-bg text-on-surface">
      <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-outline-variant px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container">terminal</span>
          <h1 className="font-semibold text-lg hidden sm:block">{trackTitle}</h1>
        </div>
        <div className="flex items-center gap-4">
          {state.mode === 'exam' && <ExamTimer totalSeconds={7200} onTimeUp={submitQuiz} />}
          <button 
            className="px-3 py-1.5 rounded-lg border border-outline-variant text-sm font-medium hover:bg-card-2 transition-colors" 
            onClick={resetQuiz}
          >
            Exit
          </button>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {state.mode === 'exam' ? 'Exam Simulation' : 'Study Mode'} ({isCCDV ? 'Developer CCDV-F' : 'Architect CCAR-F'})
          </h2>
        </div>

        <ProgressBar current={answeredCount} total={state.questions.length} />

        <div className="mt-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            <QuestionCard 
              question={currentQuestion}
              selectedAnswer={state.answers[currentQuestion.id]}
              onSelect={selectAnswer}
              showFeedback={state.showExplanation}
            />
            
            {state.showExplanation && (
              <Explanation 
                question={currentQuestion}
              />
            )}

            <QuestionNav 
              currentIndex={state.currentIndex}
              total={state.questions.length}
              isFlagged={state.flagged.has(currentQuestion.id)}
              onPrev={prevQuestion}
              onNext={nextQuestion}
              onToggleFlag={() => toggleFlag(currentQuestion.id)}
              onSubmit={submitQuiz}
              isLast={state.currentIndex === state.questions.length - 1}
              mode={state.mode}
              hasAnswered={!!state.answers[currentQuestion.id]}
              showExplanation={state.showExplanation}
            />
          </div>

          <div className="w-full md:w-64 shrink-0">
            {state.mode === 'study' ? (
              <DomainFilter 
                track={state.track}
                selectedDomains={state.selectedDomains} 
                onChange={(domains) => {
                  resetQuiz();
                  startQuiz('study', domains);
                }} 
              />
            ) : (
              <QuestionGrid state={state} onJump={jumpToQuestion} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
