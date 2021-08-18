import Card from "../../shared/card";
import CardTitle from "../../shared/card-title";
import StatusBadge from "../../shared/status-badge";
import Summary from "../../shared/summary";

const ParkCard = ({ park, status, link }) => {
  const percentage =
    status.trails.filter((trail) => trail.isOpen).length / status.trails.length;

  return (
    <Card
      large={status.lift !== undefined && status.park !== undefined}
      tooltip={`Trails at ${park.name}`}
      link={link}
      left={
        <div className="flex flex-col">
          {status.scrapeError ? (
            <CardTitle
              name={`Sorry, status for ${park.name} not currently available.`}
            />
          ) : (
            <div>
              <Summary
                name={park.name}
                open={status.trails.filter((trail) => trail.isOpen).length}
                total={status.trails.length}
                objects="trails"
              />
            </div>
          )}
        </div>
      }
      right={
        <div className="flex flex-col xs:flex-row items-end xs:items-center">
          <div className="pt-3 xs:pt-0 flex flex-col xs:flex-row md:flex-col-reverse items-end xs:items-center justify-around md:items-end text-gray-400">
            {status.lift !== undefined && (
              <>
                <div className="flex flex-row justify-right items-center xs:mr-5 md:mr-0 pb-2 xs:pb-0">
                  <div className="pr-3">uplift</div>
                  <div>
                    <StatusBadge status={status.lift} />
                  </div>
                </div>
                <div className="hidden md:block h-0.5 bg-gray-200 w-12 mr-6 my-3.5"></div>
              </>
            )}
            <div className="flex flex-row items-center">
              <div className="px-3">park</div>
              <div>
                <StatusBadge
                  status={status.park}
                  percentage={percentage && percentage}
                />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default ParkCard;
