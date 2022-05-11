import Card from "../../shared/card";
import List from "../../shared/list";
import Page from "../../shared/page";
import Title from "../../shared/title";
import Summary from "../../shared/summary";
import StatusBadge from "../../shared/status-badge";

const RegionsPage = ({ bike }) => {
  return (
    <Page
      title={<Title title="Regions" />}
      docTitle="Regions"
      meta={`Bike park status for parks in the New Zealand area. Current trail status and information for parks in all regions: ${Object.values(
        bike.bike
      )
        .map((region) => region.name)
        .join(", ")}.`}
      list={
        <List
          cols={2}
          elements={Object.entries(bike.bike).map(([regionID, region]) => [
            regionID,
            <Card
              left={
                <Summary
                  name={region.name}
                  open={
                    Object.values(region.parks).filter(
                      (park) => park.status.status?.park
                    ).length
                  }
                  total={Object.values(region.parks).length}
                  objects="regions"
                />
              }
              link={"/bike/" + regionID}
              right={<StatusBadge status="place" />}
            />,
          ])}
        />
      }
    />
  );
};

export default RegionsPage;
