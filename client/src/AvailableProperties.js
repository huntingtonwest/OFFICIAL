import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import MyNavbar from './Navbar';
import { Jumbotron, Image , Grid, Row, Col, Tab, Nav, NavItem, Thumbnail} from 'react-bootstrap';
import ConsultationForm from './ScheduleForm';
import BannerProperties from './BannerProperties';
import Areas from './Areas';
import Property from './Property';
import MapContainer from './Map'
import FetchProperties from './FetchProperties'
import Footer from './Footer'


class AvailableProperties extends Component {
  render() {
    return (
      <div className="AvailableProperties" id="search">
        <BannerProperties title="AVAILABLE PROPERTIES" />
        <div className="under-banner">
          <div className="search-map" id="map">
            <MapContainer />
          </div>
          <FetchProperties />
          <div id="consultation">
            <ConsultationForm title="SCHEDULE CONSULTATION"/>
        </div>
        </div>
        <Footer bg="white"/>
      </div>
    );
  }
}

export default AvailableProperties;
