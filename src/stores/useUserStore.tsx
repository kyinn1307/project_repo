import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isSubscribed: boolean;
  isLoggedIn: boolean;
  userId: number | null;
  setSubscribed: (subscribed: boolean) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  setUserId: (id: number | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isSubscribed: false,
      isLoggedIn: false,
      userId: null,
      setSubscribed: (subscribed) => set({ isSubscribed: subscribed }),
      setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
      setUserId: (id) => set({ userId: id }),
    }),
    {
      name: "user-storage",
    }
  )
);
