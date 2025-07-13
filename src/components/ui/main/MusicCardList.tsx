import { useState, useEffect } from "react";
import { MusicCardItem } from "./MusicCardItem";
import { getAllTracks } from "@/apis/music";
import type { Music } from "@/types/music";

export const MusicCardList = () => {
  const [musicList, setMusicList] = useState<Music[]>([]);

  const handleAllTracks = async () => {
    try {
      const res = await getAllTracks();
      console.log(res.data.data.tracks);
      setMusicList(res.data.data.tracks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleAllTracks();
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max flex gap-x-6">
        {musicList.map((music) => (
          <MusicCardItem key={music.id} music={music} />
        ))}
      </div>
    </div>
  );
};
