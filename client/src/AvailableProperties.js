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
import Fetch from './FetchProperties'


class AvailableProperties extends Component {
  render() {
    return (
      <div className="AvailableProperties">
        <BannerProperties title="AVAILABLE PROPERTIES" />
        <div className="under-banner">
          <div className="search-map">
            <MapContainer />
          </div>
          <Fetch />
        <ConsultationForm />
        </div>
      </div>
    );
  }
}

export default AvailableProperties;
