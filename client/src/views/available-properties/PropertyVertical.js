import * as React from "react";
import { Image, Row, Col, Button, Carousel } from "react-bootstrap";

class PropertyCarousel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pics: []
    };
  }

  componentWillMount() {
    let pics = this.props.images.map(image => {
      return (
        <Carousel.Item style={{width: '100%', height: 350, overflow: 'hidden'}}>
          <img className="img-responsive" style={{objectFit: 'cover', minWidth: '100%', minHeight: '100%'}} width='100%' height="100%" src={image} />
        </Carousel.Item>
      );
    });
    this.setState({pics: pics});
  }

  render() {
    return (
      <Carousel>
        {this.state.pics}
      </Carousel>
    );
  }
}


class PropertyVertical extends React.Component {
  render() {

    var type = this.props.type == 'rent' ? 'RENT' : 'PRICE';

    return (
      <Row className="property-card" key={this.props.key}>
        <Col xs={12} sm={6} md={6} lg={5} className="small-col">
          <div className="property-thumbnail">
            <div className="prop-thumbnail">
            <PropertyCarousel
              images= {this.props.img}
            />
            </div>
          </div>
        </Col>
        <Col xs={12} sm={6} md={6} lg={7} className="big-col">
          <div className="property-padded">
            <Row className="property-info">
              <div className="property-main left-space">
                <p className="property-labels">{type}</p>
                <p className="rent">${this.props.rentComma}</p>
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
            <p className="property-date">Date posted: {this.props.date}</p>

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
