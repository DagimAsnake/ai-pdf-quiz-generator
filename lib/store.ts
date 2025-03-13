import { create } from 'zustand';
import { z } from 'zod';
import { questionsSchema } from './schemas';

interface StudySetState {
  title: string;
  questions: z.infer<typeof questionsSchema>;
  stats: {
    flashcardsReviewed: number;
    quizzesTaken: number;
    matchesCompleted: number;
    lastStudied: Date | null;
  };
  setTitle: (title: string) => void;
  setQuestions: (questions: z.infer<typeof questionsSchema>) => void;
  updateStats: (mode: 'flashcards' | 'quiz' | 'match') => void;
  clearStudySet: () => void;
}

export const useStudySetStore = create<StudySetState>((set) => ({
  title: '',
  questions: [],
  stats: {
    flashcardsReviewed: 0,
    quizzesTaken: 0,
    matchesCompleted: 0,
    lastStudied: null,
  },
  setTitle: (title) => set({ title }),
  setQuestions: (questions) => set({ questions }),
  updateStats: (mode) =>
    set((state) => ({
      stats: {
        ...state.stats,
        [mode === 'flashcards'
          ? 'flashcardsReviewed'
          : mode === 'quiz'
          ? 'quizzesTaken'
          : 'matchesCompleted']:
          state.stats[
            mode === 'flashcards'
              ? 'flashcardsReviewed'
              : mode === 'quiz'
              ? 'quizzesTaken'
              : 'matchesCompleted'
          ] + 1,
        lastStudied: new Date(),
      },
    })),
  clearStudySet: () =>
    set({
      title: '',
      questions: [],
    }),
}));
