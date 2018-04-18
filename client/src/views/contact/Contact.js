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
          title="GET IN TOUCH."
          img="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/getintouch.jpg"
        />
      <br/>
        <br/>
        <br/>
        <Grid className="about-desc" id="where">
          <Row className="mission-row ">
            <br/>
            <h1 className="title-container">
              WHERE WE ARE
            </h1>
            <br/>
            <br/>

            <Col xs={12} md={6} className="contact-address">
              <p className="wrap">
                13812 Goldenwest St Ste #100
                Westminster, CA 92683
              </p>
              <p>
                Phone: (714)
                891-1522
              </p>
              <p>
               Toll
                Free: (800) 655-1522
              </p>
              <p>
                Fax: (714)
                897-9120
              </p>
            </Col>
            <Col xs={12} md={6} className="contact-map" >
              <MapContainer />
            </Col>
          </Row>
        </Grid>
        <div id="form" className="grey">
          <ConsultationForm title="CONTACT / SCHEDULE CONSULTATION"/>
        </div>
        <Footer bg="grey" logo="hide"/>
      </div>
    );
  }
}

export default Contact;
