<template>
  <div class="q-mt-md">
    <WordTypePanel v-if="cardSet.type === CardSetType.WORD" :card-set="cardSet"/>
  </div>

  <div class="flex items-center q-my-md q-gutter-md">
    <q-input v-model="searchText" label="검색(앞면)" stack-label style="width: 30vw;"/>
    <q-select v-model="selectedSearchMemorizationLevel" outlined label="암기 레벨" :options="searchMemorizationLevelOptions" stack-label style="width: 200px;"/>
  </div>
  <div class="row q-my-md q-gutter-md">
    <RegisteredCard v-for="(card, index) in filteredCard" :key="index"
                    v-bind="card"
    />
  </div>
</template>

<script setup lang="ts">

import {CardSet, CardSetType} from "src/types/card-set";
import RegisteredCard from "components/app/card-sets/word-type/WordCard.vue";
import WordTypePanel from "components/app/card-sets/word-type/WordTypePanel.vue";
import {useWordCardStore} from "stores/word-card-store";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {WordCard} from "src/types/word-card";
import {MemorizationLevel} from "src/types/card";
import {useStudyCardStore} from "stores/study-card-store";
import {useRoute} from "vue-router";

const route = useRoute();
const cardSet = defineProps<CardSet>();
const wordCardStore = useWordCardStore();

const searchText = ref('');
const selectedSearchMemorizationLevel = ref({ label: '전체', value: 'All' });
const searchMemorizationLevelOptions = [{ label: '전체', value: 'All' }, ...Object.values(MemorizationLevel)];

/** HOOK **/
onMounted(async () => {
  // @ts-ignore
  const cardSetId = route.params.id;
  await wordCardStore.fetchAll(cardSetId);
  studyCardStore.load(wordCardStore.toStudyCards);
});

const filteredCard = computed(() => {
  let filteredCards: WordCard[] = wordCardStore.cards;
  const text = searchText.value;
  if (text !== '') {
    filteredCards = filteredCards.filter(card => {
      return card.question.toLowerCase().includes(text.toLowerCase());
    });
  }

  if (selectedSearchMemorizationLevel.value.value !== 'All') {
    filteredCards = filteredCards.filter(card => {
      return card.memorizationLevel === selectedSearchMemorizationLevel.value.value;
    });
  }

  return filteredCards;
});

onUnmounted(() => {
  wordCardStore.clear();
});

/** STUDY **/
const studyCardStore = useStudyCardStore();
const selectedStudyTarget = ref({ label: '공부할 카드', value: 'ToStudy' });
const onStudyTargetSelected = (option: { label:string, value: string }) => {
  selectedStudyTarget.value = option;
  loadStudyCards(option.value);
};

const loadStudyCards = (optionValue: string) => {
  let cards = wordCardStore.cards;
  if (optionValue === 'ToStudy') {
    studyCardStore.load(wordCardStore.toStudyCards);
  } else {
    studyCardStore.load(cards.filter(card => card.memorizationLevel === optionValue));
  }
}

</script>
