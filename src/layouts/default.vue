<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-2">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showErrorDialog">
      <q-card class="q-pa-md" style="width: 350px;">
        <q-card-section>{{errorMessage}}</q-card-section>
        <q-card-actions class="flex justify-end">
          <q-btn label="확인" color="primary" @click="showErrorDialog = false"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">

import {onErrorCaptured, onMounted, ref} from "vue";
import {useCardSetStore} from "stores/card-set-store";
import {useRoute} from "vue-router";
import {AxiosError} from "axios";


const showErrorDialog = ref(false);
const errorMessage = ref('');

onMounted(() => {

});

onErrorCaptured( (err, instance, info) => {
  showErrorDialog.value = true;
  if (err instanceof AxiosError && err.response) {
    errorMessage.value = err.response.data.message;
  } else {
    errorMessage.value = err.message;
  }
  return false;
});


</script>
