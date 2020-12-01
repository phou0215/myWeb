import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
  render() {
    const { name, age, addr, sex, children } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>나이</th>
            <th>성별</th>
            <th>주소</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{age}</td>
            <td>{sex}</td>
            <td>{addr}</td>
            <td>{children}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

MyComponent.defaultProps = {
  name: '홍길동',
  age: 'Unknown',
  sex: 'Unknown',
  addr: 'Unkown',
  children: 'None',
};

MyComponent.proTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  sex: PropTypes.string,
  addr: PropTypes.string,
  children: PropTypes.string,
};

export default MyComponent;
