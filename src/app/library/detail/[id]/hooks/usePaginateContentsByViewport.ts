'use client';

import { VIEWPORT_BREAK_POINT } from '@/constants/viewportBreakPoint';
import { useEffect, useState } from 'react';
import { UsePaginateContentsParams } from '@/app/library/detail/[id]/type';

const VIEWPORT_MD_CONTENT_HEIGHT_LIMIT = 500;
const VIEWPORT_LG_CONTENT_HEIGHT_LIMIT = 600;
const VIEWPORT_XL_CONTENT_HEIGHT_LIMIT = 800;

const TEXT_WIDTH_BELOW_MD = '20rem';
const TEXT_WIDTH_MD_AND_UP = '40rem';

const usePaginateContentsByViewport = ({
  contents,
  currentViewPortWidth,
}: UsePaginateContentsParams) => {
  const [paginatedContents, setPaginatedContents] = useState<string[][]>([]);

  const pageContextHeight = (width: number) => {
    if (width < VIEWPORT_BREAK_POINT.MD) {
      return VIEWPORT_MD_CONTENT_HEIGHT_LIMIT;
    }
    if (width < VIEWPORT_BREAK_POINT.LG) {
      return VIEWPORT_LG_CONTENT_HEIGHT_LIMIT;
    }
    return VIEWPORT_XL_CONTENT_HEIGHT_LIMIT;
  };

  useEffect(() => {
    if (!contents || !currentViewPortWidth) return;

    const currentContents = contents.data;
    const maxPageHeight = pageContextHeight(currentViewPortWidth);
    const tempPages: string[][] = [];

    const createTempContainer = () => {
      const container = document.createElement('div');
      container.style.cssText = `
        visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: ${currentViewPortWidth > VIEWPORT_BREAK_POINT.MD ? TEXT_WIDTH_MD_AND_UP : TEXT_WIDTH_BELOW_MD};
      `;
      container.className = 'prose';
      document.body.appendChild(container);
      return container;
    };

    const tempContainer = createTempContainer();
    let currentPage: string[] = [];
    let accumulatedHeight = 0;

    currentContents.forEach((html) => {
      const paragraph = document.createElement('div');
      paragraph.innerHTML = html;
      paragraph.className =
        'text-[1.05rem] md:text-lg leading-[1.9] md:leading-[2.4] mb-4 break-words w-80';

      tempContainer.appendChild(paragraph);
      const paragraphHeight = paragraph.getBoundingClientRect().height;
      accumulatedHeight += paragraphHeight;

      if (accumulatedHeight > maxPageHeight) {
        tempPages.push(currentPage);
        currentPage = [html];
        accumulatedHeight = paragraphHeight;

        tempContainer.innerHTML = '';
        tempContainer.appendChild(paragraph);
      } else {
        currentPage.push(html);
      }
    });

    if (currentPage.length > 0) {
      tempPages.push(currentPage);
    }

    document.body.removeChild(tempContainer);
    setPaginatedContents(tempPages);
  }, [contents, currentViewPortWidth]);

  return paginatedContents;
};

export default usePaginateContentsByViewport;
