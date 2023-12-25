<template>
  <q-page padding class="full-height">
    <div class="row justify-center">
      <div class="col-8">
        <div>
          <div class="row">
            <div class="col-6 flex q-gutter-x-xl">
              <q-btn label="뒤로가기" flat dense color="secondary" to="/"/>
              <h5>{{ cardSet.name }}</h5>
            </div>
            <div class="col-6 flex justify-end items-center q-gutter-md">
              <q-select outlined dense label="암기 레벨"  stack-label style="width: 200px;">
              </q-select>
              <q-btn label="공부 시작" color="primary"/>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <div class="text-caption">
                생성일: {{ cardSet.createdAt }}
              </div>
              <div class="text-caption">
                최근 공부: {{ cardSet.lastReviewedAt }}
              </div>
            </div>
            <div class="col-6">
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label>{{ memorizationLevelSummary.Difficult }}</q-item-label>
                    <q-item-label caption lines="1">어려움</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ memorizationLevelSummary.SomewhatDifficult}}</q-item-label>
                    <q-item-label caption lines="1">다소 어려움</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ memorizationLevelSummary.Understand }}</q-item-label>
                    <q-item-label caption lines="1">이해함</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ memorizationLevelSummary.Easy }}</q-item-label>
                    <q-item-label caption lines="1">쉬움</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ memorizationLevelSummary.VeryEasy }}</q-item-label>
                    <q-item-label caption lines="1">매우 쉬움</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ memorizationLevelSummary.Perfect }}</q-item-label>
                    <q-item-label caption lines="1">완벽함</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>

        <q-separator class="q-my-md"/>

        <q-card class="q-pa-md">
          <div class="flex justify-between">
            <div class="text-h5">카드 등록</div>

          </div>
          <q-form>
            <q-card-section class="row">
              <div class="col-6 q-pa-md">
                <q-input
                  ref="frontField"
                  v-model="front"
                  type="textarea"
                  outlined
                  stack-label
                  label="앞면 (ALT + 1)"
                  lazy-rules
                  :rules="[val => !!val || '앞면 내용을 입력해주세요.']"
                  @keydown="handleKeyDown"
                />
              </div>
              <div class="col-6 q-pa-md">
                <q-input
                  ref="backField"
                  v-model="back"
                  type="textarea"
                  outlined
                  stack-label
                  label="뒷면 (ALT + 2)"
                  lazy-rules
                  :rules="[val => !!val || '뒷면 내용을 입력해주세요.']"
                  @keydown="handleKeyDown"
                />
              </div>
              <div class="col-12 q-pa-md">
                <q-input
                  ref="referenceField"
                  v-model="reference"
                  type="text"
                  outlined
                  stack-label
                  label="레퍼런스 (ALT + 3)"
                  @keydown="handleKeyDown"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <q-btn
                color="primary"
                label="등록 (ALT + ENTER)"
                class="full-width"
                @click="onSubmit"
              />
            </q-card-section>
          </q-form>
        </q-card>

        <q-separator class="q-my-md"/>

        <div class="flex justify-center q-mb-md">
          <q-input label="검색" stack-label style="width: 30vw;"/>
        </div>
        <div class="row q-my-md q-gutter-md">
          <q-card class="q-pa-md full-width"  v-for="card in cardStore.cards" :key="card.id">
            <div class=" q-pa-sm flex justify-between">
              <div class="text-caption flex items-center">
                {{card.id}}
                | 생성일: {{ date.formatDate(card.createdAt, 'YYYY-MM-DD HH:mm') }}
                | 암기레벨: {{card.memorizationLevel}}
              </div>
              <div class="flex items-center q-gutter-x-md">
                <q-btn label="수정" color="secondary" size="md"/>
                <q-btn label="삭제" color="red" size="md" @click="onDeleteCardButtonClick(card.id)"/>
              </div>
            </div>
            <q-card-section class="flex justify-around">
              <q-card bordered class="q-pa-sm" flat style="width: 30vw;">
                <div class="text-caption text-grey-6 q-mb-md">앞면</div>
                <div>{{ card.front }}</div>
              </q-card>
              <q-card bordered class="q-pa-sm" flat style="width: 30vw;">
                <div class="text-caption text-grey-6 q-mb-md">뒷면</div>
                <div>{{ card.back }}</div>
              </q-card>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import {computed, onMounted, onUnmounted, ref} from "vue";
import {useCardSetStore} from "stores/card-set-store";
import CardSet from "src/types/card-set";
import {useRoute, useRouter} from "vue-router";
import {debounce} from "quasar";
import {useCardStore} from "stores/card-store";
import Card, {MemorizationLevel} from "src/types/card";
import { date } from 'quasar'

let cardStore = useCardStore();
let cardSetStore = useCardSetStore();
let route = useRoute();
let router = useRouter();

const cardSet = ref<CardSet>({
  id: -1,
  name: '',
  description: '',
  lastReviewedAt: '',
  createdAt: '',
  updatedAt: '',
});

onMounted(async () => {

  let id = Number(route.params.id);
  if (isNaN(id)) {
    alert('올바르지 않은 카드 세트 입니다.');
    router.push('/');
  }

  if (cardSetStore.isEmpty()) {
    await cardSetStore.fetchAll();
  }

  const findCardSet = cardSetStore.findById(id);
  if (!findCardSet) {
    alert('올바르지 않은 카드 세트 입니다.');
    router.push('/');
  } else {
    cardSet.value = findCardSet;
    cardStore.selectedCardSet = findCardSet;
    await cardStore.fetchAll(id);
  }
});

onUnmounted(() => {
  cardStore.clear();
});

const memorizationLevelSummary = computed(() => {
  const cards: Card[] = cardStore.cards;
  const summary: { [key: MemorizationLevel]: number } = {
    Difficult: 0,
    SomewhatDifficult: 0,
    Understand: 0,
    Easy: 0,
    VeryEasy: 0,
    Perfect: 0,
  };
  cards.forEach(card => {
    summary[card.memorizationLevel] += 1;
  });

  return summary;
});

const frontField = ref(null);
const backField = ref(null);
const referenceField = ref(null);

const front = ref<string>('');
const back = ref<string>('');
const reference = ref<string>('');

const onSubmit = debounce(async () => {
  moveToFront();
  const keyboardEvent = new KeyboardEvent('keydown', {altKey: true, keyCode: 39});
  document.dispatchEvent(keyboardEvent);
  moveToBack();
  document.dispatchEvent(keyboardEvent);
  moveToReference();
  document.dispatchEvent(keyboardEvent);

  const request = {
    front: front.value,
    back: back.value,
    reference: reference.value,
    cardSetId: cardSet.value.id,
  };
  console.log('check: ', request);

  await cardStore.save(request);
  console.log('before: ', front.value, back.value, reference.value);
  front.value = '';
  back.value = '';
  reference.value = '';
  console.log('after: ', front.value, back.value, reference.value);
  moveToFront();

}, 10);
const moveToFront = debounce(() => {
  // @ts-ignore
  frontField.value?.focus();
}, 10);
const moveToBack = debounce(() => {
  // @ts-ignore
  backField.value?.focus();
}, 10);
const moveToReference = debounce(() => {
  // @ts-ignore
  referenceField.value?.focus();
}, 10);

const handleKeyDown = (event: KeyboardEvent) => {
  const keyCode = event.keyCode;
  console.log(keyCode)
  if (event.altKey && keyCode === 49) {
    moveToFront();
  }
  if (event.altKey && keyCode === 50) {
    moveToBack();
  }
  if (event.altKey && keyCode === 51) {
    moveToReference();
  }
  if (event.altKey && keyCode === 13) {
    onSubmit();
  }
};


const onDeleteCardButtonClick = async (id: number) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    await cardStore.remove(id);
  }
};

</script>

<route lang="yaml">
meta:
  title: Home
  layout: default
</route>
