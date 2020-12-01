import React from "react";
import { withRouter } from "react-router-dom";

const withRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>location</h4>
      <textarea
        value={JSON.stringify(location, null, 2)}
        row={10}
        col={10}
        style={{ width: "200px", height: "150px" }}
        readOnly={true}
      ></textarea>
      <h4>match</h4>
      <textarea
        value={JSON.stringify(match, null, 2)}
        row={10}
        style={{ width: "200px", height: "150px" }}
        col={10}
        readOnly={true}
      ></textarea>
      <button onClick={() => history.push("/")}>홈으로</button>
    </div>
  );
};

export default React.memo(withRouter(withRouterSample));
