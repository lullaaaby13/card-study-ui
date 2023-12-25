
export const MemorizationLevel = {
  Difficult: 'Difficult',
  SomewhatDifficult: 'SomewhatDifficult',
  Understand: 'Understand',
  Easy: 'Easy',
  VeryEasy: 'VeryEasy',
  Perfect: 'Perfect',
}

export type MemorizationLevel = typeof MemorizationLevel[keyof typeof MemorizationLevel];

export default interface Card {
  id: number;
  front: string;
  back: string;
  reference?: string;
  memorizationLevel: MemorizationLevel;
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
