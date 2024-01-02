export interface Member {
  id: number;
  account: string;
  nickname: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMemberRequest {
  account: string;
  password: string;
  nickname: string;
  email: string;
}
