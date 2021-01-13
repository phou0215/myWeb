import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 2px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer = ({post, error, loading, actionButtons}) => {
  if(error){
    if(error.response && error.response.status === 404){
      return(<PostViewerBlock>존재하지 않는 포스트 입니다.</PostViewerBlock>);
    }else{
      return(<PostViewerBlock>글 불러오기 오류 발생</PostViewerBlock>);
    }
  }
  //로딩중이거나 아직 포스트 데이터가 로드 되기 전
  if(loading || !post){
    return null;
  }
  const {title, body, user, publishedDate, tags} = post.data;
  return (
    <PostViewerBlock>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo username={user.username} publishedDate={publishedDate} hasMarginTop></SubInfo>
        <Tags tags={tags}></Tags>
      </PostHead>
      {actionButtons}
      <PostContent
        dangerouslySetInnerHTML={{ __html: body }}
      ></PostContent>
    </PostViewerBlock>
  );
};

export default PostViewer;
