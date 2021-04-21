import StatusBadge from "./status-badge";

const StatusInfo = (props) => {
  return (
    <div className="flex flex-row gap-6">
      {Object.entries(props.status).map(([k, v]) => (
        <div key={k} className="flex flex-row gap-3 items-center text-gray-400">
          <div className="invisible xs:visible">{k}</div>
          <div className={k === "lift" ? "invisible xs:visible" : undefined}>
            <StatusBadge open={v} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusInfo;
