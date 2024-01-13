<template>
  <q-page padding class="full-height">
    <div class="row justify-center" v-if="cardSet">
      <div class="col-8">
        <div>
          <div class="row">
            <div class="col-6 flex q-gutter-x-xl">
              <q-btn label="뒤로가기" flat dense color="secondary" to="/"/>
              <h5>{{ cardSet.name }}</h5>
            </div>
            <div class="col-6 flex justify-end items-center q-gutter-md">
              <q-toggle
                v-model="isShuffleStudyCards"
                label="카드 순서 랜덤"
              />
            <q-select v-model="selectedStudyTarget"
                      @update:model-value="onStudyTargetSelected"
                      outlined
                      label="암기 레벨"
                      :options="studyTargetOptions"
                      stack-label
                      style="width: 200px;"
            />
            <q-btn label="공부 시작"
                   color="primary"
                   size="lg"
                   @click="onStudyStartButtonClick"
                   :disable="disableStudyButton"/>
            </div>
          </div>

          <div class="row">
            <div class="col-4">
              <div class="text-caption">
                <span class="text-bold">생성일</span>: {{ cardSet.createdAt }}
              </div>
            </div>
            <div class="col-8 flex justify-end">
              <MemorizationSummary v-bind="summary" :activatedItem="selectedStudyTarget.value"/>
            </div>
          </div>
        </div>

        <WordCardPage v-if="cardSet.type === CardSetType.WORD"
                      v-bind="cardSet"
        />
        <ChoiceCardPage v-else-if="cardSet.type === CardSetType.CHOICE"
                        v-bind="cardSet"
        />

      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import {computed, onMounted, onUnmounted, ref} from "vue";
import {useCardSetStore} from "stores/card-set-store";
import {CardSet, CardSetType} from "src/types/card-set";
import {useRoute, useRouter} from "vue-router";

import MemorizationSummary from "components/app/card-sets/MemorizationSummary.vue";
import {useStudyCardStore} from "stores/study-card-store";
import WordCardPage from "components/app/card-sets/word-type/WordCardPage.vue";
import ChoiceCardPage from "components/app/card-sets/choid-type/ChoiceCardPage.vue";
import {WordCard} from "src/types/word-card";
import {MemorizationLevel} from "src/types/card";
import {useWordCardStore} from "stores/word-card-store";
import {ChoiceCard} from "src/types/choice-card";


const route = useRoute();
const router = useRouter();
const cardSetStore = useCardSetStore();
const wordCardStore = useWordCardStore();
const studyCardStore = useStudyCardStore();

const cardSet = ref<CardSet | undefined>();

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
  }
});

const summary = computed(() => {
  if (cardSet.value?.type === CardSetType.WORD) {
    return wordCardStore.summary;
  } else {
    return {}
  }
});

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
const studyTargetOptions = [{ label: '공부할 카드', value: 'ToStudy' }, ...Object.values(MemorizationLevel)];
const disableStudyButton = computed(() => {
  return studyCardStore.isEmpty();
});

const onStudyStartButtonClick = () => {
  studyCardStore.cardSet = cardSet.value;
  loadStudyCards(selectedStudyTarget.value.value);
  if (isShuffleStudyCards.value) {
    studyCardStore.shuffle();
  }
  router.push('/study');
}

const isShuffleStudyCards = ref(true);
</script>

<route lang="yaml">
meta:
  title: CardSetDetails
  layout: default
  requireAuth: true
</route>
