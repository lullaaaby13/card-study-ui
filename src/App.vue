<template>
  <router-view />
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {Cookies} from "quasar";
import {useAuthStore} from "stores/auth-store";
import MemberApi from "src/api/member";

let authStore = useAuthStore();

onMounted(async () => {
  let accessToken = Cookies.get('accessToken');
  if (accessToken) {
    authStore.currentMember = await MemberApi.currentMember()
  }

});

</script>
