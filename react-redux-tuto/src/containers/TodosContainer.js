import React, { useCallback } from 'react';
import Todos from '../components/Todos';
import { useSelector, useDispatch } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { changeInput, toggle, insert, remove } from '../modules/todos';

// const TodosContainer = ({
//   input,
//   todos,
//   changeInput,
//   insert,
//   toggle,
//   remove,
// }) => {
//   return (
//     <Todos
//       input={input}
//       todos={todos}
//       onChangeInput={changeInput}
//       onInsert={insert}
//       onToggle={toggle}
//       onRemove={remove}
//     ></Todos>
//   );
// };

// const mapStateToProps = (state) => ({
//   input: state.todos.input,
//   todos: state.todos.todos,
// });
// const mapActionToProps = (dispatch) =>
//   bindActionCreators({ changeInput, toggle, insert, remove }, dispatch);

// const makeConnector = connect(mapStateToProps, mapActionToProps);

// export default makeConnector(TodosContainer);

const TodosContainer = () => {
  const { input, todos } = useSelector((state) => ({
    input: state.todos.input,
    todos: state.todos.todos,
  }));
  const dispatch = useDispatch();
  const onChangeInput = useCallback((text) => dispatch(changeInput(text)), [
    dispatch,
  ]);
  const onInsert = useCallback((text) => dispatch(insert(text)), [dispatch]);
  const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);
  const onRemove = useCallback((id) => dispatch(remove(id)), [dispatch]);
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    ></Todos>
  );
};

export default React.memo(TodosContainer);
