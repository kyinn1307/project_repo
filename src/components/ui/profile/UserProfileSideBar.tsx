import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { YoutubeIcon } from "@/assets/Icons/profile-sidebar/YoutubeIcon";
import junseo from "@/assets/Images/junseo_lee.png";
import { EmailIcon } from "@/assets/Icons/profile-sidebar/EmailIcon";
import { MusicIcon } from "@/assets/Icons/MusicIcon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../button";

import { getUserProfile } from "@/apis/user";
import { getFollowerList } from "@/apis/follower";
import { getFollowingList } from "@/apis/follower";
import type { Profile } from "@/types/my-profile";
import type { Follower } from "@/types/follower";

export function UserProfileSidebar() {
  const { id } = useParams<{ id: string }>();

  const userId = Number(id);

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<"follower" | "following" | null>(
    null
  );
  const [info, setInfo] = useState<Profile | null>(null);
  const [profileImageLoaded, setProfileImageLoaded] = useState(false);

  const [followerList, setFollowerList] = useState<Follower[]>([]);
  const [followingList, setFollowingList] = useState<Follower[]>([]);
  // 마이 프로필 정보 조회
  const handleUserProfile = async () => {
    if (userId === null) {
      console.log("userId가 없습니다.");
      return;
    }

    try {
      const res = await getUserProfile(userId);
      console.log(res.data);
      setInfo(res.data.data);
    } catch (err) {
      console.log("조회 실패.", err);
    }
  };

  useEffect(() => {
    handleUserProfile();
  }, []);

  const fetchFollowList = async (type: "follower" | "following") => {
    if (!userId) return;

    try {
      const res =
        type === "follower"
          ? await getFollowerList(userId)
          : await getFollowingList(userId);
      console.log("팔로우 데이터:", res.data.data); // ✅ 여기에 콘솔 출력

      const list = res.data.data.map((user: Follower) => ({
        userId: user.userId,
        nickname: user.nickname,
        profileImageUrl: user.profileImageUrl ?? junseo, // 기본 이미지 대체
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
    fetchFollowList(type); // 모달 열 때 API 호출
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
    setModalType(null);
    setOpen(false);
  };

  return (
    <>
      <Card className="w-[300px] rounded-[15px] bg-[#111] text-white border-none ">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="relative w-[75px] h-[75px] rounded-full overflow-hidden mb-[30px] bg-[#222222]">
            {/* 서버 이미지 조건부 렌더 */}
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
            <span className="text-[15px] font-bold">{info?.nickname}</span>
            {/* 팔로우 메시지 버튼 or 팔로우 버튼 */}
            <div className="flex flex-row gap-[7.5px]">
              {info?.relationship === 1 && (
                <>
                  <Button className="flex items-center w-15 h-[22.5px] bg-[#0050EF] text-white text-xs rounded-[3.75px] cursor-pointer">
                    팔로우
                  </Button>
                  <Button className="flex items-center w-15 h-[22.5px] bg-[#555555] text-white text-xs rounded-[3.75px] cursor-pointer">
                    메시지
                  </Button>
                </>
              )}

              {info?.relationship === 2 && (
                <>
                  <Button className="flex items-center w-15 h-[22.5px] bg-[#0050EF] text-white text-xs rounded-[3.75px] cursor-pointer">
                    언팔로우
                  </Button>
                  <Button className="flex items-center w-15 h-[22.5px] bg-[#555555] text-white text-xs rounded-[3.75px] cursor-pointer">
                    메시지
                  </Button>
                </>
              )}

              {info?.relationship === 3 && (
                <>
                  <Button className="flex items-center w-15 h-[22.5px] bg-[#0050EF] text-white text-xs rounded-[3.75px] cursor-pointer">
                    맞팔로우
                  </Button>
                  <Button className="flex items-center w-15 h-[22.5px] bg-[#555555] text-white text-xs rounded-[3.75px] cursor-pointer">
                    메시지
                  </Button>
                </>
              )}

              {info?.relationship === 4 && (
                <>
                  <Button className="flex items-center w-15 h-[22.5px] bg-[#0050EF] text-white text-xs rounded-[3.75px] cursor-pointer">
                    언팔로우
                  </Button>
                  <Button className="flex items-center w-15 h-[22.5px] bg-[#555555] text-white text-xs rounded-[3.75px] cursor-pointer">
                    메시지
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-[4.5px] text-[9px] text-gray-400 mb-4">
            {/* field 다 띄워줘야하나? */}
            <div className="flex flex-row gap-[7.5px] text-[#ffffff]">
              <span>ⓘ</span>
              {info?.fields?.join(", ")}
            </div>
            {/* genre 영어로 바꾸기 */}
            <div className="flex flex-row items-center h-[11px] text-[#ffffff] gap-[7.5px]">
              <MusicIcon />
              hiphop, kpop
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
          if (!o) handleCloseModal();
        }}
      >
        <DialogContent className="flex flex-col max-w-[540px] max-h-[363px] border-none bg-[#222222] text-white p-[11.25px] gap-0 overflow-hidden">
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
                  <button className="h-[17.5px] px-[7.25px] text-[10.5px] bg-[#333333] rounded-full cursor-pointer">
                    삭제
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
