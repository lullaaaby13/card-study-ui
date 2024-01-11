import {defineStore} from 'pinia';
import {computed, ref} from "vue";
import {CreateWordCardRequest, WordCard} from "src/types/word-card";
import {date} from "quasar";
import {WordCardApi} from "src/api/word-card";

export const useWordCardStore = defineStore('wordCardStore', () => {

  const cards = ref<WordCard[]>([]);

  const fetchAll = async (cardSetId: number) => {
    clear();
    cards.value = await WordCardApi.getCards(cardSetId);
  };

  const save = async (request: CreateWordCardRequest) => {
    const card: WordCard = await WordCardApi.createCard(request);
    cards.value.unshift(card);
  };

  const remove = async (cardId: number) => {
    await WordCardApi.deleteCard(cardId);
    const index = cards.value.findIndex(it => it.id === cardId);
    if (index > -1) {
      cards.value.splice(index, 1);
    }
  };
  const clear = () => {
    cards.value.splice(0, cards.value.length);
  }

  const toStudyCards = computed(() => {
    return cards.value.filter(it => {
      let nextReviewDate = date.extractDate(it.nextReviewDate, 'YYYY-MM-DD HH:mm:ss');
      return nextReviewDate < new Date();
    })
  });

  const findById = (cardId: number): WordCard | undefined => {
    return cards.value.find(it => it.id === cardId);
  }

  const replace = (card: WordCard) => {
    const index = cards.value.findIndex(it => it.id === card.id);
    if (index > -1) {
      cards.value.splice(index, 1, card);
    }
  }

  const update = async (cardId: number, request: { front?: string, back?: string}) => {
    const card = findById(cardId);
    if (card) {
      let updatedCard = await WordCardApi.updateCard(cardId, request);
      replace(updatedCard);
    }
  }

  return {
    cards,
    fetchAll,
    clear,
    save,
    remove,
    toStudyCards,
    update,
  }
});
