import React from 'react';
import Responsive from "../components/common/Responsive";
import Editor from "../components/write/Editor";
import TagBoxContainer from "../containers/write/TagBoxContainer";
import WirteActionButtons from '../components/write/WriteActionButtons';
import EditorContainer from "../containers/write/EditorContainer";
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer></EditorContainer>
      <TagBoxContainer></TagBoxContainer>
      <WriteActionButtonsContainer></WriteActionButtonsContainer>
    </Responsive>
  );
};

export default WritePage;
