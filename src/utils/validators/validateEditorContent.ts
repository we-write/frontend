import { TextEditorRef } from '@/types/textEditor';
import { RefObject } from 'react';

type ValidateEditorContentParams = {
  ref: RefObject<TextEditorRef | null>;
  minLength?: number;
  alertMessage?: string;
};

type EditorValidationResult =
  | false
  | {
      isValid: true;
      newExtractionHtml: string;
      newExtractionPureString: string;
    };

const validateEditorContent = ({
  ref,
  minLength = 10,
  alertMessage = `최소 ${minLength}자 이상의 내용을 입력해주세요.`,
}: ValidateEditorContentParams): EditorValidationResult => {
  if (!ref.current) {
    console.warn('Editor ref가 존재하지 않습니다.');
    return false;
  }
  const newExtractionHtml = ref.current.getHTML();
  const newExtractionPureString = ref.current.getText();

  if (
    !newExtractionPureString ||
    newExtractionPureString.trim().length < minLength
  ) {
    alert(alertMessage);
    return false;
  }

  return { isValid: true, newExtractionHtml, newExtractionPureString };
};

export default validateEditorContent;
