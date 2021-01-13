import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, {rootSaga} from './modules';
import createSagaMiddleware from "redux-saga";
import {tempUser, check} from './modules/user';
import {HelmetProvider} from 'react-helmet-async';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));


function loadUser(){
  try{
    let user = localStorage.getItem('user');
    if(!user){
      return;
    }
    user = JSON.parse(user);
    store.dispatch(tempUser(user));
    store.dispatch(check());
  }catch(e){
    console.log('localStorage is not working')
  }
}
//sagamiddleware 실행
sagaMiddleware.run(rootSaga);
//loadUser 실행=>로그인 유지를 위함
loadUser();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
