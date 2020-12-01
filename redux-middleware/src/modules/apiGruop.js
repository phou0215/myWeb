import { produce } from "immer";
import * as api from "../lib/api";

const GET_POST = "apiGruop/GET_POST";
const GET_POST_SUCCESS = "apiGroup/GET_POST_SUCCESS";
const GET_POST_FAILURE = "apiGroup/GET_POST_FAILURE";

const GET_USERS = "apiGroup/GET_USERS";
const GET_USERS_SUCCESS = "apiGroup/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "apiGroup/GET_USERS_FAILURE";

const getPost = () => {
  return { type: GET_POST };
};
const getPostSuccess = (payload) => {
  return { type: GET_POST_SUCCESS, payload: payload, status: true };
};

const getPostError = (payload) => {
  return { type: GET_POST_FAILURE, payload: payload, status: false };
};
const getUsers = () => {
  return { type: GET_USERS };
};

const getUsersSuccess = (payload) => {
  return { type: GET_USERS_SUCCESS, payload: payload, status: true };
};

const getUsersError = (payload) => {
  return { type: GET_USERS_FAILURE, payload: payload, status: false };
};

export const getPostAsync = (id) => async (dispatch) => {
  dispatch(getPost());
  try {
    const response = await api.getPost(id);
    dispatch(getPostSuccess(response.data));
  } catch (e) {
    dispatch(getPostError(e));
    throw e;
  }
};

export const getUsersAsync = () => async (dispatch) => {
  dispatch(getUsers());
  try {
    const response = await api.getUsers();
    dispatch(getUsersSuccess(response.data));
  } catch (e) {
    dispatch(getUsersError(e));
    throw e;
  }
};

const initState = {
  loading: {
    GET_POST: false,
    GET_USERS: false,
  },
  post: null,
  users: null,
  post_status: false,
  users_status: false,
};

const apiReducer = (state = initState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_POST:
        draft.loading.GET_POST = true;
        break;
      case GET_POST_SUCCESS:
        draft.loading.GET_POST = false;
        draft.post = action.payload;
        draft.post_status = action.status;
        break;
      case GET_POST_FAILURE:
        draft.loading.GET_POST = false;
        draft.post = action.payload;
        draft.post_status = action.status;
        break;
      case GET_USERS:
        draft.loading.GET_USERS = true;
        break;
      case GET_USERS_SUCCESS:
        draft.loading.GET_USERS = false;
        draft.users = action.payload;
        draft.users_status = action.status;
        break;
      case GET_USERS_FAILURE:
        draft.loading.GET_POST = false;
        draft.users = action.payload;
        draft.users_status = action.status;
        break;
      default:
        break;
    }
  });
};

export default apiReducer;
