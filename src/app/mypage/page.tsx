import MyProfile from './_components/my-profile/MyProfile';
import MySocialList from './_components/my-social-list/MySocialList';

const MyPage = () => {
  return (
    <section className="mx-auto mt-4 w-full md:w-[696px] lg:w-[996px]">
      <h1 className="text-write-main text-2xl font-semibold">마이 페이지</h1>
      <MyProfile />
      <MySocialList />
    </section>
  );
};

export default MyPage;
