import { BrowserRouter as Router, Route } from 'react-router-dom';
import RegionsPage from './components/pages/regions-page/regions-page';
import TrailsPage from './components/pages/trails-page/trails-page';

export default (
    <Router>
     <div>
      <Route exact path='/' component={RegionsPage} />
      <Route path='/:region' component={TrailsPage} />
     </div>
    </Router>
);
