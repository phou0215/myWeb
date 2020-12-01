import React, { Fragment } from "react";
import CounterContainer from "./containers/CounterContainer";
import SampleContainer from "./containers/SampleContainer";

const App = () => {
  return (
    <Fragment>
      <CounterContainer></CounterContainer>
      <SampleContainer></SampleContainer>
    </Fragment>
  );
};

export default App;
