import { Button } from "../button";
import { FileItem } from "./FileItem";

export const ImageSelector = () => {
  return (
    <div className="flex flex-col flex-1 bg-[#111111] p-[7.5px] rounded-[3.75px]">
      <div className="text-[#ffffff] font-medium text-[10.5px]">사진</div>
      <div className="flex flex-col mt-[7.5px] gap-[7.5px] max-h-[120px] overflow-y-auto pr-[2px]">
        <FileItem filename={"filename.png"} />
        <FileItem filename={"filename.png"} />
        <FileItem filename={"filename.png"} />
        <FileItem filename={"filename.png"} />
      </div>
      <div className="w-full flex justify-center mt-[7.5px]">
        <Button className="w-[90px] h-[22.5px] bg-[#0050ef] text-[#ffffff] text-[10.5px] font-medium">
          컴퓨터에서 선택
        </Button>
      </div>
    </div>
  );
};
