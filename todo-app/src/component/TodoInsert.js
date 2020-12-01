import React, { useCallback, useState, useRef } from "react";
import { MdAdd } from "react-icons/md";
import "./TodoInsert.scss";

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue("");
      // onRef.current.focus();
      e.preventDefault();
    },
    [onInsert, value],
  );
  const onRef = useRef(null);

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="해야 할 일"
        value={value}
        onChange={onChange}
        ref={onRef}
      ></input>
      <button type="summit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
