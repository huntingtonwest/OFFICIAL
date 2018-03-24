import * as React from 'react';
import { Image } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import './index.css';

class Banner extends React.Component {

  render() {
    const bg = this.props.img;

    const divStyle = {
      backgroundImage: "url(" + bg + ")",
      backgroundRepeat:'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize:'cover',
      height: 450,
      marginTop: -58
    };

    return (
      <div className="text-center search-banner" style={divStyle}>
        <div className="search-inner">
          <h1 className="title-banner title-lower-banner">{this.props.title}</h1>
          <br />
        </div>
      </div>
    );
  }
}


export default Banner;
