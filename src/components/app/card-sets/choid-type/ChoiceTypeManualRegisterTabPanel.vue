<template>
  <q-tab-panel :name="name">
  <q-form class="row q-gutter-y-md">
    <div class="col-6 q-pr-sm">
      <q-input
        v-model="question"
        type="textarea"
        outlined
        stack-label
        label="문제"
        lazy-rules
        :rules="[val => !!val || '문제 내용을 입력해주세요.']"
      />
    </div>
    <div class="col-6">
      <q-input
        v-model="answer"
        type="textarea"
        outlined
        stack-label
        label="해설"
        lazy-rules
        :rules="[val => !!val || '해설 내용을 입력해주세요.']"
      />
    </div>
    <div class="col-12">
      <div class="q-gutter-y-sm">
        <ChoiceTypeSelectionField
          v-for="(choice, index) in choices" :key="index"
          :label="`${choice.order}.`"
          :choice="choice"
          @update="onChoiceUpdated(choice, $event)"
        />
      </div>
    </div>

    <div class="full-width">
      <q-btn
        color="primary"
        label="등록"
        size="lg"
        class="full-width"
        @click="onRegisterButtonClick"
      />
    </div>
  </q-form>

  </q-tab-panel>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {Choice} from "src/types/word-card";
import ChoiceTypeSelectionField from "components/app/card-sets/choid-type/ChoiceTypeSelectionField.vue";

defineProps({
  name: {
    type: String,
    required: true,
  },
  cardSetId: {
    type: Number,
    required: true,
  },
});

const question = ref('');
const answer = ref('');
const choices = ref<Choice[]>([
  {
    order: 1,
    value: '',
    isAnswer: false,
  },
  {
    order: 2,
    value: '',
    isAnswer: false,
  },
  {
    order: 3,
    value: '',
    isAnswer: false,
  },
  {
    order: 4,
    value: '',
    isAnswer: false,
  },
  {
    order: 5,
    value: '',
    isAnswer: false,
  }
]);

const onChoiceUpdated = (choice: Choice, updated: { value?: string, isCorrect?: boolean}) => {
  if (updated.value) {
    choice.value = updated.value;
  }
  if (updated.isCorrect) {
    choice.isAnswer = updated.isCorrect;
  }
};

const onRegisterButtonClick = () => {
  console.log(question.value);
  console.log(answer.value);
  console.log(choices.value);
  // TODO 등록 요청

};

</script>
