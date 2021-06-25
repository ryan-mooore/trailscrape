const Title = ({ title, subtitle }) => {
  return (
    <div className="pt-6 sm:pt-16 lg:pt-6 pl-3 sm:pl-0 ml-6 sm:pb-5 text-gray-500">
      <div className="flex flex-col items-start">
        <h1 className="font-bold tracking-tight text-5xl sm:text-7xl text-gray-500 p-4 pt-0 pl-0 z-100">
          {title}
        </h1>
        {subtitle && <h2 className="text-xs sm:text-lg self-end pr-5 relative -top-5 italic text-gray-500">{subtitle}</h2>}
      </div>
    </div>
  );
};

export default Title;
