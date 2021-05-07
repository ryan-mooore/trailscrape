const Disclaimer = (props) => {
  const arrRepr = (arr) => {
    switch (arr.length) {
      case 1:
        return `${arr[0]}`;
      case 2:
        return `${arr[0]} and ${arr[1]}`;
      case 3:
        return `${arr[0]}, ${arr[1]} and ${arr[2]}`;
      default:
        return "";
    }
  };
  
  const unreliableSources = Object.entries(props.region.includes.trails).filter(
    ([info, val]) => !val
  );

  const unreliableSourcesStr = arrRepr(
    unreliableSources.map(([info, val]) => info)
  );

  return (
    <div>
      <div>
        {"Data sourced from "}
        <a className="underline" href={props.region.url}>
          {props.region.url !== undefined
            ? props.region.url.replace(
                /(^\w+:|^)\/\/(w{3}\.)*([^/]*)\/*.*$/,
                "$3"
              )
            : "loading..."}
        </a>
      </div>
      {unreliableSources.length > 0 ? (
        <>
          <div>
            {`${
              unreliableSourcesStr[0].toUpperCase() +
              unreliableSourcesStr.slice(1)
            } data sourced from `}
            <a
              className="underline"
              href={`https://www.trailforks.com/region/${props.region.trailforksRegionID}`}
            >
              {`${props.region.trailforksRegionID} on Trailforks`}
            </a>
          </div>
          <div>
            NB: Trailforks data provides 3rd party trail information and is
            subject to inaccuracy
          </div>
        </>
      ) : undefined}
    </div>
  );
};

export default Disclaimer;
