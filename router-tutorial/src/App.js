import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import About from "./component/About";
import Home from "./component/Home";
import Profiles from "./profile/Profiles";
import HistorySample from "./component/HistorySample";

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/profiles">Profiles</Link>
        </li>
        <li>
          <Link to="/history">History Sample</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path={["/about", "/info"]} component={About} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/history" component={HistorySample} />
        <Route
          render={({ location, history }) => {
            return (
              <div>
                <h2>이 페이지는 존재하지 않습니다.</h2>
                <p>{location.pathname}</p>
                <button onClick={() => history.push("/")}>홈으로 이동</button>
              </div>
            );
          }}
        />
      </Switch>
    </div>
  );
};

export default React.memo(App);
