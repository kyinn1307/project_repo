import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Link, UserX } from "lucide-react";

// interface UserProjectMoreMenuProps {
//   projectId: number;
// }

// export function UserProjectMoreMenu({ projectId }: UserProjectMoreMenuProps) {
export function UserProjectMoreMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="cursor-pointer">
          <MoreHorizontal size={15} className="text-white" />
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
            <UserX size={15} />
            신고
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
