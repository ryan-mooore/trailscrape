const List = ({ disclaimer, elements, cols }) => {
  return (
    <div className="pl-5 pr-5 flex flex-col max-w-md sm:max-w-screen-lg m-auto items-stretch sm:pb-12">
      {disclaimer ? (
        <div className="pl-10 pr-10 text-gray-400 text-xs italic mb-2">
          {disclaimer}
        </div>
      ) : undefined}
      <div className={`grid md:grid-cols-${cols} gap-3`}>{elements}</div>
    </div>
  );
};

export default List;
