import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegionsPage from './components/pages/regions-page/regions-page';
import TrailsPage from './components/pages/trails-page/trails-page';
import NoMatchPage from './components/pages/no-match-page/no-match-page';
import { AnimatedSwitch } from 'react-router-transition';

const Routes = () => (
        <Router>
            <AnimatedSwitch
                atEnter={{ opacity: 0.5 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className="switch-wrapper"
            >
                <Route exact path='/' component={RegionsPage} />
                <Route path='/:region' component={TrailsPage} />
                <Route path='*' component={NoMatchPage} />
            </AnimatedSwitch>

        </Router>
    )

export default Routes;