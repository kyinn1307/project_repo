import { ProfitTipItem } from "./ProfitTipItem";

export const ProfitTipList = () => {
  return (
    <div className="w-full px-[15px] py-[18px] bg-[#111111] rounded-[3.75px]">
      <ProfitTipItem title={"가격 설정은 어떡하나요?"} content={"가격 ~~~"} />
      <ProfitTipItem title={"가격 설정은 어떡하나요?"} content={"가격 ~~~"} />
      <ProfitTipItem title={"가격 설정은 어떡하나요?"} content={"가격 ~~~"} />
    </div>
  );
};
