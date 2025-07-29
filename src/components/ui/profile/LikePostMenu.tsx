import { useQuery } from "@tanstack/react-query";
import {
  getLikedFeeds,
  getLikedProjects,
  getLikedTracks,
} from "@/apis/my-profile";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MusicList } from "./MusicList";
import { FeedList } from "./FeedLIst";
import { ProjectList } from "./ProejctList";

export function LikePostMenu() {
  const { data: tracksRes } = useQuery({
    queryKey: ["myTracks"],
    queryFn: getLikedTracks,
    select: (res) => res.data.data.tracks,
  });

  const { data: feedsRes } = useQuery({
    queryKey: ["myFeeds"],
    queryFn: getLikedFeeds,
    select: (res) => res.data.data.feeds,
  });

  const { data: projectsRes } = useQuery({
    queryKey: ["myProjects"],
    queryFn: getLikedProjects,
    select: (res) => res.data.data.projects,
  });

  const tabList = [
    { value: "music", label: "음원" },
    { value: "feed", label: "피드" },
    { value: "project", label: "프로젝트" },
  ];

  return (
    <Tabs defaultValue="music" className="relative mr-auto w-[540px]">
      <TabsList className="w-full justify-start rounded-none border-b border-gray-700 bg-transparent p-0 flex">
        {tabList.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="relative !inline-flex items-center bg-transparent border-none shadow-none px-4 pb-3 pt-2 font-medium cursor-pointer text-[#777777] transition-none focus-visible:ring-0
        data-[state=active]:bg-transparent data-[state=active]:text-white
        data-[state=active]:after:content-[''] data-[state=active]:after:absolute
        data-[state=active]:after:-bottom-[2px] data-[state=active]:after:left-1/2
        data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:w-10
        data-[state=active]:after:h-[3px] data-[state=active]:after:bg-white
        data-[state=active]:after:rounded-full"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="music">
        <MusicList list={tracksRes || []} />
      </TabsContent>
      <TabsContent value="feed">
        <FeedList list={feedsRes || []} />
      </TabsContent>
      <TabsContent value="project">
        <ProjectList list={projectsRes || []} />
      </TabsContent>
    </Tabs>
  );
}
