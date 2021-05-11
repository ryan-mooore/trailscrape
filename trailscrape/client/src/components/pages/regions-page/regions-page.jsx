import React, { useEffect } from "react";
import List from "../../shared/list";
import Title from "../../shared/title";
import RegionCard from "./region-card";
import ReactTimeAgo from "react-time-ago";

const RegionsPage = (props) => {
  useEffect(() => (document.title = "Regions | NZ Trail Status"));
  return (
    <div>
      <Title title="Regions" icon="landscape" offset="1.5" />
      <List
        disclaimer={
          <div>
            Last updated{" "}
            <ReactTimeAgo
              date={
                props.regions.sort(
                  (a, b) => a.status.scrapeTime - b.status.scrapeTime
                )[0].status.scrapeTime
              }
              locale="en-NZ"
            />
          </div>
        }
        elements={props.regions
          .sort((a, b) => a.region.name.localeCompare(b.region.name))
          .filter((region) => !region.status.scrapeError)
          .map((region) => (
            <RegionCard
              key={region.region.ID}
              status={region.status}
              region={region.region}
            />
          ))}
      />
    </div>
  );
};

export default RegionsPage;
