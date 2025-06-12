import { FeedItem } from "@/components/ui/profile/FeedItem";

export const FeedPage = () => {
  return (
    <div className="flex flex-col pl-[25%] pt-[30px] gap-[13.5px]">
      <section className="w-135 text-white">
        <FeedItem />
      </section>
      <section className="w-135 text-white">
        <FeedItem />
      </section>
      <section className="w-135 text-white">
        <FeedItem />
      </section>
      <section className="w-135 text-white">
        <FeedItem />
      </section>
    </div>
  );
};
