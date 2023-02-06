import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export function WordMainScreen() {
  const navigate = useNavigate();

  return (
    <>
      <h1>영어단어장 With Notion</h1>
      <Button size="large" onClick={() => navigate("/word/question")}>
        시작하기!
      </Button>
    </>
  );
}
