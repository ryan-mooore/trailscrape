import StatusBadge from "./status-badge";

const StatusInfo = ({ status, percentage }) => {
  return (
    <div className="flex flex-col xs:flex-row items-end xs:items-center">
      <div className="pt-3 xs:pt-0 pl-6 flex flex-row items-center text-gray-400">
        <div className="pr-3">
          {status.parkIsOpen
            ? `${status.trails.filter((trail) => trail.isOpen).length} / ${
                status.trails.length
              } trails`
            : "park"}
        </div>
        <div>
          <StatusBadge
            open={status.parkIsOpen}
            percentage={percentage ? percentage * 100 : false}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusInfo;
