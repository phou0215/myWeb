import React, { useState } from "react";

const Counter = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <p>
        현재 카운터 값은 <h2>{value}</h2>
      </p>
      <button onClick={() => setValue(value + 1)}>+Plus</button>
      <button onClick={() => setValue(value - 1)}>-Minus</button>
    </div>
  );
};

export default Counter;
