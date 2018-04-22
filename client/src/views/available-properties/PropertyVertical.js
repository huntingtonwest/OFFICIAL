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
      <Carousel interval="">
        {this.state.pics}
      </Carousel>
    );
  }
}


class PropertyVertical extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      button: 'View More',
      style: {
        maxHeight: '105px'
      },
      buttonVisible: true,
      applyButton: '1em'
    };

    this.toggleDesc = this.toggleDesc.bind(this);

  }

  componentDidMount() {
    const height = document.getElementById(this.props.id).clientHeight;
    if (height < 100) {
      this.setState({
        buttonVisible: false,
        applyButton: '8em!important'
      });
    }
  }

  inquire() {
    window.location.assign('/contact#form');
  }

  apply() {
    window.location.assign('https://huntingtonwest.ready2apply.com/d/apply/1914/new');
  }

  toggleDesc() {
    if (this.state.button == 'View More') {
      this.setState({
        button: 'View Less',
        style: {
          maxHeight: '100%'
        }
      });
    }
    else {
      this.setState({
        button: 'View More',
        style: {
          height: '105px'
        }
      });
    }
  }


  render() {

    var type = this.props.type == 'rent' ? 'RENT' : 'PRICE';

    return (
      <Row className="property-card" key={this.props.key}>
        <Col xs={12} md={12} lg={5} className="small-col">
          <div className="property-thumbnail">
            <div className="prop-thumbnail">
            <PropertyCarousel
              images= {this.props.img}
            />
            </div>
          </div>
        </Col>
        <Col xs={12}  md={12} lg={7} className="big-col">
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
            <p className="property-name">{this.props.name}</p>
            <p className="property-address">{this.props.address}</p>
            <p className="property-availability">{this.props.availability}</p>
            <p className="property-date">Date posted: {this.props.date}</p>
            <p className="property-desc" id={this.props.id} style={this.state.style}>{this.props.desc}</p>
            <button className="property-button" style={{display: this.state.buttonVisible ? 'block' : 'none'}} onClick={this.toggleDesc}>{this.state.button}</button>
            </Row>
            <br style={{height: this.state.applyButton}} />
          <Row className="property-buttons-row">
            <div className="property-buttons">
            <Button onClick={this.inquire} bsStyle="default" className="property-apply-button">
              Inquire
            </Button>
              <Button onClick={this.apply} bsStyle="default" className="property-apply-button">
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
