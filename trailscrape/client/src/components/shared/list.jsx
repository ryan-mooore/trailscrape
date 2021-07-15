const List = ({ disclaimer, elements, cols }) => {
  return (
    <div className="pl-5 pr-5 flex flex-col max-w-md sm:max-w-screen-md m-auto items-stretch pb-12">
      {disclaimer ? (
        <div className="pl-10 pr-10 text-gray-400 text-xs italic">
          {disclaimer}
        </div>
      ) : undefined}
      <div className={`grid md:grid-cols-${cols} gap-0`}>{elements}</div>
    </div>
  );
};

export default List;
