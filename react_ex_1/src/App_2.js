import React, { Component } from 'react';
import ScrollBox from './ScrollBox';

class App_2 extends Component {
  render() {
    return (
      <div>
        <ScrollBox
          ref={(ref) => {
            this.ScrollBox = ref;
          }}
        />
        <button
          onClick={() => {
            this.ScrollBox.scrollToBottom();
          }}
        >
          Go Bottom
        </button>
      </div>
    );
  }
}

export default App_2;
