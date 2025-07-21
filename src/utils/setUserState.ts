import { useUserStore } from "@/stores/useUserStore";

export const setUserState = (userId: number | null) => {
  const { setLoggedIn, setUserId } = useUserStore.getState();
  if (userId !== null) {
    setLoggedIn(true);
    setUserId(userId);
  } else {
    setLoggedIn(false);
    setUserId(null);
  }
};
