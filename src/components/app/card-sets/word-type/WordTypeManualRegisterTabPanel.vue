<template>
  <q-tab-panel name="manual">
    <q-form>
      <q-card-section class="row">
        <div class="col-6 q-pr-sm">
          <q-input
            id="question"
            ref="questionField"
            v-model="question"
            type="textarea"
            outlined
            stack-label
            label="질문"
            lazy-rules
            :rules="[val => !!val || '질문 내용을 입력해 주세요.']"
            @keydown="handleKeyDown"
          />
        </div>
        <div class="col-6 q-pl-sm">
          <q-input
            id="answer"
            ref="answerField"
            v-model="answer"
            type="textarea"
            outlined
            stack-label
            label="정답"
            lazy-rules
            :rules="[val => !!val || '정답 내용을 입력해 주세요.']"
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
import {useWordCardStore} from "stores/word-card-store";
import {CreateWordCardRequest} from "src/types/word-card";

let cardStore = useWordCardStore();

const props = defineProps({
  cardSetId: {
    type: Number,
    required: true,
  },
});

const questionField = ref(null);
const answerField = ref(null);


const question = ref<string>('');
const answer = ref<string>('');

const onSubmit = async () => {
  const request: CreateWordCardRequest = {
    question: question.value,
    answer: answer.value,
    cardSetId: props.cardSetId,
  };

  await cardStore.save(request);
  question.value = '';
  answer.value = '';
  // @ts-ignore
  questionField.value?.focus();
};

const handleKeyDown = (event: KeyboardEvent) => {
  const keyCode = event.keyCode;
  console.log(keyCode)
  event.stopPropagation();
  if (event.ctrlKey && keyCode === 81) {
    // // @ts-ignore
    // console.log(frontField.value?.focus)
    // @ts-ignore
    questionField.value?.focus();
  }
  if (event.ctrlKey && keyCode === 50) {
    // @ts-ignore
    answerField.value?.focus();
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
