import { useState } from "react";
import { EmptyBusinessContent } from "./EmptyBusinessContent";
import { BusinessList } from "./BusinessList";

export const SubscribeBusinessContent = () => {
  const [isContentEmpty] = useState(false);
  return (
    <div>{isContentEmpty ? <EmptyBusinessContent /> : <BusinessList />}</div>
  );
};
