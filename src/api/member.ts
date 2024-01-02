import {api} from "boot/axios";
import {CreateMemberRequest, Member} from "src/types/member";

export async function createMember(request: CreateMemberRequest): Promise<Member> {
  const {data} = await api.post('/api/member', request);
  return data;
}
