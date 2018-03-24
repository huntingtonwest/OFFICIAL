import * as React from 'react';
import { Image, Navbar, NavDropdown, MenuItem, NavItem, Nav } from 'react-bootstrap';
import OverlayVisible from './Overlay'
import { Menu, Dropdown, Icon } from 'antd';
import { Anchor } from 'antd';
const { Link } = Anchor;

class MyNavbar extends React.Component {

  render() {
    return (
      <Navbar collapseOnSelect className="bootstrap-navbar">
        <Navbar.Header className="navbar-header">
          <Navbar.Brand className="navbar-brand">
            <a href="/"><Image style={{width: 180}} src="https://s3.us-east-2.amazonaws.com/hwp-frontend/static/media/HWP+LOGO+BLUE+WINDOWS.png" responsive className="logo"/>
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="bootstrap-nav">
            <NavDropdown className="bootstrap-dropdown" eventKey={1} title="Property Management" id="basic-nav-dropdown">
            <Anchor className="submenu-anchor" affix={false} offsetTop='80'>
            <Menu className="submenu submenu-2">
              <Link className="submenu-link" href="/#our-services" title="Our Services" />
              <Link className="submenu-link" href="/#areas" title="Areas We Serve" />
              <Link className="submenu-link" href="/#consultation" title="Schedule Consultation" />
            </Menu>
            </Anchor>
            </NavDropdown>
            <NavDropdown className="bootstrap-dropdown" eventKey={2} title="Available Properties" id="basic-nav-dropdown" href="/availableProperties">
            <Anchor className="submenu-anchor" affix={false} offsetTop='80'>
            <Menu className="submenu submenu-2">
              <Link className="submenu-link" href="/availableProperties/#search" title="Properties For Sale" />
              <Link className="submenu-link" href="/availableProperties/#search" title="Properties For Rent" />
              <Link className="submenu-link" href="/availableProperties/#consultation" title="Schedule Consultation" />
            </Menu>
            </Anchor>
            </NavDropdown>
            <NavDropdown className="bootstrap-dropdown" eventKey={3} title="About" id="basic-nav-dropdown">
            <Anchor className="submenu-anchor" affix={false} offsetTop='80'>
            <Menu className="submenu submenu-2">
              <Link className="submenu-link" href="/about/#mission" title="Our Mission & Values" />
              <Link className="submenu-link" href="/about/#team" title="Our Team" />
            </Menu>
            </Anchor>
            </NavDropdown>
            <NavDropdown className="bootstrap-dropdown" eventKey={4} title="Tenant / Owner Resources" id="basic-nav-dropdown">
            <Anchor className="submenu-anchor" affix={false} offsetTop='80'>
            <Menu className="submenu submenu-2">
              <Link className="submenu-link" href="/resources/#resource-form" title="Work Order" />
              <Link className="submenu-link" href="/resources/#resource-form" title="Contact Your Manager" />
              <Link className="submenu-link" href="/resources/#payment" title="Payment" />
              <Link className="submenu-link" href="/resources/#forms" title="Rental Forms" />
              <Link className="submenu-link" href="/resources/#condocerts" title="Condocerts" />
            </Menu>
            </Anchor>
            </NavDropdown>
            <NavDropdown className="bootstrap-dropdown" eventKey={5} title="Contact" id="basic-nav-dropdown">
            <Anchor className="submenu-anchor" affix={false} offsetTop='80'>
            <Menu className="submenu submenu-2">
            <Link className="submenu-link" href="/contact/#forms" title="Contact Forms" />
            </Menu>
            </Anchor>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Admin Login
            </NavItem>
            <NavItem eventKey={2} href="#">
              Resident Login
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MyNavbar;
