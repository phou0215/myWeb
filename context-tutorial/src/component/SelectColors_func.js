import React from 'react';
import { ColorConsumer } from '../context/color';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const SelectColors = () => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h2 style={{ marginRight: '10px' }}>색상을 선택하세요</h2>
        <h4 style={{ marginTop: 'auto' }}>(우클릭 시 하단 색상 변경)</h4>
      </div>

      <ColorConsumer>
        {({ actions }) => {
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
                    onClick={() => {
                      actions.setColor(color);
                    }}
                    onContextMenu={(e) => {
                      //우클릭 menu 팝업 무시
                      e.preventDefault();
                      actions.setSubcolor(color);
                    }}
                  ></div>
                );
              })}
            </div>
          );
        }}
      </ColorConsumer>
    </div>
  );
};

export default React.memo(SelectColors);
