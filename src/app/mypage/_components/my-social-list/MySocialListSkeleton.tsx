import ListCard from '@/components/common/Card/ListCard';

const MySocialListSkeleton = () => (
  <>
    {Array.from({ length: 2 }).map((_, index) => (
      <div key={index} className="truncate py-6">
        <ListCard
          teamUserRole="MEMBER"
          pageId=""
          image={{ src: '', alt: '섬네일 이미지' }}
          chip
          textContent={{
            title: '',
            genre: '',
            participantCount: 0,
            capacity: 0,
          }}
          endDate=""
          isCardDataLoading
          isCompletedStory={false}
          isCanceled={false}
          handleButtonClick={() => {}}
        />
      </div>
    ))}
  </>
);

export default MySocialListSkeleton;
