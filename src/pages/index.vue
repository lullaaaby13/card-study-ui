<template>
  <q-page padding class="full-height">

    <div class="row justify-center">
      <div class="col-8">
        <div class="flex justify-end q-my-md q-gutter-x-md">
          <q-btn label="카드 세트 만들기" color="green" @click="showCreateCardSetDialog = true" size="lg"/>
        </div>
        <div class="row q-gutter-md justify-start">
          <CardSetCard v-for="cardSet in cardSetStore.cardSets" :key="cardSet.id"
                       v-bind="cardSet"/>
        </div>
      </div>
    </div>
  </q-page>

  <q-dialog v-model="showCreateCardSetDialog">
    <q-card class="q-pa-md">
      <q-input v-model="cardSetName" type="text" label="카드 세트 이름" stack-label style="width: 300px;"/>
      <q-input v-model="cardSetDescription" type="text" label="카드 세트 설명" stack-label style="width: 300px;"/>
      <q-card-actions class="flex justify-end q-mt-md">
        <q-btn label="등록" color="primary" @click="onCardSetCreateButtonClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useCardSetStore} from "stores/card-set-store";
import CardSetCard from "components/app/main/CardSetCard.vue";

const cardSetStore = useCardSetStore();


const showCreateCardSetDialog = ref(false);
const cardSetName = ref('');
const cardSetDescription = ref('');

onMounted(async () => {
  await cardSetStore.fetchAll();
})


const onCardSetCreateButtonClick = async () => {
  await cardSetStore.save({
    name: cardSetName.value,
    description: cardSetDescription.value,
  })
  cardSetName.value = '';
  cardSetDescription.value = '';
  showCreateCardSetDialog.value = false;
}


</script>

<route lang="yaml">
meta:
  title: Home
  layout: default
  requiresAuth: true
</route>
