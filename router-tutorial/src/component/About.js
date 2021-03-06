import React from "react";
import qs from "qs";

const About = ({ location }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const showDetail = query.detail === "true";
  return (
    <div>
      <h1>Introduce</h1>
      <p>This Project is sample project about excercise basic of router</p>
      {showDetail && <p>Show details story</p>}
    </div>
  );
};

export default React.memo(About);
