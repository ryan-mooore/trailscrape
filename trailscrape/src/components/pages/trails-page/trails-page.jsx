import React, { useState, useEffect, Component } from "react";
import { Link, useParams } from "react-router-dom";
import Title from "../../shared/title";
import List from "../../shared/list";
import TrailCard from "./trail-card";
import Message from "../../shared/message";

const TrailList = (props) => {
  const [trails, setTrails] = useState(<Message text="Loading..." invisible />);

  useEffect(() => {
    setTrails(
      <List
        disclaimer={props.disclaimer}
        elements={props.status.trails
          .filter((trail) => trail.grade)
          .map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
      />
    );
  }, [props]);

  return trails;
};

const TrailsPage = (props) => {
  const [region, setRegion] = useState({
    name: <div className="underline">Loading...</div>,
    includes: {
      trails: [],
    },
  });
  const [status, setStatus] = useState({trails: []});
  const params = useParams();

  useEffect(() => {
    if (props.location.state === undefined) {
      fetch(`http://localhost:9000/trails/${params.region}`)
        .then((res) => res.json())
        .then((json) => {
          setRegion(json.region);
          setStatus(json.status);
        });
    } else {
      setRegion(props.location.state.region);
      setStatus(props.location.state.status);
    }
  }, []);

  console.log(region, status);

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
  );

  return (
    <div>
      <Link to="/">
        <div className="fixed top-0 left-0 flex flex-row items-center text-gray-500 pl-4 pt-4">
          <div className="material-icons-round text-3xl">arrow_back_ios</div>
          <div className="flex flex-row  items-center">
            <div className="invisible sm:visible">back</div>
          </div>
        </div>
      </Link>
      <Title
        title="Trails"
        offset="-0.5"
        subtitle={`at ${region.name}`}
        icon="map"
      />
      <TrailList
        disclaimer={
          <div>
            <div>
              {"Data sourced from "}
              <a className="underline" href={region.url}>
                {region.url != undefined ? region.url.replace(
                  /(^\w+:|^)\/\/(w{3}\.)*([^/]*)\/*.*$/,
                  "$3"
                ) : "loading..."}
              </a>
            </div>
            {unreliableSources.length > 0 ? (
              <>
                <div>
                  {`${
                    unreliableSourcesStr[0].toUpperCase() +
                    unreliableSourcesStr.slice(1)
                  } data sourced from `}
                  <a
                    className="underline"
                    href={`https://www.trailforks.com/region/${region.trailforksRegionID}`}
                  >
                    {`${region.trailforksRegionID} on Trailforks`}
                  </a>
                </div>
                <div>
                  NB: Trailforks data provides 3rd party trail information and
                  is subject to inaccuracy
                </div>
              </>
            ) : undefined}
          </div>
        }
        status={status}
      />
    </div>
  );
};

export default TrailsPage;
