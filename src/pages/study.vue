<template>
  <q-page padding class="full-height">
    <q-space class="q-my-xl"/>
    <div class="row justify-center">
      <div class="col-8">
        <div class="q-py-xl">
          <div class="row">
            <div class="col-6 flex items-center q-gutter-md">
              <div class="text-h5">
                토익
                <div class="text-subtitle2 q-mt-md">
                  공부할 카드 ({{ studyCardStore.cards.length }})
                </div>
              </div>
            </div>
            <div class="col-6 flex justify-end items-center q-gutter-md">
              <q-btn label="종료" color="grey" @click="onFinishButtonClick"/>
            </div>
          </div>
          <div class="row q-gutter-md justify-center items-center">

            <FrontCard v-if="stage === 'Front'"
                       v-bind="currentCard"
                       @change-stage="changeStage"
            />
            <BackCard v-if="stage === 'Back'"
                      v-bind="currentCard"
                      @change-stage="changeStage"
                      @set-current-card="setCurrentCard"
            />
            <EmptyBucket v-if="stage === 'Empty'"
                         @change-stage="changeStage"
                         @set-current-card="setCurrentCard"
            />
          </div>
        </div>
      </div>
      <div class="col-2 q-gutter-y-md">
        <q-list bordered>
          <q-item-label header>바구니에 담긴 카드</q-item-label>
          <template v-for="(card, index) in studyCardStore.bucket.getCards()" :key="index">
            <q-item>
              <q-item-section>{{card.question}}</q-item-section>
            </q-item>
            <q-separator/>
          </template>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import {useStudyCardStore} from "stores/study-card-store";
import {onMounted, ref} from "vue";
import {emptyCard, WordCard} from "src/types/word-card";
import FrontCard from "components/app/study/QuestionCard.vue";
import BackCard from "components/app/study/AnswerCard.vue";
import EmptyBucket from "components/app/study/EmptyBucket.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const studyCardStore = useStudyCardStore();

const currentCard = ref<WordCard | undefined>(emptyCard);
const stage = ref<'Front' | 'Back' | 'Empty'>('Front');


onMounted(() => {
  studyCardStore.initializeBucket();
  let nextCard = studyCardStore.nextCard();
  if (nextCard) {
    currentCard.value = nextCard;
  } else {
    stage.value = 'Empty';
  }
});

const changeStage = () => {

  if (studyCardStore.isBucketEmpty()) {
    stage.value = 'Empty';
    return;
  }

  if (stage.value === 'Front') {
    stage.value = 'Back';
  } else if (stage.value === 'Back') {
    stage.value = 'Front';
  } else if (stage.value === 'Empty') {
    stage.value = 'Front';
  }

  console.log('After ChangeStage:', stage.value);
};

const setCurrentCard = (card: WordCard) => {
  currentCard.value = card;
};

const onFinishButtonClick = () => {
  router.push(`/card-sets/${studyCardStore.cardSet.id}`);
};

</script>

<route lang="yaml">
meta:
  title: Study
  layout: default
  requireAuth: true
</route>
