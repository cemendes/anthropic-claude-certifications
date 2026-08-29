import { useState, useCallback, useEffect, useMemo } from 'react';
import type { QuizMode, QuizState } from '../types';
import { questions as allQuestions } from '../data/questions';

const STORAGE_KEY_SESSION = 'ccar_quiz_active_session_v1';
const STORAGE_KEY_STATS = 'ccar_quiz_global_stats_v1';

interface StoredSession {
  mode: QuizMode;
  currentIndex: number;
  answers: Record<number, string>;
  flagged: number[];
  showExplanation: boolean;
  submitted: boolean;
  selectedDomains: number[];
  questions: number[]; // question IDs
}

interface GlobalStats {
  answeredMap: Record<number, { selected: string; correct: boolean; timestamp: number }>;
  lastSession: number | null;
}

function loadInitialState(): QuizState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_SESSION);
    if (raw) {
      const parsed: StoredSession = JSON.parse(raw);
      if (parsed && parsed.mode) {
        // Hydrate full question objects from IDs
        const questionMap = new Map(allQuestions.map(q => [q.id, q]));
        const hydratedQuestions = (parsed.questions || [])
          .map(id => questionMap.get(id))
          .filter(Boolean) as typeof allQuestions;

        if (hydratedQuestions.length > 0) {
          return {
            mode: parsed.mode,
            currentIndex: Math.min(parsed.currentIndex || 0, hydratedQuestions.length - 1),
            answers: parsed.answers || {},
            flagged: new Set(parsed.flagged || []),
            showExplanation: !!parsed.showExplanation,
            submitted: !!parsed.submitted,
            selectedDomains: parsed.selectedDomains || [1, 2, 3, 4, 5],
            questions: hydratedQuestions,
          };
        }
      }
    }
  } catch (err) {
    console.error('Failed to load active quiz session:', err);
  }

  return {
    mode: null,
    currentIndex: 0,
    answers: {},
    flagged: new Set(),
    showExplanation: false,
    submitted: false,
    selectedDomains: [1, 2, 3, 4, 5],
    questions: [],
  };
}

function loadGlobalStats(): GlobalStats {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_STATS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load global stats:', err);
  }
  return { answeredMap: {}, lastSession: null };
}

export function useQuiz() {
  const [state, setState] = useState<QuizState>(loadInitialState);
  const [globalStats, setGlobalStats] = useState<GlobalStats>(loadGlobalStats);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    try {
      if (state.mode === null) {
        window.localStorage.removeItem(STORAGE_KEY_SESSION);
      } else {
        const sessionData: StoredSession = {
          mode: state.mode,
          currentIndex: state.currentIndex,
          answers: state.answers,
          flagged: Array.from(state.flagged),
          showExplanation: state.showExplanation,
          submitted: state.submitted,
          selectedDomains: state.selectedDomains,
          questions: state.questions.map(q => q.id),
        };
        window.localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(sessionData));
      }
    } catch (err) {
      console.error('Failed to persist active quiz session:', err);
    }
  }, [state]);

  // Compute aggregate stats for landing screen
  const stats = useMemo(() => {
    const records = Object.values(globalStats.answeredMap);
    const totalAnswered = records.length;
    const correctCount = records.filter(r => r.correct).length;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    return {
      totalAnswered,
      accuracy,
      lastSession: globalStats.lastSession ? new Date(globalStats.lastSession) : null,
    };
  }, [globalStats]);

  const startQuiz = useCallback((mode: QuizMode, domains: number[] = [1, 2, 3, 4, 5]) => {
    let selectedQuestions = [...allQuestions];
    
    if (mode === 'study') {
      selectedQuestions = selectedQuestions.filter(q => domains.includes(q.domain));
    } else if (mode === 'exam') {
      // 60 random questions for exam simulation
      selectedQuestions = selectedQuestions.sort(() => 0.5 - Math.random()).slice(0, 60);
    } else if (mode === 'review') {
      // In review mode, load all questions so ReviewPanel can filter flagged
      selectedQuestions = [...allQuestions];
    }
    
    setState({
      mode,
      currentIndex: 0,
      answers: {},
      flagged: state.flagged, // retain existing flagged questions
      showExplanation: false,
      submitted: false,
      selectedDomains: domains,
      questions: selectedQuestions,
    });
  }, [state.flagged]);

  const selectAnswer = useCallback((answer: string) => {
    setState(prev => {
      const currentQ = prev.questions[prev.currentIndex];
      if (!currentQ) return prev;

      const newAnswers = { ...prev.answers, [currentQ.id]: answer };
      const isCorrect = currentQ.correctAnswer === answer;

      // Update global lifetime stats
      setGlobalStats(curr => {
        const updated = {
          ...curr,
          lastSession: Date.now(),
          answeredMap: {
            ...curr.answeredMap,
            [currentQ.id]: {
              selected: answer,
              correct: isCorrect,
              timestamp: Date.now(),
            },
          },
        };
        try {
          window.localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        return updated;
      });

      return {
        ...prev,
        answers: newAnswers,
      };
    });
  }, []);

  const toggleFlag = useCallback((questionId: number) => {
    setState(prev => {
      const newFlagged = new Set(prev.flagged);
      if (newFlagged.has(questionId)) {
        newFlagged.delete(questionId);
      } else {
        newFlagged.add(questionId);
      }
      return { ...prev, flagged: newFlagged };
    });
  }, []);

  const clearAllFlags = useCallback(() => {
    setState(prev => ({ ...prev, flagged: new Set() }));
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      const currentQ = prev.questions[prev.currentIndex];
      // In study mode: First click on Check Answer reveals explanation; second click moves to next
      if (prev.mode === 'study' && !prev.showExplanation && currentQ && prev.answers[currentQ.id]) {
        return { ...prev, showExplanation: true };
      }
      const nextIndex = Math.min(prev.currentIndex + 1, prev.questions.length - 1);
      const nextQ = prev.questions[nextIndex];
      const hasAnsweredNext = nextQ ? !!prev.answers[nextQ.id] : false;
      return {
        ...prev,
        currentIndex: nextIndex,
        showExplanation: prev.mode === 'study' && hasAnsweredNext,
      };
    });
  }, []);

  const prevQuestion = useCallback(() => {
    setState(prev => {
      const prevIndex = Math.max(prev.currentIndex - 1, 0);
      const prevQ = prev.questions[prevIndex];
      const hasAnsweredPrev = prevQ ? !!prev.answers[prevQ.id] : false;
      return {
        ...prev,
        currentIndex: prevIndex,
        showExplanation: prev.mode === 'study' && hasAnsweredPrev,
      };
    });
  }, []);

  const jumpToQuestion = useCallback((index: number) => {
    setState(prev => {
      const targetQ = prev.questions[index];
      const hasAnsweredTarget = targetQ ? !!prev.answers[targetQ.id] : false;
      return {
        ...prev,
        currentIndex: index,
        showExplanation: prev.mode === 'study' && hasAnsweredTarget,
      };
    });
  }, []);

  const submitQuiz = useCallback(() => {
    setState(prev => ({ ...prev, submitted: true }));
  }, []);

  const resetQuiz = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY_SESSION);
    setState({
      mode: null,
      currentIndex: 0,
      answers: {},
      flagged: state.flagged,
      showExplanation: false,
      submitted: false,
      selectedDomains: [1, 2, 3, 4, 5],
      questions: [],
    });
  }, [state.flagged]);

  return {
    state,
    stats,
    startQuiz,
    selectAnswer,
    toggleFlag,
    clearAllFlags,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
    submitQuiz,
    resetQuiz,
  };
}
