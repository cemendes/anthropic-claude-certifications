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

  const getHeaderTitle = () => {
    if (state.track === 'ccdv-f') return 'CCDV-F Practice Quiz';
    if (state.track === 'ccar-p') return 'CCAR-P Practice Quiz';
    if (state.track === 'ccao-f') return 'CCAO-F Practice Quiz';
    return 'CCAR-F Practice Quiz';
  };

  const getModeLabel = () => {
    if (state.track === 'ccdv-f') return 'Developer CCDV-F';
    if (state.track === 'ccar-p') return 'Architect Professional CCAR-P';
    if (state.track === 'ccao-f') return 'Associate CCAO-F';
    return 'Architect CCAR-F';
  };

  if (state.mode === null) {
    return (
      <div className="min-h-screen bg-bg text-on-surface">
        <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-outline-variant px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">workspace_premium</span>
            <h1 className="font-semibold text-lg">{getHeaderTitle()}</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-card-2 border border-outline-variant flex items-center justify-center">
            <span className="material-symbols-outlined text-sm text-on-surface-variant">person</span>
          </div>
        </header>
        <main className="max-w-[850px] mx-auto p-4 md:p-6 lg:p-8">
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
            <span className="material-symbols-outlined text-primary-container">workspace_premium</span>
            <h1 className="font-semibold text-lg">{getHeaderTitle()}</h1>
          </div>
        </header>
        <main className="max-w-[850px] mx-auto p-4 md:p-6 lg:p-8">
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
            <span className="material-symbols-outlined text-primary-container">workspace_premium</span>
            <h1 className="font-semibold text-lg">{getHeaderTitle()}</h1>
          </div>
        </header>
        <main className="max-w-[850px] mx-auto p-4 md:p-6 lg:p-8">
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
          <span className="material-symbols-outlined text-primary-container">workspace_premium</span>
          <h1 className="font-semibold text-lg hidden sm:block">{getHeaderTitle()}</h1>
        </div>
        <div className="flex items-center gap-4">
          {state.mode === 'exam' && <ExamTimer totalSeconds={state.track === 'ccao-f' ? 5400 : 7200} onTimeUp={submitQuiz} />}
          <button 
            className="px-3 py-1.5 rounded-lg border border-outline-variant text-sm font-medium hover:bg-card-2 transition-colors" 
            onClick={resetQuiz}
          >
            Exit
          </button>
        </div>
      </header>

      <main className={`mx-auto p-4 md:p-6 lg:p-8 transition-all duration-300 ${state.showExplanation ? 'max-w-[850px] lg:max-w-7xl xl:max-w-[1440px]' : 'max-w-[850px] lg:max-w-5xl'}`}>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {state.mode === 'exam' ? 'Exam Simulation' : 'Study Mode'} ({getModeLabel()})
          </h2>
        </div>

        <ProgressBar current={answeredCount} total={state.questions.length} />

        <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0 w-full flex flex-col gap-6">
            <QuestionCard 
              question={currentQuestion}
              selectedAnswer={state.answers[currentQuestion.id]}
              onSelect={selectAnswer}
              showFeedback={state.showExplanation}
            />
            
            {/* Mobile/Tablet (< lg): inline explanation below question */}
            {state.showExplanation && (
              <div className="lg:hidden">
                <Explanation 
                  question={currentQuestion}
                />
              </div>
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

          <div className={`w-full shrink-0 flex flex-col gap-8 ${state.showExplanation ? 'lg:w-[480px] xl:w-[560px] 2xl:w-[620px]' : 'lg:w-72 xl:w-80'}`}>
            {state.mode === 'study' ? (
              <DomainFilter 
                track={state.track}
                selectedDomains={state.selectedDomains} 
                showExplanation={state.showExplanation}
                onChange={(domains) => {
                  resetQuiz();
                  startQuiz('study', domains);
                }} 
              />
            ) : (
              <QuestionGrid 
                state={state} 
                onJump={jumpToQuestion} 
                showExplanation={state.showExplanation}
              />
            )}

            {/* Desktop (>= lg): explanation appears on the right hand side */}
            {state.showExplanation && (
              <div className="hidden lg:block lg:sticky lg:top-20">
                <Explanation 
                  question={currentQuestion}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
