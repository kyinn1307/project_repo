import sample from "@/assets/Images/sample-musician.png";
import { useUserStore } from "@/stores/useUserStore";
import { Musician } from "@/types/musician";
import { useNavigate } from "react-router-dom";

interface MusicianCardItemProps {
  musician: Musician;
}

export const MusicianCardItem = ({ musician }: MusicianCardItemProps) => {
  const { userId } = useUserStore();
  const navigate = useNavigate();

  const handleClick = () => {
    if (userId && userId === musician.id) {
      navigate("/my-profile/track");
    } else {
      navigate(`/user-profile/${musician.id}`);
    }
  };

  return (
    <div
      className="relative w-full aspect-square rounded-[15px] border cursor-pointer"
      style={{ border: "0.75px solid #333333" }}
      onClick={handleClick}
    >
      {/* 배경 이미지 */}
      <img
        src={musician.profileImageUrl || sample}
        alt="프로필"
        className="absolute inset-0 w-full h-full rounded-[15px] object-cover"
      />

      {/* 블렌드 그라디언트 */}
      <div
        className="absolute inset-0 rounded-[15px]"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #000000 79.89%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* 콘텐츠 */}
      <div className="absolute flex flex-col bottom-[10.75px] left-[11.25px] gap-[3.75px]">
        <div className="h-[19px] flex items-center text-[15px] font-bold">
          {musician.nickname}
        </div>
        <div className="flex flex-col gap-[7.5px] font-medium text-[10.5px]">
          <span className="h-[13px] flex item-center">
            장르_{(musician.genres ?? []).join(", ")}
          </span>
          <span className="h-[13px] flex item-center">
            분야_{(musician.fields ?? []).join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
};
