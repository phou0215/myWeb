import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };
  compoenetDidCatch(error, info) {
    this.setState({ error: true });
    console.log(error, info);
  }

  render() {
    if (this.state.error) {
      <div>에러가 발생하였습니다.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
