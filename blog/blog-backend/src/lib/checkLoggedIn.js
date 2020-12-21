import * as responseCode from '../api/auth/auth.responseCode';

const checkLoggedIn = (ctx, next) => {
  const { user } = ctx.state;
  if (!user) {
    ctx.response.status = 401;
    ctx.response.body = responseCode.not_login;
    return;
  }
  return next();
};

export default checkLoggedIn;
