import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="w-[30px] h-[30px]"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
