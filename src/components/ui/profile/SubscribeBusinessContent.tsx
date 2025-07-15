import { useState } from "react";
import { EmptyBusinessContent } from "./EmptyBusinessContent";
import { BusinessList } from "./BusinessList";

export const SubscribeBusinessContent = () => {
  const [isContentEmpty] = useState(false);
  return (
    <div className="flex flex-col pt-[14.5px] gap-[30px]">
      {isContentEmpty ? (
        <EmptyBusinessContent />
      ) : (
        <>
          <EmptyBusinessContent />
          <BusinessList />
        </>
      )}
    </div>
  );
};
