import { Outlet } from "react-router-dom";
import { Header } from "./common/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./common/AppSidebar";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <div className="w-40 border-r border-[#777777]">
            <AppSidebar />
          </div>

          <main className="w-[calc(100vw-160px)] overflow-y-auto bg-[#000000]">
            <div className="mt-16 flex-1">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
