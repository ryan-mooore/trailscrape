const Title = ({ title, subtitle, right }) => {
  return (
    <div className="grid grid-cols-2 pt-6 sm:pt-16 xl:pt-6 pl-3 sm:pl-0 ml-6 sm:pb-5 text-gray-500">
      <h1 className="font-bold tracking-tight text-5xl sm:text-7xl text-gray-500 p-4 pt-0 pl-0 z-100 -mb-6 -mr-4">
        {title}
      </h1>
      <div
        className="pl-10 self-end
      "
      >
        {right}
      </div>
      {subtitle && (
        <h2 className="text-xs sm:text-lg place-self-end italic text-gray-500">
          {subtitle}
        </h2>
      )}
    </div>
  );
};

export default Title;
