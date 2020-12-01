import React, { Component } from 'react';

class EventPractice extends Component {
  state = { message: '', username: '' };
  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClick = () => {
    alert(this.state.username + ' : ' + this.state.message);
    this.setState({ message: '', username: '' });
  };
  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  };
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="username"
          placeholder="사용자명"
          value={this.state.username}
          onChange={this.handlerChange}
        ></input>
        <input
          type="text"
          name="message"
          placeholder="내용입력"
          value={this.state.message}
          onChange={this.handlerChange}
          onKeyPress={this.handleEnter}
        ></input>
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice;
