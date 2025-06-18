'use client';

import Button from '@/components/common/Button/Button';
import TextEditor from '@/components/common/TextEditor/TextEditor';
import useSaveSummary from '@/hooks/api/supabase/story-collaborators/useSaveSummary';
import { useEffect, useRef, useState } from 'react';
import { SummaryProps } from '../type';
import { TextEditorRef } from '@/types/textEditor';
import validateEditorContent from '@/utils/validators/validateEditorContent';
import { useGetStory } from '@/hooks/api/supabase/stories/useGetStory';
import useGetStoryCollaborators from '@/hooks/api/supabase/story-collaborators/useGetStoryCollaborators';
import getUserRole from '@/utils/getUserRole';

const SUMMARY_MIN_LENGTH = 10;

const StorySummary = ({ currentUserId, currentStoryId }: SummaryProps) => {
  const editorContentRef = useRef<TextEditorRef>(null);

  const [extractionHtml, setExtractionHtml] = useState('');

  const { data: storiesData, isLoading: isStoriesDataLoading } =
    useGetStory(currentStoryId);

  const {
    data: storyCollaboratorsData,
    isLoading: isStoryCollaboratorsDataLoading,
  } = useGetStoryCollaborators(currentStoryId);
  const currentUserRole =
    currentUserId && storyCollaboratorsData
      ? getUserRole({ storyCollaboratorsData, currentUserId })
      : 'GUEST';

  const { mutate } = useSaveSummary({ storyId: currentStoryId });

  useEffect(() => {
    if (!storiesData) return;

    const sanitizeHTML = async () => {
      const DOMPurify = (await import('dompurify')).default;
      if (storiesData.summary) {
        setExtractionHtml(DOMPurify.sanitize(storiesData.summary));
      }
    };
    sanitizeHTML();
  }, [storiesData]);

  const handleStoryIntroductionSubmit = () => {
    const validateResult = validateEditorContent({
      ref: editorContentRef,
      minLength: SUMMARY_MIN_LENGTH,
    });
    if (!validateResult) return;

    mutate({
      storyId: currentStoryId,
      summaryHtml: validateResult.newExtractionHtml,
    });
    setExtractionHtml(validateResult.newExtractionHtml);
  };

  if (!storiesData || isStoriesDataLoading || isStoryCollaboratorsDataLoading)
    return;

  return (
    <div className="mt-32 sm:mt-24 xl:px-10">
      <h2 className="mx-1 mb-4 text-2xl font-semibold">스토리 소개글</h2>
      {currentUserRole === 'LEADER' && !storiesData.summary ? (
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
