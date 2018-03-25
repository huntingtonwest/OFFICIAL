import React, { Component } from 'react';
import logo from './logo.svg';
import './index.css';
import MyNavbar from './Navbar';
import Main from './Router'
import 'antd/dist/antd.css';
import { Image, Grid, Row, Col } from 'react-bootstrap';
import { Menu, Dropdown, Icon, Button } from 'antd';
import OverlayVisible from './Overlay';


const MyNav = (props) => {
  const opacity = (props.opacity) ? Math.max(props.opacity, 0.2) : 0;

  return (
    <div className="navbar navbar-default navbar-static-top" role="navigation" style={{ opacity }}>
      <MyNavbar />
    </div>
  );
};

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


class App extends React.Component {
  static defaultProps = {
    headerHeight: 200,
    fadeInDistance: 40
  };

  constructor(props) {
    super(props);
    this.state = { navOpacity: 0 };
    this.updateNavOpacity = this.updateNavOpacity.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateNavOpacity);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateNavOpacity);
  }

  updateNavOpacity() {
    const navbarHeight = 70; // Bootstrap default
    const { headerHeight, fadeInDistance } = this.props;
    const endFade = headerHeight - navbarHeight;
    const startFade = endFade - fadeInDistance;
    const scrolly = window.scrollY;

    if (scrolly < startFade) {
      if (this.state.opacity === 0) return;
      this.setState({ navOpacity: 0 });
      return;
    }

    if (scrolly > endFade) {
      if (this.state.opacity === 1) return;
      this.setState({ navOpacity: 1 });
      return;
    }

    const pxPastStartFade = scrolly - startFade;
    const navOpacity = pxPastStartFade / (endFade - startFade);
    this.setState({ navOpacity });
  }

  render() {
    return (
      <div>
        <MyNav opacity={ this.state.navOpacity } />
        <Header height={ this.props.headerHeight } />
        <Main />
      </div>
    );
  }
}

export default App;
