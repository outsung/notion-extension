import { WordQuestionList } from "@/components/word";
import { useGetWordList } from "@/hooks/queries/word";

export function WordQuestionScreen() {
  const { data: wordList } = useGetWordList();

  return wordList ? <WordQuestionList wordList={wordList} /> : <h3>로딩중</h3>;
}
