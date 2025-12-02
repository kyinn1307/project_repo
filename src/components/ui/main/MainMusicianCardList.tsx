import { MusicianCardItem } from "./MusicianCardItem";
import { useQuery } from "@tanstack/react-query";
import { getAllMusicians } from "@/apis/musician";
import type { Musician } from "@/types/musician";

export const MainMusicianCardList = () => {
  const { data } = useQuery({
    queryKey: ["musicians"],
    queryFn: () => getAllMusicians(undefined, 4),
  });

  const musicians: Musician[] = data?.users ?? [];

  return (
    <div className="grid grid-cols-4 gap-6 w-full">
      {musicians.map((musician) => (
        <MusicianCardItem key={musician.id} musician={musician} />
      ))}
    </div>
  );
};
