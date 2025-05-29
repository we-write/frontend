const Skeleton = () => {
  return (
    <section className="relative mt-6 h-[172px] w-full overflow-hidden rounded-[22px] border-2 border-gray-200 bg-white">
      <div className="bg-write-green-50 flex h-[66px] items-center justify-between px-6">
        <h2 className="text-lg font-semibold text-gray-900">내 프로필</h2>
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
      </div>
      <div className="absolute top-[58px] left-[26px] h-14 w-14 animate-pulse rounded-full bg-gray-200" />
      <div className="mt-3 w-full animate-pulse pl-[92px] md:w-2/3">
        <div className="mb-2 h-5 w-1/3 rounded bg-gray-200" />
        <div className="mb-1 h-4 w-2/3 rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>
    </section>
  );
};

export default Skeleton;
