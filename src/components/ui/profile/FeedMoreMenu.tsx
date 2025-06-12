import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Link, Edit, X } from "lucide-react";

export function FeedMoreMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <MoreHorizontal size={15} className="text-[#999999]" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="right"
        align="start"
        sideOffset={14}
        alignOffset={-14}
        className="w-32 p-2 bg-[#111111] rounded-lg text-white border border-[#777777]"
      >
        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-2 hover:bg-[#222222] rounded px-1 py-[2px]">
            <Link size={13} />
            링크복사
          </button>
          <button className="flex items-center gap-2 hover:bg-[#222222] rounded px-1 py-[2px]">
            <Edit size={13} />
            수정
          </button>
          <button className="flex items-center gap-2 hover:bg-[#222222] rounded px-1 py-[2px]">
            <X size={13} />
            삭제
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
