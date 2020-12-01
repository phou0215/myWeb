import React, { Fragment } from 'react';
import Categories from '../component/Categories';
import NewsList from '../component/NewsList';

const NewPage = ({ match }) => {
  const category = match.params.category || 'all';

  return (
    <Fragment>
      <Categories></Categories>
      <NewsList category={category}></NewsList>
    </Fragment>
  );
};

export default React.memo(NewPage);
