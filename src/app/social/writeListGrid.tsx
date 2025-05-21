'use client';

import { getSocialList, GetSocialListParams } from '@/api/social';
import GridCard from '@/components/common/Card/GridCard';
import Observer from '@/components/common/Observer/Observer';
import { useReducer, useState } from 'react';

const LIMIT = 12;

const WriteListGrid = () => {
  const initialFilterState: GetSocialListParams = {
    limit: LIMIT,
    offset: 0,
  };

  type FilterAction =
    | { type: 'SET_FILTER'; payload: Partial<GetSocialListParams> }
    | { type: 'RESET_FILTER' };

  const filterReducer = (state: GetSocialListParams, action: FilterAction) => {
    switch (action.type) {
      case 'SET_FILTER':
        return { ...state, ...action.payload };
      case 'RESET_FILTER':
        return initialFilterState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(filterReducer, initialFilterState);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = () => {
    if (!hasMore) return;
    setIsLoading(true);

    getSocialList(state).then((res) => {
      if (!res || res.length === 0) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }

      setData((prev) => [...prev, ...res]);
      setIsLoading(false);
      dispatch({
        type: 'SET_FILTER',
        payload: {
          offset: (state.offset ?? 0) + LIMIT,
        },
      });
    });
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {data?.map((item) => (
          <GridCard
            key={item.id}
            pageId={item.id}
            image={{
              src:
                item.image ||
                'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
              alt: `${item.name || '비어있는'} 섬네일 이미지`,
            }}
            textContent={{
              title: item.name || '제목 없음',
              genre: item.genre || '장르 없음',
              description: item.description || '설명 없음',
            }}
            isCardDataLoading={isLoading}
          />
        ))}
      </div>

      <Observer
        enabled={!isLoading && hasMore}
        onIntersect={fetchData}
        threshold={0.1}
      />
    </>
  );
};

export default WriteListGrid;
