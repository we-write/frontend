export interface UserProfileDropdownProps {
  isDropdownOpen: boolean;
  toggleDropDown: () => void;
  closeDropdown: () => void;
  userName: string | null;
  profileImage: string | null;
}
