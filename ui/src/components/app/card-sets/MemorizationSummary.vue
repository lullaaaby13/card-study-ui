<template>
  <div class="flex q-gutter-x-sm">
    <MemorizationSummaryCard :activated="activatedItem !== 'ToStudy'" label="공부할 카드" :value="ToStudy"/>
    <MemorizationSummaryCard :activated="activatedItem !== 'Difficult'" label="어려움" :value="Difficult"/>
    <MemorizationSummaryCard :activated="activatedItem !== 'SomewhatDifficult'" label="다소 어려움" :value="SomewhatDifficult"/>
    <MemorizationSummaryCard :activated="activatedItem !== 'Understand'" label="이해함" :value="Understand"/>
    <MemorizationSummaryCard :activated="activatedItem !== 'Easy'" label="쉬움" :value="Easy"/>
    <MemorizationSummaryCard :activated="activatedItem !== 'VeryEasy'" label="매우 쉬움" :value="VeryEasy"/>
    <MemorizationSummaryCard :activated="activatedItem !== 'Perfect'" label="완벽함" :value="Perfect"/>
  </div>

</template>

<script setup lang="ts">
import {computed} from "vue";
import MemorizationSummaryCard from "components/TileCard.vue";

defineProps({
  ToStudy: {
    type: Number,
    required: true,
  },
  Difficult: {
    type: Number,
    required: true,
  },
  SomewhatDifficult: {
    type: Number,
    required: true,
  },
  Understand: {
    type: Number,
    required: true,
  },
  Easy: {
    type: Number,
    required: true,
  },
  VeryEasy: {
    type: Number,
    required: true,
  },
  Perfect: {
    type: Number,
    required: true,
  },
  activatedItem: {
    type: String,
  },
});

</script>
