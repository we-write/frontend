import getTextWithLineBreaks from '@/utils/getTextWithLineBreaks';
import { forwardRef, ForwardedRef } from 'react';

const PaginatedContentViewer = forwardRef(
  (props: { pageData: string[] }, ref: ForwardedRef<HTMLDivElement>) => {
    const isHtmlString = (str: string): boolean => {
      const doc = new DOMParser().parseFromString(str, 'text/html');
      return Array.from(doc.body.childNodes).some(
        (node) => node.nodeType === 1
      );
    };

    return (
      <div
        ref={ref}
        className="text-md flex h-full max-h-full flex-col justify-start pt-26 whitespace-pre-line text-gray-600 md:mt-0 md:justify-center md:py-36 md:text-base"
      >
        {props.pageData?.map((contentItem, index) => {
          const isHtmlContent = isHtmlString(contentItem);

          return (
            <p
              className="mb-4 w-80 text-center text-[1.05rem] leading-[2] break-words md:flex md:w-160 md:flex-wrap md:justify-between md:space-x-4 md:text-left md:text-lg md:leading-[2.4]"
              key={index}
            >
              {isHtmlContent
                ? getTextWithLineBreaks({ htmlString: contentItem })
                : contentItem}
            </p>
          );
        })}
      </div>
    );
  }
);

PaginatedContentViewer.displayName = 'PaginatedContentViewer';
export default PaginatedContentViewer;
