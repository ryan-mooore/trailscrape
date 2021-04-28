const StatusBadge = (props) => {
  let state = {};
  switch (props.open) {
    case true:
      state = {
        status: "open",
        color: "green",
      };
      break;
    case false:
      state = {
        status: "closed",
        color: "red",
      };
      break;
    default:
      state = {
        status: "error",
        color: "gray",
      };
  }
  return (
    <div
      className={`flex flex-row w-24 justify-center items-center text-white text-sm font-bold rounded-full h-10 uppercase p-2 pl-4 pr-4 bg-${state.color}-500`}
    >
      {state.status}
    </div>
  );
};

export default StatusBadge;
