import { Button } from "../button";
import { HistoryList } from "./HistoryList";
import { HistoryProfile } from "./HistoryProfile";

export const HistoryContent = () => {
  return (
    <div className="flex flex-col">
      <HistoryProfile />
      <div className="flex justify-end mt-[7.5px]">
        <Button className="h-[21px] py-[3px] text-xs rounded-[3.75px] bg-[#0050ef] cursor-pointer">
          추가하기
        </Button>
      </div>
      <HistoryList />
    </div>
  );
};
