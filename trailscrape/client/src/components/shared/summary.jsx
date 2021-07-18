import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CardTitle from "../shared/card-title";

const Summary = ({ open, total, objects, name }) => {
  return (
    <div className="flex flex-col justify-center">
      <div>{<CardTitle name={name} />}</div>
      <div className="flex flex-row items-center h-4 sm:h-auto">
        {open ? (
          <>
            <div className="h-3 w-3 mr-2">
              <CircularProgressbar
                value={(open / total) * 100}
                strokeWidth={35}
                counterClockwise={true}
                styles={buildStyles({
                  strokeLinecap: "butt",
                  pathColor: "#9ca3af",
                  trailColor: "rgba(0, 0, 0, 0)",
                })}
              />
            </div>
            <div className="text-gray-400 text-xs">{`${open} / ${total} ${objects} open`}</div>
          </>
        ) : undefined}
      </div>
    </div>
  );
};

export default Summary;
