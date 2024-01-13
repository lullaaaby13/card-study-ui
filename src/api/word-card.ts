import {CreateWordCardRequest, WordCard} from "src/types/word-card";
import {api} from "boot/axios";

export class WordCardApi {
  static async getCards(cardSetId: number): Promise<WordCard[]> {
    const {data} = await api.get('/api/word-cards', {params: {cardSetId}});
    return data;
  }

  static async createCard(request: CreateWordCardRequest): Promise<WordCard> {
    const {data} = await api.post('/api/word-cards', request);
    return data;
  }

  static async deleteCard(id: number): Promise<void> {
    await api.delete(`/api/word-cards/${id}`);
  }

  static async createCardByFile(cardSetId: number, file: any): Promise<WordCard[]> {
    let formData = new FormData();
    formData.append('file', file);
    const {data} = await api.post(`/api/word-cards/file`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, params: { cardSetId } });
    return data;
  }

  static async updateCard(id: number, request: { question?: string, answer?: string}): Promise<WordCard> {
    const {data} = await api.patch(`/api/word-cards/${id}`, request);
    return data;
  }
}
