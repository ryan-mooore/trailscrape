import React, { Component, useEffect, useState } from "react";
import RegionCard from "./region-card";
import Title from "../../shared/title";
import List from "../../shared/list";

const RegionList = () => {
  const [regions, setRegions] = useState(
    <div className="invisible">
      <h1>Loading...</h1>
    </div>
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
          setRegions(
            <div className="text-gray-500 text-xl top-0 absolute h-screen w-screen flex flex-row justify-center items-center">
              <h1>Sorry, the API is currently down.</h1>
            </div>
          );
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
