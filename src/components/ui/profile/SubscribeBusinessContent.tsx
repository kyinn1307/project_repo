import { BusinessList } from "./BusinessList";
import { Business } from "@/types/business";
import { BusinessTipBox } from "./BusinessTipBox";

interface BusinessListProps {
  list: Business[];
  isOtherUser?: boolean;
}

export const SubscribeBusinessContent = ({
  list,
  isOtherUser,
}: BusinessListProps) => {
  return (
    <>
      {isOtherUser ? (
        <div className="flex flex-col gap-[15px]">
          <BusinessTipBox isOtherUser={isOtherUser} />
          <BusinessList list={list} isOtherUser={isOtherUser} />
        </div>
      ) : (
        <div className="flex flex-col pt-[7px] gap-[30px]">
          <BusinessTipBox isOtherUser={false} />
          <BusinessList list={list} />
        </div>
      )}
    </>
  );
};
