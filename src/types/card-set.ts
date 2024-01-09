export interface CardSet {
  id: number;
  name: string;
  description?: string;
  totalCardCount: number;
  toStudyCardCount: number;
  type: CardSetType;
  createdAt: string;
  updatedAt: string;
}

export enum CardSetType {
  WORD = 'WORD',
  CHOICE = 'CHOICE'
}

export const labelOfCardSetType = (type: CardSetType): string => {
  switch (type) {
    case CardSetType.WORD:
      return '단어형';
    case CardSetType.CHOICE:
      return '선다형';
    default:
      return '';
  }
}
