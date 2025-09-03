import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCareer, updateCareer } from "@/apis/career";
import { Career, CareerPayload } from "@/types/career";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useUserStore } from "@/stores/useUserStore";

const getTodayMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

const formatDisplayMonth = (value: string) => {
  if (!value.includes("-")) return value;
  const [year, month] = value.split("-");
  return `${year}.${month}`;
};

const FIELD_TAGS = [
  "작사",
  "작곡/편곡",
  "프로듀서",
  "믹싱",
  "마스터링",
  "비트메이커",
  "세션",
  "보컬",
  "앨범아트",
  "영상",
  "그 외",
];

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  career?: Career | null; // 있으면 수정 모드, 없으면 생성 모드
  invalidateKey: readonly unknown[]; // ["careers", userId]
};

export const ActivityHistoryModal = ({
  open,
  onOpenChange,
  career,
  invalidateKey,
}: Props) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const [startMonth, setStartMonth] = useState(getTodayMonth());
  const [endMonth, setEndMonth] = useState(getTodayMonth());
  const [fields, setFields] = useState<string[]>([]);

  // 시작월
  const startRef = useRef<HTMLInputElement>(null);
  // 종료월
  const endRef = useRef<HTMLInputElement>(null);

  // const userId = useUserStore((state) => state.userId);
  const queryClient = useQueryClient();

  // career가 바뀌거나 모달이 열릴 때 폼 초기화/세팅
  useEffect(() => {
    if (open) {
      if (career) {
        // 수정 모드: 전달받은 데이터로 세팅
        setTitle(career.title ?? "");
        setDetail(career.detail ?? "");
        setStartMonth(career.startYm ?? getTodayMonth());
        setEndMonth(career.endYm ?? getTodayMonth());
        setFields(Array.isArray(career.fields) ? career.fields : []);
      } else {
        resetForm();
      }
    }
  }, [open, career]);

  /** 폼 리셋 */
  const resetForm = () => {
    setTitle("");
    setDetail("");
    const today = getTodayMonth();
    setStartMonth(today);
    setEndMonth(today);
    setFields([]);
  };

  const handleOpenChange = (v: boolean) => {
    if (!v) resetForm();
    onOpenChange(v);
  };

  const toYmString = (ym: string): string => {
    return ym;
  };

  const openMonthPicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    const el = ref.current as
      | (HTMLInputElement & { showPicker?: () => void })
      | null;
    if (!el) return;

    if (el.showPicker) {
      // 크로뮴 계열
      el.showPicker();
    } else {
      // 폴백: 포커스 후 클릭
      el.focus();
      el.click();
    }
  };

  const toggleField = (tag: string) =>
    setFields((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const canSave = title.trim().length > 0 && startMonth <= endMonth;
  const isEdit = !!career?.id;

  // 생성
  const createMut = useMutation({
    mutationFn: (payload: CareerPayload) => createCareer(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: invalidateKey });
      onOpenChange(false);
    },
  });

  // 수정
  const updateMut = useMutation({
    mutationFn: (vars: { id: number; payload: CareerPayload }) =>
      updateCareer(vars.id, vars.payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: invalidateKey });
      onOpenChange(false);
    },
  });

  const handleSaveClick = async () => {
    if (!canSave) return;

    const payload: CareerPayload = {
      title,
      detail,
      startYm: toYmString(startMonth),
      endYm: toYmString(endMonth),
      fields,
    };

    try {
      if (isEdit && career) {
        await updateMut.mutateAsync({ id: career.id, payload });
      } else {
        await createMut.mutateAsync(payload);
      }
    } catch (e) {
      console.error("커리어 저장 실패:", e);
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="min-w-[540px] bg-[#222222] text-white rounded-[7.5px] px-[11.25px] py-[15px] border-none gap-[15px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-[15px] h-[19px] font-medium">
            활동이력
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-[15px]">
          {/* 제목, 상세활동 */}
          <div className="flex flex-col gap-[22.5px] bg-[#111111] px-[7.5px] py-[15px] rounded-[3.75px]">
            <div className="flex justify-between items-center text-[10.5px] font-medium">
              <label>제목</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="텍스트를 입력해주세요"
                className="w-[300px] h-[19px] bg-black text-white !text-[10.5px] border border-[#999999] font-medium rounded-[3.75px] placeholder:text-[10.5px] p-[3px]"
              />
            </div>
            <div className="flex justify-between items-center text-[10.5px] font-medium">
              <label>상세활동</label>
              <Input
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="텍스트를 입력해주세요"
                className="w-[300px] h-[19px] bg-black text-white !text-[10.5px] font-medium border border-[#999999] rounded-[3.75px] placeholder:text-[10.5px] p-[3px]"
              />
            </div>
          </div>

          {/* 기간 */}
          <div className="flex flex-row justify-between items-center bg-[#111111] text-[10.5px] font-medium px-[10px] py-[10px] rounded-[3.75px]">
            <label>기간</label>
            <div className="flex gap-3 items-center">
              <div
                className="relative w-[135px] h-[19px]"
                onClick={() => openMonthPicker(startRef)}
              >
                <Input
                  ref={startRef}
                  type="month"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-full h-full flex items-center justify-center bg-black text-white text-[10.5px] font-medium border border-gray-700 rounded-[3.75px] text-sm">
                  {formatDisplayMonth(startMonth)}
                </div>
              </div>
              <span className="text-white text-sm">~</span>
              <div
                className="relative w-[135px] h-[19px]"
                onClick={() => openMonthPicker(endRef)}
              >
                <Input
                  ref={endRef}
                  type="month"
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-full h-full flex items-center justify-center bg-black text-white text-[10.5px] font-medium border border-gray-700 rounded-[3.75px] text-sm">
                  {formatDisplayMonth(endMonth)}
                </div>
              </div>
            </div>
          </div>

          {/* 분야 */}
          <div className="bg-[#111111] px-[10px] py-[10px] rounded-[3.75px]">
            <label className="block text-[10.5px] font-medium mb-2">분야</label>
            <div className="flex flex-wrap gap-2">
              {FIELD_TAGS.map((tag) => {
                const selected = fields.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleField(tag)}
                    className={`h-[17.5px] flex items-end text-[10.5px] px-[7.5px] rounded-full cursor-pointer
                      ${
                        selected
                          ? "bg-[#0050ef] text-white"
                          : "bg-[#333333] text-white/90"
                      }
                    `}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleSaveClick}
            className="flex items-center h-[22.5px] text-xs font-medium bg-[#0050ef] text-white px-[18.5px] cursor-pointer rounded-[7.5px] disabled:opacity-50"
          >
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
