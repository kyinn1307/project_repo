import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Genre } from "@/types/music";
import { useNavigate } from "react-router-dom";
import { getBusinessDetail, updateBusiness } from "@/apis/business";
import { BusinessDetailInput } from "@/components/ui/business-setting/BusinessDetailInput";
import { BusinessDetail } from "@/components/ui/business-setting/BusinessDetail";
import { BusinessGenreSelector } from "@/components/ui/business-setting/BusinessGenreSelector";
import { BusinessFieldSelector } from "@/components/ui/business-setting/BusinessFieldSelector";

export const BusinessEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const grade = searchParams.get("grade") ?? ""; // ✅ 쿼리에서 grade 추출
  const navigate = useNavigate();
  const [genre, setGenre] = useState<Genre | "">("");
  const [field, setField] = useState<string | "">("");
  const [price, setPrice] = useState(0);
  const [period, setPeriod] = useState(0);
  const [editTime, setEditTime] = useState(0);
  const [businessDescription, setBusinessDescription] = useState("");

  // 트랙 상세 정보 fetch
  useEffect(() => {
    if (!id) return;

    const fetchBusiness = async () => {
      try {
        const business = await getBusinessDetail(Number(id));
        console.log(business);
        setBusinessDescription(business.businessDescription);
        setGenre(business.genre);
        setPrice(business.price);
        setEditTime(business.editTime);
        setPeriod(business.period);
        setField(business.field);
      } catch (err) {
        console.error("비즈니스 조회 실패", err);
      }
    };

    fetchBusiness();
  }, [id]);

  // 비즈니스 정보 수정
  const handleUpdate = async () => {
    if (!id) return;

    const requestBody = {
      grade,
      field,
      businessDescription,
      genre,
      price,
      editTime,
      period,
    };

    try {
      const res = await updateBusiness(Number(id), requestBody);
      console.log(res);
      alert("수정이 완료되었습니다.");
      navigate(`/my-profile/business`);
    } catch (error) {
      console.error("비즈니스 수정 실패:", error);
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[540px] bg-[#222222] px-[11.25px] py-[15px] rounded-[7.5px] mt-[5px] gap-[15px]">
        <div className="h-[23px] flex items-center text-[#86acf8] text-[18px] font-bold">
          {grade}
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
            onClick={handleUpdate}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};
