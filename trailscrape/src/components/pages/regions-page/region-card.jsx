import StatusInfo from "../../shared/status-info";
import Card from "../../shared/card";

const RegionCard = (props) => {
  let stat = {};
  if (props.region.includes.park.liftStatus) {
    stat.lift = props.status.liftIsOpen;
  }
  stat.park = props.status.parkIsOpen;

  if (props.status.scrapeError) {
    return (
      <Card
        left={
          <h1 className="text-lg text-gray-400 pt-2 pb-4 sm:p-0">
            {`Sorry, status for ${props.region.name} not currently available.`}
          </h1>
        }
        right={<StatusInfo status={{ park: null }} />}
      />
    );
  } else {
    return (
      <Card
        link={{
          pathname: "/" + props.region.ID,
          state: {
            region: props.region,
            status: props.status,
            regions: props.regions,
          },
        }}
        left={
          <h1 className="text-lg text-gray-400 pt-2 pb-4 sm:p-0">
            {props.region.name}
          </h1>
        }
        right={<StatusInfo status={stat} />}
      />
    );
  }
};

export default RegionCard;
