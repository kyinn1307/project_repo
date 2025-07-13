import { MusicianCardItem } from "./MusicianCardItem";

// 뮤지션 api 없음

export const MusicianCardList = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max flex gap-x-6">
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
