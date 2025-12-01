import { Business } from "@/types/business";
import { StarterBusiness } from "./StarterBusinessItem";
import { GrowthBusiness } from "./GrowthBusiness";
import { ProBusiness } from "./ProBusiness";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBusiness } from "@/apis/business";
import { getMyProfile } from "@/apis/my-profile";
import { Profile } from "@/types/my-profile";

export const BusinessList = ({
  list,
  isOtherUser,
  userId,
}: {
  list: Business[];
  isOtherUser?: boolean;
  userId: number | null;
}) => {
  const [info, setInfo] = useState<Profile | null>(null);

  // 마이 프로필 정보 조회
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

  const byGrade = (grade: "Starter" | "Growth" | "Pro") =>
    list.find((b) => b.grade?.toLowerCase() === grade.toLowerCase());

  const starter = byGrade("Starter");
  const growth = byGrade("Growth");
  const pro = byGrade("Pro");

  const queryClient = useQueryClient();

  const deleteMut = useMutation({
    mutationFn: (id: number) => deleteBusiness(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["myBusiness"] });
      await queryClient.invalidateQueries({ queryKey: ["businessList"] }); // 있으면 같이
    },
  });

  const handleDelete = (id: number) => {
    if (!window.confirm("이 비즈니스를 삭제하시겠어요?")) return;
    deleteMut.mutate(id);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-[15px]">
        <StarterBusiness
          isOtherUser={isOtherUser}
          isEmpty={!starter}
          business={starter}
          onDelete={handleDelete}
          profileImageUrl={info?.profileImageUrl ?? undefined}
        />
        <GrowthBusiness
          isOtherUser={isOtherUser}
          isEmpty={!growth}
          business={growth}
          onDelete={handleDelete}
          profileImageUrl={info?.profileImageUrl ?? undefined}
        />
      </div>
      <ProBusiness
        isOtherUser={isOtherUser}
        isEmpty={!pro}
        business={pro}
        onDelete={handleDelete}
        profileImageUrl={info?.profileImageUrl ?? undefined}
      />
    </div>
  );
};
