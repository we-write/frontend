import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="text-write-main flex-center h-screen w-screen flex-col gap-36 bg-white">
      <div className="text-write-sub-title flex flex-col items-center gap-6 md:gap-14">
        <p className="text-write-sub-title text-8xl font-black md:text-9xl">
          404
        </p>
        <h1 className="text-3xl font-semibold md:text-4xl">
          페이지를 찾을 수 없습니다
        </h1>
      </div>
      <Link
        href="/"
        className="pointer border-write-sub-title text-write-sub-title rounded-full border-2 px-6 py-3 font-bold"
      >
        홈 페이지로 이동
      </Link>
    </div>
  );
};

export default NotFound;
