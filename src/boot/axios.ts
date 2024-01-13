import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import {clearAuthorizationHeader} from "src/api";
import {Cookies} from "quasar";

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
let url = process.env.DEV ? process.env.DEV_API : process.env.PROD_API;
console.log('isDevelopment: ', process.env.DEV);
console.log('API URL: ', url);
const api = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Accept': '*',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = Cookies.get('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${Cookies.get('accessToken')}`;
  }
  return config;
});

api.interceptors.response.use((response) => {
  return response;
}, error =>  {

  if (error.response?.status === 401 || error.response?.status === 403) {
    clearAuthorizationHeader()
    Cookies.remove('accessToken');
  }
  return Promise.reject(error);
});



export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
