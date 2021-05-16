import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Analytics from "react-router-ga";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import GHMark from "./assets/gh-mark.svg";
import TwitterMark from "./assets/twitter-mark.svg";
import NoMatchPage from "./components/pages/no-match-page/no-match-page";
import RegionsPage from "./components/pages/regions-page/regions-page";
import TrailsPage from "./components/pages/trails-page/trails-page";
import Message from "./components/shared/message";
import "./index.css";

const App = () => (
  <Router>
    <Analytics id="UA-159417101-1" {...(process.env.NODE_ENV === "development" ? { debug: true } : undefined)}>
      <Routes />
    </Analytics>
  </Router>
);

const Footer = () => (
<>
  <footer className="absolute bottom-0 h-10 w-full bg-gray-500 flex flex-row justify-between items-center pl-5 pr-5 text-gray-400 text-sm">
    <div className="hidden sm:block">&copy; Copyright Ryan Moore, {new Date().getFullYear()}</div>
    <div className="hidden sm:block">
      <a href="https://forms.gle/dngABSxNa2et5fpD6" className="underline" target="_blank">
        Suggest a park to be added
      </a>
    </div>
  </footer>
  <div className="absolute bottom-0 h-10 w-full flex flex-row justify-center items-center">
    <a href="https://github.com/ryan-mooore/trailscrape" title="Link to source code (Github)" target="_blank">
      <img
        src={GHMark}
        alt="link to GitHub repository"
        height="25"
        width="25"
      ></img>
    </a>
    <a href="https://buymeacoffee.com/ryanmooore" className="underline px-4 text-lg font-bold text-gray-400">Donate!</a>
    <a href="https://twitter.com/ryan_mooore" title="Link to my Twitter" target="_blank">
      <img
        src={TwitterMark}
        alt="link to my Twitter"
        height="28"
        width="28"
      ></img>
    </a>
  </div>
</>
);

const Routes = () => {
  const [regions, setRegions] = useState();
  const [apiDown, setApiDown] = useState(null);

  const router = (
    <div className="text-blue-50 relative min-h-screen">
      <div className="pb-10">
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={500}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <RegionsPage {...regions} />}
              />
              <Route
                path="/:region"
                render={() => <TrailsPage {...regions} />}
              />
              <Route
                path="*"
                render={() => <NoMatchPage {...regions} />}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <Footer />
    </div>
  );

  useEffect(() => {
    let apiEndpoint = "/api";
    if (process.env.NODE_ENV === "development") {
      apiEndpoint = "http://localhost:9000/api";
    }

    const callApi = () => {
      fetch(apiEndpoint)
        .then(res => res.json())
        .then(json => {
          setRegions(json);
          setApiDown(false);
        })
        .catch((error) => {
          setApiDown(true);
          throw error;
        });
      setTimeout(callApi, 600000)
    };

    callApi();

  }, []);

  switch (apiDown) {
    case true:
      return <Message text="Sorry, the API is currently down." />;
    case null:
      return <Message text="Loading..." />;
    case false:
      return router;
    default:
      return <Message text="An unknown error occured!" />;
  }
};
export default App;
