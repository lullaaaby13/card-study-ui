import {api} from "boot/axios";
import {CardSet, CardSetType} from "src/types/card-set";

export async function getCardSets() : Promise<CardSet[]>{
  const { data } = await api.get('/api/card-sets');
  return data;
}

export async function addCardSet(request: AddCardSetRequest) {
  const {data} = await api.post('/api/card-sets', request);
  return data;
}

export async function deleteCardSet(id: number) {
  const {data} = await api.delete(`/api/card-sets/${id}`);
  return data;
}

export async function updateCardSet(id: number, request: { name: string, description?: string}): Promise<CardSet> {
  const {data} = await api.put(`/api/card-sets/${id}`, request);
  return data;
}

export interface AddCardSetRequest {
  type: CardSetType;
  name: string;
  description?: string;
}
