import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ProfileEditModal } from "./ProfileEditModal";
import { YoutubeIcon } from "@/assets/Icons/profile-sidebar/YoutubeIcon";
import sample from "@/assets/Images/sample-musician.png";
import { EmailIcon } from "@/assets/Icons/profile-sidebar/EmailIcon";
import { MusicIcon } from "@/assets/Icons/MusicIcon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getMyProfile } from "@/apis/my-profile";
import type { Profile } from "@/types/my-profile";
import { useUserStore } from "@/stores/useUserStore";
import { getFollowerList, getFollowingList } from "@/apis/follower";
import type { Follower } from "@/types/follower";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollowUser } from "@/apis/user";
import { X } from "lucide-react";

export function ProfileSideBar() {
  const userId = useUserStore.getState().userId;
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<"follower" | "following" | null>(
    null
  );
  const [info, setInfo] = useState<Profile | null>(null);
  const [profileImageLoaded, setProfileImageLoaded] = useState(false);

  const [followerList, setFollowerList] = useState<Follower[]>([]);
  const [followingList, setFollowingList] = useState<Follower[]>([]);

  const handleMyProfile = async () => {
    if (userId === null) {
      console.log("userId가 없습니다.");
      return;
    }

    try {
      const res = await getMyProfile(userId);
      console.log(res.data);
      setInfo(res.data.data);
    } catch (err) {
      console.log("조회 실패.", err);
    }
  };

  useEffect(() => {
    handleMyProfile();
  }, []);

  const fetchFollowList = async (type: "follower" | "following") => {
    if (!userId) return;

    try {
      const res =
        type === "follower"
          ? await getFollowerList(userId)
          : await getFollowingList(userId);

      const list = res.data.data.map((user: Follower) => ({
        userId: user.userId,
        nickname: user.nickname,
        profileImageUrl: user.profileImageUrl ?? sample, // 기본 이미지
      }));

      if (type === "follower") setFollowerList(list);
      else setFollowingList(list);
    } catch (err) {
      console.error("팔로우 리스트 조회 실패:", err);
    }
  };

  const currentList = modalType === "follower" ? followerList : followingList;

  const handleOpenModal = (type: "follower" | "following") => {
    setModalType(type);
    setOpen(true);
    fetchFollowList(type);
  };

  const getCountValue = (item: string): number => {
    if (!info) return 0;

    switch (item) {
      case "팔로워":
        return info.followerCount;
      case "팔로잉":
        return info.followingCount;
      case "음원":
        return info.trackCount;
      case "게시물":
        return info.feedCount;
      default:
        return 0;
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const refetchFollowRelated = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["userProfile", userId] }),
      queryClient.invalidateQueries({ queryKey: ["followers", userId] }),
      queryClient.invalidateQueries({ queryKey: ["followings", userId] }),
    ]);
    if (modalType) {
      if (modalType === "follower") fetchFollowList("follower");
      else fetchFollowList("following");
    }
  };

  // 팔로잉 목록에서 언팔로우 api
  const { mutate: unfollowMutate } = useMutation({
    mutationFn: (targetUserId: number) => unfollowUser(targetUserId),
    onSuccess: async () => {
      await refetchFollowRelated();
      await handleMyProfile(); // tanstack query로 refetch 로직 개선 필요
    },
  });

  return (
    <>
      <Card className="min-w-[300px] rounded-[15px] bg-[#111] text-white border-none ">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="relative w-[75px] h-[75px] rounded-full overflow-hidden mb-[30px] bg-[#222222]">
            {info?.profileImageUrl && (
              <img
                src={info.profileImageUrl}
                alt="유저 프로필"
                onLoad={() => setProfileImageLoaded(true)}
                onError={() => setProfileImageLoaded(false)}
                className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 ${
                  profileImageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>

          <div className="flex w-full justify-between items-center mb-5">
            <span className="text-xl font-bold">{info?.nickname}</span>
            {/* 마이 프로필 수정 버튼 */}
            <ProfileEditModal info={info} />
          </div>

          <div className="w-full flex flex-col gap-[4.5px] text-[9px] text-gray-400 mb-4">
            {/* field 다 띄워줘야하나 */}
            <div className="flex flex-row gap-[7.5px] text-[#ffffff]">
              <span>ⓘ</span>
              {info?.fields.join(", ")}
            </div>
            {/* genre 영어로 바꾸기 */}
            <div className="flex flex-row items-center h-[11px] text-[#ffffff] gap-[7.5px]">
              <MusicIcon />
              {info?.genres.join(", ")}
            </div>
            <div className="flex flex-row gap-[7.5px] h-[11px] items-center">
              <EmailIcon />
              <a
                href="mailto:makit@makit.com"
                className="text-[#0050EF] underline"
              >
                {info?.email}
              </a>
            </div>
          </div>

          <div className="w-full flex flex-col gap-[15px]">
            <div className="text-[10.5px] text-[#555555]">정보</div>
            <div className="flex flex-col gap-[7.5px] text-[#777777] mb-[22.5px]">
              {["팔로워", "팔로잉", "음원", "게시물"].map((item) => (
                <div key={item} className="flex flex-row justify-between">
                  <div
                    className={`text-[10.5px] ${
                      item === "팔로워" || item === "팔로잉"
                        ? "cursor-pointer underline"
                        : ""
                    }`}
                    onClick={() => {
                      if (item === "팔로워") handleOpenModal("follower");
                      if (item === "팔로잉") handleOpenModal("following");
                    }}
                  >
                    {item}
                  </div>
                  <div className="text-[10.5px]">{getCountValue(item)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mb-4 text-[10.5px]">
            <span className="text-[#555555]">링크</span>
            <div className="flex flex-col gap-[7.5px] mt-[15px]">
              <div className="flex flex-row items-center gap-2 text-[#777777]">
                <YoutubeIcon />
                <span className="cursor-pointer">YouTube</span>
              </div>
            </div>
          </div>

          <div className="w-full text-[10.5px]">
            <span className="text-[#555555]">소개</span>
            <div className="flex flex-col gap-[22.5px]">
              <p className="text-[9px] text-[#777777] mt-[15px]">
                {info?.introduction
                  ? info.introduction
                  : "아직 소개글이 없어요"}
              </p>
              <div className="text-[#0050EF] mt-1 cursor-pointer">더보기</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 팔로잉 팔로워 리스트 모달 */}
      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
        }}
      >
        <DialogContent className="flex flex-col max-w-[540px] max-h-[363px] border-none bg-[#222222] text-white p-[11.25px] gap-0 overflow-hidden">
          <DialogClose asChild>
            <button
              onClick={handleCloseModal}
              className="absolute right-[12px] top-[12px] text-white hover:text-gray-300 cursor-pointer"
            >
              <X size={18} />
            </button>
          </DialogClose>
          <DialogHeader className="mb-[7.5px]">
            <DialogTitle className="text-[10.5px] font-medium">
              {modalType === "follower" ? "팔로워" : "팔로잉"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-[7.5px] overflow-y-auto max-h-[275px] pr-[2px]">
            {currentList.length === 0 ? (
              <p className="text-sm text-white text-center my-10">
                아직 목록이 없습니다.
              </p>
            ) : (
              currentList.map((user) => (
                <div
                  key={user.userId}
                  className="w-full h-[37.5px] flex flex-row justify-between items-center rounded-md hover:bg-[#333333] transition-colors"
                >
                  <div className="flex flex-row items-center gap-[15px]">
                    <img
                      src={user.profileImageUrl}
                      alt={user.nickname}
                      className="w-[37.5px] h-[37.5px] rounded-full object-cover"
                    />
                    <span className="text-[10.5px] font-medium">
                      {user.nickname}
                    </span>
                  </div>
                  <button
                    className="h-[17.5px] px-[7.25px] text-[10.5px] bg-[#333333] rounded-full cursor-pointer"
                    onClick={() => {
                      if (modalType === "following") {
                        unfollowMutate(user.userId);
                      }
                    }}
                  >
                    {modalType === "follower" ? "삭제" : "취소"}
                  </button>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
