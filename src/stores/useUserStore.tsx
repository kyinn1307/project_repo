// src/stores/useUserStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  isSubscribed: boolean;
  isLoggedIn: boolean;
  userId: number | null;
  setIsSubscribed: (v: boolean) => void;
  setLoggedIn: (v: boolean) => void;
  setUserId: (id: number | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isSubscribed: true,
      isLoggedIn: false,
      userId: null,
      setIsSubscribed: (v) => set({ isSubscribed: v }),
      setLoggedIn: (v) => set({ isLoggedIn: v }),
      setUserId: (id) => set({ userId: id }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage), // ✅ 명시
      partialize: (s) => ({
        // ✅ 직렬화 가능한 값만
        isSubscribed: s.isSubscribed,
        isLoggedIn: s.isLoggedIn,
        userId: s.userId,
      }),
      version: 1,
    }
  )
);
