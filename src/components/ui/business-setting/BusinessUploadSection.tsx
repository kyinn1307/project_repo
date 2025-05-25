import { useState } from "react";
import { TrackItem } from "./TrackItem";
import { BusinessUpload } from "./BusinessUpload";

export const BusinessUploadSection = () => {
  const [editingTrack, setEditingTrack] = useState<string | null>(null);

  const handleEditClick = (trackName: string) => {
    setEditingTrack((prev) => (prev === trackName ? null : trackName));
  };
  return (
    <div className="flex flex-col">
      <div className="font-bold text-xs text-[#ffffff]">비즈니스 등록</div>
      <div className="flex flex-col gap-[7.5px] mt-[22.5px]">
        <TrackItem
          name="track A"
          isEditing={editingTrack === "track A"}
          onEditClick={() => handleEditClick("track A")}
        />
        <TrackItem
          name="track B"
          isEditing={editingTrack === "track B"}
          onEditClick={() => handleEditClick("track B")}
        />
        <BusinessUpload />
      </div>
    </div>
  );
};
