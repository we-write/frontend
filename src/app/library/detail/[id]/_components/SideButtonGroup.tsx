import { ChevronLeft } from 'lucide-react';
// import { ChevronLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const SideButtonGroup = () => {
  return (
    <div className="flex flex-row md:top-20 md:left-40 md:flex-col md:gap-4">
      <Link
        className="flex-center md:border-write-main h-10 w-10 rounded-full border-0 bg-white md:h-12 md:w-12 md:border"
        href="/library"
      >
        <ChevronLeft className="text-write-main h-6 w-6" />
      </Link>
      {/* <button
              className="flex-center md:border-write-main h-10 w-10 rounded-full border-0 bg-white md:h-12 md:w-12 md:border"
              onClick={() => router.push('/library')}
            >
              <Heart className="text-write-main h-6 w-6" />
            </button> */}
    </div>
  );
};
export default SideButtonGroup;
