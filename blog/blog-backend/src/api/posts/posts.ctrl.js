import Post from '../../models/post';
import * as responseCode from './post.responseCode';
import mongoose from 'mongoose';
import { username_bad } from '../auth/auth.responseCode';

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
    body: body,
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
    console.log(query);
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
        body:
          data.body.length > 200 ? data.body.slice(0, 200) + '...' : data.body,
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
  try {
    await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    ctx.response.status = 200;
    ctx.response.body = Object.assign({}, responseCode.function_ok, {
      update_data: { id: id, data: ctx.request.body },
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

// // id의 초기값
// let postId = 1;

// //posts 배열 초기 데이터
// const posts = [
//   {
//     id: 1,
//     title: '제목',
//     body: '내용',
//   },
// ];

// /* 포스트 작성
// POST /api/posts
// {title,body}
// */
// export const write = (ctx) => {
//   //REST API payload 는 ctx.request.body로 참조 가능함
//   const { title, body } = ctx.request.body;
//   if (!title || title === null) {
//     ctx.status = 400;
//     ctx.body = title_none;
//   } else if (!body || body == null) {
//     ctx.status = 400;
//     ctx.body = body_none;
//   } else {
//     ctx.status = 200;
//     postId += 1;
//     posts.push({ id: postId, title: title, body: body });
//     ctx.body = function_ok;
//   }
// };
// /* 포스트 목록 조회
// GET /api/posts
// */
// export const list = (ctx) => {
//   const return_data = Object.assign({}, function_ok, { datas: posts });
//   ctx.status = 200;
//   ctx.body = return_data;
// };

// /* 포스트 조회
// 특정 포스트 조회
// */
// export const read = (ctx) => {
//   const id = ctx.params.id;
//   if (!id) {
//     ctx.status = 400;
//     ctx.body = id_none;
//     return;
//   }
//   const index = posts.findIndex((post) => post.id.toString() === id.toString());
//   if (index === -1) {
//     ctx.status = 404;
//     ctx.body = id_invalid;
//     return;
//   }
//   const return_data = Object.assign({}, function_ok, { data: posts[index] });
//   ctx.status = 200;
//   ctx.body = return_data;
// };

// /* 포스트 삭제
// 특정 포스트 삭제
// */
// export const remove = (ctx) => {
//   const id = ctx.params.id;
//   if (!id) {
//     ctx.status = 400;
//     ctx.body = id_none;
//     return;
//   }
//   const index = posts.findIndex((post) => post.id.toString() === id);
//   if (index === -1) {
//     ctx.status = 404;
//     ctx.body = id_invalid;
//     return;
//   }
//   posts.splice(index, 1);
//   ctx.status = 200;
//   ctx.body = function_ok;
// };

// /* 포스트 교체
//  */
// export const replace = (ctx) => {
//   //REST API payload 는 ctx.request.body로 참조 가능함
//   const id = ctx.params.id;
//   const { title, body } = ctx.request.body;
//   if (!id) {
//     ctx.status = 400;
//     ctx.body = id_none;
//     return;
//   }
//   const index = posts.findIndex((post) => post.id.toString() === id);

//   if (!title || title === null) {
//     ctx.status = 400;
//     ctx.body = title_none;
//   } else if (!body || body === null) {
//     ctx.status = 400;
//     ctx.body = body_none;
//   } else if (!index) {
//     ctx.status = 400;
//     ctx.body = id_invalid;
//   } else {
//     ctx.status = 200;
//     posts[index] = { id: id, title: title, body: body };
//     ctx.body = function_ok;
//   }
// };

// /*특정 필드 수정*/

// export const update = (ctx) => {
//   //REST API payload 는 ctx.request.body로 참조 가능함
//   const id = ctx.params.id;
//   const { title, body } = ctx.request.body;
//   //   const flag_format = parsingCheck(JSON.stringify(ctx.request.body));
//   // None id
//   if (!id) {
//     ctx.status = 400;
//     ctx.body = id_none;
//     return;
//   }
//   const index = posts.findIndex((post) => post.id.toString() === id);

//   //   if (!flag_format) {
//   //     ctx.status = 400;
//   //     ctx.body = payload_format_err;
//   //   }
//   if (!title || title === null || !body || body === null) {
//     ctx.status = 400;
//     ctx.body = payload_none;
//     return;
//   }

//   if (index === -1) {
//     ctx.status = 400;
//     ctx.body = id_invalid;
//   } else {
//     ctx.status = 200;
//     posts[index] = { id: id, title: title, body: body };
//     ctx.body = function_ok;
//   }
// };

// function parsingCheck(payload) {
//   try {
//     JSON.parse(payload);
//     return true;
//   } catch (e) {
//     return false;
//   }
// }
