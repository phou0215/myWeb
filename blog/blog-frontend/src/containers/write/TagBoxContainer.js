import React from 'react';
import TagBox from '../../components/write/TagBox';
import { useSelector, useDispatch } from 'react-redux';
import { changeField } from '../../modules/write';

const TagBoxContainer = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector(({ write }) => ({ tags: write.tags }));
  const onChangeTags = (nextTags) => {
    dispatch(changeField({ key: 'tags', value: nextTags }));
  };
  return <TagBox onChangeTags={onChangeTags} tags={tags}></TagBox>;
};

export default TagBoxContainer;
