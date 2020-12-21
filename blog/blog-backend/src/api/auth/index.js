import * as auth_cmd from './auth.ctrl';
import Router from 'koa-router';

const auth = new Router();

auth.post('/register', auth_cmd.checkPayload, auth_cmd.register);
auth.post('/login', auth_cmd.checkPayload, auth_cmd.login);
auth.get('/check', auth_cmd.check);
auth.post('/logout', auth_cmd.logout);

export default auth;
