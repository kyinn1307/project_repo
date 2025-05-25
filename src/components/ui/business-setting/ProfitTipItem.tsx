import { useState } from "react";
import { UpBtn } from "@/assets/Icons/UpBtn";
import { DownBtn } from "@/assets/Icons/DownBtn";
export const ProfitTipItem = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#5b5b5b]">
      <div
        className="flex justify-between items-center cursor-pointer text-white text-[10.5px] py-[3.5px]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div>{title}</div>
        {isOpen ? <UpBtn /> : <DownBtn />}
      </div>
      {isOpen && (
        <div className="py-1 text-[#b3b3b3] text-[10.5px]">{content}</div>
      )}
    </div>
  );
};
