import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../shared/back-button";
import List from "../../shared/list";
import Message from "../../shared/message";
import Title from "../../shared/title";
import NoMatchPage from "../no-match-page/no-match-page";
import Disclaimer from "./disclaimer";
import TrailCard from "./trail-card";
import StatusBadge from "../../shared/status-badge";

const TrailsPage = (props) => {
  const [region, setRegion] = useState({
    region: { includes: { trails: true } },
    status: {
      scrapeTime: Date.now(),
      parkIsOpen: null,
      liftIsOpen: null,
      trails: [],
    },
  });
  const params = useParams();

  useEffect(() => {
    setRegion(
      props.regions.filter((region) => region.region.ID === params.region)[0]
    );
    document.title = `${region.region.name} (${
      region.status.parkIsOpen ? "OPEN" : "CLOSED"
    }) | NZ Trail Status`;
  }, [props.regions, params.region, region]);

  switch (region) {
    case null:
      return <Message text="Loading..." />;
    case undefined:
      return <NoMatchPage page={params.region} />;
    default:
      return (
        <div>
          <BackButton />
          <div className="mx-auto max-w-md sm:max-w-screen-md flex flex-col sm:flex-row justify-between items-center">
            <Title
              title="Trails"
              subtitle={`at ${region.region.name}`}
              icon=""
            />
            <div className="flex flex-col self-stretch mx-5 sm:items-end sm:pt-10">
              {[
                {
                  status: region.status.parkIsOpen,
                  name: "park",
                  icon: "park",
                },
                {
                  status: region.status.liftIsOpen,
                  name: "uplift",
                  icon: "moving",
                },
              ].map(
                ({ status, name, icon }) =>
                  status !== undefined && (
                    <StatusBadge
                      left={
                        <div className="flex flex-row justify-between w-20 items-center text-xl font-normal capitalize">
                          <span className="material-icons-round pr-1">
                            {icon}
                          </span>
                          <div>{name}</div>
                        </div>
                      }
                      open={status}
                    />
                  )
              )}
            </div>
          </div>
          <List
            disclaimer={
              <Disclaimer region={region.region} status={region.status} />
            }
            parkStatus={{
              park: region.status.parkIsOpen,
              lift: region.status.liftIsOpen,
            }}
            elements={region.status.trails
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
  }
};

export default TrailsPage;
