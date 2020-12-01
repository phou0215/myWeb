import React, { useCallback, useState, useRef } from 'react';
import axios from 'axios';

function getUrl() {
  const apiKey = '91c5a2911dd34dc2986ad6570c7ac122';
  const category = 'sports';
  if (category !== 'all') {
    return (
      'https://newsapi.org/v2/top-headlines?country=kr&apiKey=' +
      apiKey +
      '&category=' +
      category
    );
  } else {
    return 'https://newsapi.org/v2/top-headlines?country=kr&apiKey=' + apiKey;
  }
}

const App = () => {
  const [data, setData] = useState(null);
  const targetUrl = getUrl();
  const url = useRef(targetUrl);
  const onClick = useCallback(async () => {
    try {
      console.log(url.current);
      const response = await axios.get(url.current);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
        <br />
        <br />
        <br />
      </div>
      {data && (
        <textarea
          rows={7}
          style={{ width: '1200px', height: '600px' }}
          value={JSON.stringify(data, null, 2)}
          readOnly={true}
        ></textarea>
      )}
    </div>
  );
};

export default React.memo(App);
