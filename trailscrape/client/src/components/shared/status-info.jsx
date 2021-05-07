import StatusBadge from "./status-badge";

const StatusInfo = (props) => {
  return (
    <div className="flex flex-col xs:flex-row items-end xs:items-center">
      {Object.entries(props.status).map(([k, v]) => (
        <div key={k} className="pt-3 xs:pt-0 pl-6 flex flex-row items-center text-gray-400">
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
