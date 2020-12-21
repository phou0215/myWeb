import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
// import AuthTemplate from '../components/auth/AuthTemplate';
import auth, { authSaga } from './auth';
import loading from './loading';
import userData, {userSaga} from './user'

const rootReducer = combineReducers({
  auth,
  loading,
  userData
});

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;
