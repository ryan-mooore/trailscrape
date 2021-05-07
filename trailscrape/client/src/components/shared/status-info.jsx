import StatusBadge from "./status-badge";

const StatusInfo = (props) => {
  return (
    <div className="flex flex-col items-end xs:flex-row">
      {Object.entries(props.status).map(([k, v]) => (
        <div key={k} className="pl-6 flex pt-3 flex-row items-center text-gray-400">
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
