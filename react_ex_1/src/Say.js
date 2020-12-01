import React, { Fragment, useState } from 'react';

const Say = () => {
  const [message, setMessage] = useState('여기에 입력됩니다.');
  const [color, setColor] = useState('black');
  const onClickEnter = () => {
    setMessage('안녕하세요!');
  };
  const onClickLeave = () => {
    setMessage('안녕히가세요!');
  };

  return (
    <Fragment>
      <div>
        <h2 style={{ color }}>{message}</h2>
        <button onClick={onClickEnter}>입장</button>
        <button onClick={onClickLeave}>퇴장</button>
      </div>
      <br />
      <br />
      <br />
      <div>
        <button
          onClick={() => {
            setColor('red');
          }}
        >
          빨간색
        </button>
        <button
          onClick={() => {
            setColor('blue');
          }}
        >
          파란색
        </button>
        <button
          onClick={() => {
            setColor('green');
          }}
        >
          초록색
        </button>
      </div>
    </Fragment>
  );
};

export default Say;
