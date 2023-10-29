const SectionTitle = ({
  title,
  center,
}: {
  title: string;
  center?: boolean;
}) => {
  return (
    <>
      <h2
        className={`py-4 text-3xl ${
          center && "text-center"
        } font-bold text-gray-800 md:text-5xl`}
      >
        {title}
      </h2>
    </>
  );
};

export default SectionTitle;
