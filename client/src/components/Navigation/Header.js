import React, { Component } from 'react';
import { Image, Grid, Row, Col } from 'react-bootstrap';
import { Menu, Dropdown, Icon, Button } from 'antd';
import OverlayVisible from './Overlay';


const Header = (props) => (
  <div className="header" style={{ height: props.height }}>
    <Row className="header-row">
      <Col md={6}>
        <a href="/"><Image style={{width: 200}} src="https://s3.us-east-2.amazonaws.com/hwp-frontend/static/media/Hwp+Logo+Approved.png" responsive className="head-logo"/>
        </a>
      </Col>
      <Col md={6} className="right-col">
        <Button className="login-button " icon="user">Admin Login</Button>
        <Button className="login-button " icon="user">Resident Login</Button>
      </Col>
    </Row>
    <Row>
      <div className="links">
        <OverlayVisible />
      </div>
    </Row>
  </div>
);

export default Header;
