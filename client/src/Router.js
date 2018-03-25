import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import PropertyManagement from './PropertyManagement';
import About from './About';
import AvailableProperties from './AvailableProperties';
import Contact from './Contact';
import Resources from './Resources';

const Main = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={PropertyManagement} />
        <Route path="/about" component={About} />
        <Route path="/availableProperties" component={AvailableProperties} />
        <Route path="/contact" component={Contact} />
        <Route path="/resources" component={Resources} />
      </Switch>
    </div>
  </Router>
);

export default Main;
