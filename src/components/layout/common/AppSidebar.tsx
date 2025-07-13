import { MoreMenu } from "./MoreMenu";

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
  return (
    <Sidebar className="w-40 border-r border-[#777777] flex flex-col h-screen">
      <SidebarContent className="bg-black text-white flex-1 overflow-y-auto pt-10">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 px-4 py-2"
                    >
                      <item.icon size={20} />
                      <span className="text-sm">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-black text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#" className="flex items-center gap-3 px-4 py-2">
                <MessageIcon />
                <span className="text-sm">메세지</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href="/my-profile"
                className="flex items-center gap-3 px-4 py-2"
              >
                <User size={20} />
                <span className="text-sm">내프로필</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <MoreMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
