import { produce } from 'immer';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

const initState = {
  number: 0,
};

function counter(state = initState, action) {
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
}

export const increase = () => {
  return { type: INCREASE };
};
export const decrease = () => {
  return { type: DECREASE };
};

export default counter;
