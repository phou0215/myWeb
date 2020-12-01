import React, { Component } from 'react';

class Counter extends Component {
  state = { number: 0, fixedNumber: 0 };
  render() {
    const { number, fixedNumber } = this.state;
    return (
      <div>
        <h1>변경 값 {number}</h1>
        <h2>고정 값 {fixedNumber}</h2>
        <button
          onClick={() => {
            this.setState({ number: number + 1 }, () => {
              console.log('변경값 변경이 이루어 졌습니다.');
            });
          }}
        >
          + 변경 값 Plus
        </button>
        <button
          onClick={() => {
            this.setState({ fixedNumber: fixedNumber + 1 });
          }}
        >
          + 고정 값 Plus
        </button>
      </div>
    );
  }
}

export default Counter;
