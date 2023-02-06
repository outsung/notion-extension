import { useState } from "react";
import { notification, Input, Button } from "antd";

import { WordEntity } from "@/services/word";

interface WordQuestionItemProps {
  word: WordEntity;
  next: () => void;
}
export function WordQuestionListItem({ word, next }: WordQuestionItemProps) {
  const [answer, setAnswer] = useState("");

  const submit = () => {
    setAnswer("");

    if (word.eng === answer) {
      notification.success({ message: "맞춤!" });
    } else {
      notification.error({
        message: "틀림",
        description: `정답은 '${word.eng}'`,
      });
    }

    next();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
        width: "70%",
      }}
    >
      <h2>{word.kor}</h2>

      <Input
        style={{ margin: "64px 0px" }}
        size="large"
        placeholder="정답"
        value={answer}
        onChange={({ target }) => setAnswer(target.value)}
        onKeyPress={(e) => {
          const { code, shiftKey, keyCode } = e;

          if (!shiftKey && (keyCode === 13 || code === "Enter")) {
            e.preventDefault();
            e.stopPropagation();
            submit();
            return;
          }
        }}
      />

      <Button
        type="primary"
        size="large"
        onClick={submit}
        disabled={!answer}
        style={{ width: "100%" }}
      >
        제출
      </Button>
    </div>
  );
}
