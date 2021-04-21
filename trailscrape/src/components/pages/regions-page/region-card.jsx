import StatusInfo from "../../shared/status-info";
import Card from "../../shared/card";

const RegionCard = (props) => {
  const status = props.json;
  let stat = {};
  if (status["liftIsOpen"] !== undefined) {
    stat["lift"] = status["liftIsOpen"];
  }
  stat["park"] = status["parkIsOpen"];

  if (Object.entries(status).length === 0) {
    return (
      <>
        {"region information for " + status["name"]
          ? status["name"]
          : "Unknown Park not currently available"}
      </>
    );
  } else {
    return (
      <Card
        link={{
          pathname: "/" + status["name"],
          state: status,
        }}
        left={
          <h1 className="text-lg text-gray-400 pt-2 pb-4 sm:p-0">
            {status["name"]}
          </h1>
        }
        right={<StatusInfo status={stat} />}
      />
    );
  }
};

export default RegionCard;
