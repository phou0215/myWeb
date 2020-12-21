import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {createRequestActionTypes, createLogoutSaga} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as apiAuth from '../lib/api/auth';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestActionTypes('user/LOGOUT');

//로그인 유지를 위한 action
export const tempUser = createAction(TEMP_SET_USER, (user)=> {return user});
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, apiAuth.check);
const logoutSaga = createLogoutSaga(LOGOUT, apiAuth.logout);

export function* userSaga(){
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}

const initState = {
    user:null,
    checkError:null,
    logoutError:null
}

const userData = handleActions({
    [TEMP_SET_USER]: (state, {payload:user})=> produce(state,(draft)=>{
        draft['user'] = user;
    }),
    [LOGOUT_SUCCESS]:(state, {payload:user}) => produce(state,(draft) =>{
        draft['user'] = null;
    }),
    [LOGOUT_FAILURE]:(state, {payload:error}) => produce(state,(draft) =>{
        draft['user'] = null;
        draft['logoutError'] = error;
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