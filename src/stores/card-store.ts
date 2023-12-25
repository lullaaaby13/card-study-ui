import {defineStore} from 'pinia';
import {ref} from "vue";
import Card, {CreateCardRequest} from "src/types/card";
import {createCard, deleteCard, getCards} from "src/api/card";
import CardSet from "src/types/card-set";

export const useCardStore = defineStore('cardStore', () => {
  const selectedCardSet = ref<CardSet | null>(null);
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
    cards.value.push(card);
  };

  const remove = async (cardId: number) => {
    await deleteCard(cardId);
    if (selectedCardSet.value) {
      await fetchAll(selectedCardSet.value.id);
    }
  };
  const clear = () => {
    cards.value.splice(0, cards.value.length);
  }

  return {
    selectedCardSet,
    cards,
    fetchAll,
    clear,
    save,
    remove,
  }
});
