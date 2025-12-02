import { useState, useEffect } from "react";
import { MusicCardItem } from "./MusicCardItem";
import { getAllTracks } from "@/apis/music";
import type { Music } from "@/types/music";

export const MusicCardList = () => {
  const [musicList, setMusicList] = useState<Music[]>([]);

  useEffect(() => {
    handleAllTracks();
  }, []);

  const handleAllTracks = async () => {
    try {
      const res = await getAllTracks(undefined, 8);
      setMusicList(res.tracks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      {/* 4개 고정 grid */}
      <div className="grid grid-cols-4 gap-x-[15px] gap-y-[22.5px] w-full">
        {musicList.map((music) => (
          <MusicCardItem key={music.id} music={music} />
        ))}
      </div>
    </div>
  );
};
