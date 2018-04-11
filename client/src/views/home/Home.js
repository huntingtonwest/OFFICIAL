import React, { Component } from "react";
import { Grid, Image, Col, Row } from "react-bootstrap";
import HomeBanner from './HomeBanner';
import { Card } from 'antd';
import Footer from '../../components/Footer';
import MapContainer from './HomeMap'
const { Meta } = Card;


class Home extends Component {

  cardClick(e){
    window.location.assign(e);
  }

  render() {
    return (
      <div className="App">
        <HomeBanner
          title="Located in the heart of Los Angeles, our office has over 40 years of property management and real estate experience."
          img="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/home_banner2.jpg"
          height="1200"
        />
      <Footer bg="grey" logo="hide"/>
      </div>
    );
  }
}

export default Home;
