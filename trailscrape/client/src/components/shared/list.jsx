const List = ({ disclaimer, elements }) => {
  return (
    <div className="flex flex-col max-w-md sm:max-w-screen-md m-auto items-stretch pb-12">
      {disclaimer ? (
        <div className="pl-10 pr-10 text-gray-400 text-xs italic">
          {disclaimer}
        </div>
      ) : undefined}
      {elements}
    </div>
  );
};

export default List;