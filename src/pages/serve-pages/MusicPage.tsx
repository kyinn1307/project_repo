import { useQuery } from "@tanstack/react-query";
import { AdContent } from "@/components/ui/serve-pages/AdContent";
import { MusicContentItem } from "@/components/ui/serve-pages/MusicContentItem";
import { getAllTracks } from "@/apis/music";
import type { Music } from "@/types/music";

export const MusicPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tracks"],
    queryFn: async () => {
      const res = await getAllTracks();
      console.log("🎧 getAllTracks response:", res.data.data); // ✅ 콘솔 확인

      return res.data.data;
    },
  });

  return (
    <div className="flex flex-col pt-[38px] pl-[10%]">
      <AdContent />
      <section className="flex flex-wrap gap-x-[22.5px] gap-y-[18.75px] mt-[53.25px]">
        {isLoading && <div className="text-white">로딩 중...</div>}
        {isError && <div className="text-red-500">트랙 불러오기 실패</div>}
        {data?.tracks?.length > 0 &&
          data.tracks.map((track: Music) => (
            <div key={track.id} className="w-[243.75px] text-white">
              <MusicContentItem track={track} />
            </div>
          ))}
      </section>
    </div>
  );
};
