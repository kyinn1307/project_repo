export const ContentSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="w-full mt-[21.75px]">
      <div className="w-full px-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
};
