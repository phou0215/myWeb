import React, { Fragment, useCallback, useMemo, useState, useRef } from "react";

function getAverage(numbers) {
  console.log("평균값 계산");
  if (numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((acc, cur) => {
    return acc + cur;
  });
  return sum / numbers.length;
}

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const [size, setSize] = useState(0);
  const inputEl = useRef();

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []);

  const onInsert = useCallback(() => {
    if (number === null || number === "") {
      alert("등록하실 값을 입력한 후 등록 버튼을 선택해주세요");
      inputEl.current.focus();
      return;
    }
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setSize(nextList.length);
    setNumber("");
    inputEl.current.focus();
  }, [number, list]);

  const onReset = useCallback(() => {
    const ResetFlag = window.confirm("데이터를 초기화 하시겠습니까?");
    if (ResetFlag) {
      setList([]);
      setSize(0);
      setNumber("");
      alert("초기화 되었습니다.");
    } else {
      return;
    }
  }, []);

  const avg = useMemo(() => {
    return getAverage(list);
  }, [list]);

  return (
    <div>
      <input ref={inputEl} value={number} onChange={onChange}></input>
      <button onClick={onInsert}>등록</button>
      <button onClick={onReset}>초기화</button>
      <ul>
        {size !== 0 ? (
          list.map((value, index) => {
            return (
              <Fragment>
                <li key={index}>{value}</li>
                <hr></hr>
              </Fragment>
            );
          })
        ) : (
          <Fragment></Fragment>
        )}
      </ul>
      <div>
        <b>평균값 : {avg} </b>
      </div>
    </div>
  );
};

export default Average;
