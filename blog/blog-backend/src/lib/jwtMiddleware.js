import jwt from 'jsonwebtoken';

const jwtMiddleware = (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) {
    return next();
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = {
      _id: decode._id,
      username: decode.username,
    };
    const now = Math.floor(Date.now() / 1000);
    if (decode.exp - now < 60 * 60 * 24 * 3.5) {
      ctx.cookies.set('access_token', token, {
        maxAge: 100 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    //토큰검증 실패
    ctx.throw(500, e);
    return next();
  }
};

export default jwtMiddleware;
