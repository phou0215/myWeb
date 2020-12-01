import React from "react";
import { NavLink, Route } from "react-router-dom";
import Profile from "./Profile";
import WithRouterSample from "../component/WithRouter";

const Profiles = () => {
  const activeStyle_velopert = { background: "black", color: "white" };
  const activeStyle_iron = { background: "green", color: "white" };
  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <NavLink activeStyle={activeStyle_velopert} to="/profiles/velopert">
            velopert
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle_iron} to="/profiles/iron_hand">
            iron_hand
          </NavLink>
        </li>
      </ul>
      ;
      <Route
        path="/profiles"
        exact={true}
        render={() => {
          return <div>사용자를 선택해 주세요.</div>;
        }}
      />
      <Route path="/profiles/:username" component={Profile} />
      <WithRouterSample></WithRouterSample>
    </div>
  );
};

export default React.memo(Profiles);
