import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import MyNavbar from './Navbar';
import { Jumbotron, Image , Grid, Row, Col, Tab, Nav, NavItem, Thumbnail} from 'react-bootstrap';
import ConsultationForm from './ScheduleForm';
import Banner from './Banner';
import Areas from './Areas';

class TeamMember extends Component {

  render() {
    return (
      <Col xs={6} md={3}>
        <Thumbnail src="http://via.placeholder.com/260x359">
          <p className="about-name">{this.props.name}</p>
          <p className="about-position">{this.props.position}</p>
          <p className="about-contact">{this.props.email}</p>
          <p className="about-contact">{this.props.phone}</p>
        </Thumbnail>
      </Col>
    );
  }
}


class About extends Component {
  render() {
    return (
      <div className="About">
        <Banner title="OUR STORY" img="http://via.placeholder.com/2450x800"/>
        <div className="under-banner">
        <div className="desc-container tab-desc">
        <p>Huntington West Properties, Inc. wsa founded in 1979 and has served clients in Orange, Los Angeles and San Diego Counties for more than 30 years. Our firm has experience managing Community Associations, Condominiums, Planned Unit Developments and both residential and commercial rental properties.</p>
        </div>
        <div className="desc-container">
        <Grid>
  <Row className="about-row">
    <Col xs={12} md={6} className="dark-blue">
      <div className="about-row-info">
        <h1 className="about-row-title">MISSION</h1>
        <p>Huntington West Properties Inc. will be the real estate company of choice, making the needs of our clients and employees the highest priority, while achieving excellence of service and sustainable growth.</p>
      </div>
  </Col>
    <Col xs={12} md={6} className="light-blue">
      <div className="about-row-info">
        <h1 className="about-row-title">VALUES</h1>
        <p>
        <ul>
        <li>Our actions area based on the highest standardof integrity and Chistian ethics.</li>
        <li>We perform our work with dilligence and professionalist.</li>
        <li>We will strive to improve our performance and service wherever possible.</li>
        <li>We are loyal to our customers, our vendors, our company and each other.</li>
        </ul>
        </p>
      </div>
    </Col>
  </Row>
  </Grid>
        </div>
        <div className="desc-container">
        <h1 className="title-container">OUR TEAM</h1>
        <br/><br/>
          <Grid className="about-grid">
            <Row>
              <TeamMember
                name="Jason Hughes"
                position="Chairman, CEO, and Owner"
                email="Email@hwp.com"
                phone="(213)883-9332"
                />
                <TeamMember
                  name="Jason Hughes"
                  position="Chairman, CEO, and Owner"
                  email="Email@hwp.com"
                  phone="(213)883-9332"
                  />
                  <TeamMember
                    name="Jason Hughes"
                    position="Chairman, CEO, and Owner"
                    email="Email@hwp.com"
                    phone="(213)883-9332"
                    />
                    <TeamMember
                      name="Jason Hughes"
                      position="Chairman, CEO, and Owner"
                      email="Email@hwp.com"
                      phone="(213)883-9332"
                      />
            </Row>
            <Row>
              <TeamMember
                name="Jason Hughes"
                position="Chairman, CEO, and Owner"
                email="Email@hwp.com"
                phone="(213)883-9332"
                />
                <TeamMember
                  name="Jason Hughes"
                  position="Chairman, CEO, and Owner"
                  email="Email@hwp.com"
                  phone="(213)883-9332"
                  />
                  <TeamMember
                    name="Jason Hughes"
                    position="Chairman, CEO, and Owner"
                    email="Email@hwp.com"
                    phone="(213)883-9332"
                    />
                    <TeamMember
                      name="Jason Hughes"
                      position="Chairman, CEO, and Owner"
                      email="Email@hwp.com"
                      phone="(213)883-9332"
                      />
            </Row>
          </Grid>;
        </div>
      </div>
      </div>
    );
  }
}

export default About;