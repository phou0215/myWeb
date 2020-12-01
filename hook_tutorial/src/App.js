import React, { Fragment, useState } from "react";
import "./App.css";
import Counter from "./Counter_useReducer";
// import Counter from "./Counter_useState";
import Info from "./exercise/info_useReducer";
import Average from "./exercise/Average";

function App() {
  return (
    <Fragment>
      <div className="App">
        {/* <Counter /> */}
        <Info />
        <Average />
      </div>
    </Fragment>
  );
}

export default App;
