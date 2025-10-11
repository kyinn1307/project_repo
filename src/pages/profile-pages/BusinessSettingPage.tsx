import { createBusiness } from "@/apis/business";
import { BusinessDetail } from "@/components/ui/business-setting/BusinessDetail";
import { BusinessDetailInput } from "@/components/ui/business-setting/BusinessDetailInput";
import { Genre } from "@/types/music";
import { BusinessPayload } from "@/types/business";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BusinessGenreSelector } from "@/components/ui/business-setting/BusinessGenreSelector";
import { BusinessFieldSelector } from "@/components/ui/business-setting/BusinessFieldSelector";

const PLAN_META = {
  "1": { name: "Starter", color: "text-[#86acf8]" },
  "2": { name: "Growth", color: "text-[#86f8ac]" },
  "3": { name: "Pro", color: "text-[#f8d486]" },
} as const;

type PlanId = keyof typeof PLAN_META; // '1' | '2' | '3'

const isPlanId = (v: unknown): v is PlanId =>
  v === "1" || v === "2" || v === "3";

export const BusinessSettingPage = () => {
  const { id } = useParams();
  const planId: PlanId = isPlanId(id) ? id : "1";
  const plan = PLAN_META[planId];

  const [genre, setGenre] = useState<Genre | "">("");
  const [field, setField] = useState<string | "">("");
  const [grade, setGrade] = useState("");
  const [price, setPrice] = useState(0);
  const [period, setPeriod] = useState(0);
  const [editTime, setEditTime] = useState(0);
  const [businessDescription, setBusinessDescription] = useState("");

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  /** CREATE */
  const createMut = useMutation({
    mutationFn: (payload: BusinessPayload) => createBusiness(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["myBusiness"] });
      console.log("비즈니스 생성 완료");
      navigate("/my-profile/business");
    },
  });

  const handleSubmit = () => {
    if (!genre || !field) {
      alert("장르/분야를 하나씩 선택하세요.");
      return;
    }

    // 이 시점에서 genre는 Genre로 좁혀짐 ("" 제외)
    const payload: BusinessPayload = {
      grade,
      price,
      period,
      editTime,
      businessDescription,
      genre,
      field,
    };
    createMut.mutate(payload);
  };

  useEffect(() => {
    setGrade(plan.name);
  }, [plan.name]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[540px] bg-[#222222] px-[11.25px] py-[15px] rounded-[7.5px] mt-[5px] gap-[15px]">
        <div className="h-[23px] flex items-center text-[#86acf8] text-[18px] font-bold">
          {plan.name}
        </div>
        <div>
          <BusinessGenreSelector
            value={genre}
            setValue={setGenre}
            isRequired={false}
          />
        </div>
        <div>
          <BusinessFieldSelector
            value={field}
            setValue={setField}
            isRequired={false}
          />
        </div>
        <div>
          <BusinessDetail
            price={price}
            setPrice={setPrice}
            period={period}
            setPeriod={setPeriod}
            editTime={editTime}
            setEditTime={setEditTime}
          />
        </div>
        <div>
          <BusinessDetailInput
            value={businessDescription}
            setValue={setBusinessDescription}
          />
        </div>
        <div className="flex justify-center h-[22.5px]">
          <Button
            className="w-15 h-full rounded-[7.5px] text-white text-xs font-medium bg-[#0050ef]"
            onClick={handleSubmit}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};
