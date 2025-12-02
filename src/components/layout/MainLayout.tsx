import { Outlet } from "react-router-dom";
import { Header } from "./common/Header";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "./common/AppSidebar";

function LayoutBody() {
  const { state } = useSidebar();
  const sidebarWidth = state === "collapsed" ? 64 : 160;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <div
          className="border-r border-[#777777]"
          style={{ width: sidebarWidth }}
        >
          <AppSidebar />
        </div>

        <main
          className="overflow-y-auto bg-[#000000]"
          style={{ width: `calc(100vw - ${sidebarWidth}px)` }}
        >
          <div className="mt-9 flex-1">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function MainLayout() {
  return (
    <SidebarProvider>
      <LayoutBody />
    </SidebarProvider>
  );
}
