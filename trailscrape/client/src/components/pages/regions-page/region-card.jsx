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
<<<<<<< HEAD
          <h1 className="text-lg text-gray-400 pt-2 xs:pb-4 sm:p-0">
=======
          <h1 className="text-lg text-gray-400 pt-2 pb-2 sm:p-0 ">
>>>>>>> f4bd79fe2a0b19324079f3217883af5e12558116
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
<<<<<<< HEAD
          <h1 className="text-lg text-gray-400 pt-2 xs:pb-4 sm:p-0">
=======
          <h1 className="text-lg text-gray-400 pt-2 pb-2 sm:p-0">
>>>>>>> f4bd79fe2a0b19324079f3217883af5e12558116
            {props.region.name}
          </h1>
        }
        right={<StatusInfo status={stat} />}
      />
    );
  }
};

export default RegionCard;
