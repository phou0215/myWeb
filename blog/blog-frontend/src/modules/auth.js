import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as apiAuth from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INIT_FORM = 'auth/INIT_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => {
    return {
      form, //register , login
      key, //username, password, passwordConfirm
      value, // 실제 바꾸려는 값
    };
  },
);
export const initForm = createAction(INIT_FORM, (form) => {
  return form;
});
export const register = createAction(REGISTER, ({ username, password }) => {
  return { username, password };
});
export const login = createAction(LOGIN, ({ username, password }) => {
  return { username, password };
});

//Saga 생성
const registerSaga = createRequestSaga(REGISTER, apiAuth.register);
const loginSaga = createRequestSaga(LOGIN, apiAuth.login);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: ''
  },
  login: {
    username: '',
    password: ''
  },
  auth: null,
  authError: null
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INIT_FORM]: (state, { payload: { form } }) =>
      produce(state, (draft) => {
        draft[form] = initState[form];
        draft['authError'] = null;
      }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) =>
      produce(state, (draft) => {
        draft['authError'] = null;
        draft['auth'] = auth;
      }),
    [REGISTER_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft['authError'] = error;
        draft['auth'] = null;
      }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) =>
      produce(state, (draft) => {
        draft['auth'] = auth;
        draft['authError'] = null;
      }),
    [LOGIN_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft['authError'] = error;
        draft['auth'] = null;
      }),
  },
  initState,
);

export default auth;
