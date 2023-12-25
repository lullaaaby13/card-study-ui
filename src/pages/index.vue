<template>
  <q-page padding class="full-height">

    <div class="row justify-center">
      <div class="col-8">
        <div class="flex justify-end q-my-md q-gutter-x-md">
          <q-btn label="카드 세트 만들기" color="green" @click="showCreateCardSetDialog = true"/>
        </div>
        <div class="row q-gutter-md justify-center">
          <q-card class="col-md-4 q-pa-lg" v-for="cardSet in cardSetStore.cardSets" :key="cardSet.id">
            <div class="flex justify-between">
              <div class="text-h6">{{ cardSet.name }}</div>
              <q-btn label="삭제" flat  color="red" @click="onDeleteButtonClick(cardSet.id)"/>
            </div>

            <q-list class="q-mt-lg" bordered>
              <q-item>
                <q-item-section>
                  <q-item-label>100</q-item-label>
                  <q-item-label caption lines="1">전체 카드</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>10</q-item-label>
                  <q-item-label caption lines="1">오늘 공부 해야할 카드</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list bordered>
              <q-item>
                <q-item-section v-for="i in 6" :key="i">
                  <q-item-label>10</q-item-label>
                  <q-item-label caption lines="1">어려움</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-card-section class="q-gutter-md">
              <q-btn label="공부 시작" color="primary" to="study"/>
              <q-btn label="자세히 보기" color="secondary" :to="`/card-sets/${cardSet.id}`"/>
            </q-card-section>
          </q-card>
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

import {useCardStore} from "stores/card-store";
import {onMounted, ref, UnwrapRef} from "vue";
import {useCardSetStore} from "stores/card-set-store";
import CardSet from "src/types/card-set";

import {useRouter} from "vue-router";

const cardStore = useCardStore();
const cardSetStore = useCardSetStore();
let router = useRouter();

onMounted(async () => {
  await cardSetStore.fetchAll();
})
const onDeleteButtonClick = (cardSetId: number) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    cardSetStore.remove(cardSetId);
  }
}

const showCreateCardSetDialog = ref(false);
const cardSetName = ref('');
const cardSetDescription = ref('');

const onCardSetDetailButtonClick = (cardSet: CardSet) => {
  router.push(`/card-sets/${cardSet.id}`);
}
const onCardSetCreateButtonClick = async () => {
  await cardSetStore.save({
    name: cardSetName.value,
    description: cardSetDescription.value,
  })
  showCreateCardSetDialog.value = false;
}
</script>

<route lang="yaml">
meta:
  title: Home
  layout: default
</route>
