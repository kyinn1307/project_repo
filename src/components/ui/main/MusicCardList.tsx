import { MusicCardItem } from "./MusicCardItem";
import { getAllTracks } from "@/apis/music";
import type { Music } from "@/types/music";
import { useQuery } from "@tanstack/react-query";

export const MusicCardList = () => {
  const { data } = useQuery<{
    tracks: Music[];
  }>({
    queryKey: ["tracks", "main", { size: 8 }],
    queryFn: () => getAllTracks(undefined, 8),
    staleTime: 60 * 1000,
  });

  return (
    <div className="w-full">
      {/* 4개 고정 grid */}
      <div className="grid grid-cols-4 gap-x-[15px] gap-y-[22.5px] w-full">
        {data?.tracks.map((music) => (
          <MusicCardItem key={music.id} music={music} />
        ))}
      </div>
    </div>
  );
};
