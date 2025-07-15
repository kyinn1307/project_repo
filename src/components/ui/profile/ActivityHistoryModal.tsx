import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const getTodayMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

const formatDisplayMonth = (value: string) => {
  if (!value.includes("-")) return value;
  const [year, month] = value.split("-");
  return `${year}.${month}`;
};

export const ActivityHistoryModal = () => {
  const [startMonth, setStartMonth] = useState(getTodayMonth());
  const [endMonth, setEndMonth] = useState(getTodayMonth());

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-[21px] py-[3px] text-xs rounded-[3.75px] bg-[#0050ef] cursor-pointer">
          추가하기
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[700px] bg-[#222222] text-white rounded-lg px-[20px] py-6 border-none">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-[20px] font-semibold">
            활동이력
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* 제목, 상세활동 */}
          <div className="flex flex-col gap-[30px] bg-[#111111] px-[10px] py-[15px] rounded-md">
            <div className="flex justify-between items-center">
              <label className="text-sm">제목</label>
              <Input
                placeholder="텍스트를 입력해주세요"
                className="w-[400px] h-[26px] bg-black text-white border border-gray-700"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm">상세활동</label>
              <Input
                placeholder="텍스트를 입력해주세요"
                className="w-[400px] h-[26px] bg-black text-white border border-gray-700"
              />
            </div>
          </div>

          {/* 기간 */}
          <div className="flex flex-row justify-between items-center bg-[#111111] px-[10px] py-[10px] rounded-md">
            <label className="text-sm">기간</label>
            <div className="flex gap-3 items-center">
              <div className="relative w-[185px] h-[26px]">
                <Input
                  type="month"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-full h-full flex items-center justify-center bg-black text-white border border-gray-700 rounded text-sm">
                  {formatDisplayMonth(startMonth)}
                </div>
              </div>
              <span className="text-white text-sm">~</span>
              <div className="relative w-[185px] h-[26px]">
                <Input
                  type="month"
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-full h-full flex items-center justify-center bg-black text-white border border-gray-700 rounded text-sm">
                  {formatDisplayMonth(endMonth)}
                </div>
              </div>
            </div>
          </div>

          {/* 분야 */}
          <div className="bg-[#111111] px-[10px] py-[10px] rounded-[5px]">
            <label className="block text-sm mb-2">분야</label>
            <div className="flex flex-wrap gap-2">
              {[
                "작사",
                "작곡/편곡",
                "프로듀서",
                "믹싱",
                "마스터링",
                "비트메이커",
                "세션",
                "보컬",
                "앨범아트",
                "영상",
                "그 외",
              ].map((tag) => (
                <span
                  key={tag}
                  className="flex items-center text-sm h-6 px-[10px] bg-[#333333] text-white rounded-full cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button className="w-[100px] bg-[#0050ef] text-white cursor-pointer">
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
