export const ContentSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="flex-1 mt-14 min-w-[1080px] max-w-[1490px] pr-[8.3%]">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
      <div className="flex flex-col mt-[30px] gap-[30px]">{children}</div>
    </section>
  );
};
