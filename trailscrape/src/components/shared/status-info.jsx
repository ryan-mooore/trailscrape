import StatusBadge from "./status-badge";

const StatusInfo = (props) => {
  return (
    <div className="flex flex-row">
      {Object.entries(props.status).map(([k, v]) => (
        <div key={k} className="pl-6 flex flex-row items-center text-gray-400">
          <div className="invisible xs:visible pr-3">{k}</div>
          <div className={k === "lift" ? "invisible xs:visible" : undefined}>
            <StatusBadge open={v} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusInfo;
