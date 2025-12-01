import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getUserTracks, getUserFeeds, getUserProjects } from "@/apis/user";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MusicList } from "./MusicList";
import { FeedList } from "./FeedLIst";
import { ProjectList } from "./ProejctList";
import { HistoryContent } from "./HistoryContent";
import { SubscribeBusinessContent } from "./SubscribeBusinessContent";
import { UnsubscribeBusinessContent } from "./UnsubscribeBusinessContent";
import { useUserStore } from "@/stores/useUserStore";
import { getUserBusiness } from "@/apis/business";

export function UserProfileMenu() {
  const loggedInUserId = useUserStore((s) => s.userId);

  const { isSubscribed } = useUserStore();
  const { id } = useParams<{ id: string }>();

  const userId = Number(id);

  const { data: tracksRes } = useQuery({
    queryKey: ["userTracks", userId],
    queryFn: () => getUserTracks({ userId }),
    select: (res) => res.data.data.tracks,
    enabled: !!userId,
  });

  const { data: feedsRes } = useQuery({
    queryKey: ["userFeeds", userId],
    queryFn: () => getUserFeeds(userId),
    select: (res) => res.data.data.feeds,
    enabled: !!userId,
  });

  const { data: projectsRes } = useQuery({
    queryKey: ["userProjects", userId],
    queryFn: () => getUserProjects(userId),
    select: (res) => res.data.data.projects,
    enabled: !!userId,
  });

  const { data: businessRes } = useQuery({
    queryKey: ["userBusiness", userId],
    queryFn: () => getUserBusiness(userId),
    select: (res) => res.data,
    enabled: !!userId,
  });

  const tabList = [
    { value: "music", label: "음원" },
    { value: "feed", label: "피드" },
    { value: "project", label: "프로젝트" },
    { value: "history", label: "활동이력" },
    { value: "business", label: "비즈니스" },
  ];

  return (
    <Tabs defaultValue="music" className="relative mr-auto w-[540px]">
      <TabsList className="w-full justify-start rounded-none border-b border-gray-700 bg-transparent p-0 flex">
        {tabList.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="relative !inline-flex items-center bg-transparent border-none shadow-none px-4 pb-3 pt-2 font-medium text-[#777777] transition-none focus-visible:ring-0
        data-[state=active]:bg-transparent data-[state=active]:text-white
        data-[state=active]:after:content-[''] data-[state=active]:after:absolute
        data-[state=active]:after:-bottom-[2px] data-[state=active]:after:left-1/2
        data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:w-[70%]
        data-[state=active]:after:h-[3px] data-[state=active]:after:bg-white
        data-[state=active]:after:rounded-full cursor-pointer"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="music">
        <MusicList list={tracksRes || []} isUser={true} />
      </TabsContent>
      <TabsContent value="feed">
        <FeedList list={feedsRes || []} isUser={true} />
      </TabsContent>
      <TabsContent value="project">
        <ProjectList list={projectsRes || []} isUser={true} />
      </TabsContent>
      <TabsContent value="history">
        <HistoryContent userId={userId || 0} />
      </TabsContent>
      <TabsContent value="business">
        {isSubscribed ? (
          <SubscribeBusinessContent
            list={businessRes || []}
            isOtherUser={userId !== loggedInUserId}
            userId={userId}
          />
        ) : (
          <UnsubscribeBusinessContent />
        )}
      </TabsContent>
    </Tabs>
  );
}
