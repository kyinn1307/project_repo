import { Info } from "lucide-react";

export const BusinessTipBox = ({ isOtherUser }: { isOtherUser: boolean }) => {
  return (
    <>
      {isOtherUser ? (
        <div className="flex flex-col gap-[7.5px]">
          <div className="flex items-center px-[15px] py-[6px] justify-between bg-[#111111] rounded-[7.5px]">
            <span className="text-xs">서비스 결제는 어떻게 이루어지나요?</span>
            <span className="text-[#0050ef]">
              <Info size={18} />
            </span>
          </div>
          <div className="flex items-center px-[15px] py-[6px] justify-between bg-[#111111] rounded-[7.5px]">
            <span className="text-xs">
              서비스 거래 과정에서 문제가 생기면 SETA가 개입하나요?
            </span>
            <span className="text-[#0050ef]">
              <Info size={18} />
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center px-[15px] py-[6px] justify-between bg-[#111111] rounded-[7.5px]">
          <span className="text-xs">Tip</span>
          <span className="text-[#0050ef]">
            <Info size={18} />
          </span>
        </div>
      )}
    </>
  );
};
