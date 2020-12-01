import React, { useState, useRef, useCallback, useEffect } from "react";
import TodoTemplate from "./component/TodoTemplate";
import TodoInsert from "./component/TodoInsert";
import TodoList from "./component/TodoList";

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({ id: i, text: "할 일" + i, checked: false });
  }
  return array;
}

const App = () => {
  const items = createBulkTodos();
  const [todos, setTodos] = useState(items);
  const nextId = useRef(items.length + 1);

  const onInsert = useCallback((text) => {
    const todo = { id: nextId.current, text, checked: false };
    setTodos((todos) => todos.concat(todo));
    nextId.current = nextId.current + 1;
  }, []);
  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id
          ? // { id: todo.id, text: todo.text, checked: !todo.checked }
            { ...todo, checked: !todo.checked }
          : todo,
      ),
    );
  }, []);

  // useEffect(() => {
  //   console.log(nextId.current);
  //   console.log(todos);
  // });
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}></TodoInsert>
      <TodoList
        todos={todos}
        onRemove={onRemove}
        onToggle={onToggle}
      ></TodoList>
    </TodoTemplate>
  );
};

export default App;
