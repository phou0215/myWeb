import React, { Component } from 'react';
import './Validation.css';

class Validation extends Component {
  input = React.createRef();
  state = { password: '', clicked: false, validated: false };

  handleChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleButtonClick = () => {
    this.setState({ clicked: true, validated: this.state.password === '000' });
    this.input.focus();
  };

  render() {
    return (
      <div>
        <input
          ref={(ref) => (this.input = ref)}
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={
            this.state.clicked
              ? this.state.validated
                ? 'success'
                : 'faliure'
              : ''
          }
        ></input>
        <button onClick={this.handleButtonClick}>Check Password</button>
      </div>
    );
  }
}

export default Validation;
