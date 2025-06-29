export interface UserProfileDropdownProps {
  isDropdownOpen: boolean;
  toggleDropDown: () => void;
  closeDropdown: () => void;
  profileImage: string | null;
}
