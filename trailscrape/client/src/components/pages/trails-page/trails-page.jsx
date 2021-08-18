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
      docTitle={`Trail Status for ${park.park.name} (${
        park.status.status.park ? "OPEN" : "CLOSED"
      })`}
      meta={`Mountain bike park trail status for all trails at ${
        park.park.name
      }. Status for trails ${park.status.status.trails
        .map((trail) => trail.name)
        .join(", ")}.`}
      title={
        <Title
          title="Trails"
          subtitle={`at ${park.park.name || "Loading..."}`}
          right={
            <div className="relative top-2 flex flex-row items-center text-gray-500 font-bold text-3xl align-text-bottom h-10 overflow-hidden">
              <img
                className="mix-blend-hard-light h-auto max-w-full w-12"
                src={`https://openweathermap.org/img/wn/${park.status.weather.conditions.icon}@2x.png`}
                alt={park.status.weather.conditions.description}
              ></img>
              <div className="relative -left-0.5 text-md font-semibold">{`${park.status.weather.temp}˚`}</div>
            </div>
          }
        />
      }
      badge={
        <div className="grid gap-4 self-stretch sm:self-auto mx-5 sm:items-end sm:pt-10">
          {[
            {
              status: park.status.status.park,
              name: "park",
              icon: "park",
            },
            {
              status: park.status.status.lift,
              name: "uplift",
              icon: "moving",
            },
          ].map(
            ({ status, name, icon }) =>
              status !== undefined && (
                <React.Fragment key={name}>
                  <StatusBadge
                    left={
                      <div className="flex flex-row justify-between w-20 items-center text-xl font-normal capitalize">
                        <span className="material-icons-round pr-1">
                          {icon}
                        </span>
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
                </React.Fragment>
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
            .map((trail) => [
              trail.id,
              <TrailCard
                trail={trail}
                canEdit={[
                  "scrapeParkAndGetTrailsFromTrailforks",
                  "copyFromTrailforks",
                  "scrapeGradeAndGetStatusFromTrailforks",
                ].includes(park.park.methods.trails.method)}
              />,
            ])}
        />
      }
    />
  );
};

export default TrailsPage;
