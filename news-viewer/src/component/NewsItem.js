import React from 'react';
import styled from 'styled-components';

const NewsItemBlock = styled.div`
  display: flex;
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 5%;
  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;
    }
  }
  .contents {
    h3 {
      margin: 0;
      a {
        color: black;
      }
      a:hover {
        color: #9912ad;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  & + & {
    margin-top: 3rem;
  }
`;

const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage } = article;
  return (
    <NewsItemBlock>
      {urlToImage && (
        <div className="thumbnail">
          <a href={url} target="_blank" rel="noopner noreferrer">
            <img src={urlToImage} alt="thumbnail"></img>
          </a>
        </div>
      )}
      <div className="contents">
        <h3>
          <a href={url} target="_blank" rel="noopner noreferrer">
            {title}
          </a>
        </h3>
        <p>{description}</p>
      </div>
    </NewsItemBlock>
  );
};

export default React.memo(NewsItem);
