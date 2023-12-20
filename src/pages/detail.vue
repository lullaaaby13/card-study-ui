<template>
  <q-page padding class="full-height">
    <div class="row justify-center">
      <div class="col-8">
        <div>
          <div class="row">
            <div class="col-6">
              <h5>토익</h5>
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
                생성일: 2023-12-20 13:28
              </div>
              <div class="text-caption">
                최근 공부: 2023-12-20 13:28
              </div>
            </div>
            <div class="col-6">
              <q-list>
                <q-item>
                  <q-item-section v-for="i in 6" :key="i">
                    <q-item-label>10</q-item-label>
                    <q-item-label caption lines="1">어려움</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>

        <q-separator class="q-my-md"/>
        <div class="flex justify-center q-mb-md">
          <q-input label="검색" stack-label style="width: 30vw;"/>
        </div>
        <div class="row q-my-md q-gutter-sm" style="height: 120px;" v-for="index in 1000" :key="index">
          <q-card class="col-5 q-pa-lg">
            <div class="text-caption">앞면</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </div>
          </q-card>
          <q-card class="col-5 q-pa-lg">
            <div class="text-caption">뒷면</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
          </q-card>
          <div class="col-1 flex items-center justify-center">
            <q-btn label="삭제" flat color="red"/>
          </div>
        </div>

      </div>
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
