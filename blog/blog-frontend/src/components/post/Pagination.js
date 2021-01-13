import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/ButtonCommon';
import palette from '../../lib/styles/palette';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-items: space-between;
  margin-bottom: 3rem;
`;

const StyledButton = styled(Button)`
  background: ${palette.cyan[7]};
  width:100px;
`;

const PageNumber = styled.div`
  & + & {
    margin:2px;
  }
`;

const buildLink = ({ username, tag, page }) => {
  const query = qs.stringify({ tag, page });
  return username ? '/@' + username + '?' + query : '/?' + query;
};

const Pagination = ({ page, lastPage, username, tag }) => {
  return (
    <PaginationBlock>
      <StyledButton
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })
        }
      >
        Pre
      </StyledButton>
      <PageNumber>{page}</PageNumber>
      <StyledButton
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ username, tag, page: page + 1 })
        }
      >
        Next
      </StyledButton>
    </PaginationBlock>
  );
};

export default Pagination;
