import React from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Red from "./components/Red";
import Blue from "./components/Blue";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <Menu></Menu>
      <hr />
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/red" component={Red} />
        <Route path="/blue" component={Blue} />
        <Route
          render={() => (
            <div>
              <h3>페이지가 존재하지 않습니다.</h3>
            </div>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
