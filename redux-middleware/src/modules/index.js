import React from "react";
import { combineReducers } from "redux";
import counter from "./counter";
import apiReducer from "./apiGruop";

const rootReducer = combineReducers({
  counter,
  apiReducer,
});

export default rootReducer;
