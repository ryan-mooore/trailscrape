import StatusInfo from "../../shared/status-info";
import Card from "../../shared/card";

const RegionCard = ({ region, status }) => {
  let stat = {};
  if (region.hasUplifts) {
    stat.uplift = status.liftIsOpen;
  }
  stat.park = status.parkIsOpen;

  if (status.scrapeError) {
    return (
      <Card
        left={
          <h1 className="text-lg text-gray-400 pt-2 xs:pb-4 sm:p-0">
            {`Sorry, status for ${region.name} not currently available.`}
          </h1>
        }
        right={<StatusInfo status={{ park: null }} />}
      />
    );
  } else {
    return (
      <Card
        link={"/" + region.ID}
        left={
          <h1 className="text-lg text-gray-400 pt-2 xs:pb-4 sm:p-0">
            {region.name}
          </h1>
        }
        tooltip={`Trails at ${region.name}`}
        right={<StatusInfo status={stat} />}
      />
    );
  }
};

export default RegionCard;
