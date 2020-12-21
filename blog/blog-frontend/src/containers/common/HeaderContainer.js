import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
  const { user } = useSelector(({ userData }) => ({
    user: userData.user,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    const flag = window.confirm('로그아웃을 하시겠습니까?');
    if (flag) {
      dispatch(logout());
    } else {
      return;
    }
  };
  // useEffect(() => {}, [user]);
  return <Header user={user} onLogout={onLogout}></Header>;
};

export default HeaderContainer;
