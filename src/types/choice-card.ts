import {MemorizationLevelKey} from "src/types/card";

export interface ChoiceCard  {
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
  sequence: number;
  content: string;
  isAnswer: boolean;
}

export interface CreateChoiceCardRequest {
  cardSetId: number;
  question: string;
  choices: Choice[];
  answer: string;
}
