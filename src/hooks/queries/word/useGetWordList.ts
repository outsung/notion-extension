import { useQuery } from "@tanstack/react-query";

import { normalizingWordList } from "@/helpers/normalizing/word";

import { getWordList } from "@/services/word";

export function useGetWordList() {
  const res = useQuery(["getWordList"], async () => {
    const { rows } = await getWordList();
    return normalizingWordList(rows).sort(() => Math.random() - 0.5);
  });

  return res;
}
