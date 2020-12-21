import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/common/Header';

const HeaderContainer = () => {
  const { user } = useSelector(({ userData }) => ({
    user: userData.user,
  }));
  return <Header user={user}></Header>;
};

export default HeaderContainer;
