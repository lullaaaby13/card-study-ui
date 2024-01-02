import {api} from "boot/axios";

export function updateAuthorisationHeader(token: string | null) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
