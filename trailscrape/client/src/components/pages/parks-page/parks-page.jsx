import React from "react";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import List from "../../shared/list";
import Page from "../../shared/page";
import Title from "../../shared/title";
import ParkCard from "./park-card";

const ParksPage = ({ bike }) => {
  const params = useParams();
  const region = bike.bike[params.region];

  return (
    <Page
      docTitle={`Trail Status for Parks in ${region.name} (${
        Object.values(region.parks).filter((park) => park.status.status.park)
          .length
      } OPEN)`}
      meta={`Park status for mountain bike parks in the ${
        region.name
      } area. Trail status for ${Object.values(region.parks)
        .map((park) => park.park.name)
        .join(", ")}.`}
      title={<Title title="Parks" subtitle={`in ${region.name}`} />}
      list={
        <List
          cols={2}
          disclaimer={
            <div className="mt-1 mb-2">
              Last updated{" "}
              <ReactTimeAgo
                date={Date.parse(
                  Object.values(region.parks).sort(
                    (a, b) => a.status.scrapeTime - b.status.scrapeTime
                  )[0].status.scrapeTime
                )}
                locale="en-NZ"
              />
            </div>
          }
          elements={Object.entries(region.parks)
            .sort()
            .filter(([parkID, park]) => !park.status.scrapeError)
            .map(([parkID, park]) => [
              parkID,
              <ParkCard
                status={park.status.status}
                park={park.park}
                link={`/${params.activity}/${params.region}/${parkID}`}
              />,
            ])}
        />
      }
    />
  );
};

export default ParksPage;
