<template>
  <q-page padding class="full-height">
    <div class="row q-gutter-md justify-center">
      <q-card class="col-md-3 q-pa-lg" v-for="index in 12" :key="index">
        <div class="flex justify-between">
          <div class="text-h6">토익</div>
          <q-btn label="삭제" flat  color="red"/>
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
        <q-card-section>
          <q-btn label="공부 시작" color="primary"/>
          <q-btn label="카드 보기" color="primary" to="detail"/>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">

</script>

<route lang="yaml">
meta:
  title: Home
  layout: default
</route>
