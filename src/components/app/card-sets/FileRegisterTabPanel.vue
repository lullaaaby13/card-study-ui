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
import {createCardByFile} from "src/api/card";
import {useCardStore} from "stores/card-store";

let cardStore = useCardStore();
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
    await createCardByFile(props.cardSetId, fileFiled.value[0]);
    fileFiled.value = null;
    await cardStore.fetchAll(props.cardSetId);
  }
}

</script>
