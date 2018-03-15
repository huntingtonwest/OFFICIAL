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


class Footer extends Component {
  render() {
    return (
      <Grid className="footer-grid">
      <hr className="footer-hr"/><br />
        <Row>
          <Col xs={3} md={2}>
            <Image src="http://via.placeholder.com/100x100" responsive className="logo"/>
          </Col>
          <Col xs={9} md={4}>
          <div className="footer-emphasize footer-address">
            <p>13812 Goldenwest Street Ste. 100,</p>
            <p>Westminster, CA 92683</p>
          </div>
          <div className="footer-address">
            <p className="footer-emphasize">(714) 891-1522   PHONE</p>
            <p>(714) 897-9120   FAX</p>
          </div>
          </Col>
          <Col xs={12} md={6}>
          <div className="footer-info">
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem</p>
            <p className="footer-emphasize">PRIVACY POLICY</p>
          </div>
          </Col>
        </Row>
        <hr className="footer-hr"/>
        <Row>
          <Col xs={12} md={12}>
          <div className="footer-bottom">
            <p>&copy; 2018 HUNTINGTON WEST PROPERTIES, INC. ALL RIGHTS RESERVED</p>
          </div>
          </Col>
        </Row>
      </Grid>


    );
  }
}

export default Footer;
