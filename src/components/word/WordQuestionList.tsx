import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

import { WordEntity } from "@/services/word";
import { WordQuestionListItem } from "./WordQuestionListItem";

interface WordQuestionListProps {
  wordList: WordEntity[];
}
export function WordQuestionList({ wordList }: WordQuestionListProps) {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const word = useMemo(() => {
    step === wordList.length;

    return wordList[step] || null;
  }, [wordList, step]);

  useEffect(() => {
    if (!word) {
      navigate("/word/result");
      notification.info({ message: "끝" });
    }
  }, [word, navigate]);

  return (
    <>
      <h3>
        ({step + 1}/{wordList.length})
      </h3>

      {!!word && (
        <WordQuestionListItem
          word={word}
          next={() => {
            setStep((prev) => prev + 1);
          }}
        />
      )}
    </>
  );
}
