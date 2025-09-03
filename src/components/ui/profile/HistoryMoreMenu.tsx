import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Link, Edit, X } from "lucide-react";
import { deleteCareer } from "@/apis/career"; // ← 삭제 API
import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";

type Props = {
  id: number;
  invalidateKey: QueryKey;
  onEdit: () => void; // ✅ 추가
};

export function HistoryMoreMenu({ id, invalidateKey, onEdit }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => deleteCareer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidateKey });
    },
  });

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await mutateAsync(id);
      alert("삭제 완료");
    } catch (e) {
      console.error("삭제 실패:", e);
      alert("삭제 실패");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <MoreHorizontal size={15} />
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
            onClick={onEdit}
          >
            <Edit size={13} />
            수정
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 hover:bg-[#222222] rounded px-1 py-[2px]"
          >
            <X size={13} />
            삭제
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
