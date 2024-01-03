<template>
  <q-page padding class="full-height">
    <div class="row justify-center items-center" style="height: 100vh">
      <div class="col-12 flex justify-center">
        <q-card class="q-pa-lg" style="width: 400px;">

          <q-card-section>
            <div class="text-h4 text-center">로그인</div>
          </q-card-section>

          <q-card-section class="q-gutter-y-md">
            <q-input
              v-model="account"
              type="text"
              label="이메일"
              outlined
              stack-label
              borderless
              bg-color="grey-1"
            />
            <q-input
              v-model="password"
              type="password"
              label="비밀번호"
              outlined
              stack-label
              borderless
              bg-color="grey-1"
            />
          </q-card-section>

          <q-card-actions>
            <q-btn
              label="로그인"
              color="primary"
              size="lg"
              style="width: 100%"
              @click="onSignInClick"
            />
            <div class="full-width flex justify-between text-primary q-mt-md">
              <span class="cursor-pointer">비밀번호 찾기</span>
              <span class="cursor-pointer" @click="onSignUpClick">회원가입</span>
            </div>
          </q-card-actions>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import {useAuthStore} from "stores/auth-store";


let router = useRouter();

let authStore = useAuthStore();

const account = ref('');
const password = ref('');

const onSignInClick = async () => {
  await authStore.signIn({
    account: account.value,
    password: password.value
  });
  router.push('/');
}

const onSignUpClick = () => {
  router.push('/sign-up');
}

</script>

<route lang="yaml">
meta:
  title: SignIn
  layout: default
  guest: true
</route>
