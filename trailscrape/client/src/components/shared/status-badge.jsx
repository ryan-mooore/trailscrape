const StatusBadge = (props) => {
  let state = {};
  switch (props.open) {
    case true:
      state = {
        status: "open",
        color: "bg-green-500",
      };
      break;
    case false:
      state = {
        status: "closed",
        color: "bg-red-500",
      };
      break;
    default:
      state = {
        status: "error",
        color: "bg-gray-500",
      };
  }
  return (
    <div
      className={`flex flex-row w-24 justify-center items-center text-white text-sm font-bold rounded-full h-10 uppercase p-2 pl-4 pr-4 ${state.color}`}
    >
      {state.status}
    </div>
  );
};

export default StatusBadge;
