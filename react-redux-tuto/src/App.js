import React, { Fragment } from 'react';
import CounterContainers from './containers/CounterContainers';
import TodosContainer from './containers/TodosContainer';

const App = () => {
  return (
    <Fragment>
      <CounterContainers></CounterContainers>
      <hr />
      <TodosContainer></TodosContainer>
    </Fragment>
  );
};

export default App;
