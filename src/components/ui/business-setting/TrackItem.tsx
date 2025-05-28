import { Edit, Trash } from "lucide-react";
import { TrackEditContent } from "./TrackEditContent";

type TrackItemProps = {
  name: string;
  isEditing: boolean;
  onEditClick: () => void;
};

export const TrackItem = ({ name, isEditing, onEditClick }: TrackItemProps) => {
  if (isEditing) {
    return <TrackEditContent name={name} onComplete={onEditClick} />;
  }

  return (
    <div className="w-full flex justify-between rounded-[7.5px] px-[15px] py-[7.5px] bg-[#111111] text-[#ffffff] text-xs font-bold">
      <div>{name}</div>
      <div className="flex flex-row gap-[7.5px]">
        <Edit
          size={15}
          color="#0050ef"
          onClick={onEditClick}
          className="cursor-pointer"
        />
        <Trash size={15} color="#FF3B30" className="cursor-pointer" />
      </div>
    </div>
  );
};
