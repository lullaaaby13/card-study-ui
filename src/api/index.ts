import {api} from "boot/axios";

export function updateAuthorizationHeader(token: string | null) {
  if (!token) {
    clearAuthorizationHeader();
  } else {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}

export function clearAuthorizationHeader() {
  api.defaults.headers['Authorization'] = null;
  console.log('clearAuthorizationHeader', api.defaults.headers)
}

export function requestTemplate() {

}
