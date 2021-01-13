import React, { Fragment } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer'
import PaginationContainer from '../containers/posts/PaginationContainer';

const PostListPage = () => {
  return (
    <Fragment>
      <HeaderContainer></HeaderContainer>
      <PostListContainer></PostListContainer>
      <PaginationContainer></PaginationContainer>
    </Fragment>
  );
};

export default PostListPage;
