import StatusInfo from "../../shared/status-info";
import Card from "../../shared/card";

const RegionCard = (props) => {
  let stat = {};
  if (props.region.includes.park.liftStatus) {
    stat.uplift = props.status.liftIsOpen;
  }
  stat.park = props.status.parkIsOpen;

  if (props.status.scrapeError) {
    return (
      <Card
        left={
          <h1 className="text-lg text-gray-400 pt-2 xs:pb-4 sm:p-0">
            {`Sorry, status for ${props.region.name} not currently available.`}
          </h1>
        }
        right={<StatusInfo status={{ park: null }} />}
      />
    );
  } else {
    return (
      <Card
        link={"/" + props.region.ID}
        left={
          <h1 className="text-lg text-gray-400 pt-2 xs:pb-4 sm:p-0">
            {props.region.name}
          </h1>
        }
        right={<StatusInfo status={stat} />}
      />
    );
  }
};

export default RegionCard;
