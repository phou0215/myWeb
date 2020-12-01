import React, { useCallback, useEffect } from "react";
import { List } from "react-virtualized";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        ></TodoListItem>
      );
    },
    [onRemove, onToggle, todos],
  );
  return (
    <List
      className="TodoList"
      width={512}
      height={513}
      rowHeight={57}
      rowCount={todos.length}
      rowRenderer={rowRenderer}
      list={todos}
      style={{ outline: "none" }}
    ></List>
  );
};

export default React.memo(TodoList);
