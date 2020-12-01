import React, { Fragment } from 'react';
import { ColorConsumer } from '../context/color';

const ColorBox = () => {
  return (
    <ColorConsumer>
      {({ state }) => {
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
      }}
    </ColorConsumer>
  );
};

export default React.memo(ColorBox);
