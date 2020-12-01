import React from "react";
import { Route, Link } from "react-router-dom";
import About from "./component/About";
import Home from "./component/Home";
import Profile from "./profile/Profile";

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
          <Link to="/profile/velopert">Operation Velopert</Link>
        </li>
        <li>
          <Link to="/profile/iron_hand">Operation Iron hand</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact={true} />
      <Route path={["/about", "/info"]} component={About} />
      <Route path="/profile/:username" component={Profile} />
    </div>
  );
};

export default React.memo(App);
