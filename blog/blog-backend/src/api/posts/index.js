// const Router = require('koa-router');
// const post_cmd = require('./posts.ctrl');
import Router from 'koa-router';
import * as post_cmd from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
const posts = new Router();

posts.get('/', post_cmd.list);
posts.get('/:id', post_cmd.checkObjectId, post_cmd.read);
posts.post('/', checkLoggedIn, post_cmd.write);
posts.delete(
  '/:id?',
  checkLoggedIn,
  post_cmd.checkObjectId,
  post_cmd.checkOwnPost,
  post_cmd.remove,
);
// posts.put('/:id', post_cmd.replace);
posts.patch(
  '/:id',
  checkLoggedIn,
  post_cmd.checkObjectId,
  post_cmd.checkOwnPost,
  post_cmd.checkPayload,
  post_cmd.update,
);
// module.exports = posts;
export default posts;
