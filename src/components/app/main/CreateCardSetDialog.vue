<template>
  <q-dialog :model-value="modelValue" @update:model-value="val => emits('update:modelValue', val)">
    <q-card class="q-pa-md q-gutter-y-md" style="width: 400px;">
      <q-input v-model="cardSetName"
               type="text"
               label="카드 세트 이름"
               outlined
               stack-label
      />
      <q-input v-model="cardSetDescription"
               type="text"
               label="카드 세트 설명"
               outlined
               stack-label
      />
      <q-select
        v-model="cardSetType"
        label="카드 세트 타입"
        stack-label
        :options="cardSetTypeOptions"
        outlined
        hint="카드 세트 타입은 나중에 변경할 수 없습니다."
      />
      <q-card-actions class="flex justify-end q-mt-md">
        <q-btn label="등록" color="primary" @click="onCardSetCreateButtonClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useCardSetStore} from "stores/card-set-store";
import {CardSetType} from "src/types/card-set";

const cardSetStore = useCardSetStore();

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});
const emits = defineEmits(['update:modelValue']);

const cardSetName = ref('');
const cardSetDescription = ref('');
const cardSetTypeOptions: { label: string, value: CardSetType }[] = [
  {
    label: '단어형',
    value: CardSetType.WORD,
  },
  {
    label: '선다형',
    value: CardSetType.CHOICE,
  }
];
const cardSetType = ref(cardSetTypeOptions[0]);


const onCardSetCreateButtonClick = async () => {
  await cardSetStore.save({
    type: cardSetType.value.value,
    name: cardSetName.value,
    description: cardSetDescription.value,
  })
  cardSetName.value = '';
  cardSetDescription.value = '';
  cardSetType.value = cardSetTypeOptions[0];

  emits('update:modelValue', false);
}

</script>
