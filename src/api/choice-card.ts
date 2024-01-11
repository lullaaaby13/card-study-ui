import {CreateWordCardRequest, WordCard} from "src/types/word-card";
import {api} from "boot/axios";
import {ChoiceCard, CreateChoiceCardRequest} from "src/types/choice-card";

export class ChoiceCardApi {
  static async getCards(cardSetId: number): Promise<ChoiceCard[]> {
    const {data} = await api.get('/api/choice-cards', {params: {cardSetId}});
    return data;
  }

  static async createCard(request: CreateChoiceCardRequest): Promise<ChoiceCard> {
    const {data} = await api.post('/api/choice-cards', request);
    return data;
  }

  static async deleteCard(id: number): Promise<void> {
    await api.delete(`/api/choice-cards/${id}`);
  }

  static async createCardByFile(cardSetId: number, file: any): Promise<ChoiceCard[]> {
    let formData = new FormData();
    formData.append('file', file);
    const {data} = await api.post(`/api/choice-cards/file`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, params: { cardSetId } });
    return data;
  }

  static async updateCard(id: number, request: { question?: string, answer?: string }): Promise<ChoiceCard> {
    const {data} = await api.patch(`/api/choice-cards/${id}`, request);
    return data;
  }
}

