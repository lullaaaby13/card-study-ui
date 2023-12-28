<template>
  <q-tab-panel>
    <q-form>
      <q-input
        v-model="fileFiled"
        filled
        type="file"
      />
      <q-card-section>
        <q-btn
          color="primary"
          label="등록"
          class="full-width"
          @click="onRegisterButtonClick"
        />
      </q-card-section>
    </q-form>
  </q-tab-panel>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {createCardByFile} from "src/api/card";
import {useCardStore} from "stores/card-store";

let cardStore = useCardStore();
const props = defineProps({
  cardSetId: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(['loadStudyCards']);

const fileFiled = ref(null);

const onRegisterButtonClick = async () => {
  if (fileFiled.value) {
    await createCardByFile(props.cardSetId, fileFiled.value[0]);
    fileFiled.value = null;
    await cardStore.fetchAll(props.cardSetId);
    emits('loadStudyCards');
  }
}

</script>
