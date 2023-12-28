export default interface CardSet {
  id: number;
  name: string;
  description?: string;
  totalCardCount: number;
  toStudyCardCount: number;
  createdAt: string;
  updatedAt: string;
}
