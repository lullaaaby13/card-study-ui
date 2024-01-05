<template>
  <q-card class="q-pa-md"
          :style="{ width }"
          :flat="flat"
          :bordered="bordered"
          v-bind="$attrs">
    <template v-if="$slots" v-for="(_, name) in $slots" :key="name">
      <slot :name="name"/>
    </template>
  </q-card>
</template>

<script setup>
defineProps({
  flat: {
    type: Boolean,
    default: true,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '80vw',
  },
})
</script>
