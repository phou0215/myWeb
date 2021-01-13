import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {createRequestActionTypes} from '../lib/createRequestSaga';
import * as postAPI from "../lib/api/post";
import produce from "immer";
import {takeLatest} from "redux-saga/effects";

const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] = createRequestActionTypes('post/READ_POST');
const [DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE] = createRequestActionTypes('post/DELETE_POST');
const UNLOAD_POST = 'post/UNLOAD_POST';

export const readPost = createAction(READ_POST, (id)=> {return id});
export const deletePost = createAction(DELETE_POST, (id)=>{return id});
export const unloadPost = createAction(UNLOAD_POST);

const readPostSaga = createRequestSaga(READ_POST, postAPI.readPost);
const deletePostSaga = createRequestSaga(DELETE_POST, postAPI.deletePost);

export function* postSaga() {
    yield takeLatest(READ_POST, readPostSaga);
    yield takeLatest(DELETE_POST, deletePostSaga);
}

const initState = {
    post: null,
    deleteResult:null,
    postError:null,
    deleteError: null,
}

const post = handleActions({
    [READ_POST_SUCCESS]: (state, {payload:post}) => produce(state,(draft)=>{
        draft['post'] = post;
        draft['postError'] = null;
    }),
    [READ_POST_FAILURE]: (state, {payload:postError}) => produce(state,(draft)=>{
        draft['postError'] = postError;
        draft['post'] = null;
    }),
    [DELETE_POST_SUCCESS]: (state, {payload:deleteResult}) => produce(state, (draft)=>{
        draft['deleteResult'] = deleteResult;
        draft['deleteError'] = null;
    }),
    [DELETE_POST_FAILURE]: (state, {payload:deleteError}) => produce(state, (draft)=>{
        draft['deleteError'] = deleteError;
        draft['deleteResult'] = null;
    }),
    [UNLOAD_POST]: (state) => initState,
}, initState);

export default post;