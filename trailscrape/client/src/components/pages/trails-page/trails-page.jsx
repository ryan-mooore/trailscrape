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
        <Title
          title="Trails"
          subtitle={`at ${park.park.name || "Loading..."}`}
          icon=""
        />
      }
      badge={
        <div className="flex flex-col self-stretch mx-5 sm:items-end sm:pt-10">
          {[
            {
              status: park.status.parkIsOpen,
              name: "park",
              icon: "park",
            },
            {
              status: park.status.liftIsOpen,
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
                  open={status}
                  percentage={
                    name === "park"
                      ? (park.status.trails.filter((trail) => trail.isOpen)
                          .length /
                          park.status.trails.length) *
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
          disclaimer={<Disclaimer park={park.park} status={park.status} />}
          parkStatus={{
            park: park.status.parkIsOpen,
            lift: park.status.liftIsOpen,
          }}
          elements={park.status.trails
            .filter((trail) => trail.grade)
            .sort((a, b) => a.grade - b.grade || a.name.localeCompare(b.name))
            .map((trail) => (
              <TrailCard
                key={trail.id}
                trail={trail}
                canEdit={
                  park.park.methodInfo in
                  ["scrapeParkAndGetTrailsFromTrailforks", "copyFromTrailforks"]
                }
              />
            ))}
        />
      }
    />
  );
};

export default TrailsPage;
