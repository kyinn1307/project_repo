import { Button } from "../button";
import hmson from "@/assets/Images/hmson.png";
import GiftIcon from "@/assets/Icons/business/gift-icon.svg?react";
import { BusinessUploadIcon } from "@/assets/Icons/BusinessUploadIcon";
import { useNavigate } from "react-router-dom";
import type { Business } from "@/types/business";

export const StarterBusiness = ({
  isOtherUser,
  isEmpty,
  business,
  onDelete,
}: {
  isOtherUser?: boolean;
  isEmpty?: boolean;
  business?: Business;
  onDelete?: (id: number) => void;
}) => {
  const navigate = useNavigate();

  const priceText =
    business?.price != null ? `${business.price.toLocaleString()}원` : "-";
  const fieldText = business?.field ? `분야_${business.field}` : "분야_-";
  const genreText = business?.genre ? `장르_${business.genre}` : "장르_-";
  const peText = (() => {
    const hasPeriod = business?.period != null;
    const hasEditTime = business?.editTime != null;

    if (hasPeriod && hasEditTime) {
      return `작업일 ${business.period}일 | 수정횟수 ${business.editTime}회`;
    }

    if (hasPeriod && !hasEditTime) {
      return `작업일 ${business.period}일 | 수정횟수 -회`;
    }

    if (!hasPeriod && hasEditTime) {
      return `작업일 -일 | 수정횟수 ${business.editTime}회`;
    }

    // 둘 다 없는 경우
    return "작업일 -일 | 수정횟수 -회";
  })();

  const profileSrc = business?.profileImageUrl || hmson;
  const descLines =
    business?.businessDescription?.split("\n").filter(Boolean) ?? [];

  return (
    <>
      {isOtherUser ? (
        isEmpty ? (
          <div className="flex flex-col w-[262.5px] rounded-[15px] bg-[#111111] p-[11.25px] gap-[7.5px] text-white">
            <div className="flex flex-col gap-[60px]">
              <div className="flex flex-row justify-between">
                <span className="flex items-center h-[23px] text-[18px] font-bold text-[#86acf8]">
                  Starter
                </span>
                <img
                  src={profileSrc}
                  className="w-[21px] h-[21px] rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-[7.5px]">
                <div className="cursor-pointer">
                  <GiftIcon />
                </div>
                <span className="h-[15px] flex items-center text-xs font-medium text-[#999999]">
                  아직 등록된 서비스가 없습니다.
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-[262.5px] rounded-[15px] bg-[#111111] p-[11.25px] gap-[7.5px] text-white">
            <div className="flex flex-col gap-[13.5px]">
              <div className="flex flex-col gap-[3px]">
                <div className="flex flex-row justify-between">
                  <span className="flex items-center h-[23px] text-[18px] font-bold text-[#86acf8]">
                    Starter
                  </span>
                  <img
                    src={profileSrc}
                    className="w-[21px] h-[21px] rounded-full object-cover"
                  />
                </div>
                <span className="flex items-center h-[17px] text-[13.5px] font-medium">
                  {priceText}
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-[2.23px] text-[10.5px] font-medium">
                  <span className="flex h-[13px] items-center whitespace-nowrap">
                    {fieldText}
                  </span>
                  <span className="flex h-[13px] items-center text-[#999999] whitespace-nowrap">
                    {genreText}
                  </span>
                </div>
                <div className="flex items-end text-[9px]">
                  <span className="flex items-center h-[11px]">{peText}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col min-h-[75px] bg-[#222222] rounded-[7.5px] text-white px-2 py-[6px] text-[9px]">
              {descLines.length ? (
                descLines.map((t, i) => <span key={i}>{t}</span>)
              ) : (
                <span className="text-[#999]">설명 없음</span>
              )}
            </div>
            <div className="flex flex-row gap-[7.5px] h-6 text-white">
              <Button className="w-full h-full bg-white text-black text-[10.5px] rounded-[7.5px]">
                문의하기
              </Button>
            </div>
          </div>
        )
      ) : isEmpty ? (
        <div className="flex flex-col w-[262.5px] rounded-[15px] bg-[#111111] p-[11.25px] gap-[7.5px] text-white">
          <div className="flex flex-col gap-[60px]">
            <div className="flex flex-row justify-between">
              <span className="flex items-center h-[23px] text-[18px] font-bold text-[#86acf8]">
                Starter
              </span>
              <img
                src={profileSrc}
                className="w-[21px] h-[21px] rounded-full object-cover"
              />
            </div>
            <div
              className="flex flex-col items-center gap-[15px] mb-10"
              onClick={() => navigate("/business-setting/1")}
            >
              <div className="cursor-pointer">
                <BusinessUploadIcon />
              </div>
              <span className="h-[15px] flex items-center text-xs font-medium">
                등록하기
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-[262.5px] rounded-[15px] bg-[#111111] p-[11.25px] gap-[7.5px] text-white">
          <div className="flex flex-col gap-[13.5px]">
            <div className="flex flex-col gap-[3px]">
              <div className="flex flex-row justify-between">
                <span className="flex items-center h-[23px] text-[18px] font-bold text-[#86acf8]">
                  Starter
                </span>
                <img
                  src={profileSrc}
                  className="w-[21px] h-[21px] rounded-full object-cover"
                />
              </div>
              <span className="flex items-center h-[17px] text-[13.5px] font-medium">
                {priceText}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-[2.23px] text-[10.5px] font-medium">
                <span className="flex h-[13px] items-center whitespace-nowrap">
                  {fieldText}
                </span>
                <span className="flex h-[13px] items-center text-[#999999] whitespace-nowrap">
                  {genreText}
                </span>
              </div>
              <div className="flex items-end text-[9px]">
                <span className="flex items-center h-[11px]">{peText}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col min-h-[75px] bg-[#222222] rounded-[7.5px] text-white px-2 py-[6px] text-[9px]">
            {descLines.length ? (
              descLines.map((t, i) => <span key={i}>{t}</span>)
            ) : (
              <span className="text-[#999]">설명 없음</span>
            )}
          </div>
          <div className="flex flex-row gap-[7.5px] h-6 text-white">
            <Button
              className="w-[180px] h-full bg-[#0050ef] text-[10.5px] rounded-[7.5px]"
              onClick={() =>
                navigate(
                  `/upload/business-edit/${business?.id}?grade=${business?.grade}`
                )
              }
            >
              수정
            </Button>
            <Button
              className="flex flex-1 h-full text-[10.5px] bg-[#222222] rounded-[7.5px]"
              onClick={() => {
                if (business?.id) onDelete?.(business.id);
              }}
            >
              삭제
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
