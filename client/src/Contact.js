import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import MyNavbar from './Navbar';
import { ControlLabel, FormGroup, FormControl, Jumbotron, Image , Grid, Row, Col, Tab, Nav, NavItem, Thumbnail} from 'react-bootstrap';
import ConsultationForm from './ScheduleForm';
import Banner from './Banner';
import Areas from './Areas';
import Property from './Property';
import MapContainer from './Map'


function FieldGroup({ id,label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} className="schedule-form"/>
    </FormGroup>
  );
}

class Contact extends Component {
  render() {
    return (
      <div className="Contact">
        <Banner title="GET IN TOUCH" img="http://via.placeholder.com/2450x800"/>
        <Grid>
          <Row className="contact-first-row">
            <Col xs={12} md={6} className="contact-address">
            <Image src="http://via.placeholder.com/500x200" responsive className="contact-pic"/>
            <p>13812 Goldenwest St. Westminster, CA 92683</p>
            <p>(714) 891-1522</p>
            <p>Toll Free: (800) 655-1522</p>
            <p>(714) 897-9120</p>
            </Col>
            <Col xs={12} md={6} className="contact-form">
            <form>
            <div className="left">

  <FieldGroup className="group"
    id="contactFormName"
    type="text"
    label="Name"
  />
  <FieldGroup
    id="contactFormPhone"
    type="phone"
    label="Phone"
  />
  <FieldGroup
    id="contactFormEmail"
    type="email"
    label="Email Address"
  />
  <FormGroup controlId="contactFormAssociation">
  <ControlLabel>Association (if applicable)</ControlLabel>
  <FormControl componentClass="select">
    <option value="select">select</option>
    <option value="other">...</option>
  </FormControl>
</FormGroup>
  <FieldGroup
    id="contactFormMessage"
    type="text"
  />
  </div>
  <br />
  <button className="contact-button" type="submit">SUBMIT</button>
</form>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="contact-map">
              <MapContainer />
            </Col>
          </Row>
        </Grid>
        </div>
    );
  }
}

export default Contact;
