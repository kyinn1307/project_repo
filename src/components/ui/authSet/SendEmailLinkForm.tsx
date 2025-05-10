import { Button } from "../button";

interface Props {
  email: string;
  onConfirm: () => void;
}

export const SendEmailLinkForm = ({ email, onConfirm }: Props) => {
  return (
    <>
      <div className="text-white text-xl font-bold">이메일 발송 완료</div>
      <div className="text-[#777777] text-base font-medium">
        비밀번호 재설정을 위한 링크를
        <br />
        <span className="text-white">{email}</span>
        <span>으로 전송하였습니다.</span>
      </div>
      <Button
        className="mt-[10px] w-[350px] h-10 bg-[#0050ef] text-white text-xl font-normal cursor-pointer"
        onClick={onConfirm}
      >
        확인
      </Button>
    </>
  );
};
