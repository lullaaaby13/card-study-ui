<template>
  <q-page padding class="full-height">
    <div class="flex justify-end q-my-md q-gutter-x-md">
      <q-btn label="카드 세트 만들기" color="primary" @click="showCreateCardSetDialog = true" size="lg"/>
    </div>
    <div class="row q-gutter-md justify-start">
      <CardSetCard v-for="cardSet in cardSetStore.cardSets" :key="cardSet.id"
                   v-bind="cardSet"/>
    </div>
  </q-page>

  <CreateCardSetDialog v-model="showCreateCardSetDialog"/>

</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useCardSetStore} from "stores/card-set-store";
import CardSetCard from "components/app/main/CardSetCard.vue";
import CreateCardSetDialog from "components/app/main/CreateCardSetDialog.vue";

const cardSetStore = useCardSetStore();

const showCreateCardSetDialog = ref(false);

onMounted(async () => {
  await cardSetStore.fetchAll();
});

</script>

<route lang="yaml">
name: Home
meta:
  title: Home
  layout: default
  requiresAuth: true
</route>
