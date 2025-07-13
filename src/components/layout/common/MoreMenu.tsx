import { useState } from "react";
import { EtcIcon } from "@/assets/Icons/EtcIcon";
import { logout } from "@/apis/login";
import { useNavigate } from "react-router-dom";

export function MoreMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log("로그아웃 완료!", res);
      navigate("/");
    } catch (err) {
      console.log("로그아웃 안됨.", err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 px-4 py-2 text-white w-full hover:bg-[#222] cursor-pointer"
      >
        <EtcIcon />
        <span className="text-sm">더보기</span>
      </button>

      {open && (
        <div className="absolute left-full top-[-85px] ml-2 w-40 bg-black border border-[#777] rounded-md shadow-md">
          <ul className="flex flex-col py-2">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-white hover:bg-[#333]"
              >
                개인정보관리
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-white hover:bg-[#333]"
              >
                내활동관리
              </a>
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
