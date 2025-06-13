import Button from '@/components/common/Button/Button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SideButtonGroup = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row md:top-20 md:left-40 md:flex-col md:gap-4">
      <Button
        className="flex-center md:border-write-main h-10 w-10 rounded-full border-0 bg-white md:h-12 md:w-12 md:border"
        onClick={() => router.back()}
      >
        <ChevronLeft className="text-write-main h-6 w-6" />
      </Button>
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
