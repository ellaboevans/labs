export interface Quiz {
  title: string;
  icon: string | null;
  id: string;
  questions: Question[];
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export type SubjectType = Pick<Quiz, 'id' | 'title' | 'icon'>;
