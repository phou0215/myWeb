import React, { Component } from 'react';
import ColorContext from '../context/color';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

class SelectColors extends Component {
  static contextType = ColorContext;
  handleSetColor = (color) => {
    this.context.actions.setColor(color);
  };
  handleSetSubColor = (subColor) => {
    this.context.actions.setSubColor(subColor);
  };

  render() {
    return (
      <div style={{ display: 'flex' }}>
        {colors.map((color) => {
          return (
            <div
              key={color}
              style={{
                background: color,
                width: '60px',
                height: '60px',
                cursor: 'pointer',
              }}
            ></div>
          );
        })}
      </div>
    );
  }
}

export default React.memo(SelectColors);
