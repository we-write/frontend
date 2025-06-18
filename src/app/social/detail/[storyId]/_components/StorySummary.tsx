'use client';

import Button from '@/components/common/Button/Button';
import TextEditor from '@/components/common/TextEditor/TextEditor';
import { SummaryProps } from '../type';
import useSocialDetailData from '@/app/social/detail/[storyId]/hooks/useSocialDetailData';
import useManageSummary from '../hooks/useManageSummary';

const StorySummary = ({ currentUserId, currentStoryId }: SummaryProps) => {
  const { storiesData, userRole, isLoading } = useSocialDetailData({
    storyId: currentStoryId,
    userId: currentUserId,
  });

  const { editorContentRef, extractionHtml, handleStoryIntroductionSubmit } =
    useManageSummary({
      storyId: currentStoryId,
      storiesData: storiesData,
    });

  if (!storiesData || isLoading) return;

  return (
    <div className="mt-32 sm:mt-24 xl:px-10">
      <h2 className="mx-1 mb-4 text-2xl font-semibold">스토리 소개글</h2>
      {userRole === 'LEADER' && !storiesData.summary ? (
        <div className="flex h-240 w-full flex-col">
          <TextEditor
            ref={editorContentRef}
            editorHeight="720px"
            className="my-4 min-h-180"
          />
          <Button
            type="button"
            color="custom"
            size="custom"
            onClick={handleStoryIntroductionSubmit}
            className="bg-write-success w-38 self-end text-white"
          >
            등록하기
          </Button>
        </div>
      ) : (
        <div
          className="prose rendered-html max-w-none"
          dangerouslySetInnerHTML={{ __html: extractionHtml }}
        />
      )}
    </div>
  );
};

export default StorySummary;
