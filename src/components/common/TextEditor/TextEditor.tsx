'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Blockquote from '@tiptap/extension-blockquote';
import EditorToolbar from '@/components/common/TextEditor/EditorToolbar';
import { Plugin } from 'prosemirror-state';
import { TextEditorProps } from '@/components/common/TextEditor/type';
import { useEffect, useRef } from 'react';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
    };
  }
}

const CleanPaste = Extension.create({
  name: 'cleanPaste',
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste(view, event) {
            const { state, dispatch } = view;
            const text = event.clipboardData?.getData('text/plain');

            if (!text) return false;

            const storedMarks =
              state.storedMarks || state.selection.$from.marks();

            const textNode = state.schema.text(text, storedMarks);

            const tr = state.tr.replaceSelectionWith(textNode, false);
            dispatch(tr.scrollIntoView());
            return true;
          },
        },
      }),
    ];
  },
});

const FontSize = Extension.create({
  name: 'fontSize',

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              const size = attributes.fontSize;
              if (!size) return {};
              return {
                style: `font-size: ${size}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (size: string) =>
        ({ chain }) =>
          chain()
            .extendMarkRange('textStyle')
            .setMark('textStyle', { fontSize: size })
            .run(),
    };
  },
});

const TextEditor = ({
  className,
  editorHeight = '720px',
  isReadOnly = false,
  initialContent,
}: TextEditorProps) => {
  const editorContentRef = useRef<HTMLDivElement>(null);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Blockquote,
      TextStyle,
      FontSize,
      Color,
      TextAlign.configure({ types: ['paragraph'] }),
      CleanPaste,
    ],
    content: initialContent,
    editable: !isReadOnly,
  });

  useEffect(() => {
    const proseMirrorEl = editorContentRef.current?.querySelector(
      '.ProseMirror'
    ) as HTMLElement;
    if (proseMirrorEl) {
      proseMirrorEl.style.minHeight = editorHeight;
      proseMirrorEl.style.height = editorHeight;
    }
  }, [editorHeight]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(!isReadOnly);
    }
  }, [editor, isReadOnly]);

  return (
    <div
      className={`relative w-full rounded-xl border border-gray-400 p-3 ${className} ${isReadOnly ? 'bg-gray-200' : 'bg-white'}`}
    >
      {!isReadOnly && <EditorToolbar editor={editor} />}
      <EditorContent
        ref={editorContentRef}
        editor={editor}
        className={`mt-2 overflow-y-auto h-[${editorHeight}]`}
      />
    </div>
  );
};

export default TextEditor;
