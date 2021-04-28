const List = (props) => {
  return (
    <div className="flex flex-col max-w-md sm:max-w-screen-md m-auto items-stretch pb-12">
      {props.disclaimer ? (
        <div className="pl-10 pr-10 text-gray-400 text-xs italic">
          {props.disclaimer}
        </div>
      ) : undefined}
      {props.elements}
    </div>
  );
};

export default List;