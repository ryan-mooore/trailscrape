const Title = (props) => {
  return (
    <div className="self-start sm:self-auto pt-6 sm:pt-16 lg:pt-6 pl-3 sm:pl-0 flex flex-row justify-center ml-10 sm:pb-5 text-gray-500">
    <div className="flex flex-col items-start">
      <div className="flex flex-row items-center sm:items-start">
        <div className={`material-icons-round transform ${props.offset < 0 ? '-' : ''}translate-y-${Math.abs(props.offset)} text-5xl pr-2 sm:text-8xl text-gray-500`}>
          {props.icon}
        </div>
        <h1 className="font-bold tracking-tight text-5xl sm:text-7xl text-gray-500 p-4 pt-0 pl-0 z-100">
          {props.title}
        </h1>
      </div>
      {props.subtitle && <h2 className="text-xs sm:text-lg self-end pr-5 relative -top-5 italic text-gray-500">{props.subtitle}</h2>}
    </div>
    </div>
  );
};

export default Title;
