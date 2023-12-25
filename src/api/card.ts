import Card, {CreateCardRequest} from "src/types/card";
import {api} from "boot/axios";

export async function getCards(cardSetId: number): Promise<Card[]> {
  const {data} = await api.get('/api/cards', {params: {cardSetId}});
  return data;
}

export async function createCard(request: CreateCardRequest): Promise<Card> {
  const {data} = await api.post('/api/cards', request);
  return data;
}

export async function deleteCard(id: number): Promise<void> {
  await api.delete(`/api/cards/${id}`);
}
