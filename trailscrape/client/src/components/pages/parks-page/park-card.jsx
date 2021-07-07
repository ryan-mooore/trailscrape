import StatusInfo from "../../shared/status-info";
import Card from "../../shared/card";

const ParkCard = ({ park, status, link }) => {
  if (status.scrapeError) {
    return (
      <Card
        left={
          <h1 className="text-lg text-gray-400 pt-2 xs:pb-4 sm:p-0">
            {`Sorry, status for ${park.name} not currently available.`}
          </h1>
        }
        right={<StatusInfo status={{ park: null }} />}
      />
    );
  } else {
    return (
      <Card
        link={link}
        left={
          <h1 className="text-lg text-gray-400 pt-2 xs:pb-4 sm:p-0">
            {park.name}
          </h1>
        }
        tooltip={`Trails at ${park.name}`}
        right={
          <StatusInfo
            status={status}
            percentage={
              status.trails.filter((trail) => trail.isOpen).length /
              status.trails.length
            }
          />
        }
      />
    );
  }
};

export default ParkCard;
