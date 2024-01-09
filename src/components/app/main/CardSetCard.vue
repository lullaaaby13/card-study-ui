<template>
  <q-card class="col-md-4 q-pa-lg">
    <div class="row">
      <div class="col-10">

        <div v-if="!toggleName" class="text-h6" @click="onNameClick">
          {{ cardSet.name }}
        </div>
        <q-input v-if="toggleName"
                 type="text"
                 ref="nameField"
                 :model-value="nameFieldValue"
                 @update:model-value="val => nameFieldValue = val"
                 dense
                 @blur="onBlurNameField"/>
        <div v-if="!toggleDescription" class="text-caption text-grey-7" @click="onDescriptionClick">
          <span v-if="cardSet.description">{{ cardSet.description }}</span>
          <span v-else>-</span>
        </div>
        <q-input v-if="toggleDescription"
                 type="text"
                 ref="descriptionField"
                 :model-value="descriptionFieldValue"
                 @update:model-value="val => descriptionFieldValue = val"
                 dense
                 @blur="onBlurDescriptionField"
        >
<!--          <template v-slot:append>-->
<!--            <q-icon name="check" />-->
<!--          </template>-->
        </q-input>
      </div>
      <div class="col-2">
        <q-btn icon="delete" color="red-7" flat size="md" @click="onDeleteButtonClick(cardSet.id)"/>
      </div>
    </div>
    <div>
      <q-badge
        rounded
        :label="labelOfCardSetType(cardSet.type)"
      />
    </div>
    <q-separator class="q-my-md"/>

    <div class="flex q-gutter-x-md">
      <TileCard :activated="false" label="전체 카드 수" :value="cardSet.totalCardCount"/>
      <TileCard :activated="false" label="오늘 공부할 카드 수" :value="cardSet.toStudyCardCount"/>
    </div>

    <div class="q-mt-md">
      <q-btn label="입장하기" color="primary" class="full-width" @click="onEnterButtonClick(cardSet.id)"/>
    </div>

  </q-card>
</template>

<script setup lang="ts">

import TileCard from "components/TileCard.vue";
import {useRouter} from "vue-router";
import {useCardSetStore} from "stores/card-set-store";
import {CardSet, labelOfCardSetType} from "src/types/card-set";
import {ref} from "vue";

const router = useRouter();
const cardSetStore = useCardSetStore();

const toggleName = ref(false);
const nameField = ref(null);
const nameFieldValue = ref('');
const toggleDescription = ref(false);
const descriptionField = ref(null);
const descriptionFieldValue = ref<string | undefined>();

const cardSet = defineProps<CardSet>();


const onDeleteButtonClick = async (cardSetId: number) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    await cardSetStore.remove(cardSetId);
  }
}

const onEnterButtonClick = (cardSetId: number) => {
  router.push(`/card-sets/${cardSetId}`);
}

const onNameClick = () => {
  toggleName.value = true;
  nameFieldValue.value = cardSet.name;
  // TODO 포커싱 이벤트 추가해야됨..
}

const onBlurNameField = async () => {
  toggleName.value = false;
  console.log('onBlurNameField', nameFieldValue.value);
  await cardSetStore.updateName(cardSet.id, nameFieldValue.value);
  nameFieldValue.value = '';
}

const onDescriptionClick = () => {
  toggleDescription.value = true;
  descriptionFieldValue.value = cardSet.description;
  // TODO 포커싱 이벤트 추가해야됨..
}

const onBlurDescriptionField = async () => {
  toggleDescription.value = false;
  console.log('onBlurDescriptionField', descriptionFieldValue.value);
  await cardSetStore.updateDescription(cardSet.id, descriptionFieldValue.value || '');
  descriptionFieldValue.value = '';
}

</script>
