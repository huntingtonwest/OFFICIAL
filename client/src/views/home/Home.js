import React, { Component } from "react";
import { Grid, Image, Col, Row } from "react-bootstrap";
import HomeBanner from './HomeBanner';
import { Card } from 'antd';
import Footer from '../../components/Footer';
import MapContainer from './HomeMap';
const { Meta } = Card;


class Home extends Component {

  render() {
    return (
      <div className="home-container">
        <HomeBanner
          title="HUNTINGTON WEST PROPERTIES, INC."
          img="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/home_banner2.jpg"
        />
        <div className="under-banner">
      <div className="desc-container about-desc">
        <br/>
          <br/>
        <p className="thicker">Located in the heart of Orange County, our office has over 40 years of property management and real estate experience.</p>
<br /><br />
      <p>Huntington West Properties, Inc. was founded in 1979 and has served clients in Orange, Los Angeles and San Diego Counties for more than 40 years. Our firm has experience managing Community Associations, Condominiums, Planned Unit Developments and both residential and commercial rental properties.</p>

        <p>Huntington West Properties, Inc. is licensed by the California Department of Real Estate as a California Real Estate Broker and maintains membership in CACM, CAR and NAR.</p>
    </div>
      </div>
      <Footer bg="grey" logo="hide"/>
      </div>
    );
  }
}

export default Home;
