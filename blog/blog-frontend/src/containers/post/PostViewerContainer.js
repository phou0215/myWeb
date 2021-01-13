import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost, deletePost } from '../../modules/post';
import { setOriginalPost } from '../../modules/write';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';

const PostViewerContainer = ({ match, history }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { post, deleteResult ,error, deleteError, loading, loadingDelete, user } = useSelector(
    ({ post, loading, userData }) => ({
      post: post.post,
      deleteResult: post.deleteResult,
      error: post.postError,
      deleteError: post.delteError,
      loading: loading['post/READ_POST'],
      loadingDelete: loading['post/DELTE_POST'],
      user: userData.user,
    }),
  );
  
  useEffect(() => {
    dispatch(readPost(postId));
    console.log(postId);
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);
  
  const onEdit = () => {
    dispatch(setOriginalPost(post.data));
    history.push('/write');
  };

  const onRemove = () =>{
    console.log('DELTE ID: '+postId);
    dispatch(deletePost(postId));
  }

  useEffect(() => {
    if (deleteError) {
      window.alert('포스트 삭제에 실패하였습니다.');
      //user data를 string 값으로 변경    
    }
    if(deleteResult){
      window.alert('포스트가 삭제되었습니다.');
      history.push('/');//홈으로 이동
    }
  }, [history, deleteError, deleteResult]);

  const ownPost = (user && user.user._id) === (post && post.data.user._id);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit}  onRemove={onRemove}></PostActionButtons>
      }
    ></PostViewer>
  );
};
export default withRouter(PostViewerContainer);
