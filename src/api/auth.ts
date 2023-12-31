import {api} from "boot/axios";
import {Member} from "src/types/member";

export default class AuthApi {
  static async signIn(request: { account: string, password: string }): Promise<{ accessToken: string, refreshToken: string }> {
    const {data} = await api.post('/api/auth/sign-in', request);
    return data;
  }

}
