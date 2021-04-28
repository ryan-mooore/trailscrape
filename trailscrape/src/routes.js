import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    CSSTransition, TransitionGroup
} from "react-transition-group";
import NoMatchPage from './components/pages/no-match-page/no-match-page';
import RegionsPage from './components/pages/regions-page/regions-page';
import TrailsPage from './components/pages/trails-page/trails-page';
import GHMark from './assets/gh-mark.svg';

const App = () => (
    <Router>
        <Routes />
    </Router>
)

const Footer = () => (
    <footer class="absolute bottom-0 h-10 w-full bg-gray-500 hidden sm:flex flex-row justify-between items-center pl-5 pr-5 text-gray-400 text-sm">
        <div>&copy; Copyright Ryan Moore, {new Date().getFullYear()}</div>
        <div><a href="https://github.com/ryan-mooore/trailscrape"><img src={GHMark} alt="link to GitHub repository" height="25" width="25" class="fill-current"></img></a></div>
        <div><a href="https://forms.gle/dngABSxNa2et5fpD6" class="underline">Suggest a park to be added</a></div>
    </footer>
)

const Routes = () => {

    return (
        <div className="relative min-h-screen">
            <div className="pb-10">
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