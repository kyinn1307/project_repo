import { BusinessItem } from "./BusinessItem";

export const BusinessList = () => {
  return (
    <div className="flex flex-row gap-[15px]">
      <BusinessItem />
      <BusinessItem />
    </div>
  );
};
