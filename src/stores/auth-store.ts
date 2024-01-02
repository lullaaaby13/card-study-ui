import { defineStore } from 'pinia';
import {ref} from "vue";
import {Member} from "src/types/member";
import {updateAuthorisationHeader} from "src/api";
import AuthApi from "src/api/auth";

export const useAuthStore = defineStore('authStore', () => {

  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);
  const currentMember = ref<Member | null>(null);


  const signIn = async ({ account, password }: { account: string, password: string }) => {
    let response = await AuthApi.signIn({ account, password });
    accessToken.value = response.accessToken;
    refreshToken.value = response.refreshToken;
    updateAuthorisationHeader(accessToken.value);
  }

  const logout = () => {
    accessToken.value = null;
    currentMember.value = null;
    updateAuthorisationHeader(accessToken.value);
  }

  return  {
    accessToken,
    currentMember,
    signIn,
    logout,
  }
});
