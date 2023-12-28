<template>
  <q-card
    class="col-md-3 q-pa-lg q-my-xl"
    style="width: 40vw;"
  >
    <q-card-section class="flex justify-between">
      <span class="text-caption text-gre-7">뒷면</span>
<!--      <q-btn-dropdown flat dropdown-icon="more_vert" color="grey-7">-->
<!--        <q-list>-->
<!--          <q-item clickable v-close-popup>-->
<!--            <q-item-section>-->
<!--              <q-item-label>수정하기</q-item-label>-->
<!--            </q-item-section>-->
<!--          </q-item>-->
<!--          <q-item clickable v-close-popup>-->
<!--            <q-item-section>-->
<!--              <q-item-label>삭제하기</q-item-label>-->
<!--            </q-item-section>-->
<!--          </q-item>-->
<!--        </q-list>-->
<!--      </q-btn-dropdown>-->
    </q-card-section>

    <q-card-section class="text-h6 text-bold text-center q-my-md">
      {{back}}
    </q-card-section>

    <q-card-actions class="flex justify-center">
      <q-btn label="몰라요(q)" color="grey" class="q-mr-md" @click="onDontKnowClick"/>
      <q-btn label="알아요(e)" color="primary" @click="onKnowClick"/>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">

import {useStudyCardStore} from "stores/study-card-store";
import {Card} from "src/types/card";
import {AddStudyResult} from "src/api/study";

let studyCardStore = useStudyCardStore();

// defineProps({
//   back: {
//     type: String,
//     required: true
//   }
// });
const card = defineProps<Card>();
let emits = defineEmits(['changeStage', 'setCurrentCard']);
const onDontKnowClick = async () => {
  console.log('몰라요');
  // TODO API 호출 / 암기 레벨 하락
  await AddStudyResult(card.id, 'WRONG');
  emits('setCurrentCard', studyCardStore.nextCard());
  emits('changeStage');
};

const onKnowClick = async () => {
  console.log('알아요');
  // TODO API 호출 / 암기 레벨 상승
  await AddStudyResult(card.id, 'CORRECT');
  studyCardStore.remove(card);
  emits('setCurrentCard', studyCardStore.nextCard());
  emits('changeStage');
};



</script>
