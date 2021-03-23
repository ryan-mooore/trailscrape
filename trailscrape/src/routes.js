import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/home-page';
import RegionPage from './components/region-page';

export default (
    <Router>
     <div>
      <Route exact path='/' component={HomePage} />
      <Route path='/:region' component={RegionPage} />
     </div>
    </Router>
);
