import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import MyNavbar from './Navbar';
import { Jumbotron, Image , Grid, Row, Col, Tab, Nav, NavItem} from 'react-bootstrap';
import ConsultationForm from './ScheduleForm';
import CitySearch from './CitySearch';
import Banner from './Banner';
import Areas from './Areas';
import { Tabs } from 'antd';
import Footer from './Footer'

const TabPane = Tabs.TabPane;

class PropertyManagement extends Component {
  render() {
    return (
      <div className="App">
        <Banner title="PROPERTY MANAGEMENT" img="https://s3.us-east-2.amazonaws.com/hwp-frontend/static/media/iStock-692718260.jpg"/>
        <div className="under-banner">
        <div className="desc-container">
        <h1 className="title-container" id="our-services">OUR SERVICES</h1>
        <br/>
        <div className="my-tabs">
        <Tabs className="my-tabs" defaultActiveKey="2">
          <TabPane className="tab-desc" tab={<span><Image src="http://via.placeholder.com/250x250" responsive/>Tab 1</span>} key="1">
            Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
          </TabPane>
          <TabPane className="tab-desc" tab={<span><Image src="http://via.placeholder.com/250x250" responsive/>Tab 2</span>} key="2">
            Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
          </TabPane>
          <TabPane className="tab-desc" tab={<span><Image src="http://via.placeholder.com/250x250" responsive/>Tab 3</span>} key="3">
            Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
          </TabPane>
          <TabPane className="tab-desc" tab={<span><Image src="http://via.placeholder.com/250x250" responsive/>Tab 4</span>} key="4">
            Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
          </TabPane>
        </Tabs>
        </div>
        </div>
        <div className="desc-container grey">
        <h1 className="title-container" id="areas">AREAS WE SERVE</h1>
        <Grid>
    <CitySearch />
  </Grid>
        <br/>
        </div>
        <ConsultationForm title="SCHEDULE CONSULTATION"/>
      </div>
      <Footer bg="white"/>
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
