import * as React from "react";

import {
  Image
  // Navbar, Nav, NavDropdown, MenuItem
} from "react-bootstrap";

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

      <div className="topnav" id="myTopnav" style={{ background: this.props.background }}>

      <a href="/" className="active">
                   <Image
                     style={{ width: 200 }}
                     src={this.props.logo}
                     responsive
                     className="logo"
                   />
                 </a>
          <div className="my-dropdown">
          <button className="dropbtn">
          <a href="/propertyManagement" className="hover-1" style={{color: this.props.color}}>Property Management</a>
          </button>
          <div className="dropdown-content">
            <a href="/propertyManagement#services">Our Services</a>
            <a href="/propertyManagement#areas">Areas We Serve</a>
            <a href="/propertyManagement#consultation">Schedule Consultation</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/availableProperties" className="hover-1" style={{color: this.props.color}}>Available Properties</a>
        </button>
          <div className="dropdown-content">
            <a href="/availableProperties#search">Properties For Sale</a>
            <a href="/availableProperties#search">Properties For Rent</a>
            <a href="/availableProperties#consultation">Schedule Consultation</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/about" className="hover-1" style={{color: this.props.color}}>About</a>
        </button>
          <div className="dropdown-content">
            <a href="/about#mission">Our Mission & Values</a>
            <a href="/about#team">Our Team</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/resources" className="hover-1" style={{color: this.props.color}}>Resident/Owner Resources</a>
        </button>
          <div className="dropdown-content">
            <a href="/resources#resource-form">Work Order</a>
            <a href="/resources#resource-form">Contact Your Manager</a>
            <a href="/resources#tenant-options">Payment</a>
            <a href="/resources#tenant-options">Rental Forms</a>
            <a href="/resources#tenant-options">Condocerts</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/contact" className="hover-1" style={{color: this.props.color}}>Contact</a>
        </button>
          <div className="dropdown-content">
            <a href="/contact#form">Contact Form</a>
          </div>
        </div>
        <div className="right-nav">
        <button className="rightBtn">
        <a href="https://realhwptest.herokuapp.com/login" className="right-button" style={{color: this.props.color}}>Admin Login</a>
        </button>
        <button className="rightBtn">
        <a href="#" className="right-button" style={{color: this.props.color}}>Resident Login</a>
        </button>
        </div>
        <a href="javascript:void(0);" className="icon" onClick={this.responsive}>&#9776;</a>
      </div>
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
