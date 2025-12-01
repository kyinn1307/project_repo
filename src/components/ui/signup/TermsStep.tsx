import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { postTerms } from "@/apis/signup";
import { useNavigate } from "react-router-dom";

// 약관 종류 리스트
const termsList = [
  { key: "age", label: "[필수] 만 14세 이상" },
  { key: "tos", label: "[필수] 서비스 이용약관", path: "/terms" },
  { key: "privacy", label: "[필수] 개인정보 수집 및 이용", path: "/terms" },
  { key: "policy", label: "[필수] 개인정보처리방침", path: "/terms/privacy" },
  {
    key: "marketing",
    label: "[선택] 개인정보 수집 및 이용(이벤트)",
    path: "/terms/privacy",
  },
];

export const TermsStep = ({ onNext }: { onNext: () => void }) => {
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    age: true,
    tos: true,
    privacy: true,
    policy: true,
    marketing: false,
  });

  // 전체 클릭 조건
  const isAllRequiredChecked =
    checkedItems.age &&
    checkedItems.tos &&
    checkedItems.privacy &&
    checkedItems.policy;

  // 전체 동의 버튼 로직
  const handleAllCheck = () => {
    const newState = !allChecked;
    setAllChecked(newState);
    setCheckedItems({
      age: newState,
      tos: newState,
      privacy: newState,
      policy: newState,
      marketing: newState,
    });
  };

  // 개별 동의 버튼 로직
  const handleItemCheck = (key: keyof typeof checkedItems) => {
    const newState = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newState);
    setAllChecked(Object.values(newState).every(Boolean));
  };

  return (
    <>
      <div className="text-white text-lg font-medium ml-4">약관 동의</div>
      <div>
        {/* 전체 동의 버튼 */}
        <div className="flex flex-row gap-[10px] ml-4">
          <Input
            type="checkbox"
            className="w-5 h-5 rounded-[5px] cursor-pointer"
            checked={allChecked}
            onChange={handleAllCheck}
          />
          <div className="text-white text-sm font-medium">전체동의</div>
        </div>

        {/* 구분선 */}
        <Separator className="bg-white h-px w-full my-[15px]" />

        {/* 개별 약관 동의 버튼 */}
        <div className="flex flex-col gap-[10px]">
          {termsList.map(({ key, label, path }) => {
            const match = label.match(/^\[(필수|선택)\]\s*(.*)$/);
            const [, type, text] = match ?? [];

            return (
              <div key={key} className="flex flex-row gap-[10px] ml-4">
                <Input
                  type="checkbox"
                  className="w-5 h-5 rounded-[5px] cursor-pointer"
                  checked={checkedItems[key as keyof typeof checkedItems]}
                  onChange={() =>
                    handleItemCheck(key as keyof typeof checkedItems)
                  }
                />
                <div className="text-white text-sm">
                  <span className="mr-1">[{type}]</span>
                  {path ? (
                    <span
                      onClick={() => navigate(path)}
                      className="underline cursor-pointer hover:opacity-80"
                    >
                      {text}
                    </span>
                  ) : (
                    <span>{text}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        className="w-full h-10 bg-[#0050ef] text-white text-sm cursor-pointer rounded-[5px]"
        disabled={!isAllRequiredChecked}
        onClick={async () => {
          try {
            await postTerms({
              isOver14: checkedItems.age,
              termsOfService: checkedItems.tos,
              privacyConsent: checkedItems.privacy,
              privacyPolicy: checkedItems.policy,
              optionalPrivacyConsent: checkedItems.marketing,
            });
            onNext();
          } catch (error) {
            console.error("약관 동의 실패:", error);
          }
        }}
      >
        다음
      </Button>
    </>
  );
};
