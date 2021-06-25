import ReactTimeAgo from 'react-time-ago';

const Disclaimer = ({ region, status }) => {

  const unreliableSources = (method) => {
    switch (method) {
      case "copyFromTrailforks":
        return "Park status, trail grade and trail status"
      case "scrapeStatusAndGetGradeFromTrailforks":
        return "Trail grade"
      case "scrapeParkAndGetTrailsFromTrailforks":
        return "Trail grade and trail status"
      default:
        return false
    }
  }

  const source = ({ method, methodInfo }) => {

    const buildLink = (url, text) => {
      if (!text) {
        text = url.replace(
          /(^\w+:|^)\/\/(w{3}\.)*([^/]*)\/*.*$/,
          "$3")
      }
      if (url) {
        return (<a className="underline"
          target="_blank"
          rel="noreferrer"
          href={url}>{text}</a>
        )
      } else {
        return <span>{text}</span>
      }
    }

    switch (method) {
      case "copyFromTrailforks":
        return buildLink("https://trailforks.com", "Trailforks")
      case "scrapeStatusAndGetGradeFromTrailforks":
        return buildLink(methodInfo.url, false)
      case "scrapeParkAndGetTrailsFromTrailforks":
        return buildLink(methodInfo.url, false)
      case "scrapeTrails":
        return buildLink(methodInfo.url, false)
      case "api":
        return buildLink(false, "an external API")
      default:
        break;
    }
  }

  const regionIDSource = (regionID) => {
    if (typeof regionID == "string") regionID = [regionID]
    return <>{
      regionID.map((region) =>
        <a
          className="underline"
          target="_blank"
          rel="noreferrer"
          href={`https://www.trailforks.com/region/${region}`}
        >
          {region}
        </a>
      )
        .reduce((acc, x) => acc === null ? [x] : [acc, ', ', x], null)
    }
    </>
  }

  return (
    <div>
      <div>
        Last updated <ReactTimeAgo date={status.scrapeTime} locale="en-NZ" /> from {source(region)}
      </div>
      {unreliableSources(region.method) &&
        <>
          <div>
            {unreliableSources(region.method)} data sourced from {regionIDSource(region.methodInfo.regionID)} on Trailforks
          </div>
          <div>
            NB: Trailforks data provides 3rd party trail information and is
            subject to inaccuracy
          </div>
        </>
      }
    </div >
  );
};

export default Disclaimer;
