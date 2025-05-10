import { HistoryItem } from "./HistoryItem";

export const HistoryList = () => {
  return (
    <div className="flex flex-col gap-2 mt-[22.5px]">
      <HistoryItem />
      <HistoryItem />
      <HistoryItem />
    </div>
  );
};
