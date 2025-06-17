'use client';
import { ChevronLeft } from 'lucide-react';
<<<<<<< fix/#241-story-detail-router
import { useRouter } from 'next/navigation';
// import { ChevronLeft, Heart } from 'lucide-react';
=======
import Link from 'next/link';
>>>>>>> develop

const SideButtonGroup = () => {
  const router = useRouter();
  return (
<<<<<<< fix/#241-story-detail-router
    <div className="flex flex-row md:top-20 md:left-40 md:flex-col md:gap-4">
      <button
        type="button"
        aria-label="뒤로가기"
        className="flex-center md:border-write-main h-10 w-10 rounded-full border-0 bg-white md:h-12 md:w-12 md:border"
        onClick={() => router.back()}
      >
        <ChevronLeft className="text-write-main h-6 w-6" />
      </button>
      {/* <button
              className="flex-center md:border-write-main h-10 w-10 rounded-full border-0 bg-white md:h-12 md:w-12 md:border"
              onClick={() => router.push('/library')}
            >
              <Heart className="text-write-main h-6 w-6" />
            </button> */}
=======
    <div className="absolute top-20 left-5 flex-row md:top-24 md:left-10 md:flex-col md:gap-4 lg:flex xl:top-30 xl:left-170">
      <Link
        className="flex-center border-write-main h-10 w-10 rounded-full border bg-white md:h-12 md:w-12"
        href="/library"
      >
        <ChevronLeft className="text-write-main h-6 w-6" />
      </Link>
>>>>>>> develop
    </div>
  );
};
export default SideButtonGroup;
