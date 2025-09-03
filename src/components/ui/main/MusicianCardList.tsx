import { MainMusicianCardList } from "./MainMusicianCardList";

export const MusicianCardList = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max flex gap-x-6">
        <MainMusicianCardList />
      </div>
    </div>
  );
};
