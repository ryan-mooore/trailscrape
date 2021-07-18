const StatusBadge = ({ status, left, percentage }) => {
  let state = {};
  let isIcon = false;
  switch (status) {
    case true:
      state = {
        status: "open",
        color: "bg-green-500",
      };
      if (percentage && percentage < 50) {
        state = {
          status: "open",
          color: "bg-yellow-400",
        };
      }
      break;
    case false:
      state = {
        status: "closed",
        color: "bg-red-500",
      };
      break;
    case undefined || null:
      state = {
        status: "error",
        color: "bg-gray-500",
      };
      break;
    default:
      isIcon = true;
      state = {
        status: status,
        color: "bg-gray-500",
      };
  }

  console.log(state.status);

  return (
    <div
      className={`${
        left ? "h-14 pr-5 mb-3 justify-between" : "h-10 w-24 justify-center"
      } flex flex-row items-center text-white font-bold rounded-full ${
        state.color
      } ${isIcon ? "material-icons-round text-md" : "uppercase text-sm"}`}
      title={state.status.toUpperCase()}
    >
      {left && <div className="pl-5 pr-10">{left}</div>}
      {state.status}
    </div>
  );
};

export default StatusBadge;
