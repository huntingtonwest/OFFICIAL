import * as React from 'react';
import { Image } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import './index.css';

class Banner extends React.Component {
  render() {
    return (
      <div className="page-inner">
          <div className="img-section text-center">
              <Image src={this.props.img} responsive className="img-banner" />
              <div className="title-container">
                <h1 className="title-banner">{this.props.title}</h1>
              </div>
          </div>
      </div>
    );
  }
}


export default Banner;
