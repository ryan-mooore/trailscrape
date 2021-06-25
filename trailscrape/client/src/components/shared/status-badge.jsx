import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StatusBadge = ({ open, left, percentage }) => {
  let state = {};
  switch (open) {
    case true:
      state = {
        status: "open",
        color: "bg-green-500",
      };
      if (percentage && percentage < 50) {
        state = {
          status: "open",
          color: "bg-yellow-400"
        }
      }
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
      <div className={"h-14 pr-5 mb-3 justify-between " + badgeUI} title={percentage && open ? Math.floor(percentage) + "% " + state.status.toUpperCase() : state.status.toUpperCase()}>
        {open && percentage && <div className="h-8 w-8 ml-3 mr-3">
          <CircularProgressbar value={percentage} strokeWidth={20} counterClockwise={true} styles={buildStyles({
            strokeLinecap: "butt",
            pathColor: "#ffffff",
            trailColor: "rgba(0, 0, 0, 0)"
          })} /></div>}
        <div className="pl-5 pr-10">{left}</div>
        <div>{state.status}</div>

      </div>
    );
  }

  return <div className={`pl-3 pr-3 h-10 w-24 ${open && percentage ? "justify-between" : "justify-center"} ` + badgeUI} title={percentage && open ? percentage + "% " + state.status.toUpperCase() : state.status.toUpperCase()}>
    {open && percentage && <div className="h-4 w-4">
      <CircularProgressbar value={percentage} strokeWidth={25} counterClockwise={true} styles={buildStyles({
        strokeLinecap: "butt",
        pathColor: "#ffffff",
        trailColor: "rgba(0, 0, 0, 0)"
      })} />
    </div>}
    <div className={open && percentage ? "mr-1" : undefined}>
      {state.status}
    </div>
  </div >
};

export default StatusBadge;
