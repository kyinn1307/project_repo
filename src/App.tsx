import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
export default function App() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <RouterProvider router={router} />
    </div>
  );
}
