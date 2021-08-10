import { Link } from "react-router-dom";
import List from "../../shared/list";
import Page from "../../shared/page";
import StatusBadge from "../../shared/status-badge";
import Title from "../../shared/title";

const HomePage = () => {
  return (
    <Page
      noBack
      docTitle="Activities"
      title={<Title title="Activities" />}
      list={
        <List
          cols="2"
          elements={
            <>
              <Link to="/bike">
                <StatusBadge
                  left={<div className="w-20">Bike</div>}
                  status="pedal_bike"
                />
              </Link>
              <StatusBadge
                left={
                  <div className="flex flex-row">
                    <div className="w-20">Ski</div>
                    <div className="font-normal">(coming soon)</div>
                  </div>
                }
                status="downhill_skiing"
                color="bg-gray-300"
              />
            </>
          }
        />
      }
    />
  );
};

export default HomePage;
