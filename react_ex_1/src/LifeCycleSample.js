import React, { Component } from 'react';
class LifeCycleSample extends Component {
  state = { number: 0, color: null };
  myRef = null;
  //class 생성자
  constructor(props) {
    super(props);
    console.log('constructor');
  }
  //getDeivedStateFromProps
  static getDerivedStateFromProps(nextProps, preState) {
    console.log('getDerivedStateFromProps');
    if (nextProps.color !== preState.color) {
      return { color: nextProps.color };
    } else {
      return null;
    }
  }
  //componentDidMount
  componentDidMount() {
    console.log('conponentDidMount');
  }
  //shouldComponentUpdate
  shouldComponentUpdate(nextProps, preState) {
    console.log('shouldComponentUpdate', nextProps, preState);
    return nextProps.number % 10 !== 4;
  }
  //componentWillUnmount
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  //handleClick
  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };
  //getSnapshotBeforeUpdate
  getSnapshotBeforeUpdate(preProps, preState) {
    console.log('getSnapshotBeforeUpdate');
    if (preProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }
  //componentDidUpdate
  componentDidUpdate(preProps, preState, snapshot) {
    console.log('componentDidUpdate', preProps, preState);
    if (snapshot) {
      console.log('업데이트 이전 색상 : ', snapshot);
    }
  }
  //render
  render() {
    console.log('render');
    const style = {
      color: this.props.color,
    };
    return (
      <div>
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
          {this.props.missing.value}
        </h1>
        <p>color:{this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}
export default LifeCycleSample;
