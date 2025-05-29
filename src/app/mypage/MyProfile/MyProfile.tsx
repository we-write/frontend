'use client';

import Image from 'next/image';
import { useGetMyInfo } from '@/hooks/api/users/useGetMyInfo';
import useBoolean from '@/hooks/useBoolean';
import Skeleton from '@/app/mypage/MyProfile/Skeleton';
import EditMyProfileForm from '@/app/mypage/MyProfile/EditMyProfileForm';

const MyProfile = () => {
  const {
    value: isOpen,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean();
  const { data: profileData, isLoading, refetch } = useGetMyInfo();
  const placeholderImage = '/assets/images/Profile.png';
  const profileImage = profileData?.image ?? placeholderImage;

  if (isLoading) return <Skeleton />;
  return (
    <section className="relative mt-6 h-[172px] w-full overflow-hidden rounded-[22px] border-2 border-gray-200 bg-white">
      <div className="bg-write-green-50 flex h-[66px] items-center justify-between px-6">
        <h2 className="text-lg font-semibold text-gray-900">내 프로필</h2>
        <>
          <button type="button" onClick={openModal}>
            <Image
              src="/assets/images/BtnEdit.png"
              alt="edit"
              width={32}
              height={32}
            />
          </button>
          <EditMyProfileForm
            isOpen={isOpen}
            closeModal={closeModal}
            profileData={profileData}
            profileImage={profileImage}
            refetch={refetch}
          />
        </>
      </div>
      <Image
        className="absolute top-[58px] left-[26px] h-14 w-14 rounded-full object-cover"
        src={profileImage}
        alt="profile"
        width={56}
        height={56}
        unoptimized
      />
      <div className="mt-3 w-full truncate pl-[92px] md:w-2/3">
        <h3 className="mb-[9px] text-base font-semibold">
          {profileData?.name}
        </h3>
        <div className="mb-1 flex text-sm">
          <span className="w-2/5 font-medium text-gray-800">좋아하는 작품</span>
          <span className="w-3/5 font-normal text-gray-700">
            {profileData?.companyName}
          </span>
        </div>
        <div className="flex text-sm">
          <span className="w-2/5 font-medium text-gray-800">이메일</span>
          <span className="w-3/5 font-normal text-gray-700">
            {profileData?.email}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
