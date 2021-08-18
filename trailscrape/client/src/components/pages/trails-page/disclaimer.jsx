import { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { sentenceCase } from "sentence-case";

const Disclaimer = ({ park, status }) => {
  const [visible, setVisible] = useState(false);

  const buildLink = (url, text) => {
    if (!text) {
      text = url.replace(/(^\w+:|^)\/\/(w{3}\.)*([^/]*)\/*.*$/, "$3");
    }
    if (url) {
      return (
        <a className="underline" target="_blank" rel="noreferrer" href={url}>
          {text}
        </a>
      );
    } else {
      return <span>{text}</span>;
    }
  };

  let methodMap = {
    copy: {
      disclaimer: true,
      text: (
        <>
          is sourced from {buildLink("https://trailforks.com")} and could be
          incorrect
        </>
      ),
      statuses: [],
    },
    scrape: {
      statuses: [],
    },
    api: {
      text: "is sourced from an external API",
      statuses: [],
    },
    infer: {
      disclaimer: true,
      text: "is inferred and could be incorrect",
      statuses: [],
    },
    "": {
      text: "is from an unknown source",
      statuses: [],
    },
  };

  const sources = (methods) => {
    let sourcesText = [];
    for (let [status, method] of Object.entries(methods)) {
      if (status === "trails") status = "trail";
      for (let [abstractMethod, info] of Object.entries(methodMap)) {
        if (method.method.startsWith(abstractMethod)) {
          if (!info.text) {
            info.text = <>is sourced from {buildLink(method.info.url)}</>;
          }
          info.statuses.push(status);
          break;
        }
      }
    }
    for (let method of Object.values(methodMap)) {
      if (method.statuses.length > 0) {
        sourcesText.push(
          <div className={`sentence ${method.disclaimer && "font-semibold"}`}>
            {sentenceCase(method.statuses.join(" and "))}
            <a href={method.source}> status {method.text}</a>
          </div>
        );
      }
    }

    return sourcesText;
  };

  return (
    <div>
      <div className="flex flex-row items-center mb-1">
        <div className="mr-3">
          Last updated <ReactTimeAgo date={status.scrapeTime} locale="en-NZ" />
        </div>
        <button
          className="material-icons-round"
          onClick={() => setVisible(!visible)}
        >
          info
        </button>
      </div>
      {visible && <div>{sources(park.methods)}</div>}
    </div>
  );
};

export default Disclaimer;
