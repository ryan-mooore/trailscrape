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
      docTitle={`${region.name} (${
        Object.values(region.parks).map((park) => park.status.parkIsOpen).length
      } OPEN)`}
      title={<Title title="Parks" subtitle={`in ${region.name}`} />}
      list={
        <List
          disclaimer={
            <>
              <div>Click any region to see trail status</div>
              <div>
                Last updated{" "}
                <ReactTimeAgo
                  date={
                    Object.values(region.parks).sort(
                      (a, b) => a.status.scrapeTime - b.status.scrapeTime
                    )[0].status.scrapeTime
                  }
                  locale="en-NZ"
                />
              </div>
            </>
          }
          elements={Object.entries(region.parks)
            .sort()
            .filter(([parkID, park]) => !park.status.scrapeError)
            .map(([parkID, park]) => (
              <ParkCard
                key={parkID}
                status={park.status}
                park={park.park}
                link={`/${params.activity}/${params.region}/${parkID}`}
              />
            ))}
        />
      }
    />
  );
};

export default ParksPage;
