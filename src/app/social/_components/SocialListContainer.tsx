'use client';

import { GetSocialListParams } from '@/api/social/type';
import useFilterApiParams from '@/hooks/useFilterApiParams';
import { GET_SOCIAL_LIST_INIT_FILTER } from '@/api/social/api';
import SocialInfiniteScrollFeed from './social-list/SocialInfiniteScrollFeed';
import SocialFilterBar from './social-filter-bar';
import CreateSocialModalButton from './CreateSocialModalButton';

const SocialListContainer = () => {
  const { filter, filterDispatch } = useFilterApiParams<GetSocialListParams>(
    GET_SOCIAL_LIST_INIT_FILTER
  );

  return (
    <>
      {/* 필터링 리스트 */}
      <section className="mb-12">
        <div className="flex justify-end">
          <CreateSocialModalButton />
        </div>

        <hr className="my-4 border-1 border-gray-200" />

        <SocialFilterBar filter={filter} filterDispatch={filterDispatch} />
      </section>

      {/* 소셜 리스트 그리드 */}
      <SocialInfiniteScrollFeed filter={filter} />
    </>
  );
};

export default SocialListContainer;
