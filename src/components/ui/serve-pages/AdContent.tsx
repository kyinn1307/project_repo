import sample from "@/assets/Images/sample.jpeg";

export const AdContent = () => {
  return (
    <section className="flex flex-row gap-[22.5px]">
      <div className="flex flex-col w-[243.75px] gap-[15px]">
        <div className="text-white font-bold text-[15px] whitespace-nowwrap">
          새로운 사운드의 조화
        </div>
        <img
          src={sample}
          className="h-[132.75px] object-cover rounded-[7.5px]"
        />
      </div>
      <div className="flex flex-col w-[243.75px] gap-[15px]">
        <div className="text-white font-bold text-[15px] whitespace-nowrap">
          힙한 비트를 만들 수 있는 이유
        </div>
        <img
          src={sample}
          className="h-[132.75px] object-cover rounded-[7.5px]"
        />
      </div>
      <div className="flex flex-col w-[243.75px] gap-[15px]">
        <div className="text-white font-bold text-[15px] whitespace-nowrap">
          여름에 딱 맞는 뮤지션 여기보세요
        </div>
        <img
          src={sample}
          className="h-[132.75px] object-cover rounded-[7.5px]"
        />
      </div>
    </section>
  );
};
