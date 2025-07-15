import { useState } from "react";
import { TrackItem } from "./TrackItem";
import { BusinessUpload } from "./BusinessUpload";

const TRACK_NAMES = ["track A", "track B", "track C"];

export const BusinessUploadSection = () => {
  const [tracks, setTracks] = useState<string[]>(["track A"]);
  const [editingTrack, setEditingTrack] = useState<string | null>(null);

  const handleEditClick = (trackName: string) => {
    setEditingTrack((prev) => (prev === trackName ? null : trackName));
  };

  const handleAddTrack = () => {
    const nextTrack = TRACK_NAMES.find((name) => !tracks.includes(name));
    if (nextTrack) {
      setTracks((prev) => [...prev, nextTrack]);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="font-bold text-xs text-[#ffffff]">비즈니스 등록</div>
      <div className="flex flex-col gap-[7.5px] mt-[22.5px]">
        {tracks.map((name) => (
          <TrackItem
            key={name}
            name={name}
            isEditing={editingTrack === name}
            onEditClick={() => handleEditClick(name)}
          />
        ))}
        {tracks.length < 3 && <BusinessUpload onClick={handleAddTrack} />}
      </div>
    </div>
  );
};
