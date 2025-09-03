export const ContentSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="w-full mt-[37.5px]">
      <div className="w-full px-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <div className="flex flex-col mt-[22.5px] gap-[22.5px]">{children}</div>
      </div>
    </section>
  );
};
