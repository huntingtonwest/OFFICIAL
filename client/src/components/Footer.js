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

      <div className="footer-container">
        <br />
        <br />
        <br />
        <br />
        <br />
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
            <div className="footer-emphasize">
              <p className="footer-wide">&copy; 2018 Huntington West Properties, Inc. All Rights Reserved.</p>
              <br/>
              <p className="footer-squish">Phone: (714) 891-1522 | Fax: (714) 897-9120 | BRE #01216849</p>
              <p className="footer-squish"><span><a href="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/privacypolicy.pdf" className="footer-emphasize footer-underline">Privacy Policy</a>
            </span> | 13812 Goldenwest Street Ste #100, Westminster, CA 92683</p>
            </div>
        </div>
      </div>
    );
  }
}

export default Footer;
