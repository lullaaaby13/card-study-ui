<template>
  <q-input
    v-model="choice.value"
    type="text"
    outlined
    stack-label
    :label="label"
    lazy-rules
  >
    <template v-slot:append>
      <q-checkbox v-model="choice.isCorrect"/>
    </template>
  </q-input>
</template>

<script setup lang="ts">

import {Choice} from "src/types/card";
import {PropType} from "vue";


defineProps({
  label: {
    type: String,
    required: true,
  },
  choice: {
    type: Object as PropType<Choice>,
    required: true,
  },
});

</script>
