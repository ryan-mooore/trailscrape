const List = ({ disclaimer, elements, cols }) => {
  let gridCols;
  console.log(cols);
  switch (cols) {
    case 1:
      gridCols = "grid-cols-1";
      break;
    case 2:
      gridCols = "grid-cols-2";
      break;
    case 3:
      gridCols = "grid-cols-3";
      break;
    default:
      gridCols = "grid-cols-1";
  }

  return (
    <div className="pl-5 pr-5 flex flex-col max-w-md sm:max-w-screen-lg m-auto items-stretch sm:pb-12">
      {disclaimer ? (
        <div className="pl-10 pr-10 text-gray-400 text-xs italic mb-2">
          {disclaimer}
        </div>
      ) : undefined}
      <div className={`grid md:${gridCols} gap-3`}>{elements}</div>
    </div>
  );
};

export default List;
