import { createAPIService } from "@/axios";

export interface Word {
  _id: string;
  영어: string;
  한국어: string;
  틀린횟수: string;
  외움: "Done";
}

export interface WordEntity {
  id: string;
  eng: string;
  kor: string;
  wrongCount: number;
  state: "Done";
}

export interface getWordListRes {
  rows: Word[];
}

export const getWordList = createAPIService<getWordListRes>()({
  config: { method: "GET", url: "/words" },
});
