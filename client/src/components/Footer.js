import React, { Component } from "react";
import {
  Image,
  Grid,
  Row,
  Col
} from "react-bootstrap";

class Footer extends Component {
  render() {
    console.log(this.props.bg);

    return (
      <div>
        <Grid className="logos-grid">
          <Row className="logos-row" id={this.props.bg} style={{display: this.props.logo == 'hide' ? 'none' : 'block'}}>
            <div className="footer-logos">
              <Image
                src="https://s3.us-east-2.amazonaws.com/hwp-frontend/static/media/CAI-logo.png"
                responsive
                className="accr"
              />
              <Image
                src="https://s3.us-east-2.amazonaws.com/hwp-frontend/static/media/CACM-2016-MEMBER-LOGO-259x300.png"
                responsive
                className="accr"
              />
              <Image
                src="https://s3.us-east-2.amazonaws.com/hwp-frontend/static/media/BBBLogo01.png"
                responsive
                className="accr"
              />
              <Image
                src="https://s3.us-east-2.amazonaws.com/hwp-frontend/static/media/ACMB-Logo.png"
                responsive
                className="accr"
              />
            </div>
          </Row>
        </Grid>
        <Grid className="footer-grid">
          <hr className="footer-hr" />
          <br />
          <Row>
            <Col xs={6} md={4}>
              <Image
                style={{ width: 200 }}
                src="https://s3.us-east-2.amazonaws.com/hwp-frontend/static/media/HWP+LOGO+BLUE+WINDOWS.png"
                responsive
                className="logo"
              />
            </Col>
            <Col xs={6} md={4}>
              <div className="footer-emphasize footer-address">
                <p>13812 Goldenwest Street Ste. 100,</p>
                <p>Westminster, CA 92683</p>
              </div>
              <div className="footer-address">
                <p className="footer-emphasize">(714) 891-1522 PHONE</p>
                <p>(714) 897-9120 FAX</p>
              </div>
            </Col>
            <Col xs={12} md={4}>
                <div className="footer-info">
                <a href="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/privacypolicy.pdf" className="footer-emphasize">PRIVACY POLICY</a>
              </div>
            </Col>
          </Row>
          <hr className="footer-hr" />
          <Row>
            <Col xs={12} md={12}>
              <div className="footer-bottom">
                <p>
                  &copy; 2018 HUNTINGTON WEST PROPERTIES, INC. ALL RIGHTS
                  RESERVED
                </p>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Footer;
