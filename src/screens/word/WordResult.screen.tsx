import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export function WordResultScreen() {
  const navigate = useNavigate();

  return (
    <>
      <h3>퀴즈 결과</h3>

      <h3>{`'그저 그렇네요.'`}</h3>

      <Button size="large" onClick={() => navigate("/word")}>
        메인으로
      </Button>
    </>
  );
}
