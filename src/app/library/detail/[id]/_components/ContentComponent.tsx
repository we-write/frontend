import { DBContentResponse } from '@/types/dbStory';
import getTextWithLineBreaks from '@/utils/getTextWithLineBreaks';

const ContentComponent = ({ contents }: { contents: DBContentResponse[] }) => {
  const isHtmlString = (str: string): boolean => {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  };

  return (
    <div className="text-md whitespace-pre-line text-gray-600 md:text-base">
      {contents?.map((contentItem) => {
        const content = contentItem.content;
        const isHtmlContent = isHtmlString(content);

        return (
          <div className="mb-4" key={contentItem.content_id}>
            {isHtmlContent
              ? getTextWithLineBreaks({ htmlString: content })
              : content}
          </div>
        );
      })}
    </div>
  );
};

export default ContentComponent;
