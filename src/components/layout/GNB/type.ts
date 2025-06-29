export interface UserDropdownProps {
  isDropdownOpen: boolean;
  toggleDropDown: () => void;
  closeDropdown: () => void;
  profileImage: string | null;
}
