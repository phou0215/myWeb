import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
// import AuthTemplate from '../components/auth/AuthTemplate';
import auth, { authSaga } from './auth';
import loading from './loading';
import userData, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';

const rootReducer = combineReducers({
  auth,
  loading,
  userData,
  write,
  post,
  posts,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga()]);
}

export default rootReducer;
