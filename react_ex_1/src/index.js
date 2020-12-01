import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App_2 from './App_2';
import reportWebVitals from './reportWebVitals';
import App_LifeCycle from './App_LifeCycle';

// App Render
ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <App_2 /> */}
    <App_LifeCycle />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
