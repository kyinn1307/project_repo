import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isSubscribed: boolean;
  isLoggedIn: boolean;
  setSubscribed: (subscribed: boolean) => void;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isSubscribed: true,
      isLoggedIn: false,
      setSubscribed: (subscribed) => set({ isSubscribed: subscribed }),
      setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
    }),
    {
      name: "user-storage",
    }
  )
);
