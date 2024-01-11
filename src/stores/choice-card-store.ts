import {defineStore} from 'pinia';
import {computed, ref} from "vue";
import {date} from "quasar";
import {CardSetType} from "src/types/card-set";
import {ChoiceCardApi} from "src/api/choice-card";
import {ChoiceCard, CreateChoiceCardRequest} from "src/types/choice-card";


export const useChoiceCardStore = defineStore('choiceCardStore', () => {

  const cards = ref<ChoiceCard[]>([]);

  const fetchAll = async (cardSetId: number) => {
    clear();
    cards.value = await ChoiceCardApi.getCards(cardSetId);
  };

  const save = async (request: CreateChoiceCardRequest) => {
    const card: ChoiceCard = await ChoiceCardApi.createCard(request);
    cards.value.unshift(card);
  };

  const remove = async (cardId: number) => {
    await ChoiceCardApi.deleteCard(cardId);
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

  const findById = (cardId: number): ChoiceCard | undefined => {
    return cards.value.find(it => it.id === cardId);
  }

  const replace = (card: ChoiceCard) => {
    const index = cards.value.findIndex(it => it.id === card.id);
    if (index > -1) {
      cards.value.splice(index, 1, card);
    }
  }

  const update = async (cardId: number, request: { question?: string, answer?: string}) => {
    const card = findById(cardId);
    if (card) {
      let updatedCard = await ChoiceCardApi.updateCard(cardId, request);
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
