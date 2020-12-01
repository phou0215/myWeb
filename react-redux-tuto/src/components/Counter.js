import React from 'react';

const Counter = ({ number, onIncrease, onDecrease }) => {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button style={{ marginRight: '5px' }} onClick={onIncrease}>
          Plus
        </button>
        <button onClick={onDecrease}>Minus</button>
      </div>
    </div>
  );
};
export default Counter;
