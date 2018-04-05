import React, { Component } from 'react';
import { Thumbnail, Grid, Row, Col } from 'react-bootstrap';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';

class TeamMember extends Component {

  render() {
    return (
      <Col xs={6} md={3}>
        <Thumbnail src={this.props.image}>
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
        <Banner
          title="OUR STORY"
          img="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/about-banner.jpg"
        />
        <div className="under-banner">
          <div className="desc-container about-desc">
            <p>
              Huntington West Properties, Inc. was founded in 1979 and has
              served clients in Orange, Los Angeles and San Diego Counties for
              more than 30 years. Our firm has experience managing Community
              Associations, Condominiums, Planned Unit Developments and both
              residential and commercial rental properties.
            </p>
          </div>
          <div className="about-container">
            <Grid>
              <Row className="about-row" id="mission">
                <Col xs={12} md={6} className="dark-blue">
                  <div className="about-row-info">
                    <h1 className="about-row-title">MISSION</h1>
                    <p>
                      Huntington West Properties Inc. will be the real estate
                      company of choice, making the needs of our clients and
                      employees the highest priority, while achieving excellence
                      of service and sustainable growth.
                    </p>
                  </div>
                </Col>
                <Col xs={12} md={6} className="light-blue">
                  <div className="about-row-info">
                    <h1 className="about-row-title">VALUES</h1>
                    <ul>
                      <li>
                        Our actions area based on the highest standardof
                        integrity and Chistian ethics.
                      </li>
                      <li>
                        We perform our work with dilligence and professionalist.
                      </li>
                      <li>
                        We will strive to improve our performance and service
                        wherever possible.
                      </li>
                      <li>
                        We are loyal to our customers, our vendors, our company
                        and each other.
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
          <br/>
          <div className="desc-container" id="team">
            <h1 className="title-container">OUR TEAM</h1>
            <br />
            <br />
            <Grid className="about-grid">
              <Row>
                <TeamMember
                  name="Jason Hughes"
                  position="Chairman, CEO, and Owner"
                  email="Email@hwp.com"
                  phone="(213)883-9332"
                  image="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/test1.jpg"
                />
                <TeamMember
                  name="Jason Hughes"
                  position="Chairman, CEO, and Owner"
                  email="Email@hwp.com"
                  phone="(213)883-9332"
                  image="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/test2.jpg"

                />
                <TeamMember
                  name="Jason Hughes"
                  position="Chairman, CEO, and Owner"
                  email="Email@hwp.com"
                  phone="(213)883-9332"
                  image="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/test3.jpg"

                />
                <TeamMember
                  name="Jason Hughes"
                  position="Chairman, CEO, and Owner"
                  email="Email@hwp.com"
                  phone="(213)883-9332"
                  image="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/test4.jpg"

                />
              </Row>
              <Row>
                <TeamMember
                  name="Jason Hughes"
                  position="Chairman, CEO, and Owner"
                  email="Email@hwp.com"
                  phone="(213)883-9332"
                  image="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/test5.jpg"

                />
                <TeamMember
                  name="Jason Hughes"
                  position="Chairman, CEO, and Owner"
                  email="Email@hwp.com"
                  phone="(213)883-9332"
                  image="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/test1.jpg"

                />

              </Row>
            </Grid>;
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}


export default About;
