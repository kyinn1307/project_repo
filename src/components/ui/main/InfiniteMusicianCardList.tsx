import { MusicianCardItem } from "./MusicianCardItem";

export const InfiniteMusicianCardList = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-[15px]">
        <MusicianCardItem />
        <MusicianCardItem />
        <MusicianCardItem />
        <MusicianCardItem />
        <MusicianCardItem />
        <MusicianCardItem />
        <MusicianCardItem />
      </div>
    </div>
  );
};
