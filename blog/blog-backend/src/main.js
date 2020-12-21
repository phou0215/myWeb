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

const port = PORT || 4000;

app.listen(port, () => {
  console.log('Listening to port ' + port);
});
