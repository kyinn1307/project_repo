import MusicDefault from "@/assets/Images/MusicPlayDefault.png";

export const MusicContentItem = () => {
  return (
    <div className="relative flex flex-col overflow-hidden bg-[#111111] rounded-[15px]">
      <div className="flex flex-row">
        <img
          src={MusicDefault}
          alt="음악 재생"
          className="w-[75px] h-[75px] mr-[7.5px] rounded-[15px]"
        />
        <div className="flex flex-col gap-[7.5px] mt-[7.5px]">
          <div className="text-[12px] h-[15px] font-bold">Makit</div>
          <div className="h-[11px] text-[9px]">
            <div>Kendrick lamar</div>
          </div>

          <div className="text-[#ffffff] mr-[11.12px] mt-[3.75px]">
            <div className="flex flex-row gap-[6.25px]">
              <span className="h-[15px] px-[5px] py-[2px] text-[8.75px] bg-[#555555] rounded-[7.5px]">
                Trap
              </span>
              <span className="h-[15px] px-[5px] py-[2px] text-[8.75px] bg-[#555555] rounded-[7.5px]">
                HARD BEAT
              </span>
              <span className="h-[15px] px-[5px] py-[2px] text-[8.75px] bg-[#555555] rounded-[7.5px]">
                Dark
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
