import React from 'react';
import styled from 'styled-components';
import axios from '../../node_modules/axios/index';
import NewsItem from './NewsItem';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const getUrl = (apiKey, category) => {
  //   const apiKey = '91c5a2911dd34dc2986ad6570c7ac122';
  //   const category = 'sports';
  if (category !== 'all') {
    return (
      'https://newsapi.org/v2/top-headlines?country=kr&apiKey=' +
      apiKey +
      '&category=' +
      category
    );
  } else {
    return 'https://newsapi.org/v2/top-headlines?country=kr&apiKey=' + apiKey;
  }
};

// const sampleArticle = {
//   title: '제목',
//   description: '내용',
//   url: 'https://google.com',
//   urlToImage: 'https://via.placeholder.com/160',
// };

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const target_url = getUrl('91c5a2911dd34dc2986ad6570c7ac122', category);
    return axios.get(target_url);
  }, [category]);

  if (loading) {
    return <NewsListBlock> 대기중...</NewsListBlock>;
  }
  if (!response) {
    return null;
  }
  if (error) {
    return <NewsListBlock>에러가 발생했습니다.</NewsListBlock>;
  }
  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map((article) => {
        return <NewsItem key={article.url} article={article}></NewsItem>;
      })}
    </NewsListBlock>
  );
};

export default React.memo(NewsList);
