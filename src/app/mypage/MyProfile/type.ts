import { UserRequest } from '@/types/user';

export interface EditMyProfileFormProps {
  isOpen: boolean;
  closeModal: () => void;
  profileData: UserRequest;
  profileImage: string;
  refetch: () => void;
}
