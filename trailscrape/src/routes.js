import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import NoMatchPage from './components/pages/no-match-page/no-match-page';
import RegionsPage from './components/pages/regions-page/regions-page';
import TrailsPage from './components/pages/trails-page/trails-page';
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";

const App = () => (
    <Router>
        <Routes />
    </Router>
)


const Routes = () => {

    return (
        <div>
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
    )
}
export default App;