import React, { useRef, useCallback, useState } from "react";
import produce from "immer";

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: "", username: "" });
  const [data, setData] = useState({ array: [], uselessValue: null });
  //수정을 위한 함수
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(
      produce((draft) => {
        draft[name] = value;
      })
    );
  }, []);
  // form 등록을 위한 함수
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };
      setData(
        produce((draft) => {
          draft.array.push(info);
        })
      );
      setForm({ name: "", username: "" });
      nextId.current += 1;
    },
    [form.name, form.username]
  );
  //항목을 삭제하는 함수
  const onRemove = useCallback((id) => {
    setData(
      produce((draft) => {
        // draft.array.filter((info) => info.id !== id);
        draft.array.splice(draft.array.findIndex((info) => info.id === id));
      })
    );
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          data_key="temper123adg#1"
          name="username"
          placeholder="아이디 입력"
          value={form.username}
          onChange={onChange}
        />
        <input
          data_key="temper123adg#2"
          name="name"
          placeholder="이름 입력"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">Add</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li
              key={info.id}
              onClick={() => {
                onRemove(info.id);
              }}
            >
              {info.username}({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default React.memo(App);
