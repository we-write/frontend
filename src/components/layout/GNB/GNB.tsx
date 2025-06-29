import LogoButton from '@/components/layout/GNB/LogoButton';
import MenuGroups from '@/components/layout/GNB/MenuGroups';

export const GNB = () => {
  return (
    <nav className="flex-center h-full w-full border-b border-gray-200 bg-white">
      <div className="flex w-full max-w-300 gap-6 px-4 md:pr-6 md:pl-7 lg:gap-10 xl:px-1">
        <LogoButton />
        <MenuGroups />
      </div>
    </nav>
  );
};
