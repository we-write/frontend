'use client';

import SocialListGrid from './SocialListGrid';
import {
  DateFilter,
  GenreFilter,
  SortByCapacityAndRegistrationEnd,
} from './SocialFilterList';
import { GetSocialListParams } from '@/api/social/type';
import useFilterApiParams from '@/hooks/useFilterApiParams';
import Observer from '@/components/common/Observer/Observer';
import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal/Modal';
import CreateSocialForm from '../createSocialForm/CreateSocialForm';
import useBoolean from '@/hooks/useBoolean';
import { useGetSocialList } from '@/hooks/api/social';
import { GET_SOCIAL_LIST_INIT_FILTER } from '@/api/social/api';

const CreateSocialModalButton = () => {
  const { value: isOpen, setFalse: close, setTrue: open } = useBoolean();

  return (
    <>
      {/* 모임만들기 버튼 */}
      {/* 버튼사이즈는 버튼 리팩토링 이후 삭제예정 */}
      <Button size="custom" className="w-[115px]" onClick={open}>
        모임만들기
      </Button>

      <Modal isOpen={isOpen} onClose={close}>
        <CreateSocialForm />
      </Modal>
    </>
  );
};

const SocialList = () => {
  const { filter, filterDispatch } = useFilterApiParams<GetSocialListParams>(
    GET_SOCIAL_LIST_INIT_FILTER
  );
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetSocialList(filter);

  const socialList = data?.pages.flat() ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* 필터링 리스트 */}
      <section className="mb-12">
        <div className="flex justify-end">
          <CreateSocialModalButton />
        </div>

        <hr className="my-4 border-1 border-gray-200" />

        <div className="flex justify-between">
          <div className="flex gap-2">
            {/* 장르 필터 */}
            <GenreFilter filter={filter} filterDispatch={filterDispatch} />
            {/* 날짜 필터 추가예정 */}
            <DateFilter />
          </div>

          {/* 참여자수, 모집마감순 정렬 필터 */}
          <SortByCapacityAndRegistrationEnd
            filter={filter}
            filterDispatch={filterDispatch}
          />
        </div>
      </section>

      {/* 소셜 리스트 그리드 */}
      <SocialListGrid socialList={socialList || []} isLoading={isLoading} />

      {/* 무한 스크롤 옵저버 */}
      <Observer
        enabled={hasNextPage && !!socialList.length}
        onIntersect={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      />
    </>
  );
};

export default SocialList;
