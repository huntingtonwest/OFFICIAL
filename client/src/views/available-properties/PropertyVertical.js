import * as React from "react";
import { Image, Row, Col, Button } from "react-bootstrap";

class PropertyVertical extends React.Component {
  render() {

    var type = this.props.type == 'rent' ? 'RENT' : 'PRICE';

    return (
      <Row className="property-card" key={this.props.key}>
        <Col xs={12} sm={4} md={4} className="small-col">
          <div className="property-thumbnail">
            <div className="prop-thumbnail">
              <Image src={this.props.img} responsive className="property-pic" />
            </div>
          </div>
        </Col>
        <Col xs={12} sm={8} md={8} className="big-col">
          <div className="property-padded">
            <Row className="property-info">
              <div className="property-main left-space">
                <p className="property-labels">{type}</p>
                <p className="rent">${this.props.rent}</p>
              </div>
              <div className="property-main vertical">
                <p className="property-labels">SQUARE FEET</p>
                <p className="sqrft">{this.props.sqrft}</p>
              </div>
              <div className="property-main">
                <p className="property-labels">BED / BATH</p>
                <p className="bed">
                  {this.props.bed} bed / {this.props.bath} ba
                </p>
              </div>
            </Row>
            <Row>
            <p className="property-desc">{this.props.desc}</p>
            <p className="property-address">{this.props.address}</p>
            <p className="property-availability">{this.props.availability}</p>
            </Row>
          <Row className="property-buttons-row">
            <div className="property-buttons">
              <Button bsStyle="default" className="property-apply-button">
                Apply Now
              </Button>
            </div>
          </Row>
          </div>
      </Col>
      </Row>
    );
  }
}

export default PropertyVertical;
