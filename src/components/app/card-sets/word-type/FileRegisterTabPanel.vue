<template>
  <q-tab-panel :name="name">
    <q-form class="q-gutter-y-md">
      <q-input
        :model-value="fileTemplate"
        disable
        type="textarea"
        label="텍스트 파일 예시"
        stack-label
        autogrow
      />
      <q-input
        v-model="fileFiled"
        filled
        type="file"
      />
      <q-btn
        color="primary"
        label="등록"
        class="full-width"
        @click="onRegisterButtonClick"
      />
    </q-form>
  </q-tab-panel>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useWordCardStore} from "stores/word-card-store";
import {WordCardApi} from "src/api/word-card";

let cardStore = useWordCardStore();
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  cardSetId: {
    type: Number,
    required: true,
  },
  fileTemplate: {
    type: String,
    required: true,
  },
});


const fileFiled = ref(null);

const onRegisterButtonClick = async () => {
  if (fileFiled.value) {
    const wordCards = await WordCardApi.createCardByFile(props.cardSetId, fileFiled.value[0]);
    fileFiled.value = null;
    wordCards.forEach((wordCard) => {
      cardStore.add(wordCard);
    });
    alert(`${wordCards.length} 개의 카드가 등록되었습니다.`)
  }
}

</script>
