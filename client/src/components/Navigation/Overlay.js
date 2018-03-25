import * as React from "react";
import { Menu, Dropdown, Icon } from "antd";
import { Anchor } from "antd";
const { Link } = Anchor;

const menu1 = (
  <Anchor affix={false} offsetTop="80">
    <Menu className="submenu" onClick={this.handleMenuClick}>
      <Link
        className="submenu-link"
        href="/#our-services"
        title="Our Services"
      />
      <Link className="submenu-link" href="/#areas" title="Areas We Serve" />
      <Link
        className="submenu-link"
        href="/#consultation"
        title="Schedule Consultation"
      />
    </Menu>
  </Anchor>
);
const menu2 = (
  <Anchor affix={false} offsetTop="80">
    <Menu className="submenu" onClick={this.handleMenuClick}>
      <Link
        className="submenu-link"
        href="/availableProperties/#search"
        title="Properties For Sale"
      />
      <Link
        className="submenu-link"
        href="/availableProperties/#search"
        title="Properties For Rent"
      />
      <Link
        className="submenu-link"
        href="/availableProperties/#consultation"
        title="Schedule Consultation"
      />
    </Menu>
  </Anchor>
);
const menu3 = (
  <Anchor affix={false} offsetTop="80">
    <Menu className="submenu" onClick={this.handleMenuClick}>
      <Link
        className="submenu-link"
        href="/about/#mission"
        title="Our Mission & Values"
      />
      <Link className="submenu-link" href="/about/#team" title="Our Team" />
    </Menu>
  </Anchor>
);
const menu4 = (
  <Anchor className="submenu-anchor" affix={false} offsetTop="80">
    <Menu className="submenu" onClick={this.handleMenuClick}>
      <Link
        className="submenu-link"
        href="/resources/#resource-form"
        title="Work Order"
      />
      <Link
        className="submenu-link"
        href="/resources/#resource-form"
        title="Contact Your Manager"
      />
      <Link
        className="submenu-link"
        href="/resources/#payment"
        title="Payment"
      />
      <Link
        className="submenu-link"
        href="/resources/#forms"
        title="Rental Forms"
      />
      <Link
        className="submenu-link"
        href="/resources/#condocerts"
        title="Condocerts"
      />
    </Menu>
  </Anchor>
);
const menu5 = (
  <Anchor affix={false} offsetTop="80">
    <Menu className="submenu" onClick={this.handleMenuClick}>
      <Link
        className="submenu-link"
        href="/contact/#forms"
        title="Contact Forms"
      />
    </Menu>
  </Anchor>
);

class Overlay extends React.Component {
  state = {
    visible: false
  };
  handleMenuClick = e => {
    this.setState({ visible: false });
  };
  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };
  render() {
    return (
      <Dropdown
        overlay={this.props.menu}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
      >
        <a className="ant-dropdown-link" href={this.props.href}>
          {this.props.title}
        </a>
      </Dropdown>
    );
  }
}

class OverlayVisible extends React.Component {
  render() {
    return (
      <div>
        <Overlay menu={menu1} title="Property Management" href="/" />
        <Overlay
          menu={menu2}
          title="Available Properties"
          href="/availableProperties"
        />
        <Overlay menu={menu3} title="About" href="/about" />
        <Overlay
          menu={menu4}
          title="Tenant / Owner Resources"
          href="/resources"
        />
        <Overlay menu={menu5} title="Contact" href="/contact" />
      </div>
    );
  }
}

export default OverlayVisible;
