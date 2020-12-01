import React, { Fragment, useContext } from 'react';
import ColorContext from '../context/color';

const ColorBox = () => {
  const { state } = useContext(ColorContext);
  return (
    <Fragment>
      <div
        style={{
          width: '150px',
          height: '150px',
          background: state.color,
        }}
      ></div>
      <div
        style={{
          width: '64px',
          height: '64px',
          background: state.subcolor,
        }}
      ></div>
    </Fragment>
  );
};

export default React.memo(ColorBox);
