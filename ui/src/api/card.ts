import {Card, CreateCardRequest} from "src/types/card";
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

export async function createCardByFile(cardSetId: number, file: any): Promise<Card[]> {
  let formData = new FormData();
  // formData.append('cardSetId', String(cardSetId));
  formData.append('file', file);
  const {data} = await api.post(`/api/cards/file`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, params: { cardSetId } });
  return data;
}

export async function updateCard(id: number, request: { front?: string, back?: string }): Promise<Card> {
  const {data} = await api.patch(`/api/cards/${id}`, request);
  return data;
}
