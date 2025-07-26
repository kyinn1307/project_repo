import { ArrowRight } from "lucide-react";

export const ContentSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="w-full mt-[30px]">
      <div className="w-full px-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button className="cursor-pointer">
            <ArrowRight size={24} />
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
};
