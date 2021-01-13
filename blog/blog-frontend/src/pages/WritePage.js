import React, { Fragment } from 'react';
import Responsive from "../components/common/Responsive";
import Editor from "../components/write/Editor";
import TagBoxContainer from "../containers/write/TagBoxContainer";
import WirteActionButtons from '../components/write/WriteActionButtons';
import EditorContainer from "../containers/write/EditorContainer";
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import {Helmet} from 'react-helmet-async';

const WritePage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>POST WRITE</title>
      </Helmet>
      <Responsive>
        <HeaderContainer></HeaderContainer>
        <EditorContainer></EditorContainer>
        <TagBoxContainer></TagBoxContainer>
        <WriteActionButtonsContainer></WriteActionButtonsContainer>
      </Responsive>
    </Fragment>

  );
};

export default WritePage;
