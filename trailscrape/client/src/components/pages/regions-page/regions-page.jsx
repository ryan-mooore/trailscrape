import React from "react";
import List from "../../shared/list";
import Title from "../../shared/title";
import RegionCard from "./region-card";

const RegionsPage = (props) => (
  <div>
    <Title title="Regions" icon="landscape" offset="1.5" />
    <List
      elements={props.regions
        .sort()
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

export default RegionsPage;
