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
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/availableProperties" className="hover-1">Available Properties</a>
        </button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/about" className="hover-1">About</a>
        </button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/resources" className="hover-1">Tenant & Owner Resources</a>
        </button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/contact" className="hover-1">Contact</a>
        </button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
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
