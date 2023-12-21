<template>
  <q-page padding class="full-height">
    <div class="row q-gutter-md justify-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 q-mt-xl q-pt-xl">
        <q-card class="q-pa-md">
          <div class="flex justify-between">
            <div class="text-h5">카드 등록</div>
            <q-btn label="뒤로가기" flat color="primary" to="/"/>
          </div>
          <q-form>
            <q-card-section class="row">
              <div class="col-12 q-pa-md">
                <q-input
                  type="text"
                  outlined
                  disable
                  stack-label
                  label="카테고리"
                />
              </div>
              <div class="col-6 q-pa-md">
                <q-input
                  type="textarea"
                  outlined
                  stack-label
                  label="앞면 (ctrl + 1)"
                  lazy-rules
                  :rules="[val => !!val || '앞면 내용을 입력해주세요.']"
                />
              </div>
              <div class="col-6 q-pa-md">
                <q-input
                  type="textarea"
                  outlined
                  stack-label
                  label="뒷면 (ctrl + 2)"
                  lazy-rules
                  :rules="[val => !!val || '뒷면 내용을 입력해주세요.']"
                />
              </div>
              <div class="col-12 q-pa-md">
                <q-input
                  type="text"
                  outlined
                  stack-label
                  label="레퍼런스 (ctrl + 3)"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <q-btn
                color="primary"
                label="등록 (ctrl + enter)"
                type="submit"
                class="full-width"
              />
            </q-card-section>
          </q-form>
        </q-card>

        <q-separator class="q-my-xl"/>

        <h3>Card Area</h3>

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
