export const ProjectDetailInput = () => {
  return (
    <div className="w-full h-26 bg-[#111111] rounded-[3.75px] p-[7.5px] ">
      <div className="text-white text-[10.5px] mb-[7.5px]">상세내용</div>
      <textarea
        className="w-full resize-none overflow-y-auto text-[10.5px] placeholder-[#777777] text-white focus:outline-none focus:ring-0 
             focus:border-none caret-white custom-scrollbar"
        placeholder="프로젝트를 설명해주세요"
      />
    </div>
  );
};
