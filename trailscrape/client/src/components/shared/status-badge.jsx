const StatusBadge = ({ status, left, percentage, color }) => {
  let state = {};
  let isIcon = false;
  switch (status) {
    case true:
      state = {
        status: "open",
        color: "green",
      };
      if (percentage && percentage * 100 < 50) {
        state = {
          status: "open",
          color: "yellow",
        };
      }
      break;
    case false:
      state = {
        status: "closed",
        color: "red",
      };
      break;
    case undefined:
    case null:
      state = {
        status: "error",
        color: "gray",
      };
      break;
    case "on hold":
      state = {
        status: "on hold",
        color: "yellow",
      };
      break;
    default:
      isIcon = true;
      state = {
        status: status,
        color: "gray",
      };
  }

  return (
    <div
      className={`${
        left ? "h-14 pr-5 justify-between" : "h-10 w-24 justify-center"
      } flex flex-row items-center text-white font-bold rounded-full ${
        color ? color : "bg-" + state.color + "-500"
      }`}
      title={state.status.toUpperCase()}
    >
      {left && <div className="pl-5 pr-10">{left}</div>}
      <div
        className={
          isIcon ? "material-icons-round text-md" : "uppercase text-sm"
        }
      >
        {state.status}
      </div>
    </div>
  );
};

export default StatusBadge;
