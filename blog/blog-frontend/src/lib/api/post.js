import client from './client';

// 글쓰기 관련
export const writePost = ({ title, body, tags}) => {
  return client.post('/api/posts/', { title, body, tags });
};
