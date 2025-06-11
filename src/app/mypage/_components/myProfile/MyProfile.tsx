'use client';

import Image from 'next/image';
import useBoolean from '@/hooks/useBoolean';
import MyProfileSkeleton from '@/app/mypage/myProfile/MyProfileSkeleton';
import { BtnEditLarge } from '@public/assets/icons';
import { useAuth } from '@/providers/auth-provider/AuthProvider.client';
import EditMyProfileForm from './EditMyProfileForm';

const MyProfile = () => {
  const {
    value: isOpen,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean();

  const { myInfo, isSignIn, queryMethods } = useAuth();
  console.log(myInfo);
  const currentProfileImageUrl = myInfo?.image ?? '/assets/images/Profile.png';

  if (!isSignIn || !myInfo) return null;

  if (queryMethods.isLoading) return <MyProfileSkeleton />;

  return (
    <section className="relative mt-6 h-[172px] w-full overflow-hidden rounded-[22px] border-2 border-gray-200 bg-white">
      <div className="bg-write-green-50 flex h-[66px] items-center justify-between px-6">
        <h2 className="text-lg font-semibold text-gray-900">내 프로필</h2>
        <>
          <button type="button" onClick={openModal}>
            <BtnEditLarge width={32} height={32} />
          </button>
          <EditMyProfileForm
            isOpen={isOpen}
            closeModal={closeModal}
            companyName={myInfo.companyName}
            currentProfileImageUrl={currentProfileImageUrl}
          />
        </>
      </div>
      <Image
        className="absolute top-[58px] left-[26px] h-14 w-14 rounded-full object-cover"
        src={currentProfileImageUrl}
        alt="프로필 이미지"
        width={56}
        height={56}
        unoptimized
      />
      <div className="mt-3 w-full truncate pl-[92px] md:w-2/3">
        <h3 className="mb-[9px] text-base font-semibold">{myInfo.name}</h3>
        <div className="mb-1 flex text-sm">
          <span className="w-2/5 font-medium text-gray-800">좋아하는 작품</span>
          <span className="w-3/5 font-normal text-gray-700">
            {myInfo?.companyName}
          </span>
        </div>
        <div className="flex text-sm">
          <span className="w-2/5 font-medium text-gray-800">이메일</span>
          <span className="w-3/5 font-normal text-gray-700">
            {myInfo.email}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
