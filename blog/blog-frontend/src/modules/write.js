import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/post';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE'; //모든 내용 초기화
const CHNAGE_FIELD = 'write/CHANGE_FILED'; //특정 키 값 바꾸기

const [
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_POST');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHNAGE_FIELD, ({ key, value }) => {
  return { key, value };
});
export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => {
  return { title, body, tags };
});

//Saga 생성
const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);
export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
}

const initState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
};

const write = handleActions(
  {
    [INITIALIZE]: (state) => initState,
    [CHNAGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft[key] = value;
      }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) =>
      produce(state, (draft) => {
        draft['post'] = post;
      }),
    [WRITE_POST_FAILURE]: (state, { payload: postError }) =>
      produce(state, (draft) => {
        draft['postError'] = postError;
      }),
  },
  initState,
);

export default write;
