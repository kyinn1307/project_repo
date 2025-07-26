import { MoreInfoIcon } from "@/assets/Icons/my-profile/MoreInfoIcon";
import sample from "@/assets/Images/hmson.png";
import { useState } from "react";

export const ChatRoom = () => {
  const [isNew] = useState(true);
  return (
    <div className="flex flex-row justify-between px-[7.5px] py-[6px] text-[#999999]">
      <div className="flex flex-row items-center gap-[7.5px]">
        <img src={sample} className="w-[30px] h-[30px] rounded-full" />
        <div className="flex flex-col gap-[3px]">
          <div className="w-[153px] flex flex-row justify-between">
            <span className="text-[13.5px] text-white">유저닉네임</span>
            {isNew && <span className="text-[9px]">N</span>}
          </div>
          <span className="text-xs">마지막 대화 내용</span>
        </div>
      </div>

      {/* n인 경우? */}
      {isNew ? (
        <>
          <div className="flex flex-col gap-[15.25px]">
            <div className="flex justify-end py-[2.5px] cursor-pointer">
              <MoreInfoIcon />
            </div>
            <span className="text-[9px] font-medium">YYYY-MM-DD</span>
          </div>
        </>
      ) : (
        <div className="flex h-full items-center">
          <div className="flex w-3 h-3 justify-center items-center bg-[#0050ef] rounded-full ">
            <span className="flex justify-center items-center h-[9px] text-[9px] font-medium text-white">
              1
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
