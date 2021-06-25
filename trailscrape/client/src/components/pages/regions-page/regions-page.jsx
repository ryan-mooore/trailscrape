import React, { useEffect } from "react";
import List from "../../shared/list";
import Title from "../../shared/title";
import RegionCard from "./region-card";
import ReactTimeAgo from "react-time-ago";

const RegionsPage = ({ regions }) => {
  useEffect(() => (document.title = "Regions | NZ Trail Status"));
  return (
    <div>
      <div className="mx-auto max-w-md sm:max-w-screen-md flex flex-col sm:flex-row justify-between items-start">
        <Title title="Regions" />
      </div>
      <List
        disclaimer={<>
          <div>Click any region to see trail status</div>
          <div>
            Last updated{" "}
            <ReactTimeAgo
              date={
                regions.sort(
                  (a, b) => a.status.scrapeTime - b.status.scrapeTime
                )[0].status.scrapeTime
              }
              locale="en-NZ"
            />
          </div>
        </>
        }
        elements={regions
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
