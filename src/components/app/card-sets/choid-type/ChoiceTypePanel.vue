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
        <q-tab-panels v-model="tab">
          <ChoiceTypeManualRegisterTabPanel
            name="manual"
            :card-set-id="cardSet.id"
          />
          <FileRegisterTabPanel
            name="file"
            :file-template="fileTemplate"
            :card-set-id="cardSet.id"
            />
        </q-tab-panels>
      </template>
    </q-splitter>
  </BaseCard>
</template>

<script setup lang="ts">

import BaseCard from "components/BaseCard.vue";
import {ref} from "vue";
import {CardSet} from "src/types/card-set";
import FileRegisterTabPanel from "components/app/card-sets/FileRegisterTabPanel.vue";
import ChoiceTypeManualRegisterTabPanel from "components/app/card-sets/choid-type/ChoiceTypeManualRegisterTabPanel.vue";

const { cardSet } = defineProps<{ cardSet: CardSet }>();
const splitter = ref(8);
const tab = ref('manual');
const fileTemplate = ref(`
  Customer reviews indicate that many modern mobile devices are often unnecessarily ____.
  1. complication
  2. complicates
  3. complicate
  4. complicated
  - Answer of the question.
  @@
  Customer reviews indicate that many modern mobile devices are often unnecessarily ____.
  1. complication
  2. complicates
  3. complicate
  4. complicated
  - Answer of the question.
  @@
`);

</script>
