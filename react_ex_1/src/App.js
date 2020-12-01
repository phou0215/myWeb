import React, { Fragment } from 'react';
import MyComponent from './myComponent';
import Counter from './Counter_class';
import Say from './Say';
import EventPractice from './EventPractice';
import EventPractice_2 from './EventPractice_func';
import Validation from './Validation';
import ScrollBox from './ScrollBox';
import IterationSample from './IterationSample';

const App = () => {
  return (
    <Fragment>
      {/* <MyComponent age="39" sex="남" addr="부개동 74-14">
        리액트
      </MyComponent>
      <Counter /> */}
      {/* <Say />
      <EventPractice_2 /> */}
      <Validation />
      <IterationSample />
    </Fragment>
  );
};

export default App;
