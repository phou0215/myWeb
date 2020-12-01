import React, { Fragment } from "react";

const Sample = ({
  loadingPost,
  loadingUsers,
  post,
  users,
  postStatus,
  usersStatus,
}) => {
  return (
    <div>
      <section>
        <h1>포스트</h1>
        {loadingPost && "포스트 로딩 중..."}
        {!loadingPost && post && (
          <div>
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
            <h3>
              상태: {postStatus ? "사용자 정상 데이터" : "포스트 데이터 에러"}
            </h3>
          </div>
        )}
      </section>
      <hr />
      <section>
        <h1>사용자목록</h1>
        {loadingUsers && "사용자 목록 로딩 중..."}
        {!loadingPost && users && (
          <Fragment>
            <h3>
              상태: {usersStatus ? "사용자 정상 데이터" : "사용자 데이터 에러"}
            </h3>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.name}({user.email})
                </li>
              ))}
            </ul>
          </Fragment>
        )}
      </section>
    </div>
  );
};

export default Sample;
