<template>
  <q-page padding class="full-height">

    <div class="row justify-center">
      <div class="col-8">
        <div class="flex justify-end q-my-md">
          <q-btn label="카드 세트 만들기" color="green"/>
        </div>
        <div class="row q-gutter-md justify-center">
          <q-card class="col-md-4 q-pa-lg" v-for="index in 12" :key="index">
            <div class="flex justify-between">
              <div class="text-h6">토익</div>
              <q-btn label="삭제" flat  color="red" @click="onDeleteButtonClick"/>
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
              <q-btn label="카드 보기" color="primary" to="detail"/>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">

const onDeleteButtonClick = () => {
  if (confirm('정말 삭제하시겠습니까?')) {
    console.log('delete button clicked')
  }
}

</script>

<route lang="yaml">
meta:
  title: Home
  layout: default
</route>
