import React, { Component, useEffect, useState } from "react";
import RegionCard from "./region-card";
import Title from "../../shared/title";
import List from "../../shared/list";
import Message from "../../shared/message";

const RegionList = () => {
  const [regions, setRegions] = useState(
    <Message text="Loading..." invisible />
  );

  useEffect(() => {
    fetch("http://localhost:9000/trails")
      .then((res) => res.json())
      .then(
        (regions) => {
          setRegions(
            <List
              elements={regions.regions.map((region) => (
                <RegionCard key={region.region.ID} status={region.status} region={region.region}/>
              ))}
            />
          );
        },
        (error) => {
          console.log(error);
          setRegions(<Message text="Sorry, the API is currently down."/>);
        }
      );
  }, []);

  return regions;
};

export default class RegionsPage extends Component {
  render() {
    return (
      <div>
        <Title title="Regions" icon="landscape" offset="1.5" />
        <RegionList key="list" />
      </div>
    );
  }
}
