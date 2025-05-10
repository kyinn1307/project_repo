import { MusicItem } from "./MusicItem";

export const MusicList = () => {
  return (
    <div className="flex flex-col mt-5 gap-2">
      <MusicItem />
      <MusicItem />
      <MusicItem />
      <MusicItem />
    </div>
  );
};
