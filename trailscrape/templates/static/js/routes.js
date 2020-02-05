import React from 'react';
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/Home';

export default (
    <Router>
     <div>
      <Route exact path='/' component={Home} />
     </div>
    </Router>
);
