<template>
  <q-card class="q-pa-md full-width">
    <div class=" q-pa-sm flex justify-between">
      <div>
        <div class="text-subtitle2 text-bold">{{card.id}}</div>
        <div>{{card.reference}}</div>
        <div class="q-gutter-x-md text-caption">
          <span>
            <span class="text-bold">생성일</span>: {{ date.formatDate(card.createdAt, 'YYYY-MM-DD HH:mm') }}
          </span>
          <span>
            <span class="text-bold">암기 레벨</span>: {{ card.memorizationLevel }}
          </span>

        </div>
      </div>
      <div class="flex items-center q-gutter-x-md">
        <q-btn icon="delete" flat color="red" size="md" @click="onDeleteCardButtonClick(card.id)"/>
      </div>
    </div>
    <q-card-section class="flex justify-around">
      <q-card bordered class="q-pa-sm" flat style="width: 30vw;">
        <div class="text-caption text-grey-6 q-mb-md">앞면</div>
        <div v-if="!toggleUpdateFrontField" @click="onClickFront">{{ card.front }}</div>
        <q-input v-if="toggleUpdateFrontField" v-model="frontField" type="textarea" @blur="onBlurFrontField"/>
      </q-card>
      <q-card bordered class="q-pa-sm" flat style="width: 30vw;">
        <div class="text-caption text-grey-6 q-mb-md">뒷면</div>
        <div v-if="!toggleUpdateBackField" @click="onClickBack">{{ card.back }}</div>
        <q-input v-if="toggleUpdateBackField" v-model="backField" type="textarea" @blur="onBlurBackField"/>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">

import {date} from "quasar";
import {Card} from "src/types/card";
import {useCardStore} from "stores/card-store";
import {ref} from "vue";

let cardStore = useCardStore();

const card = defineProps<Card>();
const onDeleteCardButtonClick = async (id: number) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    await cardStore.remove(id);
  }
};

const toggleUpdateFrontField = ref(false);
const frontField = ref<string | undefined>();
const toggleUpdateBackField = ref(false);
const backField = ref<string | undefined>();

const onClickFront = () => {
  frontField.value = card.front;
  toggleUpdateFrontField.value = true;
};

const onBlurFrontField = async () => {
  toggleUpdateFrontField.value = false;
  await cardStore.update(card.id, { front: frontField.value });
};

const onClickBack = () => {
  backField.value = card.back;
  toggleUpdateBackField.value = true;
};

const onBlurBackField = async () => {
  toggleUpdateBackField.value = false;
  await cardStore.update(card.id, { back: backField.value });
};

</script>
