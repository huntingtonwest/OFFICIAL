import React, { Component } from "react";
import { Grid, Image, Col, Row } from "react-bootstrap";
import HomeBanner from './HomeBanner';
import { Card } from 'antd';
import Footer from '../../components/Footer';
import MapContainer from './HomeMap'
const { Meta } = Card;


class Home extends Component {

  cardClick(e){
    console.log("clicked");
    var loc = '/';
    switch(e) {
      case 'properties':
        window.location.assign('/availableProperties');
        break;
      case 'payments':
        window.location.assign('/resources#payment');
        break;
      case 'consultation':
        window.location.assign('/availableProperties#consultation');
        break;
    }
  }

  render() {
    return (
      <div className="App">
        <HomeBanner
          title="Located in the heart of Los Angeles, our office has over 40 years of property management and real estate experience."
          img="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/home_banner2.jpg"
          height="1200"
        />
      <div className="under-banner">
        <Grid className="home-grid">
          <Row className="home-row">
            <Col xs={12} md={7} className="home-col">
              <h1 className="title-container home-title">
                What We Do Best
              </h1>
              <br/>
              <br/>
              <p className="home-p">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor."
              </p>
            </Col>
            <Col xs={12} md={5} className="home-map home-col">
              <MapContainer />
            </Col>
          </Row>
        </Grid>
      </div>
      <div className="desc-container grey">
        <Grid>
        <Row>
        <Col xs={6} md={4} className="card-col">
          <Card
            className="home-card"
            hoverable
            bodyStyle={{ padding: 5, paddingBottom: 0 }}
            onClick={() => this.cardClick('properties')}
            id="properties"
            >
            <div className="custom-image">
              <img alt="example" width="100%" src="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/h1.jpg" />
            </div>
            <div className="custom-card">
              <h1></h1>
              <p>Available Properties</p>
            </div>
          </Card>
        </Col>
        <Col xs={6} md={4} className="card-col">
          <Card
            className="home-card"
            hoverable
            bodyStyle={{ padding: 5, paddingBottom: 0 }}
            onClick={() => this.cardClick('payments')}
            id="payments"
            >
            <div className="custom-image">
              <img alt="example" width="100%" src="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/h3.jpg" />
            </div>
            <div className="custom-card">
              <h1></h1>
              <p>Make Payments</p>
            </div>
          </Card>
        </Col>
        <Col xs={6} md={4} className="card-col">
          <Card
            className="home-card"
            hoverable
            bodyStyle={{ padding: 5, paddingBottom: 0 }}
            onClick={() => this.cardClick('consultation')}
            id="consultation"
            >
            <div className="custom-image">
              <img alt="example" width="100%" src="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/h2.jpg" />
            </div>
            <div className="custom-card">
              <h1></h1>
              <p>Schedule Consultation</p>
            </div>
          </Card>
        </Col>
      </Row>
    </Grid>
    </div>

        <Footer bg="grey" />
      </div>
    );
  }
}

export default Home;
