import * as React from "react";
import {
  Image
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
          <a href="/">Property Management</a>
          </button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/availableProperties">Available Properties</a>
        </button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/about">About</a>
        </button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/resources">Tenant & Owner Resources</a>
        </button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <div className="my-dropdown">
        <button className="dropbtn">
        <a href="/contact">Contact</a>
        </button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>        <a href="javascript:void(0);" className="icon" onClick={this.responsive}>&#9776;</a>
      </div>
    );
  }
}

const MyNav = (props) => {

  return (
    <div className="navbar navbar-default navbar-static-top" role="navigation">
      <MyNavbar />
    </div>
  );
};

export default MyNav;
