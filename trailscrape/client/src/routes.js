import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import NoMatchPage from "./components/pages/no-match-page/no-match-page";
import RegionsPage from "./components/pages/regions-page/regions-page";
import TrailsPage from "./components/pages/trails-page/trails-page";
import Message from "./components/shared/message";
import GHMark from "./assets/gh-mark.svg";
import { useEffect, useState } from "react";

const App = () => (
  <Router>
    <Routes />
  </Router>
);

const Footer = () => (
  <footer className="absolute bottom-0 h-10 w-full bg-gray-500 hidden sm:flex flex-row justify-between items-center pl-5 pr-5 text-gray-400 text-sm">
    <div>&copy; Copyright Ryan Moore, {new Date().getFullYear()}</div>
    <div>
      <a href="https://github.com/ryan-mooore/trailscrape">
        <img
          src={GHMark}
          alt="link to GitHub repository"
          height="25"
          width="25"
        ></img>
      </a>
    </div>
    <div>
      <a href="https://forms.gle/dngABSxNa2et5fpD6" className="underline">
        Suggest a park to be added
      </a>
    </div>
  </footer>
);

const Routes = () => {
  const [regions, setRegions] = useState();
  const [apiDown, setApiDown] = useState(null);

<<<<<<< HEAD
  const router = (
    <div className="relative min-h-screen">
      <div className="sm:pb-10">
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

    const callApi = (apiEndpoint) => {
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
      setTimeout(callApi, 3000)
    }; 

    callApi();

  }, []);

  console.log(regions)
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
=======
    return (
        <div className="relative min-h-screen">
            <div className="sm:pb-10">
            <TransitionGroup>
                <CSSTransition
                    classNames="fade"
                    timeout={500}>
                    <Switch  >
                        <Route exact path='/' component={RegionsPage} />
                        <Route path='/:region' component={TrailsPage} />
                        <Route path='*' component={NoMatchPage} />
                    </Switch>
                </CSSTransition>

            </TransitionGroup>
            </div>
            <Footer />
        </div>
    )
}
export default App;
>>>>>>> f4bd79fe2a0b19324079f3217883af5e12558116
