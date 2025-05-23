import { create } from 'zustand';

interface UserResponse {
  id: number;
  name: string;
  email: string;
  companyName: string;
  createdAt: string;
  updatedAt: string;
}

interface UserStore {
  user: UserResponse | null;
  setUser: (user: UserResponse) => void;
  resetUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));

export default useUserStore;
