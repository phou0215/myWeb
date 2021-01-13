import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/post';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_POSTS,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAILURE,
] = createRequestActionTypes('/posts/LIST_POSTS');

export const listPosts = createAction(LIST_POSTS, ({ tag, username, page }) => {
  return { tag, username, page };
});
const listPostsSaga = createRequestSaga(LIST_POSTS, postAPI.listPosts);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}
const initState = {
  posts: null,
  postsError: null,
  page:1,
};

const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts, meta:response }) =>
      produce(state, (draft) => {
        draft['posts'] = posts;
        draft['page'] = parseInt(response.headers['Last-Page'],10);
      }),
      
    [LIST_POSTS_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft['postsError'] = error;
      }),
  },
  initState,
);

export default posts;
