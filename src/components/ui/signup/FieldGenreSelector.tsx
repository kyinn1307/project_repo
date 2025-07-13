import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getFieldsGenres } from "@/apis/signup";
import { postComplete } from "@/apis/signup";
function SelectableTag({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`my-[3px] px-[10px] py-[7px] h-8 rounded-[5px] text-sm font-medium transition-colors duration-150 cursor-pointer
        ${
          selected ? "bg-[#0050ef] text-white" : "bg-[#111111] text-[#777777]"
        }`}
    >
      {label}
    </button>
  );
}

export default function FieldGenreSelector() {
  const navigate = useNavigate();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [fieldOptions, setFieldOptions] = useState<string[]>([]);
  const [genreOptions, setGenreOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await getFieldsGenres(); // ✅ API 요청
        setFieldOptions(res.data.fields);
        setGenreOptions(res.data.genres);
      } catch (error) {
        console.error("분야/장르 가져오기 실패:", error);
      }
    };

    fetchOptions();
  }, []);

  const toggleSelection = (
    item: string,
    list: string[],
    setList: (val: string[]) => void
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else if (list.length < 3) {
      setList([...list, item]);
    }
  };

  const isNextEnabled = selectedFields.length > 0 || selectedGenres.length > 0;

  const handleSubmit = async () => {
    try {
      const payload = {
        selectedFields,
        selectedGenres,
      };
      const res = await postComplete(payload);
      console.log("회원가입 완료 응답 ✅", res);
      navigate("/");
    } catch (err) {
      console.error("회원가입 완료 요청 실패 ❌", err);
      alert("회원가입을 완료할 수 없습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-base font-semibold text-white">
          분야 및 장르를 선택해주세요.{" "}
          <span className="text-sm">(최대 3개)</span>
        </p>
      </div>

      <div className="flex flex-col gap-[30px]">
        <div>
          <p className="text-xs font-medium mb-[3px] text-white">분야</p>
          <div className="flex flex-wrap gap-x-[5px]">
            {fieldOptions.map((field) => (
              <SelectableTag
                key={field}
                label={field}
                selected={selectedFields.includes(field)}
                onClick={() =>
                  toggleSelection(field, selectedFields, setSelectedFields)
                }
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium mb-[3px] text-white">장르</p>
          <div className="flex flex-wrap gap-[5px]">
            {genreOptions.map((genre) => (
              <SelectableTag
                key={genre}
                label={genre}
                selected={selectedGenres.includes(genre)}
                onClick={() =>
                  toggleSelection(genre, selectedGenres, setSelectedGenres)
                }
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        disabled={!isNextEnabled}
        className={`w-full h-10 text-sm transition-colors duration-200
          ${
            isNextEnabled
              ? "bg-[#0050ef] text-white"
              : "bg-[#555555] text-[#777777]"
          }`}
        onClick={handleSubmit}
      >
        완료
      </Button>
    </div>
  );
}
