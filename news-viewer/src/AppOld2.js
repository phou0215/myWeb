import React, { Fragment, useState, useCallback } from 'react';
import NewsList from './component/NewsList';
import Categories from './component/Categories';

const App = () => {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback((category) => {
    setCategory(category);
  }, []);
  return (
    <Fragment>
      <Categories category={category} onSelect={onSelect}></Categories>
      <NewsList category={category}></NewsList>
    </Fragment>
  );
};

export default React.memo(App);
