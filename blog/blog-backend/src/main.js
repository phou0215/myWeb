require('dotenv').config();
// const Koa = require('koa');
// const Router = require('koa-router');
// const bodyParser = require('koa-bodyparser');
// const api = require('./api');
// const post = require('./post');
// const mongoose = require('mongoose');
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';
import createFakeData from './generator/createDummy';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

const app = new Koa();
const router = new Router();
const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
    // createFakeData();
  })
  .catch((e) => {
    console.error(e);
  });

//router 설정
router.use('/api', api.routes());
//router를 app에 적용하기 전에 bodyparser 적용
app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());
//blog-frontend build 디렉토리 이용
const buildDirectory = path.resolve(__dirname, '../../blog-frontend/build');
app.use(serve(buildDirectory));
//HTTP 상태가 404이고 api로 시작하지 않는 경우는 index.html로 이동됨
app.use(async() =>{
  if(ctx.status === 404 && ctx.path.indexOf('/api') !==0){
    await send(ctx, 'index.html', {root:buildDirectory});
  }
});

const port = PORT || 4000;

app.listen(port, () => {
  console.log('Listening to port ' + port);
});
