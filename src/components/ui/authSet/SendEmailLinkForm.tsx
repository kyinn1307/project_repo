import { Button } from "../button";

interface Props {
  email: string;
  onConfirm: () => void;
}

export const SendEmailLinkForm = ({ email, onConfirm }: Props) => {
  return (
    <>
      <div className="text-white text-[15px] font-medium">이메일 발송 완료</div>
      <div className="text-[#777777] text-xs font-medium mt-[3px]">
        비밀번호 재설정을 위한 링크를
        <br />
        <span className="text-white text-xs mt-[3px]">{email}</span>
        <span className="text-xs text-[#777777] mt-[3px]">
          으로 전송하였습니다.
        </span>
      </div>
      <Button
        className="mt-[7.5px] w-full h-[30px] bg-[#0050ef] text-white text-[15px] rounded-[3.75px] cursor-pointer"
        onClick={onConfirm}
      >
        확인
      </Button>
    </>
  );
};
