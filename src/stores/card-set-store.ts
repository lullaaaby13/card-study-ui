import {defineStore} from 'pinia';
import {ref} from "vue";
import CardSet from "src/types/card-set";
import {addCardSet, deleteCardSet, getCardSets, updateCardSet} from "src/api/card-set";

export const useCardSetStore = defineStore('cardSetStore', () => {
  const cardSets = ref<CardSet[]>([]);

  const fetchAll = async () => {
    let list = await getCardSets();
    cardSets.value.splice(0, cardSets.value.length);
    list.forEach((cardSet: CardSet) => {
      cardSets.value.push(cardSet);
    });
  }
  const save = async (request: { name: string, description?: string }) => {
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

  const replace = (cardSet: CardSet) => {
    const index = cardSets.value.findIndex((item: CardSet) => item.id === cardSet.id);
    if (index !== -1) {
      cardSets.value.splice(index, 1, cardSet);
    }
  }
  const updateName = async (id: number, name: string) => {
    const cardSet = findById(id);
    if (cardSet) {
      const updatedCardSet = await updateCardSet(id, { name, description: cardSet.description});
      replace(updatedCardSet);
    }
  }

  const updateDescription = async (id: number, description: string) => {
    const cardSet = findById(id);
    if (cardSet) {
      const updatedCardSet = await updateCardSet(id, {name: cardSet.name, description});
      replace(updatedCardSet);
    }
  }

  return {
    cardSets,
    fetchAll,
    save,
    remove,
    findById,
    isEmpty,
    updateName,
    updateDescription,
  }
});
