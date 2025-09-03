import { useState, useEffect } from "react";
import { MusicCardItem } from "./MusicCardItem";
import { getAllTracks } from "@/apis/music";
import type { Music } from "@/types/music";

export const MusicCardList = () => {
  const [musicList, setMusicList] = useState<Music[]>([]);

  const handleAllTracks = async () => {
    try {
      const res = await getAllTracks(undefined, 8);
      console.log(res.tracks);
      setMusicList(res.tracks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleAllTracks();
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max grid grid-cols-4 gap-x-[15px] gap-y-[22.5px]">
        {musicList.map((music) => (
          <MusicCardItem key={music.id} music={music} />
        ))}
      </div>
    </div>
  );
};
