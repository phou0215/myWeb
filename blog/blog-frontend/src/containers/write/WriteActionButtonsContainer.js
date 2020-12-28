import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writePost } from '../../modules/write';
import showToastMessage from '../../lib/toastMessage';

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError } = useSelector(({ write }) => {
    return {
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
    };
  });
  //포스트 등록
  const onPublish = () => {
    const flag = window.confirm('포스트 등록을 진행하시겠습니까?');
    if (flag) {
      console.log(title);
      console.log(body);
      console.log(tags);
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
      showToastMessage('포스트가 정상적으로 등록되었습니다.', 'S');
      console.log(post);
      //   history.push('/@')
    }
    if (postError) {
      showToastMessage('포스트 내용 등록 오류', 'E');
      console.error(postError);
    }
  }, [post, postError]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
    ></WriteActionButtons>
  );
};
export default withRouter(WriteActionButtonsContainer);
