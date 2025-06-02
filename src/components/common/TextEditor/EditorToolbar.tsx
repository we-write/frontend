'use client';

import {
  Bold,
  Italic,
  Baseline,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import useBoolean from '@/hooks/useBoolean';
import { useEffect, useState } from 'react';
import {
  AlignDirectionType,
  EditorToolbarProps,
  HandleChangeTextAlignParams,
  HandleFontSizeChangeParams,
  HandleMarkChangeParams,
} from '@/components/common/TextEditor/type';

const ALIGN_OPTIONS = ['left', 'center', 'right'] as const;
const FONT_SIZE_OPTIONS = [
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px',
];
const TOOLBAR_ICON_SIZE_PX = 18;

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const { value, toggle, setFalse } = useBoolean();
  const [currentFontSize, setCurrentFontSize] = useState('16px');
  const [isTextStyleApplied, setIsTextStyleApplied] = useState({
    textBlack: true,
    textRed: false,
    bold: false,
    italic: false,
    blockquote: false,
  });
  const [isAlignApplied, setIsAlignApplied] =
    useState<AlignDirectionType>('left');
  const DropDownContentStyle =
    'h-full w-full rounded-lg px-4 py-1.5 hover:bg-gray-200';

  useEffect(() => {
    if (editor && editor.isEmpty) {
      editor.chain().focus().setColor('#000').run();
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    const updateMarkStates = () => {
      const newFontSize = editor.getAttributes('textStyle').fontSize;
      const newIsAlignApplied = editor.isActive({ textAlign: 'left' })
        ? 'left'
        : editor.isActive({ textAlign: 'center' })
          ? 'center'
          : editor.isActive({ textAlign: 'right' })
            ? 'right'
            : 'left';
      const newIsTextStyleApplied = {
        textBlack: editor.getAttributes('textStyle').color === '#000',
        textRed: editor.getAttributes('textStyle').color === '#f00',
        bold: editor.isActive('bold'),
        italic: editor.isActive('italic'),
        blockquote: editor.isActive('blockquote'),
      };
      setCurrentFontSize(newFontSize ? newFontSize : '16px');
      setIsTextStyleApplied(newIsTextStyleApplied);
      setIsAlignApplied(newIsAlignApplied);
    };

    editor.on('selectionUpdate', updateMarkStates);

    updateMarkStates();

    return () => {
      editor.off('selectionUpdate', updateMarkStates);
    };
  }, [editor]);

  if (!editor) return null;

  const handleFontSizeChange = ({ fontSize }: HandleFontSizeChangeParams) => {
    if (fontSize === currentFontSize) {
      setFalse();
      return;
    }

    editor.chain().focus().setFontSize(fontSize).run();
    setCurrentFontSize(fontSize);
    setFalse();
  };

  const handleChangeTextAlign = ({
    alignDirection,
  }: HandleChangeTextAlignParams) => {
    const editorStyles = {
      fontSize: editor.getAttributes('textStyle').fontSize,
      color: editor.getAttributes('textStyle').color,
      isBold: editor.isActive('bold'),
      isItalic: editor.isActive('italic'),
    };

    let chain = editor.chain().focus().setTextAlign(alignDirection);

    if (editorStyles.isBold) chain = chain.setMark('bold', {});
    if (editorStyles.isItalic) chain = chain.setMark('italic', {});
    if (editorStyles.fontSize) chain = chain.setFontSize(editorStyles.fontSize);
    if (editorStyles.color) chain = chain.setColor(editorStyles.color);

    chain.run();

    setIsAlignApplied(alignDirection);

    setFalse();
  };

  const handleMarkChange = ({ mark }: HandleMarkChangeParams) => {
    const chain = editor.chain().focus();
    setIsTextStyleApplied((prev) => ({
      ...prev,
      [mark]: !prev[mark],
    }));

    switch (mark) {
      case 'bold':
        chain.toggleBold().run();
        break;
      case 'italic':
        chain.toggleItalic().run();
        break;
      case 'blockquote':
        chain.toggleBlockquote().run();
        break;
      default:
        return;
    }
    setFalse();
  };

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-4 border-b border-b-gray-300 p-2 pt-0 sm:gap-7">
      <Dropdown
        trigger={<button onClick={toggle}>{currentFontSize}</button>}
        isOpen={value}
      >
        <Dropdown.Container className="fixed z-10 shadow-md">
          {FONT_SIZE_OPTIONS.map((size) => (
            <Dropdown.Content
              key={size}
              onClick={() => handleFontSizeChange({ fontSize: size })}
              contentItem={<div className={DropDownContentStyle}>{size}</div>}
            />
          ))}
        </Dropdown.Container>
      </Dropdown>
      <button
        onClick={() => {
          editor.chain().focus().setColor('#000').run();
          setIsTextStyleApplied((prev) => ({
            ...prev,
            textRed: false,
            textBlack: true,
          }));
          setFalse();
        }}
        className={`rounded p-1.5 ${isTextStyleApplied.textBlack && 'bg-gray-200'}`}
      >
        <Baseline size={TOOLBAR_ICON_SIZE_PX} />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().setColor('#f00').run();
          setIsTextStyleApplied((prev) => ({
            ...prev,
            textBlack: false,
            textRed: true,
          }));
          setFalse();
        }}
        className={`rounded p-1.5 ${isTextStyleApplied.textRed && 'bg-gray-200'}`}
      >
        <Baseline size={TOOLBAR_ICON_SIZE_PX} className="text-red-600" />
      </button>
      <button
        onClick={() => handleMarkChange({ mark: 'bold' })}
        className={`rounded p-1.5 ${isTextStyleApplied.bold && 'bg-gray-200'}`}
      >
        <Bold size={TOOLBAR_ICON_SIZE_PX} />
      </button>
      <button
        onClick={() => handleMarkChange({ mark: 'italic' })}
        className={`rounded p-1.5 ${isTextStyleApplied.italic && 'bg-gray-200'}`}
      >
        <Italic size={TOOLBAR_ICON_SIZE_PX} />
      </button>
      <button
        onClick={() => handleMarkChange({ mark: 'blockquote' })}
        className={`rounded p-1.5 ${isTextStyleApplied.blockquote && 'bg-gray-200'}`}
      >
        <Quote size={TOOLBAR_ICON_SIZE_PX} />
      </button>
      {ALIGN_OPTIONS.map((direction) => (
        <button
          key={direction}
          onClick={() => handleChangeTextAlign({ alignDirection: direction })}
          className={`rounded p-1.5 ${isAlignApplied === direction && 'bg-gray-200'}`}
        >
          {direction === 'left' && <AlignLeft size={TOOLBAR_ICON_SIZE_PX} />}
          {direction === 'center' && (
            <AlignCenter size={TOOLBAR_ICON_SIZE_PX} />
          )}
          {direction === 'right' && <AlignRight size={TOOLBAR_ICON_SIZE_PX} />}
        </button>
      ))}
    </div>
  );
};

export default EditorToolbar;
