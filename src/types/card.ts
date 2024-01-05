export const MemorizationLevel = {
  Difficult:{
    label: '어려움',
    value:  'Difficult',
  },
  SomewhatDifficult:{
    label: '다소 어려움',
    value:  'SomewhatDifficult',
  },
  Understand:{
    label: '이해함',
    value:  'Understand',
  },
  Easy:{
    label: '쉬움',
    value:  'Easy',
  },
  VeryEasy:{
    label: '매우 쉬움',
    value:  'VeryEasy',
  },
  Perfect:{
    label: '완벽함',
    value:  'Perfect',
  },
}

export type MemorizationLevel = typeof MemorizationLevel[keyof typeof MemorizationLevel];
export type MemorizationLevelKey = keyof typeof MemorizationLevel;

export interface Card {
  id: number;
  front: string;
  back: string;
  reference?: string;
  memorizationLevel: MemorizationLevelKey;
  nextReviewDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCardRequest {
  front: string;
  back: string;
  reference?: string;
  cardSetId: number;
}

export const emptyCard: Card = {
  id: 0,
  front: '',
  back: '',
  memorizationLevel: 'Understand',
  nextReviewDate: '',
  createdAt: '',
  updatedAt: '',
}

export interface ChoiceTypeCard {
  id: number;
  question: string;
  choices: Choice[];
  answer: string;
  memorizationLevel: MemorizationLevelKey;
  nextReviewDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Choice {
  order: number;
  value: string;
  isCorrect: boolean;
}
