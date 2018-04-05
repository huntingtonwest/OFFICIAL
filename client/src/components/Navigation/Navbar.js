import * as React from "react";
import {
  Image
  // Navbar, Nav, NavDropdown, MenuItem
} from "react-bootstrap";

// Collapsible sticky navbar shown on scroll
class MyNavbar extends React.Component {

  responsive() {
    console.log("responsive");
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
  }

  // submenuClicked(e){
  //   window.location.assign(e);
  // }

  render() {
    return (

      <div className="topnav" id="myTopnav">

      <a href="/" className="active">
                   <Image
                     style={{ width: 150 }}
                     src="https://s3.us-east-2.amazonaws.com/hwp-frontend/static/media/HWP+LOGO+BLUE+WINDOWS.png"
                     responsive
                     className="logo"
                   />
                 </a>
          <div className="my-dropdown">
          <button className="dropbtn">
          <a href="/propertyManagement" className="hover-1">Property Management</a>
          </button>
          <div className="dropdown-content">
            <a href="/propertyManagement#services">Our Services</a>
            <a href="/propertyManagement#areas">Areas We Serve</a>
            <a href="/propertyManagement#consultation">Schedule Consultation</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/availableProperties" className="hover-1">Available Properties</a>
        </button>
          <div className="dropdown-content">
            <a href="/availableProperties#search">Properties For Sale</a>
            <a href="/availableProperties#search">Properties For Rent</a>
            <a href="/availableProperties#consultation">Schedule Consultation</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/about" className="hover-1">About</a>
        </button>
          <div className="dropdown-content">
            <a href="/about#mission">Our Mission & Values</a>
            <a href="/about#team">Our Team</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/resources" className="hover-1">Tenant & Owner Resources</a>
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
        <a href="/contact" className="hover-1">Contact</a>
        </button>
          <div className="dropdown-content">
            <a href="/contact#form">Contact Form</a>
          </div>
        </div>
        <div className="right-nav">
        <button className="rightBtn">
        <a href="https://realhwptest.herokuapp.com/login" className="right-button">Admin Login</a>
        </button>
        <button className="rightBtn">
        <a href="#" className="right-button">Resident Login</a>
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
      <MyNavbar />
    </div>
  );
};

export default MyNav;
