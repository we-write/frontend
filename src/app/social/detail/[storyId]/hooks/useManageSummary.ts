import { TextEditorRef } from '@/types/textEditor';
import { useEffect, useRef, useState } from 'react';
import { UseManageSummaryParams } from '@/app/social/detail/[storyId]/type';
import validateEditorContent from '@/utils/validators/validateEditorContent';
import useSaveSummary from '@/hooks/api/supabase/story-collaborators/useSaveSummary';

const SUMMARY_MIN_LENGTH = 10;

const useManageSummary = ({ storyId, storiesData }: UseManageSummaryParams) => {
  const editorContentRef = useRef<TextEditorRef>(null);
  const [extractionHtml, setExtractionHtml] = useState('');

  const { mutate } = useSaveSummary({ storyId: storyId });

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
      storyId: storyId,
      summaryHtml: validateResult.newExtractionHtml,
    });
    setExtractionHtml(validateResult.newExtractionHtml);
  };

  return { editorContentRef, extractionHtml, handleStoryIntroductionSubmit };
};

export default useManageSummary;
