import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import MyNavbar from './Navbar';
import { Jumbotron, Image , Grid, Row, Col, Tab, Nav, NavItem} from 'react-bootstrap';
import ConsultationForm from './ScheduleForm';
import Banner from './Banner';
import Areas from './Areas';
import Main from './Router'
import Footer from './Footer'

const App = () => (
  <div>
    <MyNavbar />
    <Main />
    <Footer />
  </div>
)

export default App;


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
