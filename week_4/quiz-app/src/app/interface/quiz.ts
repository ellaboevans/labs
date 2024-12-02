export interface Quiz {
  title: string;
  icon?: string;
  id: string;
  questions: Question[];
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface QuizState {
  subjectId: string | null;
  currentIndex: number;
  selectedOptionIndices: number[];
}

export type SubjectType = Pick<Quiz, 'id' | 'title' | 'icon' | 'questions'>;
