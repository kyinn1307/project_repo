import { MusicItem } from "./MusicItem";
import type { Music } from "@/types/music";

interface MusicListProps {
  list: Music[];
}

export const MusicList = ({ list }: MusicListProps) => {
  if (!Array.isArray(list) || list.length === 0) return null;

  return (
    <div className="flex flex-col mt-5 gap-2">
      {list.map((music) => (
        <MusicItem key={music.id} music={music} />
      ))}
    </div>
  );
};
