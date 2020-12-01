import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import loadable from "@loadable/component";

const SplitMe = loadable(() => import("./SplitMe"), {
  fallback: <div>loading...</div>,
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(!visible);
  };
  const onHover = () => {
    SplitMe.preload();
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick} onMouseOver={onHover}>
          Hello React
        </p>
        {visible && <SplitMe></SplitMe>}
      </header>
    </div>
  );
}

export default App;
