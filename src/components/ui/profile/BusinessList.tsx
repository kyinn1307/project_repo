import { Business } from "@/types/business";
import { StarterBusiness } from "./StarterBusinessItem";
import { GrowthBusiness } from "./GrowthBusiness";
import { ProBusiness } from "./ProBusiness";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBusiness } from "@/apis/business";

export const BusinessList = ({
  list,
  isOtherUser,
}: {
  list: Business[];
  isOtherUser?: boolean;
}) => {
  useEffect(() => {
    console.log(list);
  });
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
        />
        <GrowthBusiness
          isOtherUser={isOtherUser}
          isEmpty={!growth}
          business={growth}
          onDelete={handleDelete}
        />
      </div>
      <ProBusiness
        isOtherUser={isOtherUser}
        isEmpty={!pro}
        business={pro}
        onDelete={handleDelete}
      />
    </div>
  );
};
