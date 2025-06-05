import { Modal } from '@/components/common/Modal/Modal';
import { ContentWriteIcon } from '@public/assets/icons';
import Button from '@/components/common/Button/Button';
import TextEditor from '@/components/common/TextEditor/TextEditor';
import useBoolean from '@/hooks/useBoolean';
import { addDays, format } from 'date-fns';
import CreateStoryContentModal from './CreateStoryContentModal';
import { WritableUserModalProps } from './type';

const WritableUserModal = ({
  currentChapter,
  approvalPeriod,
  approvedCount,
}: WritableUserModalProps) => {
  const {
    value: isOpen,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean();

  // MEMO : 임시 데이터
  const tempLastData = {
    created_at: '2025-06-04T11:57:47+00:00',
    content: '이거는 테스트를 하기위한 추가데이터입니다',
    status: 'PENDING',
    user_id: 1111,
    content_id: 'a4230d43-6998-404f-aa4c-7e3ccf1fc9d6',
    merged_at: '2025-06-04T12:01:00.123221',
    story_id: '375a0138-6d95-41df-baf8-8361903b9f81',
  };

  //MEMO : 임시 WRIABLE 상태로 네이밍 더 명확하게 해도 좋을듯
  if (tempLastData.status === 'WRITABLE') {
    return <CreateStoryContentModal currentChapter={currentChapter} />;
  }

  //MEMO : 지금까지 승인한 사람의 수 임시 데이터 데이터베이스에서 가져와야합니다.
  const tempApprovedCount = 2;

  // MEMO : 임시 작성자 이름
  const pendingStoryWriterUserName = 'player0657';

  const getDueDate = () => {
    const dueDate = addDays(new Date(tempLastData.created_at), approvalPeriod);
    return format(dueDate, 'yyyy/MM/dd HH:mm');
  };

  const handleApprove = () => {
    if (tempApprovedCount === approvedCount) {
      //MEMO : 스토리에 추가되고 PENDING -> MERGED 상태로 변경 후 데이터 삭제하는 로직
    } else {
      //MEMO : 승인 카운팅 증가 로직 추가
    }
  };

  return (
    <>
      <button onClick={openModal} className="fixed right-10 bottom-10">
        {/* MEMO : 임시 아이콘 */}
        <ContentWriteIcon />
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} className="w-fit">
        <div className="mb-6">
          <h2 className="mb-2 text-3xl">
            <span className="text-write-main">
              {pendingStoryWriterUserName}
            </span>{' '}
            님이
            <br />
            등록한 글이 승인 대기 중입니다.
          </h2>
          <div className="sm:flex sm:items-baseline sm:justify-between sm:gap-2">
            <p className="text-3xl font-bold">현재 챕터 {currentChapter}</p>
            <p className="text-sm text-gray-500">
              *현재 다른 팀원이 올린 글이 존재하여 신규 작성이 불가능합니다*
            </p>
          </div>
        </div>

        <TextEditor editorHeight="500px" isReadOnly />

        <p className="mt-3 text-center font-semibold text-gray-500">
          마감기한 : {getDueDate()}
        </p>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleApprove}
            color="secondary"
            size="custom"
            className="w-24"
          >
            승인하기
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default WritableUserModal;
