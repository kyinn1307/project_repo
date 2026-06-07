import { InfoHover } from "./InfoHover";

export const BusinessTipBox = ({ isOtherUser }: { isOtherUser: boolean }) => {
  return (
    <div className="flex flex-col gap-[7.5px]">
      {isOtherUser ? (
        <>
          {/* PAYMENT */}
          <div className="flex items-center px-[15px] py-[6px] justify-between bg-[#111111] rounded-[7.5px]">
            <span className="text-xs">서비스 결제는 어떻게 이루어지나요?</span>

            <InfoHover
              content={
                <div>
                  SETA 플랫폼 내에서는 결제가 이루어지지 않습니다. 서비스
                  제공자와 구매자가 직접 협의하여 결제를 진행합니다.
                </div>
              }
            />
          </div>

          {/* DISPUTE */}
          <div className="flex items-center px-[15px] py-[6px] justify-between bg-[#111111] rounded-[7.5px]">
            <span className="text-xs">
              거래 중 문제가 생기면 SETA가 개입하나요?
            </span>

            <InfoHover
              content={
                <div>
                  SETA는 서비스 등록 및 연결만을 지원하며, 거래 과정과 결과에
                  직접 개입하지 않습니다. 거래를 하기 전, 문의하기를 통해 서비스
                  제공자와 충분한 협읙를 진행해주세요.
                </div>
              }
            />
          </div>
        </>
      ) : (
        <div className="flex items-center px-[15px] py-[6px] justify-between bg-[#111111] rounded-[7.5px]">
          <span className="text-xs">Tip</span>

          <InfoHover
            content={
              <div className="flex flex-col gap-[8px]">
                <div>
                  <span className="text-[#0050ef] font-medium">가격</span>과{" "}
                  <span className="text-[#0050ef] font-medium">
                    서비스 범위
                  </span>
                  에 따라 단계가 구분되며, 단계가 올라갈수록 더 많은 서비스를
                  제공하는 것이 일반적이에요!
                </div>

                <div>
                  <div className="font-medium">Starter</div>
                  <div>“처음 시작하는 분들을 위한 기본 기능 제공”</div>
                </div>
                <div>
                  <div className="font-medium">Growth</div>
                  <div>“협업과 네트워킹에 필요한 핵심 기능 강화”</div>
                </div>
                <div>
                  <div className="font-medium">Pro</div>
                  <div>“전문가를 위한 고급 비즈니스 도구와 혜택 제공”</div>
                </div>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};
