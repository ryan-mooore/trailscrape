import StatusBadge from "./status-badge";

const StatusInfo = (props) => {
  return (
    <div className="flex flex-row gap-6">
      {props.liftIsOpen !== undefined && (
        <div className="invisible xs:visible flex flex-row gap-3 items-center text-gray-400">
          <div>lift</div>
          <StatusBadge open={props.liftIsOpen} />
        </div>
      )}
      <div className="flex flex-row gap-3 items-center text-gray-400">
        <div className="invisible xs:visible">{props.parkIsOpen && "park"}</div>
        <StatusBadge open={props.parkIsOpen ? props.parkIsOpen : props.isOpen} />
      </div>
    </div>
  );
};

export default StatusInfo;
