import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/post';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE'; //모든 내용 초기화
const CHNAGE_FIELD = 'write/CHANGE_FILED'; //특정 키 값 바꾸기
const SET_ORIGINAL_POST = 'write/SET_ORIGIAL_POST'; //UPDATE 내용 글 수정

const [
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
] = createRequestActionTypes('write/UPDATE_POST');

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
export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => {
  return post;
});

export const updatePost = createAction(
  UPDATE_POST,
  ({ id, title, body, tags }) => {
    return { id, title, body, tags };
  },
);

//Saga 생성
const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postAPI.updatePost);

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

const initState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
  originalPostId: null,
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
    [SET_ORIGINAL_POST]: (state, { payload: post }) =>
      produce(state, (draft) => {
        draft['title'] = post.title;
        draft['body'] = post.body;
        draft['tags'] = post.tags;
        draft['originalPostId'] = post._id;
      }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) =>
      produce(state, (draft) => {
        draft['post'] = post;
      }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) =>
      produce(state, (draft) => {
        draft['postError'] = postError;
      }),
  },
  initState,
);

export default write;
