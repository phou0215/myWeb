import React, { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
  // 대기 중/완료/실패에 대한 상태 관리
  const [loading, setLoding] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);
  const asyncData = async () => {
    setLoding(true);
    try {
      const resolved = await promiseCreator();
      setResolved(resolved);
    } catch (e) {
      setError(e);
    }
    setLoding(false);
  };
  useEffect(() => {
    asyncData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return [loading, resolved, error];
}
