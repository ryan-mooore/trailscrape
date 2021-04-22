import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import Title from "../../shared/title";
import List from "../../shared/list";
import TrailCard from "./trail-card";

const TrailList = (props) => {
  const [trails, setTrails] = useState(<h1>Loading...</h1>);

  useEffect(() => {
    setTrails(
      <List
        elements={props.status.trails.map((trail) => (
          <TrailCard key="" region={props.region} trail={trail} />
        ))}
      />
    );
  }, []);

  return trails;
};

export default class TrailsPage extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <div className="absolute flex flex-row items-center text-gray-500 pl-4 pt-4">
            <div className="material-icons-round text-3xl">arrow_back_ios</div>
            <div className="flex flex-row  items-center">
              <div className="invisible sm:visible">back</div>
            </div>
          </div>
        </Link>
        <Title
          title="Trails"
          offset="-0.5"
          subtitle={`at ${this.props.location.state.region.name}`}
          icon="map"
        />
        <TrailList region={this.props.location.state.region} status={this.props.location.state.status} />
      </div>
    );
  }
}
