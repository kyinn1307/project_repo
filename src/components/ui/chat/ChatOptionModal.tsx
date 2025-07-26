import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ChatOptionBtn } from "@/assets/Icons/chat/ChatOptionBtn";
import { Calendar, Check, Clock, List } from "lucide-react";
import { Button } from "../button";

export const ChatOptionModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <ChatOptionBtn />
        </button>
      </DialogTrigger>
      <DialogContent className="w-72 flex flex-col justify-center bg-[#222222] text-white border-none gap-[30px] p-[30px]">
        <DialogHeader className="gap-[15px]">
          <div className="flex justify-center pb-[7.5px]">
            <Clock size={52.5} />
          </div>
          <DialogTitle className="text-center font-bold">
            기능 준비중
          </DialogTitle>
          <h3 className="text-center text-xs">불편을 드려 죄송합니다</h3>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center text-left rounded gap-[7.5px] hover:bg-muted">
            <Calendar size={18} />
            <div>
              <span className="font-medium">예상 출시일</span>
              <span>: 2025년 10월중</span>
            </div>
          </div>
          <div className="flex flex-row text-left items-center rounded gap-[7.5px] font-medium hover:bg-muted">
            <List size={18} />
            예정된 기능
          </div>
          <div className="flex flex-col p-[7.5px] bg-[#161616] rounded-[15px] gap-[7.5px]">
            <span className="flex flex-row items-center gap-[7.5px] text-[10.5px]">
              <Check className="text-[#0050ef]" size={13.5} />
              실시간 메시지 및 알림
            </span>
            <span className="flex flex-row items-center gap-[7.5px] text-[10.5px]">
              <Check className="text-[#0050ef]" size={13.5} />
              파일 및 이미지 공유
            </span>
            <span className="flex flex-row items-center gap-[7.5px] text-[10.5px]">
              <Check className="text-[#0050ef]" size={13.5} />
              그룹 채팅 및 프로젝트별 채널
            </span>
            <span className="flex flex-row items-center gap-[7.5px] text-[10.5px]">
              <Check className="text-[#0050ef]" size={13.5} />
              메시지 검색 및 히스토리
            </span>
          </div>
        </div>
        <DialogClose asChild>
          <Button className="text-white bg-[#0050ef] font-bold text-[15px] rounded-[15px] cursor-pointer">
            확인
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
