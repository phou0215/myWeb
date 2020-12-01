import produce from 'immer';

const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋값을 변경
const INSERT = 'todos/INSERT'; // todo 삽입
const TOGGLE = 'todos/TOGGLE'; // todo 체크/해제
const REMOVE = 'todos/REMOVE'; // todo 삭제
let id = 3;

export const changeInput = (input) => {
  return { type: CHANGE_INPUT, input };
};
export const insert = (text) => {
  return {
    type: INSERT,
    todo: {
      id: id++,
      text,
      done: false,
    },
  };
};
export const toggle = (id) => {
  return { type: TOGGLE, id };
};
export const remove = (id) => {
  return { type: REMOVE, id };
};
const initState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: true,
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false,
    },
  ],
};

// function todos(state = initState, action) {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return { ...state, input: action.input };
//     case INSERT:
//       return { ...state, todos: state.todos.concat(action.todo) };
//     case TOGGLE:
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.id ? { ...todo, done: !todo.done } : todo,
//         ),
//       };
//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => todo.id !== action.id),
//       };
//     default:
//       return state;
//   }
// }

function todos(state = initState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_INPUT:
        draft.input = action.input;
        break;
      case INSERT:
        draft.todos.push(action.todo);
        break;
      case TOGGLE:
        draft.todos[action.id - 1].done = !draft.todos[action.id - 1].done;
        break;
      case REMOVE:
        delete draft.todos[action.id - 1];
        break;
      default:
        return state;
    }
  });
}

export default todos;
