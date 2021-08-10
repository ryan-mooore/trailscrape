import { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Analytics from "react-router-ga";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import GHMark from "./assets/gh-mark.svg";
import TwitterMark from "./assets/twitter-mark.svg";
import HomePage from "./components/pages/home-page/home-page";
import NoMatchPage from "./components/pages/no-match-page/no-match-page";
import ParksPage from "./components/pages/parks-page/parks-page";
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
  <footer className="absolute bottom-0 h-10 w-full bg-gray-500 hidden sm:flex flex-row justify-between items-center pl-5 pr-5 text-gray-400 text-sm">
    <div className="w-56">&copy; Copyright Ryan Moore, {new Date().getFullYear()}</div>
    <div className="flex flex-row">
      <a href="https://github.com/ryan-mooore/trailscrape" rel="noreferrer" title="Link to source code (Github)" target="_blank">
        <img
          src={GHMark}
          alt="link to GitHub repository"
          height="25"
          width="25"
        ></img>
      </a>
      <a href="https://buymeacoffee.com/ryanmooore" rel="noreferrer" className="underline px-4 text-lg font-bold text-gray-400">Donate!</a>
      <a href="https://twitter.com/ryan_mooore" rel="noreferrer" title="Link to my Twitter" target="_blank">
        <img
          src={TwitterMark}
          alt="link to my Twitter"
          height="28"
          width="28"
        ></img>
      </a>
    </div>
    <div className="w-56 text-right">
      <a href="https://facebook.com/ryan.moooore" rel="noreferrer" className="underline" target="_blank">
        Contact
      </a>
    </div>
  </footer>
);

const Routes = () => {
  const [bike, setBike] = useState();
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
                render={() => <HomePage />}
              >
              </Route>
              <Route
                path="/:activity/:region/:park/"
                render={() => <TrailsPage bike={bike} />}
              />
              <Route
                exact
                path="/:activity/:region"
                render={() => <ParksPage bike={bike} />}
              />
              <Route 
                path="/:activity"
                render={() => <RegionsPage bike={bike} />}
              />
              <Route
                path="*"
                render={() => <NoMatchPage bike={bike} />}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <Footer />
    </div>
  );

  useEffect(() => {
    let apiEndpoint = "/api/bike";
    if (process.env.NODE_ENV === "development") {
      apiEndpoint = "http://localhost:9000/api/bike";
    }

    const callApi = () => {
      fetch(apiEndpoint)
        .then(res => res.json())
        .then(json => {
          setBike(json);
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
