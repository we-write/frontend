import { Modal } from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import TextEditor from '@/components/common/TextEditor/TextEditor';
import { CreateContentModalProps } from '@/app/library/detail/[storyId]/type';
import { useRef, FormEvent } from 'react';
import usePostContent from '@/hooks/api/supabase/stories/usePostContent';
import { useStoryModal } from '@/providers/StoryWriteOrApproveModalProviders';
import { TextEditorRef } from '@/types/textEditor';
import validateEditorContent from '@/utils/validators/validateEditorContent';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { getLastContent } from '@/api/stories/api';
import { Contents } from '@/lib/supabase/custom-types';

const CONTENT_MIN_LENGTH = 20;

const CreateContentModal = ({
  currentStoryId,
  currentUserId,
  maxContentLength,
}: CreateContentModalProps) => {
  const editorContentRef = useRef<TextEditorRef>(null);
  const { isOpen, closeModal } = useStoryModal();
  const { mutate } = usePostContent({ storyId: currentStoryId });
  const queryClient = useQueryClient();
  const temporaryContent =
    typeof window !== 'undefined'
      ? localStorage.getItem('TemporaryContent') || ''
      : '';

  const handleTemporarySave = () => {
    if (!editorContentRef.current) {
      console.warn('Editor ref가 존재하지 않습니다.');
      return;
    }
    const newExtractionHtml = editorContentRef.current.getHTML();
    if (newExtractionHtml == '<p></p>') {
      alert('내용을 작성해주세요.');
      return;
    }
    localStorage.setItem('TemporaryContent', newExtractionHtml);
    alert('임시 저장되었습니다.');
  };

  const refetchLastContent = async () => {
    const result = await queryClient.fetchQuery({
      queryKey: [QUERY_KEY.GET_LAST_CONTENT, currentStoryId],
      queryFn: () => getLastContent(currentStoryId),
      staleTime: 0,
    });

    return result;
  };

  const lastContentStatusCheck = (content: Contents | null | undefined) => {
    if (content?.status === 'PENDING') {
      alert('승인 대기 중인 글이 존재하여 등록할 수 없습니다.');
      return;
    }

    const validateResult = validateEditorContent({
      ref: editorContentRef,
      minLength: CONTENT_MIN_LENGTH,
    });

    if (!validateResult) return;

    const postStoryConfirmed = window.confirm(
      '등록된 후엔 수정할 수 없습니다. 등록하시겠습니까?'
    );

    if (postStoryConfirmed) {
      mutate({
        storyId: currentStoryId,
        content: validateResult.newExtractionHtml,
        userId: currentUserId!,
      });
      localStorage.removeItem('TemporaryContent');
    } else {
      return;
    }
  };

  const handlePostStoryContent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUserId) {
      console.warn('유저 정보가 존재하지 않습니다.');
      return;
    }

    const currentLastContentData = await refetchLastContent();

    lastContentStatusCheck(currentLastContentData);
  };

  const handleCloseModal = () => {
    if (!editorContentRef.current) {
      console.warn('Editor ref가 존재하지 않습니다.');
      return;
    }
    const currentContent = editorContentRef.current.getHTML();
    const savedContent = localStorage.getItem('TemporaryContent');
    if (currentContent === savedContent) {
      closeModal();
      return;
    }
    const contentDeleteConfirmed = window.confirm(
      '저장하지 않은 내용은 삭제됩니다. 종료하시겠습니까?'
    );
    if (contentDeleteConfirmed) {
      closeModal();
    } else {
      return;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      className="flex h-full w-full max-w-232 flex-col justify-center md:block md:h-auto md:w-fit"
    >
      <form onSubmit={handlePostStoryContent} className="mb-1 pt-12">
        <div className="mb-3 flex items-end justify-between md:px-2">
          <h2 className="text-xl md:text-xl">이어질 이야기를 작성해주세요</h2>
          <p className="text-end text-gray-500">
            글자 수 제한 : {maxContentLength}
          </p>
        </div>
        <TextEditor
          ref={editorContentRef}
          editorHeight="500px"
          initialContent={temporaryContent}
          useToolbarMenu={false}
          maxContentLength={maxContentLength}
          className="min-h-110 md:min-w-180 lg:min-h-125 lg:min-w-220"
        />
        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            onClick={handleTemporarySave}
            color="secondary"
            variant="inverted"
            size="custom"
            className="w-24 border-gray-500"
          >
            임시저장
          </Button>
          <Button
            type="submit"
            color="custom"
            size="custom"
            className="bg-write-success w-24 text-white"
          >
            등록하기
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateContentModal;
