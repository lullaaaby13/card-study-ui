import { defineStore } from 'pinia';
import {ref} from "vue";
import {WordCard, MemorizationLevelKey} from "src/types/word-card";
import {Bucket} from "src/types/study";

export const useStudyCardStore = defineStore('studyCardStore', () => {
  const cards = ref<WordCard[]>([
    // {
    //   id: 1,
    //   front: 'Apple',
    //   back: '사과',
    //   memorizationLevel: 'Difficult',
    //   nextReviewDate: '2023-12-25 00:00:00',
    //   createdAt: '2023-12-25 00:00:00',
    //   updatedAt: '2023-12-25 00:00:00',
    // },
    // {
    //   id: 2,
    //   front: 'Banana',
    //   back: '바나나',
    //   memorizationLevel: 'Difficult',
    //   nextReviewDate: '2023-12-25 00:00:00',
    //   createdAt: '2023-12-25 00:00:00',
    //   updatedAt: '2023-12-25 00:00:00',
    // },
    // {
    //   id: 3,
    //   front: 'Citron',
    //   back: '유자',
    //   memorizationLevel: 'Difficult',
    //   nextReviewDate: '2023-12-25 00:00:00',
    //   createdAt: '2023-12-25 00:00:00',
    //   updatedAt: '2023-12-25 00:00:00',
    // },
  ]);
  const bucket = ref<Bucket>(new Bucket());


  const load = (toStudyCards: WordCard[]) => {
    clear();
    toStudyCards.forEach((card: WordCard) => {
      cards.value.push(card);
    });
  }

  const initializeBucket = () => {
    bucket.value.load(cards.value.slice(0, 7));
  };
  const clear = () => {
    cards.value.splice(0, cards.value.length);
    bucket.value.clear();
  }

  const remove = (card: WordCard) => {
    const index = cards.value.findIndex((c: WordCard) => c.id === card.id);
    if (index !== -1) {
      cards.value.splice(index, 1);
    }

    bucket.value.removeCard(card);
  };

  const nextCard = (): WordCard | undefined => {
    return bucket.value.nextCard();
  }

  const isBucketEmpty = () => {
    return bucket.value.isEmpty();
  }

  const isEmpty = () => {
    return cards.value.length === 0;
  }

  return {
    cards,
    bucket,
    load,
    clear,
    initializeBucket,
    remove,
    nextCard,
    isBucketEmpty,
    isEmpty,
  }
});
