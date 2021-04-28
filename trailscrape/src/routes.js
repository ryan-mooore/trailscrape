import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import NoMatchPage from './components/pages/no-match-page/no-match-page';
import RegionsPage from './components/pages/regions-page/regions-page';
import TrailsPage from './components/pages/trails-page/trails-page';

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