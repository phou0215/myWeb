import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import NewPage from './pages/NewPages';

const App = () => {
  return <Route path="/:category?" component={NewPage}></Route>;
};

export default React.memo(App);
