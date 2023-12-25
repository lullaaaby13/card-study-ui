<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

import {onMounted} from "vue";
import {useCardSetStore} from "stores/card-set-store";
import {useRoute} from "vue-router";

let cardSetStore = useCardSetStore();
let route = useRoute();

onMounted(() => {

});

</script>
