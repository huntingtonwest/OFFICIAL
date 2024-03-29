import * as React from "react";
import { Row, Grid, Col} from 'react-bootstrap';
import { Menu, Dropdown, Button, Icon, message } from 'antd';

import {
  Image
  // Navbar, Nav, NavDropdown, MenuItem
} from "react-bootstrap";

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://realhwptest.herokuapp.com/login">Admin</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.appfolio.com/login">Resident</a>
    </Menu.Item>
  </Menu>
);

// Collapsible sticky navbar shown on scroll
class MyNavbar extends React.Component {

  constructor(props) {
    super(props);
  }

  responsive() {
    console.log("responsive");
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
  }

  render() {

    return (

<Grid className="nav-grid">
<Row className="main-row">
<Col xs={12} lg={12} className="nav-col">
      <div className="topnav" id="myTopnav">
<Row className="login-row">
<div className="nav-float">

<Dropdown id="menu-dropdown" overlay={menu}>
      <Button id="search" className="button-form login-button " style={{ marginLeft: 8 }}>
        Login
      </Button>
    </Dropdown>

</div>
</Row>
<Row className="menu-row">
      <a href="/" className="active-logo">
                   <Image
                     style={{ width: 180 }}
                     src="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/Hwp%2BLogo%2BApproved.png"
                     responsive
                     className="logo"
                   />
                 </a>
                 <div className='nav-float-2'>
          <div className="my-dropdown first-dropdown">
          <button className="dropbtn">
          <a href="/propertyManagement" className="hover-1">Property Management</a>
          </button>
          <div className="dropdown-content">
            <a href="/propertyManagement#services">Our Services</a>
            <a href="/propertyManagement#areas">Areas We Serve</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/availableProperties" className="align-text-bottom hover-1">Available Properties</a>
        </button>
          <div className="dropdown-content">
            <a href="/availableProperties#search">Properties For Sale</a>
            <a href="/availableProperties#search">Properties For Rent</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/about" className="align-text-bottom hover-1">About</a>
        </button>
          <div className="dropdown-content">
            <a href="/about#mission">Our Mission & Values</a>
            <a href="/about#team">Our Team</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/resources" className="align-text-bottom hover-1">Resident/Owner Resources</a>
        </button>
          <div className="dropdown-content">
            <a href="/resources#tenant-options">Payment</a>
            <a href="/resources#tenant-options">Rental Forms</a>
            <a href="/resources#tenant-options">Condocerts</a>
            <a href="/resources#resource-form">Work Order</a>
            <a href="/resources#resource-form">Contact Your Manager</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn last">
        <a href="/contact" className="hover-1">Contact</a>
        </button>
          <div className="dropdown-content">
          <a href="/contact#where">Where We Are</a>
            <a href="/contact#form">Contact Us</a>
            <a href="/contact#form">Schedule Consultation</a>
          </div>
        </div>

        <a href="javascript:void(0);" className="icon" onClick={this.responsive}>&#9776;</a>
        </div>
        </Row>
      </div>
      </Col>
      </Row>
    </Grid>
    );
  }
}

const MyNav = (props) => {

  return (
    <div className="navbar navbar-static-top" role="navigation">
      <MyNavbar background={props.background} display={props.display} color={props.color} logo={props.logo}/>
    </div>
  );
};

export default MyNav;
