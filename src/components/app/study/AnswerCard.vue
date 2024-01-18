<template>
  <q-card
    class="col-md-3 q-pa-lg q-my-xl"
    style="width: 40vw;"
  >
    <q-card-section class="flex justify-between">
      <span class="text-caption text-gre-7">뒷면</span>
    </q-card-section>

    <q-card-section class="text-h6 text-bold text-center q-my-md" v-html="convertNewLineToBR(answer)"/>

    <q-card-actions class="flex justify-center">
      <q-btn label="몰라요(q)" color="grey" class="q-mr-md" @click="onDontKnowClick"/>
      <q-btn label="알아요(e)" color="primary" @click="onKnowClick"/>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">

import {useStudyCardStore} from "stores/study-card-store";
import {WordCard} from "src/types/word-card";
import StudyApi from "src/api/study";
import {onMounted, ref} from "vue";
import {CardSet} from "src/types/card-set";
import {convertNewLineToBR} from "src/utils";

const studyCardStore = useStudyCardStore();

const cardSet = ref<CardSet>();
const card = defineProps<WordCard>();
let emits = defineEmits(['changeStage', 'setCurrentCard']);

onMounted(() => {
  cardSet.value = studyCardStore.cardSet;
});
const onDontKnowClick = async () => {
  await StudyApi.AddStudyResult(cardSet.value.id, card.id, 'WRONG');
  emits('setCurrentCard', studyCardStore.nextCard());
  emits('changeStage');
};

const onKnowClick = async () => {
  console.log('알아요');
  await StudyApi.AddStudyResult(cardSet.value.id, card.id, 'CORRECT');
  studyCardStore.remove(card);
  emits('setCurrentCard', studyCardStore.nextCard());
  emits('changeStage');
};



</script>
