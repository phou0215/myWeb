import * as responseCode from './auth.responseCode';
import User from '../../models/user';

// export const checkUsername = async (ctx, next) => {
//     const { id } = ctx.request.params;
//     if (id) {
//       const data = await Post.findById(id).exec();
//       if (!data) {
//         ctx.response.status = 400;
//         ctx.response.body = responseCode.id_invalid;
//         return;
//       }
//     }
//     return next();
//   };
const engNum = /^[a-zA-Z0-9]*$/;

export const checkPayload = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  //mandatory check
  if (!username) {
    ctx.response.status = 400;
    ctx.response.body = responseCode.username_none;
    return;
  }
  if (!password) {
    ctx.response.status = 400;
    ctx.response.body = responseCode.password_none;
    return;
  }
  //username format
  if (!(username.length > 3 && username.length < 21)) {
    ctx.response.status = 400;
    ctx.response.body = responseCode.username_limit;
    return;
  }
  if (!engNum.test(username)) {
    ctx.response.status = 400;
    ctx.response.body = responseCode.username_bad;
    return;
  }
  return next();
};
//회원 가입
export const register = async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    const user = User({
      username: username,
    });
    const existFlag = await User.findByUsername(username);
    if (existFlag) {
      ctx.response.status = 409;
      ctx.response.body = responseCode.username_exists;
      return;
    }
    await user.setPassword(password);
    user.save();
    ctx.response.status = 200;
    ctx.response.body = responseCode.function_ok;
    const token = user.generateToken();
    ctx.cookies.set(
      'access_token',
      token,
      { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true } /*7d*/,
    );
  } catch (e) {
    ctx.throw(500, e);
  }
};
//로그인
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.response.status = 400;
      ctx.response.body = responseCode.account_invalid;
    }
    const passwordFlag = await user.checkPassword(password);
    if (!passwordFlag) {
      ctx.response.status = 400;
      ctx.response.body = responseCode.account_invalid;
      return;
    }
    const userData = await user.serialize();
    ctx.response.status = 200;
    ctx.response.body = Object.assign(responseCode.function_ok, {
      user: userData,
    });
    const token = user.generateToken();
    ctx.cookies.set(
      'access_token',
      token,
      { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true } /*7d*/,
    );
  } catch (e) {
    ctx.throw(500, e);
  }
};
//로그인 상태 확인
export const check = async (ctx) => {
  const { user } = ctx.state;
  if (!user) {
    //로그인 상태가 아님
    ctx.response.status = 401;
    ctx.response.body = responseCode.not_login;
    return;
  }
  ctx.response.status = 200;
  ctx.response.body = Object.assign(responseCode.function_ok, { user: user });
};
//로그아웃
export const logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.response.status = 200;
  ctx.response.body = responseCode.function_ok;
};
