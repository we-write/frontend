'use client';

import { GetSocialListParams } from '@/api/social/type';
import useFilterApiParams from '@/hooks/useFilterApiParams';
import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal/Modal';
import CreateSocialForm from './createSocialForm/CreateSocialForm';
import useBoolean from '@/hooks/useBoolean';
import { GET_SOCIAL_LIST_INIT_FILTER } from '@/api/social/api';
import SocialList from './SocialList';
import SocialFilterBar from './SocialFilterBar';

const CreateSocialModalButton = () => {
  const { value: isOpen, setFalse: close, setTrue: open } = useBoolean();

  return (
    <>
      {/* 모임만들기 버튼 */}
      {/* 버튼사이즈는 버튼 리팩토링 이후 삭제예정 */}
      <Button size="custom" className="w-[115px]" onClick={open}>
        모임만들기
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={close}
        className="max-h-[70vh] overflow-scroll"
      >
        <CreateSocialForm onClose={close} />
      </Modal>
    </>
  );
};

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
      <SocialList filter={filter} />
    </>
  );
};

export default SocialListContainer;
