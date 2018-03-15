import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import MyNavbar from './Navbar';
import { Jumbotron, Image , Grid, Row, Col, Tab, Nav, NavItem} from 'react-bootstrap';
import ConsultationForm from './ScheduleForm';
import Banner from './Banner';
import Areas from './Areas';

class PropertyManagement extends Component {
  render() {
    return (
      <div className="App">
        <Banner title="PROPERTY MANAGEMENT" img="http://via.placeholder.com/2450x800"/>
        <div className="under-banner">
        <div className="desc-container">
        <h1 className="title-container">OUR SERVICES</h1>
        <br/>
          <Tab.Container defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="pills" className="nav-tabs">
                <NavItem className="navitem-tab" eventKey="first">Tab 1</NavItem>
                <NavItem className="navitem-tab" eventKey="second">Tab 2</NavItem>
                <NavItem className="navitem-tab" eventKey="third">Tab 3</NavItem>
                <NavItem className="navitem-tab" eventKey="fourth">Tab 4</NavItem>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation className="tab-desc">
                <Tab.Pane eventKey="first">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</Tab.Pane>
                <Tab.Pane eventKey="second">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</Tab.Pane>
                <Tab.Pane eventKey="third">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</Tab.Pane>
                <Tab.Pane eventKey="fourth">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        </div>
        <div className="desc-container grey">
        <h1 className="title-container">AREAS WE SERVE</h1>
        <Grid>
  <Row className="dropdown-row" id="areas">
    <Col xs={12} md={6}>
      <Areas title="CITY"/>
    </Col>
    <Col xs={12} md={6}>
      <Areas title="ASSOCIATION NAME"/>
    </Col>
  </Row>
  </Grid>
        <br/>
        </div>
        <ConsultationForm />
      </div>
      </div>
    );
  }
}

export default PropertyManagement;


// import {
//   BrowserRouter as Router,
//   Link,
//   Route,
//   Switch,
// } from 'react-router-dom';
//
// const Home = () => <h1>Home</h1>;
// const About = () => <h1>About</h1>;
//
// // We give each route either a target `component`, or we can send functions in `render` or `children`
// // that return valid nodes. `children` always returns the given node whether there is a match or not.
// const App = () => (
//   <Router>
//     <div>
//       <Link to="/">Home</Link>
//       <Link to='/about'>About</Link>
//       <Link to="/contact">Contact</Link>
//
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route path="/about" component={About} />
//         <Route
//           path="/contact"
//           render={() => <h1>Contact Us</h1>} />
//         <Route path="/blog" children={({match}) => (
//           <li className={match ? 'active' : ''}>
//             <Link to="/blog">Blog</Link>
//           </li>)} />
//         <Route render={() => <h1>Page not found</h1>} />
//       </Switch>
//     </div>
//   </Router>
// );
//
// export default App;
