import React from 'react';
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/Home';
import Region from './components/Region';

export default (
    <Router>
     <div>
      <Route exact path='/' component={Home} />
      <Route path='/:region' component={Region} />
     </div>
    </Router>
);
