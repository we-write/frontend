import { Modal } from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import TextEditor from '@/components/common/TextEditor/TextEditor';
import { addDays, format } from 'date-fns';
import CreateStoryContentModal from './CreateStoryContentModal';
import { WritableUserModalProps } from './type';
import { useEffect, useState } from 'react';
import useGetApproveUser from '@/hooks/api/content-approvals/useGetApproveUser';
import useApproveContent from '@/hooks/api/content-approvals/useApproveContent';
import { CircleCheck } from 'lucide-react';
import useGetLastContent from '@/hooks/api/contents/useGetLastContent';
import useGetSocialParticipantsByDb from '@/hooks/api/useGetSocialParticipantsByDb';
import { useStoryModal } from '@/providers/StoryWriteOrApproveModalProviders';

const WritableUserModal = ({
  currentChapter,
  currentStoryId,
  currentUserId,
  approvalPeriod,
  approvedCount,
}: WritableUserModalProps) => {
  const { isOpen, closeModal } = useStoryModal();
  const [isUserApproved, setIsUserApproved] = useState(false);
  const [tempApprovedCount, setTempApprovedCount] = useState(0);
  const { data: lastContentData } = useGetLastContent({
    storyId: currentStoryId,
  });
  const { data: approveUserData } = useGetApproveUser({
    contentId: lastContentData?.content_id,
  });
  const { data: lastContentWroteUserName } = useGetSocialParticipantsByDb({
    userId: lastContentData?.user_id,
  });
  const { mutate } = useApproveContent({
    storyId: currentStoryId,
    contentId: lastContentData?.content_id,
  });
  console.log(lastContentData?.content_id);
  useEffect(() => {
    if (approveUserData?.length) {
      setTempApprovedCount(approveUserData?.length);
    }
    if (approveUserData && currentUserId) {
      const hasApproved = approveUserData.some(
        (item) => item.user_id === currentUserId
      );
      setIsUserApproved(hasApproved);
    }
  }, [approveUserData, currentUserId]);

  if (lastContentData?.status === 'MERGED') {
    return (
      <CreateStoryContentModal
        currentChapter={currentChapter}
        currentStoryId={currentStoryId}
        currentUserId={currentUserId}
        lastContentData={lastContentData}
      />
    );
  }

  const getDueDate = () => {
    if (!lastContentData) {
      console.warn('마지막으로 작성된 글을 불러올 수 없습니다.');
      return;
    }
    const dueDate = addDays(
      new Date(lastContentData?.created_at),
      approvalPeriod
    );
    return format(dueDate, 'yyyy/MM/dd HH:mm');
  };

  const handleApprove = () => {
    if (!currentUserId) {
      alert('회원 정보 오류로 승인할 수 없습니다.');
      closeModal();
      return;
    }
    if (!lastContentData) {
      console.warn('마지막으로 작성된 글을 불러올 수 없습니다.');
      return;
    }
    const approveConfirmed = window.confirm(
      '해당 글의 메인 스토리 병합을 승인하시겠습니까?'
    );
    if (approveConfirmed) {
      mutate({ userId: currentUserId, contentId: lastContentData.content_id });
    } else {
      return;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="flex h-full w-full max-w-232 flex-col justify-center md:block md:h-auto md:w-fit"
    >
      <div className="mb-1 pt-12">
        {lastContentWroteUserName && (
          <h2 className="mb-2 text-3xl">
            <span className="text-write-main">
              {lastContentWroteUserName?.user_name}
            </span>
            님이
            <br />
            등록한 글이 승인 대기 중입니다.
          </h2>
        )}
        <div className="sm:flex sm:items-baseline sm:justify-between sm:gap-2">
          <p className="text-3xl font-bold">현재 챕터 {currentChapter}</p>
        </div>
      </div>
      <div className="mr-5 flex flex-col-reverse items-start justify-between md:flex-row md:items-center">
        <p className="mb-2 text-sm text-gray-500 md:mb-0">
          *현재 다른 팀원이 올린 글이 존재하여 신규 작성이 불가능합니다*
        </p>
        <p className="text-write-main mt-5 mb-2 flex items-center text-[1.65rem] font-bold md:mt-0">
          <span className="mr-1.5 md:mr-2">
            <CircleCheck aria-hidden="true" />
          </span>
          승인 인원 : {tempApprovedCount} / {approvedCount}
        </p>
      </div>

      <TextEditor
        editorHeight="500px"
        className="min-h-110 md:min-w-180 lg:min-h-125 lg:min-w-220"
        initialContent={lastContentData?.content}
        useToolbarMenu={false}
        isReadOnly
      />

      <p className="mt-3 text-center font-semibold text-gray-500">
        마감기한 : {getDueDate()}
      </p>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleApprove}
          color="custom"
          size="custom"
          className={`w-24 text-white ${isUserApproved ? 'cursor-not-allowed bg-gray-300' : 'bg-write-success'}`}
          disabled={isUserApproved}
        >
          {isUserApproved ? '승인완료' : '승인하기'}
        </Button>
      </div>
    </Modal>
  );
};

export default WritableUserModal;
