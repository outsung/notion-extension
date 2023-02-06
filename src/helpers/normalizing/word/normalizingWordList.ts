import { Word, WordEntity } from "@/services/word";
import { normalizingWord } from "./normalizingWord";

export function normalizingWordList(wordList: Word[]): WordEntity[] {
  return wordList.map((word) => normalizingWord(word));
}
