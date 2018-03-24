import React, { Component,  } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import MyNavbar from './Navbar';
import { Button, ListGroup, ListGroupItem, ControlLabel, FormGroup, FormControl, Jumbotron, Image , Grid, Row, Col, Tab, Nav, NavItem, Thumbnail, Glyphicon} from 'react-bootstrap';
import ManagerForm from './ManagerForm';
import Banner from './Banner';
import Areas from './Areas';
import Property from './Property';
import MapContainer from './Map'
import Footer from './Footer'

class Resources extends Component {
  render() {
    return (
      <div className="Contact">
        <Banner title="RESIDENT / OWNER RESOURCES" img="https://s3.us-east-2.amazonaws.com/hwp-frontend/static/media/iStock-645117480.jpg"/>
      <Grid>
          <Row className="contact-first-row" id="rental-forms">
            <Col xs={12} md={6}>
              <h1 className="title-container title-left" id="forms">RENTAL FORMS</h1>
              <ListGroup className="form-list">
    <ListGroupItem className="form-item" href="http://www.huntingtonwest.com/pdf/131_Enter-Exit_Checklist.pdf"><span><Glyphicon className="glyph" glyph="plus" />Enter-exit Checklist</span></ListGroupItem>
      <ListGroupItem className="form-item" href="http://www.huntingtonwest.com/pdf/30DayNotice.pdf"><span><Glyphicon className="glyph" glyph="plus" />30-Day Notice</span></ListGroupItem>
        <ListGroupItem className="form-item" href="http://www.huntingtonwest.com/pdf/CleaningChecklist.pdf"><span><Glyphicon className="glyph" glyph="plus" />Cleaning Checklist</span></ListGroupItem>
          <ListGroupItem className="form-item" href="http://www.huntingtonwest.com/pdf/146_Satellite_Dish_Addendum.pdf"><span><Glyphicon className="glyph" glyph="plus" />Satellite Dish Addendum</span></ListGroupItem>
            <ListGroupItem className="form-item" href="http://www.huntingtonwest.com/pdf/GeneralRulesAndPolicies.pdf"><span><Glyphicon className="glyph" glyph="plus" />General Rules & Policies</span></ListGroupItem>
  </ListGroup>
            </Col>
            <Col xs={12} md={6} className="resource-buttons">
              <Button id="payment" bsStyle="default" className="resource-button" href="http://www.paylease.com">Payment</Button>
              <Button id="condocerts" bsStyle="default" className="resource-button">Condocerts</Button>
            </Col>
          </Row>
        </Grid>
        <div className="grey" id="resource-form">
          <ManagerForm title="WORK ORDER / CONTACT YOUR MANAGER"/>
        </div>
        <Footer bg="grey"/>
        </div>
    );
  }
}

export default Resources;
