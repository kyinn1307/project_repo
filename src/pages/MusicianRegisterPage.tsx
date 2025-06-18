import SetaLogo from "@/assets/SetaLogo";

export const MusicianRegisterPage = () => {
  return (
    <div
      className="flex w-[810px] h-[555px] text-white mx-auto items-center justify-center"
      style={{
        background: `linear-gradient(306.33deg, rgba(0, 230, 106, 0) 74.5%, rgba(0, 230, 106, 0.2) 97.13%), 
                       linear-gradient(208.16deg, rgba(255, 77, 77, 0.2) 21.28%, rgba(0, 0, 0, 0) 82.57%), 
                       linear-gradient(132.15deg, rgba(0, 80, 239, 0.5) -9.86%, #000000 53.66%)`,
      }}
    >
      <div className="w-[419px] flex flex-col items-center">
        <div className="w-[50.43px] h-[45px]">
          <SetaLogo />
        </div>
        <span>음악으로 연결되는 모든 순간을 SETA에서.</span>
        <span>
          프로젝트 매칭, 협업 제안, 구인/구직까지. 음악인의 네트워킹 플랫폼,
          지금 시작하세요.
        </span>
      </div>
    </div>
  );
};
