import Card from "../../shared/card";
import StatusInfo from "../../shared/status-info";
import Summary from "../../shared/summary";

const ParkCard = ({ park, status, link }) => {
  let stat = {};
  if (park.methodInfo.hasUplifts) {
    stat.uplift = status.liftIsOpen;
  }
  stat.park = status.parkIsOpen;
  const percentage =
    status.trails.filter((trail) => trail.isOpen).length / status.trails.length;

  if (status.scrapeError) {
    return (
      <Card
        content={
          <>
            <h1 className="text-lg text-gray-400  pt-2 xs:pb-4 sm:p-0">
              {`Sorry, status for ${park.name} not currently available.`}
            </h1>
            <StatusInfo status={{ park: null }} />
          </>
        }
      />
    );
  } else {
    return (
      <Card
        link={link}
        left={
          <div className="flex flex-col">
            <div>
              <Summary
                name={park.name}
                open={status.trails.filter((trail) => trail.isOpen).length}
                total={status.trails.length}
                objects="trails"
              />
            </div>
          </div>
        }
        tooltip={`Trails at ${park.name}`}
        right={
          <StatusInfo
            status={stat}
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
