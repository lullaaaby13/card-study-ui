<template>
  <q-card :class="cardClass" style="width: 80px;" :flat="activated">
    <div class="text-subtitle2">{{ value }}</div>
    <div class="text-caption text-grey-7">{{ label }}</div>
  </q-card>
</template>

<script setup lang="ts">
import {computed} from "vue";

let props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  activated: {
    type: Boolean,
    required: true,
    default: false,
  },

});

const cardClass = computed(() => {
  return {
    'q-pa-sm': true,
    'bg-grey-2': props.activated,
    // 'bg-grey-2': false,
  }
});

</script>
