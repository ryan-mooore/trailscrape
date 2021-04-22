import GradeLogo from "./grade-icon";
import Card from "../../shared/card";
import StatusInfo from "../../shared/status-info";

const TrailCard = (props) => {
  return (
    <Card
      left={
        <div className="flex flex-row items-center gap-5 pt-2 pb-4 sm:p-0">
          <GradeLogo grade={props.trail.grade} size="20" />
          <h1 className="text-lg text-gray-400">{props.trail.name}</h1>
        </div>
      }
      right={
        <StatusInfo
          status={{
            "": props.trail.isOpen
          }}
        />
      }
    />
  );
};

export default TrailCard;
