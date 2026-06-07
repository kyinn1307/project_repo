// HistoryContent.tsx
import { useState } from "react";
import { Button } from "../shadcn/button";
import { ActivityHistoryModal } from "./ActivityHistoryModal";
import { HistoryList } from "./HistoryList";
import { HistoryProfile } from "./HistoryProfile";
import type { Career } from "@/types/career";
import { useUserStore } from "@/stores/useUserStore";

export const HistoryContent = ({ userId }: { userId?: number }) => {
  const loggedInUserId = useUserStore((s) => s.userId);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  const invalidateKey = ["careers", userId] as const;

  const openCreate = () => {
    setSelectedCareer(null);
    setModalOpen(true);
  };

  const openEdit = (career: Career) => {
    setSelectedCareer(career);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col">
      <HistoryProfile userId={userId || 0} />
      {userId === loggedInUserId && (
        <div className="flex justify-end mt-[7.5px]">
          <Button
            className="h-[21px] py-[3px] text-xs rounded-[3.75px] bg-[#0050ef] cursor-pointer"
            onClick={openCreate}
          >
            추가하기
          </Button>
        </div>
      )}

      {/* 리스트에 “수정” 콜백 전달 */}
      <HistoryList
        userId={userId || 0}
        invalidateKey={invalidateKey}
        onEdit={openEdit}
      />

      {/* 공용 모달: 생성/수정 겸용 */}
      <ActivityHistoryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        career={selectedCareer}
        invalidateKey={invalidateKey}
      />
    </div>
  );
};
