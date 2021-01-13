import Post from '../../models/post';
import * as responseCode from './post.responseCode';
import mongoose from 'mongoose';
import { username_bad } from '../auth/auth.responseCode';
import sanitizeHtml from 'sanitize-html';


const sanitizeOption = {
  allowedTags:[
    'h1','h2', 'h3','h4','h5','h6','b','hr','i','u','ul','li','p','s','ol','blockquote','a','img'
  ],
  allowedAttributes:{
    a:['href','name','target'],
    img:['src'],
    li:['class'],
  },
  allowedSchemes:['data', 'http']
};

const removeHtmlAndShorten = (body) =>{
  const filtered = sanitizeHtml(body);
  return filtered.length < 200 ? (filtered) : (filtered.slice(0,200)+'...')
}

export const checkObjectId = async (ctx, next) => {
  const { id } = ctx.request.params;
  if (id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      ctx.response.status = 400;
      ctx.response.body = responseCode.id_badformat;
      return;
    }
    const data = await Post.findById(id).exec();
    if (!data) {
      ctx.response.status = 400;
      ctx.response.body = responseCode.id_invalid;
      return;
    }
    ctx.state.post = data;
  }
  return next();
};

export const checkOwnPost = function (ctx, next) {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.response.status = 403;
    ctx.response.body = responseCode.not_allowCmd;
    return;
  }
  return next();
};

export const checkPayload = (ctx, next) => {
  const { title, body } = ctx.request.body;
  if (!title) {
    ctx.response.status = 400;
    ctx.response.body = responseCode.title_none;
    return;
  }
  if (!body) {
    ctx.response.status = 400;
    ctx.response.responseCode.body_none;
    return;
  }
  return next();
};

export const write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title: title,
    body: sanitizeHtml(body,sanitizeOption),
    tags: tags,
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.response.status = 200;
    ctx.response.body = Object.assign({},responseCode.function_ok, {user:ctx.state.user});
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = async (ctx) => {
  try {
    const page = { num: parseInt(ctx.request.query.page || '1', 10) };
    if (page.num === 0) {
      page.num = 1;
    }
    if (page.num < 0) {
      ctx.response.status = 400;
      ctx.response.body = responseCode.page_invalid;
    }
    const { tag, username } = ctx.request.query;
    const query = {};
    // const query = {
    //   ...(username ? { 'user.username': username } : {}),
    //   ...(tag ? { tags: tag } : {}),
    // };
    if (tag) {
      query['tags'] = tag;
    }
    if (username) {
      query['user.username'] = username;
    }
    const datas = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page.num - 1) * 10)
      .lean()
      .exec();
    if (!datas) {
      datas = [];
    }
    const postCount = await Post.countDocuments().exec();
    ctx.response.set('Last-Page', Math.ceil(postCount / 10));
    ctx.response.status = 200;
    ctx.response.body = Object.assign({}, responseCode.function_ok, {
      size: datas.length,
      datas: datas.map((data) => ({
        ...data,
        body:removeHtmlAndShorten(data.body),
      })),
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = async (ctx) => {
  const { id } = ctx.request.params;
  try {
    const data = ctx.state.post;
    ctx.response.status = 200;
    ctx.response.body = Object.assign({}, responseCode.function_ok, {
      data: data,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const remove = async (ctx) => {
  const { id } = ctx.request.params;
  try {
    if (!id) {
      await Post.deleteMany({}).exec();
      ctx.response.status = 200;
      ctx.response.body = responseCode.function_ok;
    } else {
      await Post.findByIdAndRemove(id).exec();
      ctx.response.status = 200;
      ctx.response.body = responseCode.function_ok;
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async (ctx) => {
  const { id } = ctx.request.params;
  const updateBody = {...ctx.request.body};
  if(updateBody.body){
    updateBody.body = sanitizeHtml(updateBody.body);
  }
  try {
    await Post.findByIdAndUpdate(id, updateBody, {
      new: true,
    }).exec();
    ctx.response.status = 200;
    ctx.response.body = Object.assign({}, responseCode.function_ok, {
      update_data: { id: id, data: ctx.response.body },
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

