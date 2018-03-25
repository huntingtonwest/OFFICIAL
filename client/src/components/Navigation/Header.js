import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import { Button } from 'antd';
import HeaderLinks from './HeaderLinks';

// Navbar before scroll
const Header = (props) => (
  <div className="header" style={{ height: props.height }}>
    <Row className="header-row">
      <Col md={6}>
        <a href="/">
          <Image style={{width: 200}} src="https://s3.us-east-2.amazonaws.com/hwp-frontend/static/media/Hwp+Logo+Approved.png" responsive className="head-logo"/>
        </a>
      </Col>
      <Col md={6} className="right-col">
        <Button className="login-button " icon="user">Admin Login</Button>
        <Button className="login-button " icon="user">Resident Login</Button>
      </Col>
    </Row>
    <Row>
      <div className="links">
        <HeaderLinks />
      </div>
    </Row>
  </div>
);

export default Header;
