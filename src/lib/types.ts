export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Basic' | 'Advanced';

export type QuestionCategory = 'monday' | 'wednesday';

export type DivisionType = 'div1' | 'div2' | 'div3' | 'div4' | 'all';

export type SolveStatus = 'not_started' | 'attempting' | 'completed';

export interface Question {
  id: string;
  questionSetId: string;
  problemCode: string;
  title: string;
  difficulty: QuestionDifficulty;
  rating?: number;
  tags: string[];
  problemUrl: string;
  editorialUrl?: string;
  category: QuestionCategory;
  division?: 'div1' | 'div2' | 'div3' | 'div4' | 'all';
  position: number;
  successfulSubmissions?: number;
  accuracy?: number;
  points?: number;
  createdAt: string;
}

export interface QuestionSet {
  id: string;
  title: string;
  category: QuestionCategory;
  eventDate: string; // YYYY-MM-DD
  contestCode?: string;
  divisions?: ('div1' | 'div2' | 'div3' | 'div4')[];
  sourceUrl: string;
  externalId: string;
  description?: string;
  questions: Question[];
  createdAt: string;
}

export interface UserProgress {
  questionId: string;
  status: SolveStatus;
  bookmarked: boolean;
  notes?: string;
  completedAt?: string;
  updatedAt: string;
}

export interface SyncLog {
  id: string;
  syncType: 'auto' | 'manual' | 'scraper';
  category: 'all' | 'monday' | 'wednesday';
  status: 'success' | 'warning' | 'error';
  message: string;
  questionsFound: number;
  questionsAdded: number;
  timestamp: string;
}

export interface PlatformStats {
  totalQuestions: number;
  totalMondayQuestions: number;
  totalWednesdayContests: number;
  totalDivisions: number;
  userSolvedCount: number;
  userStreak: number;
  lastSyncTime: string;
}
