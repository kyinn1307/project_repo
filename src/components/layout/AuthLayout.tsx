import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-black">
      <Outlet />
    </div>
  );
}
