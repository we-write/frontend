import { Heart } from 'lucide-react';
import { TAB_TYPES, TabMenuProps, TabType } from './type';

const TabMenus: TabType[] = [...TAB_TYPES];

const TabMenu = ({ activeTab, onTabChange }: TabMenuProps) => (
  <ul className="flex gap-3 font-semibold text-gray-900">
    {TabMenus.map((tab) => (
      <li
        key={tab}
        onClick={() => onTabChange(tab)}
        className="flex cursor-pointer flex-col items-center"
      >
        <span
          className={`activeTab === tab ? 'text-gray-900' : 'text-gray-400'`}
        >
          {tab === 'joined' ? (
            '내가 참여한 모임'
          ) : tab === 'created' ? (
            '내가 만든 모임'
          ) : (
            <span className="flex-center gap-2">
              좋아요한 모임
              <Heart fill="currentColor" className="text-write-main h-4 w-4" />
            </span>
          )}
        </span>
        <div
          className={`mt-1 h-[2px] w-full transition-all ${
            activeTab === tab ? 'bg-gray-900' : 'bg-transparent'
          }`}
        />
      </li>
    ))}
  </ul>
);
export default TabMenu;
