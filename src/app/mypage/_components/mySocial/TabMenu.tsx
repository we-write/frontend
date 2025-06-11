import { TabMenuProps } from './type';

const TabMenu = ({ activeTab, onTabChange }: TabMenuProps) => (
  <ul className="flex gap-3 font-semibold text-gray-900">
    {(['joined', 'created'] as const).map((tab) => (
      <li
        key={tab}
        onClick={() => onTabChange(tab)}
        className="flex cursor-pointer flex-col items-center"
      >
        <span className={activeTab === tab ? 'text-gray-900' : 'text-gray-400'}>
          {tab === 'joined' ? '내가 참여한 모임' : '내가 만든 모임'}
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
