<template>
  <BaseCard width="100%">
    <q-splitter v-model="splitter">
      <template v-slot:before>
        <q-tabs v-model="tab"
                align="left"
                vertical
        >
          <q-tab name="manual" icon="edit" label="직접 입력"/>
          <q-tab name="file" icon="description" label="파일"/>
        </q-tabs>
      </template>
      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <ManualRegisterTabPanel name="manual" :card-set-id="cardSet.id" style="min-height: 300px;"/>
          <FileRegisterTabPanel
            name="file"
            :card-set-id="cardSet.id"
            :file-template="fileTemplate"
            style="min-height: 300px;"
          />
        </q-tab-panels>
      </template>
    </q-splitter>
  </BaseCard>
</template>

<script setup lang="ts">

import FileRegisterTabPanel from "components/app/card-sets/FileRegisterTabPanel.vue";
import ManualRegisterTabPanel from "components/app/card-sets/word-type/WordTypeManualRegisterTabPanel.vue";
import {ref} from "vue";
import {useCardStore} from "stores/card-store";
import {useStudyCardStore} from "stores/study-card-store";
import CardSet from "src/types/card-set";
import BaseCard from "components/BaseCard.vue";

const cardStore = useCardStore();
const studyCardStore = useStudyCardStore();
const { cardSet } = defineProps<{ cardSet: CardSet }>();
const splitter = ref(8);
const tab = ref("manual");

const loadStudyCards = (optionValue: string) => {
  let cards = cardStore.cards;
  if (optionValue === 'ToStudy') {
    studyCardStore.load(cardStore.toStudyCards);
  } else {
    studyCardStore.load(cards.filter(card => card.memorizationLevel === optionValue));
  }
}

const fileTemplate = ref(`
apple
n. 사과
@@
banana
n. 바나나
@@
`);

</script>
