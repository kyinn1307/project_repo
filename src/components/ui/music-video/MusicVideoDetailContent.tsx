import credit1 from "@/assets/Images/credit.png";
import credit2 from "@/assets/Images/credit2.png";
import credit3 from "@/assets/Images/credit3.png";
interface MusicVideoDetailContentProps {
  tab: "LYRICS" | "COMMENT" | "CREDIT";
}

const creditUsers = [
  { name: "User1", image: credit1 },
  { name: "User2", image: credit2 },
  { name: "User3", image: credit3 },
  { name: "User4", image: credit1 },
  { name: "User5", image: credit2 },
  { name: "User6", image: credit3 },
  { name: "User7", image: credit1 },
  { name: "User8", image: credit2 },
  { name: "User9", image: credit3 },
  { name: "User10", image: credit3 },
];

export const MusicVideoDetailContent = ({
  tab,
}: MusicVideoDetailContentProps) => {
  const renderContent = () => {
    switch (tab) {
      case "LYRICS":
        return (
          <p className="max-w-[300px] text-[13.5px] font-medium break-words">
            Yeah,yeah,ah Cut my hair and bump my head and fell on top And run on
            sins and Front on friends If we don’t win, then pay your tuthes and
            mend your fence And we alright, the Kaio Kens and big old rims
            Yeah,yeah,ah Cut my hair and bump my head and fell on top And run on
            sins and Front on friends If we don’t win, then pay your tuthes and
            mend your fence And we alright, the Kaio Kens and big old rimspay
            your tuthes and mend your fe Yeah,yeah,ah Cut my hair and bump my
            head and fell on top And run on sins and Front on friends If we
            don’t win, then pay your tuthes and mend your fence And we alright,
            the Kaio Kens and big old rims Yeah,yeah,ah Cut my hair and bump my
            head and fell on top And run on sins and Front on friends If we
            don’t win, then pay your tuthes and mend your fence And we alright,
            the Kaio Kens and big old rimspay your tuthes and mend your fe
            Yeah,yeah,ah Cut my hair and bump my head and fell on top And run on
            sins and Front on friends If we don’t win, then pay your tuthes and
            mend your fence And we alright, the Kaio Kens and big old rims
            Yeah,yeah,ah Cut my hair and bump my head and fell on top And run on
            sins and Front on friends If we don’t win, then pay your tuthes and
            mend your fence And we alright, the Kaio Kens and big old rimspay
            your tuthes and mend your fe
          </p>
        );
      case "COMMENT":
        return (
          <div className="h-130 flex flex-col text-white text-sm px-2 justify-center">
            <p>사용자 코멘트 1</p>
            <p>사용자 코멘트 2</p>
            <p>사용자 코멘트 3</p>
          </div>
        );
      case "CREDIT":
        return (
          <div className="grid grid-cols-3 gap-2">
            {creditUsers.map((user, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-[60px] h-[60px] rounded-full object-cover"
                />
                <span className="mt-1 text-[13px] text-white font-medium">
                  {user.name}
                </span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center px-[50px] mt-[50.5px] text-center text-white leading-relaxed overflow-y-auto max-h-[600px] lyrics-scrollbar">
      {renderContent()}
    </div>
  );
};
