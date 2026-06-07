import { Button } from "../shadcn/button";

interface Props {
  email: string;
  onConfirm: () => void;
}

export const SendEmailLinkForm = ({ email, onConfirm }: Props) => {
  return (
    <>
      <div className="text-white text-xl font-medium">이메일 발송 완료</div>
      <div className="text-[#777777] text-base font-medium mt-1">
        비밀번호 재설정을 위한 링크를
        <br />
        <span className="text-white text-base mt-1">{email}</span>
        <span className="text-base text-[#777777] mt-1">
          으로 전송하였습니다.
        </span>
      </div>
      <Button
        className="mt-[10px] w-full h-10 bg-[#0050ef] text-white text-xl font-normal rounded-[5px] cursor-pointer"
        onClick={onConfirm}
      >
        확인
      </Button>
    </>
  );
};
