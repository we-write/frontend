import React from 'react';
import { DBContentResponse } from '@/types/dbStory';
const ContentComponent = ({ contents }: { contents: DBContentResponse[] }) => {
  return (
    <div className="text-md text-gray-600 md:text-base">
      {contents?.map((contentItem: DBContentResponse) => (
        <div className="mb-4" key={contentItem.content_id}>
          {contentItem.content}
        </div>
      ))}
    </div>
  );
};

export default ContentComponent;
