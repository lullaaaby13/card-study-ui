<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-2">
    <q-header elevated class="bg-primary">
      <q-toolbar class="flex justify-end">
<!--        <q-btn flat round dense icon="menu" class="q-mr-sm" />-->
<!--        <q-avatar>-->
<!--          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">-->
<!--        </q-avatar>-->
<!--        <q-toolbar-title>Quasar Framework</q-toolbar-title>-->

        <q-btn label="로그인" color="primary" v-if="!authStore.isSignedIn" to="/sign-in"/>

        <q-btn-dropdown
          v-if="authStore.isSignedIn"
          flat
          color="black"
          :label="authStore.currentMember?.nickname"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">설정</div>
              <q-btn flat label="회원 정보 수정" />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">{{authStore.currentMember?.nickname}}</div>

              <q-btn
                color="primary"
                label="로그아웃"
                push
                size="md"
                @click="onSignOutClick"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showErrorDialog">
      <q-card class="q-pa-md" style="min-width: 350px; max-width: 500px;">
        <q-card-section>{{errorMessage}}</q-card-section>
        <q-card-actions class="flex justify-end">
          <q-btn label="확인" color="primary" @click="showErrorDialog = false"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">

import {onErrorCaptured, onMounted, ref} from "vue";
import {AxiosError} from "axios";
import {useAuthStore} from "stores/auth-store";
import {useRouter} from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const showErrorDialog = ref(false);
const errorMessage = ref('');


const onSignOutClick = () => {
  authStore.signOut();
  router.push('/sign-in');
};

onMounted(() => {

});

onErrorCaptured( (err, instance, info) => {
  showErrorDialog.value = true;
  if (err instanceof AxiosError && err.response) {
    errorMessage.value = err.response.data.message;
  } else {
    errorMessage.value = err.message;
  }
  console.error(err.message, err);
  return false;
});


</script>
