import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../input";

type Props = {
  price: number;
  setPrice: (v: number) => void;

  period: number;
  setPeriod: (v: number) => void;

  editTime: number; // -1 = unlimited
  setEditTime: (v: number) => void;
};

const WORK_DAYS = [
  { label: "1", value: "1" },
  { label: "3", value: "3" },
  { label: "7", value: "7" },
  { label: "14", value: "14" },
];

const REVISION_OPTIONS = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
];

export const BusinessDetail = ({
  price,
  setPrice,
  period,
  setPeriod,
  editTime,
  setEditTime,
}: Props) => {
  const periodStr = period > 0 ? String(period) : "";
  const revisionStr =
    editTime === -1 ? "unlimited" : editTime >= 0 ? String(editTime) : "";

  return (
    <div className="w-full flex flex-col bg-[#111111] px-[7.5px] py-[15px] rounded-[5px] text-white gap-[22.5px]">
      {/* 작업일 */}
      <div className="h-[15px] flex flex-row items-center justify-between">
        <span className="h-full flex items-center shrink-0 text-[10.5px] text-white">
          작업일
        </span>
        <div className="h-full flex flex-row items-center text-[10.5px] text-[#666666] gap-[3px]">
          <Select value={periodStr} onValueChange={(v) => setPeriod(Number(v))}>
            <SelectTrigger
              className="
      flex p-0 !h-[15px] w-[60px] min-w-[60px] text-[10.5px]
      border-0 border-b rounded-none text-white [&_[data-placeholder]]:text-white
      [&>span:last-child]:text-white [&>span:last-child]:opacity-100
      [&>span:last-child>svg]:h-[10.5px] [&>span:last-child>svg]:w-[10.5px]
          [&>svg]:size-[10.5px] [&>svg]:!text-white [&>svg]:opacity-100
    "
            >
              <SelectValue
                placeholder={<span className="text-white">선택</span>}
              />
            </SelectTrigger>
            <SelectContent
              className="flex flex-col w-[60px] !min-w-[60px] bg-[#1a1a1a] text-white border-[#333333] py-[7.5px] text-[10.5px] gap-[7.5px]
               [&_[data-radix-select-viewport]]:p-0"
            >
              {WORK_DAYS.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="
                 w-[60px] !h-[13px] !py-0 !pl-0 px-0
                 text-[10.5px] leading-[13px] text-center justify-center rounded-none
                 [&>span]:hidden
               "
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          일
        </div>
      </div>

      {/* 수정횟수 */}
      <div className="h-[15px] flex flex-row items-center justify-between">
        <span className="h-full flex items-center shrink-0 text-[10.5px] text-white">
          수정횟수
        </span>
        <div className="h-full flex flex-row items-center text-[10.5px] text-[#666666] gap-[3px]">
          <Select
            value={revisionStr}
            onValueChange={(v) =>
              setEditTime(v === "unlimited" ? -1 : Number(v))
            }
          >
            <SelectTrigger
              className="
      flex p-0 !h-[15px] w-[60px] min-w-[60px] text-[10.5px]
      border-0 border-b rounded-none text-white [&_[data-placeholder]]:text-white
      [&>span:last-child]:text-white [&>span:last-child]:opacity-100
      [&>span:last-child>svg]:h-[10.5px] [&>span:last-child>svg]:w-[10.5px] [&>svg]:size-[10.5px] [&>svg]:!text-white [&>svg]:opacity-100

    "
            >
              <SelectValue
                placeholder={<span className="text-white">선택</span>}
              />
            </SelectTrigger>
            <SelectContent
              className="flex flex-col w-[60px] !min-w-[60px] bg-[#1a1a1a] text-white border-[#333333] py-[7.5px] text-[10.5px] gap-[7.5px]
               [&_[data-radix-select-viewport]]:p-0"
            >
              {REVISION_OPTIONS.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="
                  w-[60px] !h-[13px] !py-0 !pl-0 px-0
                  text-[10.5px] leading-[13px] text-center justify-center rounded-none
                  [&>span]:hidden
                "
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          회
        </div>
      </div>

      {/* 가격 */}
      <div className="h-[15px] flex flex-row items-center justify-between">
        <span className="h-full flex items-center shrink-0 text-[10.5px] text-white">
          가격
        </span>
        <div className="h-full flex flex-row items-center text-[10.5px] text-[#666666] gap-[3px]">
          <Input
            value={price ? String(price) : ""}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D/g, "");
              setPrice(onlyDigits ? Number(onlyDigits) : 0);
            }}
            className="w-15 h-full p-0 !text-[10.5px] text-white rounded-none
                       bg-transparent border-0 border-b border-white
                       placeholder:text-white placeholder:text-[10.5px]
                       focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="직접입력"
            inputMode="numeric"
          />
          원
        </div>
      </div>
    </div>
  );
};
