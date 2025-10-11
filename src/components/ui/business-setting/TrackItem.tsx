import { Edit, Trash } from "lucide-react";
import { TrackEditContent } from "./TrackEditContent";
import { Business } from "@/types/business";

type TrackItemProps = {
  name: string; // trackA/B/C 표시용
  track: Business; // 서버 타입
  isEditing: boolean;
  onEditClick: () => void;
  onChange: (patch: Partial<Business>) => void;
  onSave: () => void;
  onDelete: (id: number) => void; // 🔴 id 받도록 변경
};

export const TrackItem = ({
  name,
  track,
  isEditing,
  onEditClick,
  onChange,
  onSave,
  onDelete,
}: TrackItemProps) => {
  if (isEditing) {
    return (
      <TrackEditContent
        name={name}
        track={track}
        onChange={onChange}
        onSave={onSave}
        onCancel={onEditClick}
      />
    );
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
        <Trash
          size={15}
          color="#FF3B30"
          className="cursor-pointer"
          onClick={() => onDelete(track.id)} // 🔴 실제 id 전달
        />
      </div>
    </div>
  );
};
