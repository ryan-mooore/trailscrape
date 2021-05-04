import React, { useEffect, useState } from "react";
import List from "../../shared/list";
import Message from "../../shared/message";
import Title from "../../shared/title";
import RegionCard from "./region-card";

const RegionList = (props) => {
  const [regions, setRegions] = useState(<Message text="Loading..." />);

  useEffect(() => {
    if (props.regions !== undefined) {
      return setRegions(
        <List
          elements={props.regions.regions
            .filter((region) => !region.status.scrapeError)
            .sort((a, b) => a.region.name.localeCompare(b.region.name))
            .map((region) => (
              <RegionCard
                key={region.region.ID}
                status={region.status}
                region={region.region}
                regions={props.regions}
              />
            ))}
        />
      );
    } else {
      fetch(
        `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:9000/"
            : "/"
        }api`
      )
        .then((res) => res.json())
        .then(
          (regions) => {
            setRegions(
              <List
                elements={regions.regions.map((region) => (
                  <RegionCard
                    key={region.region.ID}
                    status={region.status}
                    region={region.region}
                    regions={regions}
                  />
                ))}
              />
            );
          },
          (error) => {
            setRegions(<Message text="Sorry, the API is currently down." />);
          }
        );
    }
  }, [props.state, props.regions]);

  return regions;
};

const RegionsPage = (props) => {
  return (
    <div>
      <Title title="Regions" icon="landscape" offset="1.5" />
      <RegionList key="list" regions={props.history.location.state?.regions} />
    </div>
  );
};

export default RegionsPage;
