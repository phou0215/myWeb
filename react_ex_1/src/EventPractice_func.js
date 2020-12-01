import React, { useState } from 'react';
const EventPractice = () => {
  const [form, setForm] = useState({ username: '', message: '' });
  const { username, message } = form;
  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };
  const onClick = () => {
    alert(username + ' : ' + message);
    setForm({ username: '', message: '' });
  };

  const onPressKey = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };
  return (
    <div>
      <h1>Event Excercise</h1>
      <input
        type="text"
        name="username"
        placeholder="user name"
        value={username}
        onChange={onChange}
      ></input>
      <input
        type="text"
        name="message"
        placeholder="message"
        value={message}
        onChange={onChange}
        onKeyPress={onPressKey}
      ></input>
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice;
