import {api} from "boot/axios";
import {CreateMemberRequest, Member} from "src/types/member";

export default class MemberApi {
  static async createMember(request: CreateMemberRequest): Promise<Member> {
    const {data} = await api.post('/api/member', request);
    return data;
  }

  static async currentMember(): Promise<Member> {
    const {data} = await api.get('/api/member/current');
    return data;
  }
}


