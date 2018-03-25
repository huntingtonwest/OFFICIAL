import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PropertyManagement from './views/property-management/PropertyManagement';
import About from './views/about/About';
import AvailableProperties from './views/available-properties/AvailableProperties';
import Contact from './views/contact/Contact';
import Resources from './views/resources/Resources';

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
