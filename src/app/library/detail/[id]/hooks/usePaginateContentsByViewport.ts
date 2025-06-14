'use client';

import { VIEWPORT_BREAK_POINT } from '@/constants/viewportBreakPoint';
import { useEffect, useState } from 'react';
import { UsePaginateContentsParams } from '@/app/library/detail/[id]/_components/type';

const VIEWPORT_MD_CONTENT_HEIGHT_LIMIT = 500;
const VIEWPORT_LG_CONTENT_HEIGHT_LIMIT = 600;
const VIEWPORT_XL_CONTENT_HEIGHT_LIMIT = 800;

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
        width: ${currentViewPortWidth > VIEWPORT_BREAK_POINT.MD ? '640px' : '320px'};
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
      paragraph.className = 'text-lg leading-[2] md:leading-[2.5] mb-4';

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
