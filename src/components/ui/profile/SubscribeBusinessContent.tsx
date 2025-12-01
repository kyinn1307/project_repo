import { BusinessList } from "./BusinessList";
import { Business } from "@/types/business";
import { BusinessTipBox } from "./BusinessTipBox";

interface BusinessListProps {
  list: Business[];
  isOtherUser?: boolean;
  userId: number;
}

export const SubscribeBusinessContent = ({
  list,
  isOtherUser,
  userId,
}: BusinessListProps) => {
  return (
    <>
      {isOtherUser ? (
        <div className="flex flex-col gap-[15px]">
          <BusinessTipBox isOtherUser={isOtherUser} />
          <BusinessList list={list} isOtherUser={isOtherUser} userId={userId} />
        </div>
      ) : (
        <div className="flex flex-col pt-[7px] gap-[30px]">
          <BusinessTipBox isOtherUser={false} />
          <BusinessList list={list} userId={userId} />
        </div>
      )}
    </>
  );
};
