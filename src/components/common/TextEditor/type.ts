import { Editor } from '@tiptap/react';

export interface EditorToolbarProps {
  editor: Editor | null;
}

export interface TextEditorProps {
  className?: string;
  editorHeight?: string;
  isReadOnly?: boolean;
  initialContent?: string;
  onChange?: (content: string) => void;
}

export interface HandleFontSizeChangeParams {
  fontSize: string;
}

export type AlignDirectionType = 'left' | 'center' | 'right';

export interface HandleChangeTextAlignParams {
  alignDirection: AlignDirectionType;
}

export interface HandleMarkChangeParams {
  mark: 'bold' | 'italic' | 'blockquote';
}
