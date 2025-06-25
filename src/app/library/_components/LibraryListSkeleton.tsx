import GridCard from '@/components/common/Card/GridCard';

const LibraryListSkeleton = () => {
  return (
    <div className="gap-2: grid grid-cols-1 justify-items-center md:grid-cols-2 md:gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <GridCard
          href={''}
          key={index}
          image={{
            src: '',
            alt: '',
          }}
          textContent={{
            title: '',
            genre: '',
            description: '',
          }}
          isCardDataLoading={true}
        />
      ))}
    </div>
  );
};

export default LibraryListSkeleton;
