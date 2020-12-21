import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);

  const showToastMessage = (messageText, messageType = "I")=>{
    toast.dismiss();
    toast.configure({
      position: toast.POSITION.BOTTOM_RIGHT,
      toastId: 1
    });
    if (messageType === "S") {
      toast.success(messageText);
    }
    if (messageType === "I") {
      toast.info(messageText);
    }
    if (messageType === "E") {
      toast.error(messageText);
    }
  }
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, userData }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: userData.user,
  }));
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'register', key: name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if([password,username,passwordConfirm].includes('')){
      setError('빈칸을 체워 주세요.');
      showToastMessage('빈칸을 체워 주세요.', 'E');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호 확인 불일치.');
      showToastMessage('비밀번호 확인 불일치.','E');
      dispatch(changeField({form:'register',key:'password', value:''}));
      dispatch(changeField({form:'register',key:'passwordConfirm', value:''}));
      return;
    }
    dispatch(register({ username, password }));
  };

  useEffect(() => {
    dispatch(initForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if(authError.response.status === 409){
        setError('이미 존재하는 사용자 이름입니다.');
        showToastMessage('이미 존재하는 사용자 이름입니다.','E');
        dispatch(changeField({form:'register',key:'username', value:''}));
        dispatch(changeField({form:'register',key:'password', value:''}));
        dispatch(changeField({form:'register',key:'passwordConfirm', value:''}));
      }
    }
    if (auth) {
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);
  useEffect(() => {
    if (user) {
      history.push('/');
      //user data를 string 값으로 변경
      try{
        localStorage.setItem('user', JSON.stringify(user));
      }catch (e){
        console.log('localStorage not working');
      }      
    }
  }, [history, user]);
  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    ></AuthForm>
  );
};

export default withRouter(RegisterForm);
