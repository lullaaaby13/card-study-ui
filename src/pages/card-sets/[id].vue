<template>
  <q-page padding class="full-height">
    <div class="row justify-center">
      <div class="col-8">
        <div>
          <div class="row">
            <div class="col-6 flex q-gutter-x-xl">
              <q-btn label="뒤로가기" flat dense color="secondary" to="/"/>
              <h5>{{ cardSet.name }}</h5>
            </div>
            <div class="col-6 flex justify-end items-center q-gutter-md">
              <q-select v-model="selectedStudyTarget" @update:model-value="onStudyTargetSelected" outlined label="암기 레벨" :options="studyTargetOptions" stack-label style="width: 200px;"/>
              <q-btn label="공부 시작" color="primary" size="lg" to="/study" :disable="disableStudyButton"/>
            </div>
          </div>

          <div class="row">
            <div class="col-4">
              <div class="text-caption">
                <span class="text-bold">생성일</span>: {{ cardSet.createdAt }}
              </div>
            </div>
            <div class="col-8 flex justify-end">
              <MemorizationSummary v-bind="memorizationLevelSummary" :activatedItem="selectedStudyTarget.value"/>
            </div>
          </div>
        </div>

        <div class="q-mt-md">
          <WordTypePanel v-if="cardSet.type === CardSetType.WORD" :card-set="cardSet"/>
          <ChoiceTypePanel v-else-if="cardSet.type === CardSetType.CHOICE" :card-set="cardSet"/>
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
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import {computed, onMounted, onUnmounted, ref} from "vue";
import {useCardSetStore} from "stores/card-set-store";
import {CardSet, CardSetType} from "src/types/card-set";
import {useRoute, useRouter} from "vue-router";
import {useCardStore} from "stores/card-store";
import {Card, MemorizationLevel} from "src/types/card";
import MemorizationSummary from "components/app/card-sets/MemorizationSummary.vue";
import RegisteredCard from "components/app/card-sets/word-type/WordTypeCard.vue";
import {useStudyCardStore} from "stores/study-card-store";
import ChoiceTypePanel from "components/app/card-sets/choid-type/ChoiceTypePanel.vue";
import WordTypePanel from "components/app/card-sets/word-type/WordTypePanel.vue";

let cardStore = useCardStore();
let cardSetStore = useCardSetStore();
let route = useRoute();
let router = useRouter();

const cardSet = ref<CardSet>({
  id: -1,
  name: '',
  description: '',
  totalCardCount: 0,
  toStudyCardCount: 0,
  type: CardSetType.WORD,
  createdAt: '',
  updatedAt: '',
});

onMounted(async () => {

  // @ts-ignore
  let id = Number(route.params.id);
  if (isNaN(id)) {
    alert('올바르지 않은 카드 세트 입니다.');
    router.push('/');
  }

  if (cardSetStore.isEmpty()) {
    await cardSetStore.fetchAll();
  }

  const findCardSet = cardSetStore.findById(id);

  console.log('cardSet: ', findCardSet);

  if (!findCardSet) {
    alert('올바르지 않은 카드 세트 입니다.');
    router.push('/');
  } else {
    cardSet.value = findCardSet;
    await cardStore.fetchAll(id);
  }

  studyCardStore.load(cardStore.toStudyCards);
});

onUnmounted(() => {
  cardStore.clear();
});

const memorizationLevelSummary = computed(() => {
  const cards: Card[] = cardStore.cards;
  // const summary: { [key: MemorizationLevelKey]: number } = {
  const summary = {
    ToStudy: 0,
    Difficult: 0,
    SomewhatDifficult: 0,
    Understand: 0,
    Easy: 0,
    VeryEasy: 0,
    Perfect: 0,
  };
  cards.forEach(card => {
    summary[card.memorizationLevel] += 1;
  });

  summary.ToStudy = cardStore.toStudyCards.length;
  return summary;
});

const searchText = ref('');

const filteredCard = computed(() => {
  let filteredCards: Card[] = cardStore.cards;
  const text = searchText.value;
  if (text !== '') {
    filteredCards = filteredCards.filter(card => {
      return card.front.toLowerCase().includes(text.toLowerCase());
    });
  }

  if (selectedSearchMemorizationLevel.value.value !== 'All') {
    filteredCards = filteredCards.filter(card => {
      return card.memorizationLevel === selectedSearchMemorizationLevel.value.value;
    });
  }

  return filteredCards;
});

const selectedSearchMemorizationLevel = ref({ label: '전체', value: 'All' });
const searchMemorizationLevelOptions = [{ label: '전체', value: 'All' }, ...Object.values(MemorizationLevel)];

const selectedStudyTarget = ref({ label: '공부할 카드', value: 'ToStudy' });
const studyTargetOptions = [{ label: '공부할 카드', value: 'ToStudy' }, ...Object.values(MemorizationLevel)];
const disableStudyButton = computed(() => {
  return studyCardStore.isEmpty();
});

let studyCardStore = useStudyCardStore();
const onStudyTargetSelected = (option: { label:string, value: string }) => {
  selectedStudyTarget.value = option;
  loadStudyCards(option.value);
};

const loadStudyCards = (optionValue: string) => {
  let cards = cardStore.cards;
  if (optionValue === 'ToStudy') {
    studyCardStore.load(cardStore.toStudyCards);
  } else {
    studyCardStore.load(cards.filter(card => card.memorizationLevel === optionValue));
  }
}

</script>

<route lang="yaml">
meta:
  title: CardSetDetails
  layout: default
  requireAuth: true
</route>
