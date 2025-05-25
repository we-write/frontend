'use client';
import { AvatarGroupProps } from '@/components/common/AvatarGroup/type';
import Image from 'next/image';
import { DefaultProfileImage } from '@public/assets/icons/index';
import { useState } from 'react';

const AvatarGroup = ({ imageUrls }: AvatarGroupProps) => {
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);

  return (
    <div className="flex w-full -space-x-2" aria-hidden="true">
      {imageUrls.slice(0, 4).map((url, index) => (
        <div key={index} className="relative h-7.5 w-7.5 gap-[-1rem]">
          {url && !errorIndexes.includes(index) ? (
            <Image
              src={url}
              alt=""
              onError={() => setErrorIndexes((prev) => [...prev, index])}
              className="rounded-full object-cover"
              fill
              unoptimized
            />
          ) : (
            <DefaultProfileImage className="h-7.5 w-7.5" />
          )}
        </div>
      ))}
      {imageUrls.length > 4 && (
        <div className="z-10 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold">
          +{imageUrls.length - 4}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
