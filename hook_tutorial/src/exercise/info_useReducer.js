import React, { useReducer, useEffect } from "react";
import useInputs from "./useInputs";

const Info = () => {
  const [state, onChange] = useInputs({ name: "", nickname: "" });
  const { name, nickname } = state;
  useEffect(() => {
    console.log("Effect");
    console.log("이름 : " + name + " 애칭 : " + nickname);
    return () => {
      console.log("Cleanup");
      console.log("이름 : " + name + " 애칭 : " + nickname);
    };
  }, []);
  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange}></input>
        <input name="nickname" value={nickname} onChange={onChange}></input>
      </div>
      <div>
        <hr></hr>
        <div>
          <b>이름 : {name}</b>
        </div>
        <div>
          <b>애칭 : {nickname}</b>
        </div>
      </div>
    </div>
  );
};

export default Info;
