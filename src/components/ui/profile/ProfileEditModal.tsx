import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

export const ProfileEditModal = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const bgFileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setBackgroundImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const toggleSelection = (
    value: string,
    selectedList: string[],
    setSelectedList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="w-[71px] h-[19.5px] px-[7.5px] py-[2.25px] rounded-[3.75px] text-xs text-white bg-[#555555] cursor-pointer"
        >
          프로필편집
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[540px] bg-[#222222] text-white rounded-lg py-[14.5px] px-[11.25px] border-none">
        <DialogHeader className="mb-[10px]">
          <DialogTitle className="text-[15px] font-medium">
            프로필편집
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-[15px]">
          {/* 🔵 프로필 이미지 선택 */}
          <div className="flex justify-center mb-[15px] relative">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-[75px] h-[75px] rounded-full bg-gradient-to-b from-green-200 to-red-400 relative cursor-pointer flex items-center justify-center"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="프로필"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : null}

              {/* + 아이콘 */}
              <div className="absolute bottom-0 right-0 w-[22.5px] h-[22.5px] rounded-full bg-white border-2 border-black flex items-center justify-center z-10">
                <Plus className="w-[16px] h-[16px] text-black" />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>
          </div>

          {/* 제목, 상세활동 */}
          <div className="flex flex-col gap-[22.5px] bg-[#111111] px-[10px] py-[15px] rounded-[3.75px]">
            <div className="flex justify-between items-center">
              <label className="text-[10.5px]">닉네임</label>
              <Input
                placeholder="닉네임을 입력해주세요"
                className="w-[300px] h-[19px] p-[3px] bg-black rounded-[3.75px] text-white border border-gray-700 placeholder:text-[10.5px]"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-[10.5px]">소개</label>
              <Input
                placeholder="텍스트를 입력해주세요"
                className="w-[300px] h-[19px] p-[3px] bg-black rounded-[3.75px] text-white border border-gray-700 placeholder:text-[10.5px]"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-[10.5px]">링크</label>
              <Input
                placeholder="텍스트를 입력해주세요"
                className="w-[300px] h-[19px] p-[3px] bg-black rounded-[3.75px] text-white border border-gray-700 placeholder:text-[10.5px]"
              />
            </div>
          </div>

          {/* 프로필 배경사진 */}
          <div className="flex flex-col justify-between items-center bg-[#111111] p-[7.5px] rounded-[3.75px]">
            <label className="w-full text-[10.5px] mb-[11.5px] text-[#ffffff]">
              프로필 배경사진
            </label>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                className="w-[85px] h-[22px] px-4 py-[2px] text-[10.5px] text-white rounded-[7.5px] bg-[#222222] cursor-pointer border border-[#999999]"
                onClick={() => bgFileInputRef.current?.click()}
              >
                배경사진 변경
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundChange}
                ref={bgFileInputRef}
                className="hidden"
              />
            </div>
          </div>

          {/* 장르 */}
          <div className="bg-[#111111] p-[7.5px] rounded-[3.75px]">
            <label className="block text-[10.5px] mb-[6px]">장르</label>
            <div className="flex flex-wrap gap-[7.5px]">
              {[
                "팝",
                "힙합",
                "록",
                "재즈",
                "인디",
                "R&B",
                "클래식",
                "트로트",
                "컨트리",
                "인렉트로닉",
                "발라드",
                "그 외",
              ].map((tag) => (
                <span
                  key={tag}
                  onClick={() =>
                    toggleSelection(tag, selectedGenres, setSelectedGenres)
                  }
                  className={`text-[10.5px] px-[7.5px] py-[2.25px] rounded-full cursor-pointer ${
                    selectedGenres.includes(tag)
                      ? "bg-[#0050ef] text-white"
                      : "bg-[#333333] text-white"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 분야 */}
          <div className="bg-[#111111] p-[7.5px] rounded-[3.75px]">
            <label className="block text-[10.5px] mb-[6px]">분야</label>
            <div className="flex flex-wrap gap-[7.5px]">
              {[
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
              ].map((tag) => (
                <span
                  key={tag}
                  onClick={() =>
                    toggleSelection(tag, selectedFields, setSelectedFields)
                  }
                  className={`text-[10.5px] px-[7.5px] py-[2.25px] rounded-full cursor-pointer ${
                    selectedFields.includes(tag)
                      ? "bg-[#0050ef] text-white"
                      : "bg-[#333333] text-white"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button className="w-15 h-[22.5px] text-xs bg-[#0050ef] text-white items-center cursor-pointer">
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
