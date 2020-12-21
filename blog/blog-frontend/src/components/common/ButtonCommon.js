import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  outline: none;
  cursor: pointer;
  padding-top : 0.75rem;
  padding-bottom:0.75rem;
  width:100%;
  font-size:1.125rem;
  background:${palette.cyan[5]};
  &:hover {
    background: ${palette.cyan[4]};
  }
`;

const Button = (props) => {
  return <StyledButton {...props}></StyledButton>;
};

export default Button;
