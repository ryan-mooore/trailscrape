import StatusBadge from "./status-badge";

const StatusInfo = (props) => {
  return (
    <div className="flex flex-col items-end sm:items-center xs:flex-row">
      {Object.entries(props.status).map(([k, v]) => (
        <div key={k} className="pl-6 flex pt-3 sm:pt-0 flex-row items-center text-gray-400">
          <div className="pr-3">{k}</div>
          <div>
            <StatusBadge open={v} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusInfo;
