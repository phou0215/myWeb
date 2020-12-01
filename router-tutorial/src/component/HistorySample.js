import React, { useCallback } from "react";

const HistorySample = ({ history }) => {
  const onGoBack = useCallback(() => {
    const flag = window.confirm("정말로 이 페이지에서 나가시겠습니까?");
    if (flag) {
      history.goBack();
    }
  }, []);
  const onGoHome = useCallback(() => {
    const flag = window.confirm("정말로  홈으로 이동하시겠습니까?");
    if (flag) {
      history.push("/");
    }
  }, []);

  return (
    <div>
      <button onClick={onGoBack}>뒤로</button>
      <button onClick={onGoHome}>홈으로</button>
    </div>
  );
};

export default React.memo(HistorySample);
