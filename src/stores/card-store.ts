import {defineStore} from 'pinia';
import {computed, ref} from "vue";
import {Card, CreateCardRequest} from "src/types/card";
import {createCard, deleteCard, getCards, updateCard} from "src/api/card";
import {CardSet} from "src/types/card-set";
import {date} from "quasar";

export const useCardStore = defineStore('cardStore', () => {

  const cards = ref<Card[]>([]);

  const fetchAll = async (cardSetId: number) => {
    clear();
    (await getCards(cardSetId))
      .forEach((card: Card) => {
        cards.value.push(card);
      });
  };

  const save = async (request: CreateCardRequest) => {
    const card: Card = await createCard(request);
    cards.value.unshift(card);
  };

  const remove = async (cardId: number) => {
    await deleteCard(cardId);
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

  const findById = (cardId: number): Card | undefined => {
    return cards.value.find(it => it.id === cardId);
  }

  const replace = (card: Card) => {
    const index = cards.value.findIndex(it => it.id === card.id);
    if (index > -1) {
      cards.value.splice(index, 1, card);
    }
  }

  const update = async (cardId: number, request: { front?: string, back?: string}) => {
    const card = findById(cardId);
    if (card) {
      let updatedCard = await updateCard(cardId, request);
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
