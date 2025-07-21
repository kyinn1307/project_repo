import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Link, Edit, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/apis/project";

interface ProjectMoreMenuProps {
  projectId: number;
}

export function ProjectMoreMenu({ projectId }: ProjectMoreMenuProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      alert("삭제가 완료되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["myTracks"] });
    },
    onError: () => {
      alert("삭제에 실패했습니다.");
    },
  });

  const handleDelete = () => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirmed) return;
    deleteMutate();
  };

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
          <button
            className="flex items-center gap-2 hover:bg-[#222222] rounded px-1 py-[2px]"
            onClick={() => navigate(`/upload/project-edit/${projectId}`)}
          >
            <Edit size={13} />
            수정
          </button>
          <button
            className="flex items-center gap-2 hover:bg-[#222222] rounded px-1 py-[2px]"
            onClick={handleDelete}
          >
            <X size={13} />
            삭제
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
