import { MusicianCardItem } from "./MusicianCardItem";
import { useQuery } from "@tanstack/react-query";
import { getAllMusicians } from "@/apis/user";
import type { Musician } from "@/types/musician";
import { useRef } from "react";

export const MainMusicianCardList = () => {
  const { data } = useQuery({
    queryKey: ["musicians"],
    queryFn: () => getAllMusicians(undefined, 4), // 처음 4개만
  });

  const musicians: Musician[] = data?.users ?? [];

  const observerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div className="flex gap-[15px]">
        {musicians.map((musician) => (
          <MusicianCardItem key={musician.id} musician={musician} />
        ))}
      </div>

      <div ref={observerRef} className="h-6" />
    </div>
  );
};
