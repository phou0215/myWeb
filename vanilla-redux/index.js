import { createStore } from "redux";

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

//**action 함수**//
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });
//**//

//초기값
const initState = {
  toggle: false,
  counter: 0,
};

//reducer
function reducer(state = initState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return { ...state, toggle: !state.toggle };
    case INCREASE:
      return { ...state, counter: state.counter + action.difference };
    case DECREASE:
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}

//리듀스 함수를 넣어 스토어 만들기
const store = createStore(reducer);

//랜더 함수 만들기
const render = () => {
  const state = store.getState();
  //토글 처리
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }

  //카운터 처리
  counter.innerText = state.counter;
};

// render 함수 실행
render();
// 스토어 랜더 구독 실행
store.subscribe(render);

divToggle.onClick = () => {
  store.dispatch(toggleSwitch());
};

btnIncrease.onClick = () => {
  store.dispatch(increase(1));
};

btnDecrease.onClick = () => {
  store.dispatch(decrease());
};
