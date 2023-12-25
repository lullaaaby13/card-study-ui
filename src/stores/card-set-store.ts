import {defineStore} from 'pinia';
import {ref} from "vue";
import CardSet from "src/types/card-set";
import {addCardSet, deleteCardSet, getCardSets} from "src/api/card-set";

export const useCardSetStore = defineStore('cardSetStore', () => {
  const cardSets = ref<CardSet[]>([]);

  const fetchAll = async () => {
    let list = await getCardSets();
    console.log(list)
    cardSets.value.splice(0, cardSets.value.length);
    list.forEach((cardSet: CardSet) => {
      cardSets.value.push(cardSet);
    });
  }
  const save = async (request: { name: string, description?: string}) => {
    await addCardSet(request);
    await fetchAll();
  }

  const remove = async (id: number) => {
    await deleteCardSet(id);
    await fetchAll();
  }

  const findById = (id: number): CardSet | undefined => {
    return cardSets.value.find((cardSet: CardSet) => cardSet.id === id);
  }

  const isEmpty = (): boolean => {
    return cardSets.value.length === 0;
  }

  return {
    cardSets,
    fetchAll,
    save,
    remove,
    findById,
    isEmpty,
  }
});
