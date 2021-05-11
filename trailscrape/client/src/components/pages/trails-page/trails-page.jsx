import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../shared/back-button";
import List from "../../shared/list";
import Message from "../../shared/message";
import Title from "../../shared/title";
import NoMatchPage from "../no-match-page/no-match-page";
import Disclaimer from "./disclaimer";
import TrailCard from "./trail-card";

const TrailsPage = (props) => {
  const [region, setRegion] = useState(null);
  const params = useParams();

  useEffect(() => {
    setRegion(
      props.regions.filter((region) => region.region.ID === params.region)[0]
    );
    document.title = `${region.region.name} (${
      region.status.parkIsOpen ? "OPEN" : "CLOSED"
    }) | NZ Trail Status`;
  }, [props.regions, params.region, region.region.name, region.status.parkIsOpen]);

  const TrailList = (
    <div>
      <BackButton />
      <Title
        title="Trails"
        offset="-0.5"
        subtitle={`at ${region?.region?.name}`}
        icon="map"
      />
      <List
        disclaimer={
          <Disclaimer region={region?.region} status={region?.status} />
        }
        elements={region?.status?.trails
          .filter((trail) => trail.grade)
          .sort((a, b) => a.grade - b.grade || a.name.localeCompare(b.name))
          .map((trail) => (
            <TrailCard
              key={trail.id}
              trail={trail}
              isReliable={region.region.includes.trails.status}
            />
          ))}
      />
    </div>
  );

  switch (region) {
    case null:
      return <Message text="Loading..." />;
    case undefined:
      return <NoMatchPage page={params.region} />;
    default:
      return TrailList;
  }
};

export default TrailsPage;
