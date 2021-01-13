import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
// import ReactDom from 'react-dom';
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Helmet} from 'react-helmet-async';

const App = () => {
  return (
    <Fragment>
      <Helmet>
        <title>TEST E&amp;C</title>
      </Helmet>
      <Fragment>
        <Route component={PostListPage} path={['/@:username', '/']} exact></Route>
        <Route component={LoginPage} path="/login"></Route>
        <Route component={RegisterPage} path="/register"></Route>
        <Route component={WritePage} path="/write"></Route>
        <Route component={PostPage} path="/@:username/:postId"></Route>
        <ToastContainer transition={Slide} />
      </Fragment>
    </Fragment>
  );
};

export default App;
