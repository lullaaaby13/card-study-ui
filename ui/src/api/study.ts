import {api} from "boot/axios";

export async function AddStudyResult(cardId: number, studyResult: 'CORRECT' | 'WRONG') {
  const { data } = await api.post('/api/study', { cardId, studyResult } );
  return data;
}
