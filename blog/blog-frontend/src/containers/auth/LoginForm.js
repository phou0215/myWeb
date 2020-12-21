import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { withRouter } from 'react-router-dom';
import { check } from '../../modules/user';

const LoginForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, userData }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: userData.user,
  }));
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'login', key: name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('로그인 오류');
      console.log(authError);
      setError('로그인 실패');
    }
    if (auth) {
      console.log('로그인 성공');
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
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    ></AuthForm>
  );
};

export default withRouter(LoginForm);
