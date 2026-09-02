import { useState, useCallback, useEffect, useMemo } from 'react';
import type { QuizMode, QuizState, TrackType, Question } from '../types';
import { questions as ccarQuestions, DOMAIN_NAMES as CCAR_DOMAINS } from '../data/questions';
import { ccdvQuestions, CCDV_DOMAIN_NAMES } from '../data/questions-ccdv';

const STORAGE_KEY_SESSION = 'anthropic_quiz_active_session_v2';
const STORAGE_KEY_STATS = 'anthropic_quiz_global_stats_v2';

interface StoredSession {
  track: TrackType;
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

function getTrackQuestions(track: TrackType): Question[] {
  return track === 'ccdv-f' ? ccdvQuestions : ccarQuestions;
}

export function getTrackDomainNames(track: TrackType): Record<number, string> {
  return track === 'ccdv-f' ? CCDV_DOMAIN_NAMES : CCAR_DOMAINS;
}

function loadInitialState(): QuizState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_SESSION);
    if (raw) {
      const parsed: StoredSession = JSON.parse(raw);
      if (parsed && parsed.mode) {
        const track = parsed.track || 'ccar-f';
        const allQuestions = getTrackQuestions(track);
        const questionMap = new Map(allQuestions.map(q => [q.id, q]));
        const hydratedQuestions = (parsed.questions || [])
          .map(id => questionMap.get(id))
          .filter(Boolean) as Question[];

        if (hydratedQuestions.length > 0) {
          return {
            track,
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
    track: 'ccar-f',
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
          track: state.track,
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

  const setTrack = useCallback((track: TrackType) => {
    setState(prev => ({
      ...prev,
      track,
      mode: null,
      currentIndex: 0,
      answers: {},
      showExplanation: false,
      submitted: false,
      questions: [],
    }));
  }, []);

  const stats = useMemo(() => {
    const allQuestions = getTrackQuestions(state.track);
    const questionIds = new Set(allQuestions.map(q => q.id));
    const relevantAnswers = Object.entries(globalStats.answeredMap)
      .filter(([id]) => questionIds.has(Number(id)))
      .map(([, rec]) => rec);
      
    const totalAnswered = relevantAnswers.length;
    const correctCount = relevantAnswers.filter(r => r.correct).length;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    return {
      totalAnswered,
      accuracy,
      lastSession: globalStats.lastSession ? new Date(globalStats.lastSession) : null,
    };
  }, [globalStats, state.track]);

  const startQuiz = useCallback((mode: QuizMode, domains: number[] = [1, 2, 3, 4, 5]) => {
    const allQuestions = getTrackQuestions(state.track);
    let selectedQuestions = [...allQuestions];
    
    if (mode === 'study') {
      selectedQuestions = selectedQuestions.filter(q => domains.includes(q.domain));
    } else if (mode === 'exam') {
      selectedQuestions = selectedQuestions.sort(() => 0.5 - Math.random()).slice(0, 60);
    } else if (mode === 'review') {
      selectedQuestions = [...allQuestions];
    }
    
    setState(prev => ({
      ...prev,
      mode,
      currentIndex: 0,
      answers: {},
      flagged: prev.flagged,
      showExplanation: false,
      submitted: false,
      selectedDomains: domains,
      questions: selectedQuestions,
    }));
  }, [state.track]);

  const selectAnswer = useCallback((answer: string) => {
    setState(prev => {
      const currentQ = prev.questions[prev.currentIndex];
      if (!currentQ) return prev;

      const newAnswers = { ...prev.answers, [currentQ.id]: answer };
      const isCorrect = currentQ.correctAnswer === answer;

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
    setState(prev => ({
      ...prev,
      mode: null,
      currentIndex: 0,
      answers: {},
      flagged: prev.flagged,
      showExplanation: false,
      submitted: false,
      selectedDomains: [1, 2, 3, 4, 5],
      questions: [],
    }));
  }, []);

  return {
    state,
    stats,
    setTrack,
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
