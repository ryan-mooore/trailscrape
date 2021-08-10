import React from "react";
import { useParams } from "react-router-dom";
import List from "../../shared/list";
import Page from "../../shared/page";
import StatusBadge from "../../shared/status-badge";
import Title from "../../shared/title";
import Disclaimer from "./disclaimer";
import TrailCard from "./trail-card";

const TrailsPage = ({ bike }) => {
  const params = useParams();
  const park = bike.bike[params.region].parks[params.park];

  return (
    <Page
      structure={park}
      docTitle={`${park.park.name} (${
        park.status.parkIsOpen ? "OPEN" : "CLOSED"
      })`}
      title={
        <div className="flex flex-row justify-start items-center">
          <Title
            title="Trails"
            subtitle={`at ${park.park.name || "Loading..."}`}
            right={
              <div className="relative top-2 flex flex-row items-center text-gray-500 font-bold text-3xl align-text-bottom h-10 overflow-hidden">
                <img
                  className="mix-blend-hard-light h-auto max-w-full w-12"
                  src={`http://openweathermap.org/img/wn/${park.status.weather.conditions.icon}@2x.png`}
                ></img>
                <div className="relative -left-0.5 text-md font-semibold">{`${park.status.weather.temp}˚`}</div>
              </div>
            }
          />
        </div>
      }
      badge={
        <div className="flex flex-col self-stretch mx-5 sm:items-end sm:pt-10">
          {[
            {
              status: park.status.status.parkIsOpen,
              name: "park",
              icon: "park",
            },
            {
              status: park.status.status.liftIsOpen,
              name: "uplift",
              icon: "moving",
            },
          ].map(
            ({ status, name, icon }) =>
              status !== undefined && (
                <StatusBadge
                  left={
                    <div className="flex flex-row justify-between w-20 items-center text-xl font-normal capitalize">
                      <span className="material-icons-round pr-1">{icon}</span>
                      <div>{name}</div>
                    </div>
                  }
                  status={status}
                  percentage={
                    name === "park"
                      ? (park.status.status.trails.filter(
                          (trail) => trail.isOpen
                        ).length /
                          park.status.status.trails.length) *
                        100
                      : undefined
                  }
                />
              )
          )}
        </div>
      }
      list={
        <List
          cols={2}
          disclaimer={<Disclaimer park={park.park} status={park.status} />}
          elements={park.status.status.trails
            .filter((trail) => trail.grade)
            .sort((a, b) => a.grade - b.grade || a.name.localeCompare(b.name))
            .map((trail) => (
              <TrailCard
                key={trail.id}
                trail={trail}
                canEdit={[
                  "scrapeParkAndGetTrailsFromTrailforks",
                  "copyFromTrailforks",
                  "scrapeGradeAndGetStatusFromTrailforks",
                ].includes(park.park.method)}
              />
            ))}
        />
      }
    />
  );
};

export default TrailsPage;
