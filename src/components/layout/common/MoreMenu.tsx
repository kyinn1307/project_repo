import { useState } from "react";
import { EtcIcon } from "@/assets/Icons/EtcIcon";
import { logout } from "@/apis/login";
import { Link } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";

export function MoreMenu({ collapsed }: { collapsed: boolean }) {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log("로그아웃 완료!", res);

      useUserStore.getState().setLoggedIn(false);
      useUserStore.getState().setUserId(0);
      // useUserStore.getState().setIsSubscribed(false);

      localStorage.removeItem("user-storage");
      window.location.href = "/";
    } catch (err) {
      console.log("로그아웃 안됨.", err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`${
          collapsed
            ? "flex flex-col items-center justify-center py-3 !gap-[7.5px] w-full min-w-15 min-h-[56px]"
            : "flex items-center gap-3 px-4 py-2"
        } text-white w-full hover:bg-[#222] transition-colors duration-200 cursor-pointer rounded-md`}
      >
        <div className={`${collapsed ? "w-[18px] h-[18px]" : "w-4 h-4"}`}>
          <EtcIcon />
        </div>

        <span
          className={`${
            collapsed ? "text-[9px] text-center leading-tight mt-1" : "text-sm"
          }`}
        >
          더보기
        </span>
      </button>

      {open && (
        <div className="absolute left-full top-[-85px] w-40 bg-black border border-[#777] rounded-md shadow-md">
          <ul className="flex flex-col py-2">
            <li>
              <Link
                to="/privacy-setting"
                className="block px-4 py-2 text-sm text-white hover:bg-[#333]"
              >
                개인정보관리
              </Link>
            </li>
            <li>
              <Link
                to="/my-page"
                className="block px-4 py-2 text-sm text-white hover:bg-[#333]"
              >
                내활동관리
              </Link>
            </li>
            <li>
              <span
                className="block px-4 py-2 text-sm text-white hover:bg-[#333] cursor-pointer"
                onClick={handleLogout}
              >
                로그아웃
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
