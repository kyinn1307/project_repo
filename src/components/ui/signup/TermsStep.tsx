// steps/TermsStep.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { postTerms } from "@/apis/signup";
import { useNavigate } from "react-router-dom";

const termsList = [
  { key: "age", label: "[필수] 만 14세 이상" },
  { key: "tos", label: "[필수] 서비스 이용약관", path: "/terms" },
  { key: "privacy", label: "[필수] 개인정보 수집 및 이용", path: "/terms" },
  { key: "policy", label: "[필수] 개인정보처리방침", path: "/terms" },
  {
    key: "marketing",
    label: "[선택] 개인정보 수집 및 이용(이벤트)",
    path: "/terms/privacy",
  },
];

export const TermsStep = ({ onNext }: { onNext: () => void }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    age: true,
    tos: true,
    privacy: true,
    policy: true,
    marketing: false,
  });

  const navigate = useNavigate();

  const isAllRequiredChecked =
    checkedItems.age &&
    checkedItems.tos &&
    checkedItems.privacy &&
    checkedItems.policy;

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

  const handleItemCheck = (key: keyof typeof checkedItems) => {
    const newState = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newState);
    setAllChecked(Object.values(newState).every(Boolean));
  };

  return (
    <>
      <div className="text-white text-[18px] font-medium ml-4">약관 동의</div>
      <div>
        <div className="flex flex-row gap-[10px] ml-4">
          <Input
            type="checkbox"
            className="w-5 h-5 rounded"
            checked={allChecked}
            onChange={handleAllCheck}
          />
          <div className="text-white text-[14px]">전체동의</div>
        </div>
        <Separator className="bg-white h-px w-[350px] my-5" />
        <div className="flex flex-col gap-[10px] ml-4">
          {termsList.map(({ key, label, path }) => {
            const match = label.match(/^\[(필수|선택)\]\s*(.*)$/);
            const [, type, text] = match ?? [];

            return (
              <div key={key} className="flex flex-row gap-[10px]">
                <Input
                  type="checkbox"
                  className="w-5 h-5 rounded"
                  checked={checkedItems[key as keyof typeof checkedItems]}
                  onChange={() =>
                    handleItemCheck(key as keyof typeof checkedItems)
                  }
                />
                <div className="text-white text-[14px]">
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
        className="mt-3 w-[350px] h-10 bg-[#0050ef] text-white text-sm cursor-pointer"
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
            console.log("약관동의 성공");
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
