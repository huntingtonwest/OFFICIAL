import * as React from 'react';
import { Image, Row, Col, Thumbnail, Button } from 'react-bootstrap';

class Property extends React.Component {

  render() {
    return (
      <Col xs={12} md={6} lg={4} className="property-card" key={this.props.key}>
      <div className="property-thumbnail">
          <div className="thumbnail">
            <Image src={this.props.img} responsive className="property-pic" />
            </div>
            <div className="property-padded">
            <Row className="property-info">
              <div className="property-main vertical">
                <p className="property-labels">RENT</p>
                <p className="rent">{this.props.rent}</p>
              </div>
              <div className="property-main vertical">
                <p className="property-labels">SQUARE FEET</p>
                <p className="sqrft">{this.props.sqrft}</p>
              </div>
              <div className="property-main">
                <p className="property-labels">BED / BATH</p>
                <p className="bed">{this.props.bed} bed / {this.props.bath} ba</p>
              </div>
            </Row>
            <p className="property-desc">{this.props.desc}</p>
            <p className="property-address">{this.props.address}</p>
            <p className="property-availability">{this.props.availability}</p>
            <p className="property-buttons">
              <Button bsStyle="primary" className="property-details-button">View Details</Button>
              <Button bsStyle="default" className="property-apply-button">Apply Now</Button>
            </p>
            </div>
            </div>
      </Col>
    );
  }
}

export default Property;
