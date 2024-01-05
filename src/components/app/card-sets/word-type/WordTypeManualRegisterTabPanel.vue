<template>
  <q-tab-panel name="manual">
    <q-form>
      <q-card-section class="row">
        <div class="col-6 q-pr-sm">
          <q-input
            id="front"
            ref="frontField"
            v-model="front"
            type="textarea"
            outlined
            stack-label
            label="앞면"
            lazy-rules
            :rules="[val => !!val || '앞면 내용을 입력해주세요.']"
            @keydown="handleKeyDown"
          />
        </div>
        <div class="col-6 q-pl-sm">
          <q-input
            id="back"
            ref="backField"
            v-model="back"
            type="textarea"
            outlined
            stack-label
            label="뒷면"
            lazy-rules
            :rules="[val => !!val || '뒷면 내용을 입력해주세요.']"
            @keydown="handleKeyDown"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn
          color="primary"
          label="등록"
          class="full-width"
          @click="onSubmit"
        />
      </q-card-section>
    </q-form>
  </q-tab-panel>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {useCardStore} from "stores/card-store";
import {CreateCardRequest} from "src/types/card";

let cardStore = useCardStore();

const props = defineProps({
  cardSetId: {
    type: Number,
    required: true,
  },
});

const frontField = ref(null);
const backField = ref(null);
const referenceField = ref(null);

const front = ref<string>('');
const back = ref<string>('');
const reference = ref<string>('');

const onSubmit = async () => {
  const request: CreateCardRequest = {
    front: front.value,
    back: back.value,
    reference: reference.value,
    cardSetId: props.cardSetId,
  };

  await cardStore.save(request);
  front.value = '';
  back.value = '';
  reference.value = '';
  // @ts-ignore
  frontField.value?.focus();
};



const handleKeyDown = (event: KeyboardEvent) => {
  const keyCode = event.keyCode;
  console.log(keyCode)
  event.stopPropagation();
  if (event.ctrlKey && keyCode === 81) {
    // // @ts-ignore
    // console.log(frontField.value?.focus)
    // @ts-ignore
    frontField.value?.focus();
  }
  if (event.ctrlKey && keyCode === 50) {
    // @ts-ignore
    backField.value?.focus();
  }
  if (event.ctrlKey && keyCode === 51) {
    // @ts-ignore
    referenceField.value?.focus();
  }
  if (event.ctrlKey && keyCode === 13) {
    onSubmit();
  }
};


</script>
