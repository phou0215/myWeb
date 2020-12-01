import React, { useEffect, useState } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    console.log("Effect");
    console.log(name);
    return () => {
      console.log("Cleanup");
      console.log(name);
    };
  });
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangenickname = (e) => {
    setNickname(e.target.value);
  };
  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName}></input>
        <input value={nickname} onChange={onChangenickname}></input>
      </div>
      <div>
        <div>
          <b>이름 : </b>
          {name}
        </div>
        <div>
          <b>애칭 : </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
