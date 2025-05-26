import { UserResponse } from '@/types/user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
interface UserStore {
  user: UserResponse | null;
  setUser: (user: UserResponse) => void;
  resetUser: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      resetUser: () => set({ user: null }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
