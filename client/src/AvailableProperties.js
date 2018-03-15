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


class AvailableProperties extends Component {
  render() {
    return (
      <div className="AvailableProperties">
        <BannerProperties title="AVAILABLE PROPERTIES" />
        <div className="under-banner">
          <div className="search-map">
            <MapContainer />
          </div>
          <Grid>
          <Row className="properties-row">
        <Property
          img="http://via.placeholder.com/350x250"
          rent="$3,295"
          sqrft="1,576"
          bed="3"
          bath="3"
          desc="Gated 2 Bedroom Bath Condo Next to South Coast Plaza In Santa Ana."
          address="3641 S Bear Sr #E, Santa Ana, CA 92704"
          availability="Available Now"
          />
          <Property
            img="http://via.placeholder.com/350x250"
            rent="$3,295"
            sqrft="1,576"
            bed="3"
            bath="3"
            desc="Gated 2 Bedroom Bath Condo Next to South Coast Plaza In Santa Ana."
            address="3641 S Bear Sr #E, Santa Ana, CA 92704"
            availability="Available Now"
            />
            <Property
              img="http://via.placeholder.com/350x250"
              rent="$3,295"
              sqrft="1,576"
              bed="3"
              bath="3"
              desc="Gated 2 Bedroom Bath Condo Next to South Coast Plaza In Santa Ana."
              address="3641 S Bear Sr #E, Santa Ana, CA 92704"
              availability="Available Now"
              />
        </Row>
        <Row className="properties-row">
      <Property
        img="http://via.placeholder.com/350x250"
        rent="$3,295"
        sqrft="1,576"
        bed="3"
        bath="3"
        desc="Gated 2 Bedroom Bath Condo Next to South Coast Plaza In Santa Ana."
        address="3641 S Bear Sr #E, Santa Ana, CA 92704"
        availability="Available Now"
        />
        <Property
          img="http://via.placeholder.com/350x250"
          rent="$3,295"
          sqrft="1,576"
          bed="3"
          bath="3"
          desc="Gated 2 Bedroom Bath Condo Next to South Coast Plaza In Santa Ana."
          address="3641 S Bear Sr #E, Santa Ana, CA 92704"
          availability="Available Now"
          />
          <Property
            img="http://via.placeholder.com/350x250"
            rent="$3,295"
            sqrft="1,576"
            bed="3"
            bath="3"
            desc="Gated 2 Bedroom Bath Condo Next to South Coast Plaza In Santa Ana."
            address="3641 S Bear Sr #E, Santa Ana, CA 92704"
            availability="Available Now"
            />
      </Row>
    </Grid>
        <ConsultationForm />
        </div>
      </div>
    );
  }
}

export default AvailableProperties;
