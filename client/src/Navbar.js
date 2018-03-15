import * as React from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
// import '../../css/Navbar.css';
import { LinkContainer } from 'react-router-bootstrap';

const MyNavbar = () => (
  <Navbar inverse collapseOnSelect>
  <Navbar.Header>
  <Navbar.Toggle />
</Navbar.Header>
    <Navbar.Collapse>
      <Nav>
      <NavDropdown eventKey={1} title="Property Management" id="basic-nav-dropdown" caret="false">
          <MenuItem eventKey={1.1} className="nav-menu">OUR SERVICES</MenuItem>
          <MenuItem eventKey={1.2}>AREAS WE SERVE</MenuItem>
          <MenuItem eventKey={1.3}>SCHEDULE CONSULTATION</MenuItem>
      </NavDropdown>
      <NavDropdown eventKey={2} title="Available Properties" id="basic-nav-dropdown">
        <MenuItem eventKey={2.1}>OUR SERVICES</MenuItem>
        <MenuItem eventKey={2.2}>PROPERTIES FOR RENT</MenuItem>
        <MenuItem eventKey={2.3}>PROPERTIES FOR SALE</MenuItem>
        <MenuItem eventKey={2.4}>SCHEDULE CONSULTATION</MenuItem>
      </NavDropdown>
        <NavDropdown eventKey={3} title="About" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>OUR MISSION VALUES</MenuItem>
            <MenuItem eventKey={3.2}>OUR TEAM</MenuItem>
        </NavDropdown>
        <NavDropdown eventKey={4} title="Tenant/Owner Resources" id="basic-nav-dropdown">
          <MenuItem eventKey={4.1}>WORK ORDER</MenuItem>
          <MenuItem eventKey={4.2}>CONTACT YOUR MANAGER</MenuItem>
          <MenuItem eventKey={4.3}>PAYMENT</MenuItem>
          <MenuItem eventKey={4.4}>RENTAL FORMS</MenuItem>
          <MenuItem eventKey={4.5}>CONDOCERTS</MenuItem>
        </NavDropdown>
        <NavDropdown eventKey={5} title="Contact" id="basic-nav-dropdown">
          <MenuItem eventKey={5.1}>CONTACT FORM</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default MyNavbar;
