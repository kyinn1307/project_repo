// HistoryList.tsx
import { useQuery } from "@tanstack/react-query";
import { HistoryItem } from "./HistoryItem";
import { getUserCareers } from "@/apis/career";
import type { Career } from "@/types/career";
import { useUserStore } from "@/stores/useUserStore";

type Props = {
  invalidateKey: readonly unknown[];
  onEdit: (career: Career) => void;
};

export const HistoryList = ({ invalidateKey, onEdit }: Props) => {
  const userId = useUserStore((s) => s.userId);

  const { data, isLoading, isError } = useQuery({
    queryKey: invalidateKey,
    queryFn: () => getUserCareers(userId!),
    enabled: !!userId,
  });

  if (isLoading)
    return <div className="text-sm text-gray-400">불러오는 중…</div>;
  if (isError || !data)
    return <div className="text-sm text-gray-400">데이터가 없습니다.</div>;

  return (
    <div className="flex flex-col gap-2 mt-[22.5px]">
      {data.map((career: Career) => (
        <HistoryItem
          key={career.id}
          career={career}
          invalidateKey={invalidateKey}
          onEdit={() => onEdit(career)}
        />
      ))}
    </div>
  );
};
