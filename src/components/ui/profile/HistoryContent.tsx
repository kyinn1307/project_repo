import { ActivityHistoryModal } from "./\bActivityHistoryModal";
import { HistoryList } from "./HistoryList";
import { HistoryProfile } from "./HistoryProfile";

export const HistoryContent = () => {
  return (
    <div className="flex flex-col">
      <HistoryProfile />
      <div className="flex justify-end mt-[7.5px]">
        <div className="flex justify-end mt-[7.5px]">
          <ActivityHistoryModal />
        </div>
      </div>
      <HistoryList />
    </div>
  );
};
