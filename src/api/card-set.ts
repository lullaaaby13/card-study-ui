import {api} from "boot/axios";

export async function getCardSets() {
  const { data } = await api.get('/api/card-sets');
  console.log();
  return data;
}

export async function addCardSet(request: { name: string, description?: string}) {
  const {data} = await api.post('/api/card-sets', request);
  return data;
}

export async function deleteCardSet(id: number) {
  const {data} = await api.delete(`/api/card-sets/${id}`);
  return data;
}
