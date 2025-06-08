'use client';

import Button from '@/components/common/Button/Button';
import TextEditor from '@/components/common/TextEditor/TextEditor';
import useSaveSummary from '@/hooks/api/teams/useSaveSummary';
import { useEffect, useRef, useState } from 'react';
import { SummaryProps } from '@/app/social/detail/[socialId]/type';
import useGetSummary from '@/hooks/api/teams/useGetSummary';
import useGetUserRole from '@/hooks/api/teams/useGetUserRole';

const StorySummary = ({
  currentSocialId,
  currentUserId,
  currentStoryId,
}: SummaryProps) => {
  const editorContentRef = useRef<{ getHTML: () => string }>(null);
  const [extractionHtml, setExtractionHtml] = useState('');
  const { data: summaryData } = useGetSummary({
    socialId: currentSocialId,
  });
  const { data: userRoleData } = useGetUserRole({
    userId: currentUserId,
    storyId: currentStoryId,
  });
  const { mutate } = useSaveSummary({ socialId: currentSocialId });

  useEffect(() => {
    const sanitizeHTML = async () => {
      const DOMPurify = (await import('dompurify')).default;
      if (summaryData?.summary) {
        setExtractionHtml(DOMPurify.sanitize(summaryData.summary));
      }
    };
    sanitizeHTML();
  }, [summaryData?.summary]);

  const handleStoryIntroductionSubmit = () => {
    if (!editorContentRef.current) {
      console.warn('Editor ref가 존재하지 않습니다.');
      return;
    }
    const newExtractionHtml = editorContentRef.current.getHTML();
    mutate({
      socialId: currentSocialId,
      summaryHtml: newExtractionHtml,
    });
    setExtractionHtml(newExtractionHtml);
  };

  return (
    <div className="mt-24 px-10">
      <h2 className="mx-1 mb-4 text-2xl font-semibold">스토리 소개글</h2>
      {userRoleData?.role === 'LEADER' && !summaryData?.summary ? (
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
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: extractionHtml }}
        />
      )}
    </div>
  );
};

export default StorySummary;
