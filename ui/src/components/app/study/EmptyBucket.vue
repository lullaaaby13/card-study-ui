<template>
  <q-card
    class="col-md-3 q-pa-lg q-my-xl"
    style="width: 40vw;"
  >
    <q-card-section class="text-h6 text-bold text-center q-my-md">
      바구니가 비었어요.
    </q-card-section>

    <q-card-actions class="flex justify-center">
      <q-btn label="바구니 채우기" color="primary" @click="onRefillBucketClick"/>
    </q-card-actions>

  </q-card>
</template>

<script setup lang="ts">

import {useStudyCardStore} from "stores/study-card-store";

let studyCardStore = useStudyCardStore();

let emits = defineEmits(['changeStage', 'setCurrentCard']);

const onRefillBucketClick = () => {
  studyCardStore.initializeBucket();
  emits('setCurrentCard', studyCardStore.nextCard());
  emits('changeStage');
};

</script>
