import React from 'react';
import { DB_Content_Response } from '@/types/dbStory';
const ContentComponent = ({
  contents,
}: {
  contents: DB_Content_Response[];
}) => {
  return (
    <div className="text-md text-gray-600 md:text-base">
      {contents?.map((contentItem: DB_Content_Response) => (
        <div className="mb-4" key={contentItem.content_id}>
          {contentItem.content}
        </div>
      ))}
    </div>
  );
};

export default ContentComponent;
