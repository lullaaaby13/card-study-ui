import {defineStore} from 'pinia';
import {computed, ref} from "vue";
import {Member} from "src/types/member";
import {clearAuthorizationHeader} from "src/api";
import AuthApi from "src/api/auth";
import {Cookies} from "quasar";
import MemberApi from "src/api/member";

export const useAuthStore = defineStore('authStore', () => {

  const currentMember = ref<Member | null>(null);

  const signIn = async ({ account, password }: { account: string, password: string }) => {
    let { accessToken, refreshToken} = await AuthApi.signIn({ account, password });
    Cookies.set('accessToken', accessToken, { expires: '1h' });
    Cookies.set('refreshToken', refreshToken, { expires: '14d' });
    currentMember.value = await MemberApi.currentMember();
  }


  const signOut = () => {
    clearAuthorizationHeader();
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    currentMember.value = null;
  }

  const isSignedIn = computed(() => !!currentMember.value);

  return  {
    currentMember,
    signIn,
    signOut,
    isSignedIn,
  }
});
