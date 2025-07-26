import { useEffect, useState } from "react";
import { checkLogin } from "@/utils/checkLogin";
import { MoreMenu } from "./MoreMenu";
import { useSidebar } from "@/components/ui/sidebar";
import {
  CirclePlus,
  Home,
  Inbox,
  LayoutGrid,
  Music,
  User,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { MessageIcon } from "@/assets/Icons/MessageIcon";

const items = [
  {
    title: "살펴보기",
    url: "/",
    icon: Home,
  },
  {
    title: "뮤지션",
    url: "/musician",
    icon: Users,
  },
  {
    title: "음원",
    url: "/music",
    icon: Music,
  },
  {
    title: "피드",
    url: "/feed",
    icon: LayoutGrid,
  },
  {
    title: "프로젝트",
    url: "/project",
    icon: Inbox,
  },
  {
    title: "업로드",
    url: "/upload",
    icon: CirclePlus,
  },
];

export function AppSidebar() {
  const [userId, setUserId] = useState<number | null>(null);
  const { state } = useSidebar(); // "collapsed" or "expanded"

  useEffect(() => {
    const check = async () => {
      const id = await checkLogin();
      setUserId(id);
    };
    check();
  }, []);

  return (
    <Sidebar
      className={`${
        state === "collapsed" ? "!w-[64px]" : "w-40"
      } border-r border-[#777777] flex flex-col h-screen`}
    >
      <SidebarContent className="bg-black text-white flex-1 overflow-y-auto pt-10">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={`${
                        state === "collapsed"
                          ? "flex flex-col items-center justify-center py-3 !gap-[7.5px] w-full min-w-15 min-h-[56px]"
                          : "flex items-center gap-3 px-4 py-2"
                      } hover:bg-[#222] transition-colors duration-200`}
                    >
                      <item.icon size={18} />
                      <span
                        className={`${
                          state === "collapsed"
                            ? "text-[9px] text-center leading-tight"
                            : "text-sm"
                        }`}
                      >
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {userId && (
        <SidebarFooter className="bg-black text-white p-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a
                  href="/chat"
                  className={`${
                    state === "collapsed"
                      ? "flex flex-col items-center justify-center py-3 !gap-[7.5px] w-full min-w-15 min-h-[56px]"
                      : "flex items-center gap-3 px-4 py-2"
                  } hover:bg-[#222] transition-colors duration-200`}
                >
                  <MessageIcon />
                  <span
                    className={`${
                      state === "collapsed"
                        ? "text-[9px] text-center leading-tight"
                        : "text-sm"
                    }`}
                  >
                    메세지
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a
                  href="/my-profile"
                  className={`${
                    state === "collapsed"
                      ? "flex flex-col items-center justify-center py-3 !gap-[7.5px] w-full min-w-15 min-h-[56px]"
                      : "flex items-center gap-3 px-4 py-2"
                  } hover:bg-[#222] transition-colors duration-200`}
                >
                  <User size={18} />
                  <span
                    className={`${
                      state === "collapsed"
                        ? "text-[9px] text-center leading-tight"
                        : "text-sm"
                    }`}
                  >
                    내프로필
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <MoreMenu collapsed={state === "collapsed"} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
