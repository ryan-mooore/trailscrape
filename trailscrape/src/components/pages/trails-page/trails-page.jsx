import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import Title from "../../shared/title";
import List from "../../shared/list";
import TrailCard from "./trail-card";

const TrailList = (props) => {
  const [trails, setTrails] = useState(
    <div className="invisible">
      <h1>Loading...</h1>
    </div>
  );

  useEffect(() => {
    setTrails(
      <List
        disclaimer={props.disclaimer}
        elements={props.status.trails.map((trail) => (
          <TrailCard key={trail.id} trail={trail} />
        ))}
      />
    );
  }, []);

  return trails;
};

export default class TrailsPage extends Component {
  render() {
    const region = this.props.location.state.region;
    const status = this.props.location.state.status;

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
                  {region.url.replace(
                    /(^\w+:|^)\/\/(w{3}\.)*([^/]*)\/*.*$/,
                    "$3"
                  )}
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
                      href={`https://www.trailforks.com/region/${this.props.location.state.region.trailforksRegionID}`}
                    >
                      {`${this.props.location.state.region.trailforksRegionID} on Trailforks`}
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
          status={this.props.location.state.status}
        />
      </div>
    );
  }
}
