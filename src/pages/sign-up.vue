<template>
  <q-page padding class="full-height">
    <div class="row justify-center items-center" style="height: 100vh">
      <div class="col-12 flex justify-center">
        <q-card class="q-pa-lg" style="width: 600px;">
          <q-form>

          <q-card-section>
            <div class="text-h4 text-center">회원가입</div>
          </q-card-section>

          <q-card-section class="q-gutter-y-sm">

            <q-input
              v-model="account"
              type="text"
              label="계정"
              outlined
              stack-label
              borderless
              bg-color="grey-1"
              :rules="[
                val => !!val || '계정을 입력해주세요.',
                val => val.length > 5 || '계정 길이는 최소 6글자 이상입니다.',
                val => isNaN(val[0]) || '계정명은 숫자로 시작할 수 없습니다.',
                ]"
            />
            <q-input
              v-model="password"
              type="password"
              label="비밀번호"
              outlined
              stack-label
              borderless
              bg-color="grey-1"
              :rules="[
                val => !!val || '비밀번호를 입력해주세요.',
                val => val.length > 3 || '비밀번호 길이는 최소 4글자 이상입니다.',
              ]"
            />
            <q-input
              v-model="passwordConfirm"
              type="password"
              label="비밀번호 확인"
              outlined
              stack-label
              borderless
              bg-color="grey-1"
              :rules="[
                val => !!val || '비밀번호 확인을 입력해주세요.',
                val => val.length > 3 || '비밀번호 길이는 최소 4글자 이상입니다.',
                ]"
            />
            <q-input
              v-model="nickname"
              type="text"
              label="닉네임"
              outlined
              stack-label
              borderless
              bg-color="grey-1"
              :rules="[val => !!val || '닉네임 입력해주세요.']"
            />
            <q-input
              v-model="email"
              type="email"
              label="이메일"
              outlined
              stack-label
              borderless
              bg-color="grey-1"
              :rules="[val => validateEmail(val) || '이메일 형식이 아닙니다.']"
            />
          </q-card-section>

          <q-card-actions class="flex justify-center">
            <q-btn
              label="가입하기"
              color="primary"
              size="lg"
              padding="8px 16px"
              @click="onSignUpButtonClick"
              style="min-width: 150px;"
            />
            <q-btn
              label="취소"
              color="grey"
              size="lg"
              padding="8px 16px"
              style="min-width: 150px;"
              to="/login"
            />
          </q-card-actions>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {onUnmounted, ref} from "vue";
import {createMember} from "src/api/member";
import {useRouter} from "vue-router";

let router = useRouter();

const account = ref('');
const password = ref('');
const passwordConfirm = ref('');
const nickname = ref('');
const email = ref('');

const onSignUpButtonClick = async () => {
  if (password.value !== passwordConfirm.value) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }

  await createMember({
    account: account.value,
    password: password.value,
    nickname: nickname.value,
    email: email.value,
  });

  router.push('/login');
}

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

onUnmounted(() => {
  account.value = '';
  password.value = '';
  passwordConfirm.value = '';
  nickname.value = '';
  email.value = '';
});

</script>

<route lang="yaml">
meta:
  title: SignUp
  layout: default
</route>
