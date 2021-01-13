import client from './client';
import qs from 'qs';

// 글쓰기 관련
export const writePost = ({ title, body, tags}) => {
  return client.post('/api/posts/', { title, body, tags });
};

//글 Read
export const readPost = (id) =>{
  return client.get('/api/posts/'+id);
}

//글 list 조회
export const listPosts = ({page, username, tag}) => {
  const queryString = qs.stringify({
    page,username,tag
  });
  return client.get('/api/posts?'+queryString)  
}

//등록 글 update
export const updatePost = ({id, title, body, tags}) => {
  return client.patch('/api/posts/'+id, {title, body, tags})  
}

//등록 글 삭제
export const deletePost = (id) =>{
  console.log('API에서 id:'+id)
  return client.delete('/api/posts/'+id)
}