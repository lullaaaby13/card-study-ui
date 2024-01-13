import {api} from "boot/axios";

export default class StudyApi {
  static async AddStudyResult(cardSetId: number, cardId: number, studyResult: 'CORRECT' | 'WRONG') {
    const { data } = await api.post('/api/study', { cardSetId, cardId, studyResult } );
    return data;
  }
}

