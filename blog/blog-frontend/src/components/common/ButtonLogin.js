import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import {withRouter} from "react-router-dom";

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  outline: none;
  cursor: pointer;
  padding-top : 0.35rem;
  padding-bottom:0.45rem;
  width:100%;
  height: 100%;
  font-size:1.0rem;
  background:${palette.cyan[7]};
  &:hover {
    background: ${palette.cyan[4]};
  }
`;

const Button = ({children, to, history, ...rest}) => {
  const onClick = (e) =>{
    if(to){
      history.push(to);
    }
    if (rest.onClick){
      rest.onClick(e);
    }
  }
  return <StyledButton {...rest} onClick={onClick}>{children}</StyledButton>;
};

export default withRouter(Button);
