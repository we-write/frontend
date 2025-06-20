'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { Editor, Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Blockquote from '@tiptap/extension-blockquote';
import EditorToolbar from '@/components/common/TextEditor/EditorToolbar';
import { Plugin } from 'prosemirror-state';
import {
  EditorContainerHeightParams,
  TextEditorProps,
} from '@/components/common/TextEditor/type';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import getTextWithLineBreaks from '@/utils/getTextWithLineBreaks';

const DEFAULT_STRING_MAX_LENGHT = 2000;
const EDITOR_TOOLBAR_HEIGHT = '20px';

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

const StringLimit = Extension.create({
  name: 'stringLimit',

  addOptions() {
    return {
      limit: DEFAULT_STRING_MAX_LENGHT,
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        filterTransaction: (transaction) => {
          const newText = transaction.doc.textContent;

          const limit = this.options.limit;

          if (newText.length > limit) {
            return false;
          }

          return true;
        },
      }),
    ];
  },
});

const TextEditor = forwardRef(
  (
    {
      className,
      editorHeight = '720px',
      isReadOnly = false,
      useToolbarMenu = true,
      initialContent,
      maxContentLength = DEFAULT_STRING_MAX_LENGHT,
    }: TextEditorProps,
    ref
  ) => {
    const [hasReachedLimit, setHasReachedLimit] = useState(false);
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
        StringLimit.configure({ limit: maxContentLength }),
      ],
      content: initialContent,
      editable: !isReadOnly,
      onUpdate: ({ editor }) => {
        const textLength = editor.state.doc.textContent.length;
        setHasReachedLimit(textLength >= maxContentLength);
      },
    });

    useImperativeHandle(
      ref,
      () =>
        editor
          ? {
              getHTML: () => editor.getHTML(),
              getText: () =>
                getTextWithLineBreaks({ htmlString: editor.getHTML() }),
            }
          : {
              getHTML: () => '',
              getText: () => '',
            },
      [editor]
    );

    const handleEditorFocus = (editor: Editor | null) => () => {
      if (!editor) {
        console.warn('editor가 존재하지 않습니다.');
        return;
      }

      if (!editor.isFocused) {
        editor.commands.focus();
      }
    };

    const editorContainerHeight = ({
      editorHeight,
      isReadOnly,
      useToolbarMenu,
    }: EditorContainerHeightParams) => {
      const isContainToolbar = !isReadOnly && useToolbarMenu;

      const height = isContainToolbar
        ? `calc(${editorHeight} - ${EDITOR_TOOLBAR_HEIGHT})`
        : editorHeight;

      return { height };
    };

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
        {!isReadOnly && useToolbarMenu && <EditorToolbar editor={editor} />}
        <EditorContent
          ref={editorContentRef}
          editor={editor}
          className={`mt-2 overflow-y-auto`}
          onClick={handleEditorFocus(editor)}
          style={editorContainerHeight({
            editorHeight,
            isReadOnly,
            useToolbarMenu,
          })}
        />
        {hasReachedLimit && (
          <p className="pr-4 text-gray-500">최대 글자 수에 도달하였습니다.</p>
        )}
      </div>
    );
  }
);

TextEditor.displayName = 'TextEditor';
export default TextEditor;
