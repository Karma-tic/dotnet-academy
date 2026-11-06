import { useState, useEffect, useCallback } from 'react';
import { siteConfig } from '../config/site';

export interface ProgressState {
  version: number;
  completedLessons: string[];
  quizScores: Record<string, number>;
  lastVisitedLesson: string | null;
  bookmarks: string[];
  notes: Record<string, string>;
  mockTestScores: Record<string, { score: number; total: number; timestamp: string }>;
  planner: {
    targetDays: number;
    hoursPerDay: number;
    startDate: string;
  };
  learnerName: string;
}

const DEFAULT_STATE: ProgressState = {
  version: 1,
  completedLessons: [],
  quizScores: {},
  lastVisitedLesson: null,
  bookmarks: [],
  notes: {},
  mockTestScores: {},
  planner: {
    targetDays: 60,
    hoursPerDay: 2,
    startDate: new Date().toISOString().slice(0, 10),
  },
  learnerName: '',
};

const STORAGE_KEY = `${siteConfig.storagePrefix}progress`;

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          return {
            ...DEFAULT_STATE,
            ...parsed,
            planner: { ...DEFAULT_STATE.planner, ...(parsed.planner || {}) },
          };
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored progress, falling back to default', e);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [state]);

  const toggleComplete = useCallback((slug: string) => {
    setState((prev) => {
      const exists = prev.completedLessons.includes(slug);
      const nextCompleted = exists
        ? prev.completedLessons.filter((s) => s !== slug)
        : [...prev.completedLessons, slug];
      return { ...prev, completedLessons: nextCompleted };
    });
  }, []);

  const markComplete = useCallback((slug: string) => {
    setState((prev) => {
      if (prev.completedLessons.includes(slug)) return prev;
      return { ...prev, completedLessons: [...prev.completedLessons, slug] };
    });
  }, []);

  const isCompleted = useCallback((slug: string) => {
    return state.completedLessons.includes(slug);
  }, [state.completedLessons]);

  const recordQuizScore = useCallback((slug: string, score: number) => {
    setState((prev) => {
      const nextScores = { ...prev.quizScores, [slug]: score };
      const nextCompleted = score >= 70 && !prev.completedLessons.includes(slug)
        ? [...prev.completedLessons, slug]
        : prev.completedLessons;
      return { ...prev, quizScores: nextScores, completedLessons: nextCompleted };
    });
  }, []);

  const toggleBookmark = useCallback((slug: string) => {
    setState((prev) => {
      const exists = prev.bookmarks.includes(slug);
      return {
        ...prev,
        bookmarks: exists ? prev.bookmarks.filter((b) => b !== slug) : [...prev.bookmarks, slug],
      };
    });
  }, []);

  const isBookmarked = useCallback((slug: string) => {
    return state.bookmarks.includes(slug);
  }, [state.bookmarks]);

  const saveNote = useCallback((slug: string, note: string) => {
    setState((prev) => ({
      ...prev,
      notes: { ...prev.notes, [slug]: note },
    }));
  }, []);

  const setLastVisited = useCallback((slug: string) => {
    setState((prev) => ({ ...prev, lastVisitedLesson: slug }));
  }, []);

  const setLearnerName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, learnerName: name }));
  }, []);

  const saveMockTestScore = useCallback((testId: string, score: number, total: number) => {
    setState((prev) => ({
      ...prev,
      mockTestScores: {
        ...prev.mockTestScores,
        [testId]: { score, total, timestamp: new Date().toISOString() },
      },
    }));
  }, []);

  const updatePlanner = useCallback((targetDays: number, hoursPerDay: number) => {
    setState((prev) => ({
      ...prev,
      planner: { ...prev.planner, targetDays, hoursPerDay },
    }));
  }, []);

  const exportProgress = useCallback(() => {
    return JSON.stringify(state, null, 2);
  }, [state]);

  const importProgress = useCallback((jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        const validated: ProgressState = {
          version: typeof parsed.version === 'number' ? parsed.version : 1,
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
          quizScores: typeof parsed.quizScores === 'object' && parsed.quizScores ? parsed.quizScores : {},
          lastVisitedLesson: typeof parsed.lastVisitedLesson === 'string' ? parsed.lastVisitedLesson : null,
          bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
          notes: typeof parsed.notes === 'object' && parsed.notes ? parsed.notes : {},
          mockTestScores: typeof parsed.mockTestScores === 'object' && parsed.mockTestScores ? parsed.mockTestScores : {},
          planner: {
            targetDays: parsed.planner?.targetDays || 60,
            hoursPerDay: parsed.planner?.hoursPerDay || 2,
            startDate: parsed.planner?.startDate || new Date().toISOString().slice(0, 10),
          },
          learnerName: typeof parsed.learnerName === 'string' ? parsed.learnerName : '',
        };
        setState(validated);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON for progress import', e);
    }
    return false;
  }, []);

  const resetProgress = useCallback(() => {
    setState(DEFAULT_STATE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing storage', e);
    }
  }, []);

  return {
    state,
    isCompleted,
    toggleComplete,
    markComplete,
    recordQuizScore,
    toggleBookmark,
    isBookmarked,
    saveNote,
    setLastVisited,
    setLearnerName,
    saveMockTestScore,
    updatePlanner,
    exportProgress,
    importProgress,
    resetProgress,
  };
}
