import React, { Fragment } from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './ButtonLogin';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const WrapperBlock = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 30px;
    font-weight: bold;
    color: ${palette.blue[6]};
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

//헤더가 fixed 되어 있기 때문에 페이지 콘텐츠가 4rem 밑으로 나타나게 해주도록 컨포넌트 만듬
const Spacer = styled.div`
  height: 4rem;
`;

//유져 정보 창
const UserInfoBlock = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = ({ user }) => {
  return (
    <Fragment>
      <HeaderBlock>
        <WrapperBlock>
          <Link to="/" className="logo">
            <div className="logo">TEST EnC</div>
          </Link>
          {user ? (
            <div className="right">
              <UserInfoBlock>{user.user.username}</UserInfoBlock>
              <Button style={{ width: '100px' }} to="/logout">
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="right">
              <Button style={{ width: '100px' }} to="/login">
                로그인
              </Button>
            </div>
          )}
        </WrapperBlock>
      </HeaderBlock>
      <Spacer />
    </Fragment>
  );
};

export default Header;
