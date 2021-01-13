import React ,{Fragment}from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import PostViewerContainer from "../containers/post/PostViewerContainer";
import {Helmet} from 'react-helmet-async';

const PostPage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>POST READ</title>
      </Helmet>
      <HeaderContainer></HeaderContainer>
      <PostViewerContainer></PostViewerContainer>
    </Fragment>
  );
};

export default PostPage;
