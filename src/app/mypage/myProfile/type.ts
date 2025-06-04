import { UserRequest } from '@/types/user';

export interface EditMyProfileFormProps {
  isOpen: boolean;
  closeModal: () => void;
  profileData: UserRequest;
  currentProfileImageUrl: string;
}
