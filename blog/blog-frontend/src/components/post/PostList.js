import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/ButtonCommon';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import palette from '../../lib/styles/palette';
import {withRouter} from 'react-router-dom';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[6]};
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const StyledButton = styled(Button)`
  float: right;
  color: white;
  width: 200px;
  background: ${palette.cyan[7]};
`;

const PostItem = ({ post }) => {
  const { publishedDate, user, tags, title, body, _id } = post;
  return (
    <PostItemBlock>
      <h2>
        <Link to={'/@' + user.username + '/' + _id}>{title}</Link>
      </h2>
      <SubInfo
        username={user.username}
        publishedDate={new Date(publishedDate)}
      ></SubInfo>
      <Tags tags={tags}></Tags>
      <p dangerouslySetInnerHTML={{ __html: body }}></p>
    </PostItemBlock>
  );
};

const PostList = ({ history, posts, loading, error, showWriteButton }) => {
  //에러 발생 시
  if (error) {
    return <PostListBlock>로딩 중 오류가 발생했습니다.</PostListBlock>;
  }
  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {showWriteButton && <StyledButton onClick={()=>{history.push('/write')}}>Add Post</StyledButton>}
      </WritePostButtonWrapper>
      {!loading && posts && (
        <div>
          {posts.datas.map((data) => (
            <PostItem post={data} key={data._id}></PostItem>
          ))}
        </div>
      )}
    </PostListBlock>
  );
};

export default withRouter(PostList);
