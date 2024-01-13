<template>
  <q-card
    class="col-md-3 q-pa-lg q-my-xl"
    style="width: 40vw;"
  >
    <q-card-section>
      <div class="text-caption text-gre-7">
        질문
      </div>
    </q-card-section>

    <q-card-section class="text-h6 text-bold text-center q-my-md">
      {{question}}
    </q-card-section>

    <q-card-actions class="flex justify-center">
      <q-btn label="정답 확인" color="primary" @click="onCheckAnswerClick"/>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import {WordCard} from "src/types/word-card";

const card = defineProps<WordCard>();
const emits = defineEmits(['changeStage']);


const onCheckAnswerClick = () => {
  emits('changeStage');
};

</script>
