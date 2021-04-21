import GradeLogo from "./grade-icon";
import Card from "../../shared/card";
import StatusInfo from "../../shared/status-info";

const TrailCard = (props) => {
  const json = props.json;
  const name = json.name;
  const grade = json.grade;
  const isOpen = json.isOpen;

  return (
    <Card
      left={
        <div className="flex flex-row items-center gap-5 pt-2 pb-4 sm:p-0">
          <GradeLogo grade={grade} size="20" />
          <h1 className="text-lg text-gray-400">{name}</h1>
        </div>
      }
      right={
        <StatusInfo
          status={{
            "": isOpen
          }}
        />
      }
    />
  );
};

export default TrailCard;
