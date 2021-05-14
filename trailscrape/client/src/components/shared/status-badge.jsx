const StatusBadge = ({ open, left }) => {
  let state = {};
  switch (open) {
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

  const badgeUI = `flex flex-row items-center text-white text-sm font-bold rounded-full uppercase ${state.color}`;

  if (left) {
    return (
      <div className={"h-14 pr-5 mb-3 justify-between " + badgeUI}>
        <div className="pl-5 pr-10">{left}</div>
        <div>{state.status}</div>
        
      </div>
    );
  }
  
  return <div className={"h-10 w-24 justify-center " + badgeUI}>{state.status}</div>;
};

export default StatusBadge;
