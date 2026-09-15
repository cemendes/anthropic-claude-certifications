import { useState } from 'react';
import { useQuiz } from './hooks/useQuiz';
import { ModeSelect } from './components/ModeSelect';
import { QuestionCard } from './components/QuestionCard';
import { Explanation } from './components/Explanation';
import { QuestionNav } from './components/QuestionNav';
import { ExamTimer } from './components/ExamTimer';
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

  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

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
        <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-outline-variant px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">workspace_premium</span>
            <h1 className="font-semibold text-base sm:text-lg">{getHeaderTitle()}</h1>
          </div>
          <div className="w-7 h-7 rounded-full bg-card-2 border border-outline-variant flex items-center justify-center">
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
        <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-outline-variant px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">workspace_premium</span>
            <h1 className="font-semibold text-base sm:text-lg">{getHeaderTitle()}</h1>
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
        <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-outline-variant px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">workspace_premium</span>
            <h1 className="font-semibold text-base sm:text-lg">{getHeaderTitle()}</h1>
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
  const totalQuestions = state.questions.length;
  const percentage = Math.round(((state.currentIndex + 1) / totalQuestions) * 100) || 0;

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-bg text-on-surface flex flex-col">
      {/* Unified 48px Top Navbar */}
      <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-outline-variant px-3 sm:px-5 h-12 shrink-0 flex items-center justify-between gap-2 relative">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="material-symbols-outlined text-primary-container shrink-0">workspace_premium</span>
          <h1 className="font-semibold text-sm sm:text-base truncate">{getHeaderTitle()}</h1>
          <span className="hidden md:inline text-outline-variant">|</span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-on-surface-variant bg-card-1 px-2.5 py-0.5 rounded-full border border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            {state.mode === 'exam' ? 'Exam Simulation' : 'Study Mode'} • {getModeLabel()}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Compact Progress Pill */}
          <div className="flex items-center gap-2 bg-card-1 border border-border px-2.5 py-1 rounded-lg">
            <span className="text-xs font-semibold text-on-surface whitespace-nowrap">
              Q {state.currentIndex + 1} <span className="text-on-surface-variant font-normal">/ {totalQuestions}</span>
            </span>
            <div className="hidden sm:block w-16 md:w-24 h-1.5 bg-card-2 rounded-full overflow-hidden border border-border/60">
              <div 
                className="h-full bg-primary-container rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="hidden xl:inline text-[11px] font-mono text-on-surface-variant">{percentage}%</span>
          </div>

          {/* Filter Domains / Questions Map Dropdown Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isHeaderMenuOpen 
                  ? 'bg-primary-container/15 border-primary-container text-on-surface' 
                  : 'bg-card-1 border-outline-variant text-on-surface hover:bg-card-2'
              }`}
            >
              <span className="material-symbols-outlined text-[15px] text-primary-container">
                {state.mode === 'study' ? 'filter_list' : 'grid_view'}
              </span>
              <span className="hidden sm:inline">
                {state.mode === 'study' ? 'Filter Domains' : 'Questions Map'}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-card-2 text-[11px] font-semibold text-on-surface-variant">
                {state.mode === 'study' ? `${state.selectedDomains.length}/5` : `${answeredCount}/${totalQuestions}`}
              </span>
              <span className={`material-symbols-outlined text-[15px] text-on-surface-variant transition-transform duration-200 ${isHeaderMenuOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Floating Popover */}
            {isHeaderMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsHeaderMenuOpen(false)} 
                />
                <div className="absolute right-0 top-10 z-50 w-72 sm:w-80 shadow-2xl">
                  {state.mode === 'study' ? (
                    <DomainFilter 
                      track={state.track}
                      selectedDomains={state.selectedDomains} 
                      alwaysExpanded={true}
                      onChange={(domains) => {
                        resetQuiz();
                        startQuiz('study', domains);
                      }} 
                    />
                  ) : (
                    <QuestionGrid 
                      state={state} 
                      alwaysExpanded={true}
                      onJump={(idx) => {
                        jumpToQuestion(idx);
                        setIsHeaderMenuOpen(false);
                      }} 
                    />
                  )}
                </div>
              </>
            )}
          </div>

          {state.mode === 'exam' && (
            <ExamTimer totalSeconds={state.track === 'ccao-f' ? 5400 : 7200} onTimeUp={submitQuiz} />
          )}

          <button 
            className="px-2.5 py-1 rounded-lg border border-outline-variant text-xs font-medium hover:bg-card-2 transition-colors cursor-pointer" 
            onClick={resetQuiz}
          >
            Exit
          </button>
        </div>
      </header>

      {/* Main Split Workspace: locked to 100vh-3rem on Desktop (>= lg) */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-3 sm:px-5 py-3 lg:h-[calc(100vh-3rem)] lg:overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 lg:h-full">
          {/* Left Column: Question Card + Pinned Bottom Nav */}
          <div className="lg:col-span-7 flex flex-col justify-between lg:h-full lg:min-h-0">
            <div className="flex-1 lg:overflow-y-auto lg:pr-1.5 flex flex-col gap-3">
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
            </div>

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

          {/* Right Column (>= lg): Explanation aligned with Scenario or Pre-Answer Context */}
          <div className="hidden lg:flex lg:col-span-5 lg:flex-col lg:h-full lg:min-h-0">
            {state.showExplanation ? (
              <div className="h-full min-h-0 flex flex-col">
                <Explanation 
                  question={currentQuestion}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
                {state.mode === 'study' ? (
                  <DomainFilter 
                    track={state.track}
                    selectedDomains={state.selectedDomains} 
                    alwaysExpanded={true}
                    onChange={(domains) => {
                      resetQuiz();
                      startQuiz('study', domains);
                    }} 
                  />
                ) : (
                  <QuestionGrid 
                    state={state} 
                    alwaysExpanded={true}
                    onJump={jumpToQuestion} 
                  />
                )}

                <div className="bg-card-1/60 border border-border/60 rounded-xl p-4 flex items-start gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary-container text-xl shrink-0 mt-0.5">
                    lightbulb
                  </span>
                  <div className="text-xs leading-relaxed">
                    <p className="font-semibold text-on-surface mb-1">
                      {state.mode === 'study' ? 'Instant Architectural Feedback' : 'Exam Mode Active'}
                    </p>
                    {state.mode === 'study' 
                      ? 'Select an answer choice on the left and click "Check Answer" to reveal the detailed explanation, key concept, and distractor analysis side-by-side.'
                      : 'Select your answer and click "Next" to proceed. Explanations will be available in Review mode after submitting the exam.'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
