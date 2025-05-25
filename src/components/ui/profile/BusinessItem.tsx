import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "../button";

export const BusinessItem = () => {
  return (
    <div className="flex flex-col w-[187.5px] bg-[#111111] rounded-[15px] p-[11.25px]">
      <div className="flex flex-col gap-[7.5px]">
        {/* 상 */}

        <div className="flex flex-row justify-between">
          {/* kpop & 작곡 */}
          <div className="flex flex-col gap-[2.24px]">
            <div className="text-[7.63px] text-[#999999] font-bold">K-POP</div>
            <div className="text-[10.89px] text-[#ffffff] font-bold">작곡</div>
          </div>

          {/* 아바타 */}
          <div>
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="w-[21px] h-[21px] rounded-[50px]"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* 중 */}
        <div className="flex flex-col gap-[2.24px]">
          <div className="text-[10.45px] text-[#86acf8] font-bold">track C</div>
          <div className="text-[11.94px] text-[#ffffff] font-bold">
            월 ₩12,900(VAT별도)
          </div>
        </div>

        {/* 하 */}
        <div className="flex flex-row text-[#ffffff] text-[8.96px] font-regular">
          <span>작업일 무제한 | 수정횟수 3회 | 저작권 2일</span>
        </div>
      </div>

      <div className="w-full h-[75px] bg-[#222222] rounded-[7.5px] text-[7.46px] pt-[6.72px] mt-[12.75px]">
        <ul className="list-disc pl-5">
          <li>보컬튠 1분 이내</li>
          <li>메인 트랙 1개 작업</li>
          <li>박자보정+음정튵+콧소리제거+노이즈제거</li>
        </ul>
      </div>
      <Button className="h-6 text-[10.5px] font-bold bg-[#ffffff] text-[#111111] mt-[7.5px]">
        수정하기
      </Button>
    </div>
  );
};
