import React, { Component } from 'react';
import { ControlLabel, FormGroup, FormControl, Image , Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import Banner from '../../components/Banner';
import MapContainer from './ContactMap'
import Footer from '../../components/Footer';
import ConsultationForm from '../../components/ScheduleForm';


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
          img="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/contact-banner.jpg"
        />
      <br/>
        <br/>
        <Grid>
          <Row>
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
            <Col xs={12} md={6} className="contact-map" >
              <MapContainer />
            </Col>
          </Row>
        </Grid>
        <div id="form" className="grey">
          <ConsultationForm title="SCHEDULE CONSULTATION"/>
        </div>
        <Footer bg="grey" />
      </div>
    );
  }
}

export default Contact;
