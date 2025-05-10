export const ContentSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="w-full mt-[60px]">
      <div className="max-w-[1290px]">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
};
