import React, { useCallback, useEffect } from "react";
import Sample from "../components/Sample";
import { useSelector, useDispatch } from "react-redux";
import { getPostAsync, getUsersAsync } from "../modules/apiGruop";

const SampleContainer = () => {
  const {
    loadingPost,
    loadingUsers,
    post,
    users,
    postStatus,
    usersStatus,
  } = useSelector((state) => ({
    loadingPost: state.apiReducer.loading.GET_POST,
    loadingUsers: state.apiReducer.loading.GET_USERS,
    post: state.apiReducer.post,
    users: state.apiReducer.users,
    postStatus: state.apiReducer.post_status,
    usersStatus: state.apiReducer.users_status,
  }));
  const dispatch = useDispatch();
  const onGetPost = useCallback((id) => dispatch(getPostAsync(id)), [dispatch]);
  const onGetUsers = useCallback(() => dispatch(getUsersAsync()), [dispatch]);
  useEffect(() => {
    onGetPost(1);
    onGetUsers();
  }, [onGetPost, onGetUsers]);
  return (
    <Sample
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
      post={post}
      users={users}
      postStatus={postStatus}
      usersStatus={usersStatus}
    ></Sample>
  );
};

export default SampleContainer;
