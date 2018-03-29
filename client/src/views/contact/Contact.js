import React, { Component } from 'react';
import { ControlLabel, FormGroup, FormControl, Image , Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import Banner from '../../components/Banner';
import MapContainer from './ContactMap'
import Footer from '../../components/Footer';


function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} className="schedule-form" />
    </FormGroup>
  );
}

class Contact extends Component {
  render() {
    return (
      <div className="Contact">
        <Banner
          id="resources-banner"
          title="GET IN TOUCH"
          img="https://s3.us-east-2.amazonaws.com/hwp-frontend/static/media/iStock-885426092.jpg"
        />
        <Grid>
          <Row className="contact-first-row">
            <Col xs={12} md={6} className="contact-address">
              <Image
                src="http://via.placeholder.com/500x200"
                responsive
                className="contact-pic"
              />
              <p>
                <Glyphicon glyph="map-marker" className="glyph-contact" /> 13812
                Goldenwest St. Westminster, CA 92683
              </p>
              <p>
                <Glyphicon glyph="phone-alt" className="glyph-contact" /> (714)
                891-1522
              </p>
              <p>
                <Glyphicon glyph="earphone" className="glyph-contact" /> Toll
                Free: (800) 655-1522
              </p>
              <p>
                <Glyphicon glyph="phone-alt" className="glyph-contact" /> (714)
                897-9120
              </p>
            </Col>
            <Col xs={12} md={6} className="contact-form" id="form">
              <form>
                <div className="left">
                  <FieldGroup
                    className="group"
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
                  <FieldGroup id="contactFormMessage" type="text" />
                </div>
                <br />
                <button className="contact-button" type="submit">
                  SUBMIT
                </button>
              </form>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="contact-map">
              <MapContainer />
            </Col>
          </Row>
        </Grid>
        <Footer bg="white" />
      </div>
    );
  }
}

export default Contact;
