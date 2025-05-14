'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Home = () => {
  const { data, isStale, isFetching, refetch, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () =>
      (await fetch('https://jsonplaceholder.typicode.com/posts/1')).json(),
    staleTime: 1000 * 5,
  });

  return (
    <>
      {isLoading ? (
        <div>로딩 중..</div>
      ) : (
        <>
          <div>{data?.time}</div>
          <div>데이터가 상했나요?: {JSON.stringify(isStale)}</div>
          <button disabled={isFetching} onClick={() => refetch()}>
            {isFetching ? '데이터 가져오는 중..' : '데이터 다시 가져오기!'}
          </button>
        </>
      )}
    </>
  );
};

export default Home;
