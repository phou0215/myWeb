import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {createRequestActionTypes} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as apiAuth from '../lib/api/auth';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');
//로그인 유지를 위한 action
export const tempUser = createAction(TEMP_SET_USER, (user)=> {return user});
export const check = createAction(CHECK);

const checkSaga = createRequestSaga(CHECK, apiAuth.check);

export function* userSaga(){
    yield takeLatest(CHECK, checkSaga);
}

const initState = {
    user:null,
    checkError:null
}

const userData = handleActions({
    [TEMP_SET_USER]: (state, {payload:user})=> produce(state,(draft)=>{
        draft['user'] = user;
    }),
    [CHECK_SUCCESS]:(state,{payload:user})=> produce(state,(draft)=>{
        draft['user'] = user;
        draft['checkError'] = null;
    }),
    [CHECK_FAILURE]:(state,{payload:error})=> produce(state,(draft)=>{
        draft['user'] = null;
        draft['checkError'] = error;
    })
},initState);

export default userData;