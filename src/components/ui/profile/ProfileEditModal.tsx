import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import type { Profile } from "@/types/my-profile";
import { updateProfile, uploadProfileImage } from "@/apis/my-profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/stores/useUserStore";

export const ProfileEditModal = ({ info }: { info: Profile | null }) => {
  const queryClient = useQueryClient();
  const userId = useUserStore((s) => s.userId);

  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [link, setLink] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      // 1️⃣ 이미지 업로드
      if (profileImageFile) {
        await uploadProfileImage(profileImageFile);
      }

      // 2️⃣ 프로필 수정
      return updateProfile({
        nickname,
        link,
        introduction,
        selectedFields,
        selectedGenres,
      });
    },

    onSuccess: async () => {
      alert("프로필 수정이 완료되었습니다");
      await queryClient.invalidateQueries({
        queryKey: ["myProfile", userId],
      });

      setOpen(false);
    },
  });

  useEffect(() => {
    if (info) {
      setNickname(info.nickname || "");
      setIntroduction(info.introduction || "");
      setLink(info.link || "");
      setProfileImage(info.profileImageUrl);
      setSelectedGenres(info.genres ?? []);
      setSelectedFields(info.fields ?? []);
    }
  }, [info]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result as string);
      setProfileImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  const toggleSelection = (
    value: string,

    setSelectedList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="w-[71px] h-[19.5px] px-[7.5px] py-[2.25px] rounded-[3.75px] text-xs text-white bg-[#555555] cursor-pointer"
        >
          프로필편집
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[540px] bg-[#222222] text-white rounded-lg py-[14.5px] px-[11.25px] border-none">
        <DialogClose asChild>
          <button
            className="absolute right-[12px] top-[12px] rounded-sm p-[4px] cursor-pointer
                 text-white"
            aria-label="닫기"
          >
            <X className="w-[16px] h-[16px]" />
          </button>
        </DialogClose>{" "}
        <DialogHeader className="mb-[10px]">
          <DialogTitle className="text-[15px] font-medium">
            프로필편집
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-[15px]">
          {/* 프로필 이미지 선택 */}
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
                value={nickname}
                placeholder="닉네임을 입력해주세요"
                onChange={(e) => setNickname(e.target.value)}
                className="w-[300px] h-[19px] p-[3px] !text-[10.5px] bg-black rounded-[3.75px] text-white border border-gray-700 placeholder:text-[10.5px]"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-[10.5px]">소개</label>
              <Input
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                placeholder="텍스트를 입력해주세요"
                className="w-[300px] h-[19px] p-[3px] !text-[10.5px] bg-black rounded-[3.75px] text-white border border-gray-700 placeholder:text-[10.5px]"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-[10.5px]">링크</label>
              <Input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="텍스트를 입력해주세요"
                className="w-[300px] h-[19px] p-[3px] !text-[10.5px] bg-black rounded-[3.75px] text-white border border-gray-700 placeholder:text-[10.5px]"
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
                  onClick={() => toggleSelection(tag, setSelectedGenres)}
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
                  onClick={() => toggleSelection(tag, setSelectedFields)}
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
          <Button
            className="w-15 h-[22.5px] text-xs bg-[#0050ef] text-white items-center cursor-pointer"
            onClick={() => mutation.mutate()}
          >
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
