import {MemorizationLevelKey} from "src/types/card";

export interface WordCard {
  id: number;
  question: string;
  answer: string;
  memorizationLevel: MemorizationLevelKey;
  nextReviewDate: string;
  createdAt: string;
  updatedAt: string;
}
export const emptyCard: WordCard = {
  id: 0,
  question: '',
  answer: '',
  memorizationLevel: 'Understand',
  nextReviewDate: '',
  createdAt: '',
  updatedAt: '',
}

export interface CreateWordCardRequest {
  cardSetId: number;
  question: string;
  answer: string;
}
