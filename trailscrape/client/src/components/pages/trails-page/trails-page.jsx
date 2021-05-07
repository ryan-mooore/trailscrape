import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../shared/back-button";
import List from "../../shared/list";
import Message from "../../shared/message";
import Title from "../../shared/title";
import NoMatchPage from "../no-match-page/no-match-page";
import Disclaimer from "./disclaimer";
import TrailCard from "./trail-card";

<<<<<<< HEAD
=======
const TrailList = (props) => {
  const [trails, setTrails] = useState(<Message text="Loading..." />);

  useEffect(() => {
    setTrails(
      <List
        disclaimer={props.disclaimer}
        elements={props.status.trails
          .sort((a, b) => a.grade - b.grade || a.name.localeCompare(b.name))
          .filter((trail) => trail.grade)
          .map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
      />
    );
  }, [props]);

  return trails;
};

>>>>>>> f4bd79fe2a0b19324079f3217883af5e12558116
const TrailsPage = (props) => {
  const [region, setRegion] = useState(null);
  const params = useParams();

<<<<<<< HEAD
  useEffect(
    () =>
      setRegion(
        props.regions.filter((region) => region.region.ID === params.region)[0]
      ),
    [props.regions, params.region]
=======
  useEffect(() => {
    if (httpStatusCode === undefined) {
      if (props.location.state === undefined) {
        fetch(
          `${
            process.env.NODE_ENV === "development"
              ? "http://localhost:9000/"
              : "/"
          }api/${params.region}`
        )
          .then((res) => {
            setHttpStatusCode(res.status);
            return res.json();
          })
          .then((json) => {
            if (httpStatusCode !== 404) {
              setRegion(json.region);
              setStatus(json.status);
            }
          });
      } else {
        setHttpStatusCode(200);
        setRegion(props.location.state.region);
        setStatus(props.location.state.status);
      }
    }
  }, [httpStatusCode, params, props.location.state]);

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

  const unreliableSources = Object.entries(region.includes.trails).filter(
    ([info, val]) => !val
  );

  const unreliableSourcesStr = arrRepr(
    unreliableSources.map(([info, val]) => info)
>>>>>>> f4bd79fe2a0b19324079f3217883af5e12558116
  );
  
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
        disclaimer={<Disclaimer region={region?.region} />}
        elements={region?.status?.trails
          .filter((trail) => trail.grade)
          .sort((a, b) => a.grade - b.grade || a.name.localeCompare(b.name))
          .map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
      />
    </div>
  );
  
  switch (region) {
    case null:
      return <Message text="Loading..." />
    case undefined:
      return <NoMatchPage page={params.region} />;
    default:
      return TrailList;
  }
};

export default TrailsPage;
