import Card from "../../shared/card";
import List from "../../shared/list";
import Page from "../../shared/page";
import Title from "../../shared/title";

const RegionsPage = ({ bike }) => {
  return (
    <Page
      title={<Title title="Regions" />}
      docTitle="Regions"
      list={
        <List
          elements={Object.entries(bike.bike).map(([regionID, region]) => (
            <Card
              left={
                <h1 className="pl-4 text-lg text-gray-400">{region.name}</h1>
              }
              link={"/bike/" + regionID}
              right={<div></div>}
            />
          ))}
        />
      }
    />
  );
};

export default RegionsPage;
