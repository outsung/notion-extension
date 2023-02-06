import { Word, WordEntity } from "@/services/word";

export function normalizingWord(word: Word): WordEntity {
  return {
    id: word._id,
    eng: word.영어,
    kor: word.한국어,
    state: word.외움,
    wrongCount: Number(word.틀린횟수),
  };
}
