import { Editor } from '@tiptap/react';

export interface EditorToolbarProps {
  editor: Editor | null;
}

export interface TextEditorProps {
  className?: string;
  editorHeight?: string;
  isReadOnly?: boolean;
  initialContent?: string;
}

export interface HandleFontSizeChangeParams {
  fontSize: string;
}

export interface HandleChangeTextAlignParams {
  alignDirection: 'left' | 'center' | 'right';
}

export interface HandleMarkChangeParams {
  mark: 'bold' | 'italic' | 'blockquote';
}
