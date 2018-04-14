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
        <div className="footer-grid">
          <hr className="footer-hr" />
            <div className="footer-emphasize">
              <p>13812 Goldenwest Street Ste #100, Westminster, CA 92683</p>
              <p>Phone: (714) 891-1522    |    Fax: (714) 897-9120    |    BRE #01216849</p>
              <p><span><a href="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/privacypolicy.pdf" className="footer-emphasize footer-underline">PRIVACY POLICY</a>
            </span>    |    &copy; 2018 HUNTINGTON WEST PROPERTIES, INC. ALL RIGHTS RESERVED</p>
            </div>
          <hr className="footer-hr" />
        </div>
      </div>
    );
  }
}

export default Footer;
