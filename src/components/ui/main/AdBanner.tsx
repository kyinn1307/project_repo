import { ChevronLeft, ChevronRight } from "lucide-react";

export const AdBanner = () => {
  return (
    <div className="relative w-[100%] h-[200px] bg-white rounded-[10px] px-8 py-6 flex flex-col justify-between shadow-md">
      <div>
        <h3 className="text-blue-600 font-bold text-sm">뮤직 비즈니스</h3>
        <p className="text-black font-semibold text-lg mt-1">
          성공을 매킷과 함께
        </p>
      </div>

      <div className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer">
        <ChevronLeft size={20} color="black" />
      </div>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
        <ChevronRight size={20} color="black" />
      </div>

      <div className="flex justify-center items-center mt-4">
        <div className="flex gap-[4px]">
          <span className="w-1.5 h-1.5 bg-black rounded-full" />
          <span className="w-1.5 h-1.5 bg-black rounded-full opacity-50" />
          <span className="w-1.5 h-1.5 bg-black rounded-full opacity-50" />
        </div>
      </div>
    </div>
  );
};
