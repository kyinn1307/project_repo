import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ActivityHistoryModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-[21px] py-[3px] text-xs rounded-[3.75px] bg-[#0050ef] cursor-pointer">
          추가하기
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[700px] bg-[#222222] text-white rounded-lg px-[20px] py-6 border-none">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-semibold">활동이력</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* 제목, 상세활동 */}
          <div className="flex flex-col gap-3 bg-[#111111] px-[10px] py-[15px] rounded-md">
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
          <div className="flex flex-row justify-between bg-[#111111] px-[10px] py-[15px] rounded-md">
            <label className="text-sm mb-2">기간</label>
            <div className="flex gap-3 items-center">
              <Input
                type="month"
                className="w-[185px] h-[26px] bg-black text-white border border-gray-700"
              />
              <span className="text-white text-sm">~</span>
              <Input
                type="month"
                className="w-[185px] h-[26px] bg-black text-white border border-gray-700"
              />
            </div>
          </div>

          {/* 분야 */}
          <div className="bg-[#111111] px-[10px] py-[15px] rounded-md">
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
                  className="text-sm px-3 py-1 bg-[#333333] text-white rounded-full cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button className="w-[100px] bg-[#0050ef] text-white">저장</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
