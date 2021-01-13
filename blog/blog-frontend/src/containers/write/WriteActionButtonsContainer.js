import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writePost, initialize, updatePost } from '../../modules/write';
import showToastMessage from '../../lib/toastMessage';

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError, originalPostId } = useSelector(({ write, userData}) => {
    return {
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
      username: userData.user.user.username,
    };
  });
  //포스트 등록
  const onPublish = () => {
    if (originalPostId){
      const flag = window.confirm('포스트 업데이트 진행하시겠습니까?');
      if (flag) {
        dispatch(updatePost({ title, body, tags, id: originalPostId }));
        return // 해당 부분은 UPDATE POST 이라면 아래 코드가 진행되지 않도록 하기 위해 추가
      } else {
        return;
      }
    }
    const flag = window.confirm('포스트 등록을 진행하시겠습니까?');
    if (flag) {
      dispatch(writePost({ title, body, tags }));
    } else {
      return;
    }
    // dispatch(writePost({ title, body, tags }));
  };
  //포스트 등록 취소
  const onCancel = () => {
    const flag = window.confirm('정말 포스트 작성을 취소하시겠습니까?');
    if (flag) {
      history.goBack();
    } else {
      return;
    }
  };

  //성공 또는 실패시 작업
  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      showToastMessage('포스트가 정상적으로 등록되었습니다.', 'S');
      history.push('/@' + user.username + '/' + _id);
      dispatch(initialize());
    }
    if (postError) {
      showToastMessage('포스트 내용 등록 오류', 'E');
    }
  }, [history, dispatch, post, postError]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={originalPostId?true:false}
    ></WriteActionButtons>
  );
};
export default withRouter(WriteActionButtonsContainer);
