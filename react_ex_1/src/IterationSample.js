import React, { useState } from 'react';
import { Fragment } from 'react';

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: 'snowman' },
    { id: 2, text: 'ice' },
    { id: 3, text: 'snow' },
    { id: 4, text: 'wind' },
  ]);
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(5);
  const onChange = (e) => {
    setInputText(e.target.value);
  };
  const onClick = (e) => {
    if (inputText === '' || inputText === null) {
      alert('Please input list name.');
    } else {
      const flag = window.confirm('Do you want update list now?');
      if (flag === true) {
        const nextNames = names.concat({ id: nextId, text: inputText });
        setNextId(nextId + 1);
        setNames(nextNames);
        setInputText('');
      } else {
        setInputText('');
      }
    }
  };

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      if (inputText === '' || inputText === null) {
        alert('Please input list name.');
      } else {
        const flag = window.confirm('Do you want update list now?');
        if (flag === true) {
          const nextNames = names.concat({ id: nextId, text: inputText });
          setNextId(nextId + 1);
          setNames(nextNames);
          setInputText('');
        } else {
          setInputText('');
        }
      }
    }
  };

  const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
  };

  const namesList = names.map((name) => (
    <li
      key={name.id}
      onDoubleClick={() => {
        onRemove(name.id);
      }}
    >
      {name.text}
    </li>
  ));
  return (
    <Fragment>
      <input value={inputText} onChange={onChange} onKeyPress={onEnter}></input>
      <button onClick={onClick}>추가</button>
      <ul>{namesList}</ul>
    </Fragment>
  );
};

export default IterationSample;
