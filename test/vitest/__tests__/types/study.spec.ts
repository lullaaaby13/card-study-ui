import {beforeEach, describe, expect, it} from "vitest";
import {WordCard} from "src/types/word-card";
import {Bucket} from "src/types/study";

const cards: WordCard[] = [
  {
    id: 1,
    question: 'Apple',
    answer: '사과',
    memorizationLevel: 'Difficult',
    nextReviewDate: '2023-12-25 00:00:00',
    createdAt: '2023-12-25 00:00:00',
    updatedAt: '2023-12-25 00:00:00',
  },
  {
    id: 2,
    question: 'Banana',
    answer: '바나나',
    memorizationLevel: 'Difficult',
    nextReviewDate: '2023-12-25 00:00:00',
    createdAt: '2023-12-25 00:00:00',
    updatedAt: '2023-12-25 00:00:00',
  },
  {
    id: 3,
    question: 'Citron',
    answer: '유자',
    memorizationLevel: 'Difficult',
    nextReviewDate: '2023-12-25 00:00:00',
    createdAt: '2023-12-25 00:00:00',
    updatedAt: '2023-12-25 00:00:00',
  },
];

describe('Bucket', () => {

  let bucket = new Bucket();

  beforeEach(() => {
    bucket.load(cards);
  });

  it('생성', async () => {
    expect(bucket).toBeDefined();
  });

  it('댜음 카드', async () => {
    expect(bucket.nextCard()?.id).toEqual(1);
    expect(bucket.nextCard()?.id).toEqual(2);
    expect(bucket.nextCard()?.id).toEqual(3);
    expect(bucket.nextCard()?.id).toEqual(1);
  });

  it('제거 후 댜음 카드', async () => {
    bucket.removeCard(bucket.nextCard()!);
    expect(bucket.nextCard()?.id).toEqual(2);
  });

  it('제거 후 댜음 카드 2', async () => {
    bucket.removeCard(bucket.nextCard()!);
    bucket.removeCard(bucket.nextCard()!);
    expect(bucket.nextCard()?.id).toEqual(3);
    expect(bucket.nextCard()?.id).toEqual(3);
  });

  it('제거 후 댜음 카드 3', async () => {
    bucket.nextCard();
    bucket.nextCard();
    bucket.removeCard(bucket.nextCard()!);
    expect(bucket.nextCard()?.id).toEqual(1);
  });

  it('모두 제거', async () => {
    bucket.removeCard(bucket.nextCard()!);
    bucket.removeCard(bucket.nextCard()!);
    bucket.removeCard(bucket.nextCard()!);
    expect(bucket.nextCard()).toBeUndefined();
  });

});
