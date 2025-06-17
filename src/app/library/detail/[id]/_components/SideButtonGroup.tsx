import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const SideButtonGroup = () => {
  return (
    <div className="absolute top-20 left-5 flex-row md:top-24 md:left-10 md:flex-col md:gap-4 lg:flex xl:top-30 xl:left-170">
      <Link
        className="flex-center border-write-main h-10 w-10 rounded-full border bg-white md:h-12 md:w-12"
        href="/library"
      >
        <ChevronLeft className="text-write-main h-6 w-6" />
      </Link>
    </div>
  );
};
export default SideButtonGroup;
