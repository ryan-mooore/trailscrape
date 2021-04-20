const List = (props) => {
  return (<div className="flex flex-col max-w-md sm:max-w-screen-md m-auto gap-4 items-stretch pb-14">
      {props.elements}
  </div>)
}

export default List;