import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getMyBusiness,
  getMyFeeds,
  getMyProjects,
  getMyTracks,
} from "@/apis/my-profile";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MusicList } from "./MusicList";
import { FeedList } from "./FeedLIst";
import { ProjectList } from "./ProejctList";
import { HistoryContent } from "./HistoryContent";
import { SubscribeBusinessContent } from "./SubscribeBusinessContent";
import { UnsubscribeBusinessContent } from "./UnsubscribeBusinessContent";
import { useUserStore } from "@/stores/useUserStore";
import { Business } from "@/types/business";

export function ProfileMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userId = useUserStore((s) => s.userId);
  const { isSubscribed } = useUserStore();

  // URL <-> 탭 값 매핑
  // 요구: /my-profile/track, /my-profile/project ...
  const PATH_TO_TAB: Record<
    string,
    "music" | "feed" | "project" | "history" | "business"
  > = {
    track: "music",
    feed: "feed",
    project: "project",
    history: "history",
    business: "business",
  };

  // 현재 경로에서 마지막 세그먼트 추출
  const currentPathSegment = useMemo(() => {
    const segs = pathname.split("/").filter(Boolean);
    return segs[segs.length - 1]; // 'track' | 'feed' | ...
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/my-profile") {
      navigate("/my-profile/track", { replace: true });
    }
  }, [pathname, navigate]);
  const TABS = ["music", "feed", "project", "history", "business"] as const;
  type TabValue = (typeof TABS)[number];

  const TAB_TO_PATH: Record<TabValue, string> = {
    music: "track",
    feed: "feed",
    project: "project",
    history: "history",
    business: "business",
  };
  // 2) 현재 탭 계산 (string이어도 OK, 우리가 TabValue로 관리)
  const currentTab: TabValue =
    PATH_TO_TAB[currentPathSegment as keyof typeof PATH_TO_TAB] ?? "music";

  // 3) onValueChange는 string 시그니처로!
  const handleChange = (val: string) => {
    if (TABS.includes(val as TabValue)) {
      const next = TAB_TO_PATH[val as TabValue];
      navigate(`/my-profile/${next}`);
    }
  };

  // 데이터
  const { data: tracksRes } = useQuery({
    queryKey: ["myTracks"],
    queryFn: getMyTracks,
    select: (res) => res.data.data.tracks,
  });

  const { data: feedsRes } = useQuery({
    queryKey: ["myFeeds"],
    queryFn: getMyFeeds,
    select: (res) => res.data.data.feeds,
  });

  const { data: projectsRes } = useQuery({
    queryKey: ["myProjects"],
    queryFn: getMyProjects,
    select: (res) => res.data.data.projects,
  });

  const { data: businessRes } = useQuery({
    queryKey: ["myBusiness"],
    queryFn: getMyBusiness,
    select: (res) => res.data.data as Business[],
  });

  const tabList = [
    { value: "music" as const, label: "음원" },
    { value: "feed" as const, label: "피드" },
    { value: "project" as const, label: "프로젝트" },
    { value: "history" as const, label: "활동이력" },
    { value: "business" as const, label: "비즈니스" },
  ];

  return (
    <Tabs
      value={currentTab}
      onValueChange={handleChange}
      className="relative mr-auto w-[540px]"
    >
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
        <MusicList list={tracksRes || []} />
      </TabsContent>

      <TabsContent value="feed">
        <FeedList list={feedsRes || []} />
      </TabsContent>

      <TabsContent value="project">
        <ProjectList list={projectsRes || []} />
      </TabsContent>

      <TabsContent value="history">
        <HistoryContent userId={userId || 0} />
      </TabsContent>

      <TabsContent value="business">
        {isSubscribed ? (
          <SubscribeBusinessContent list={businessRes || []} />
        ) : (
          <UnsubscribeBusinessContent />
        )}
      </TabsContent>
    </Tabs>
  );
}
