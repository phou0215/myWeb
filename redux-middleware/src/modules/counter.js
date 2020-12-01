import React from "react";
import { produce } from "immer";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

const increase = () => {
  return { type: INCREASE };
};

const decrease = () => {
  return { type: DECREASE };
};

const initState = {
  number: 0,
};

export const increaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};

export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};

const counter = (state = initState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case INCREASE:
        draft.number = draft.number + 1;
        break;
      case DECREASE:
        draft.number = draft.number - 1;
        break;
      default:
        break;
    }
  });
};

export default counter;
