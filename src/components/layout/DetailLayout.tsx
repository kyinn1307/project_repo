import { Outlet } from "react-router-dom";
import { Header } from "./common/Header";
import { SidebarProvider } from "@/components/ui/shadcn/sidebar";
import { AppSidebar } from "./common/AppSidebar";
import clsx from "clsx";

export default function DetailLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="w-screen flex flex-col min-h-screen">
        <Header />
        <div className="flex">
          <AppSidebar />
          <main
            className={clsx(
              "flex-1 transition-all duration-300 overflow-y-auto bg-[#000000] pt-[36px] px-5 flex justify-center ml-[160px]"
            )}
          >
            <div className="w-full max-w-[720px] flex justify-center">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
