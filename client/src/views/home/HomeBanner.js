import * as React from 'react';
import LazyLoad from 'react-lazy-load';

class HomeBanner extends React.Component {

  render() {
    const bg = this.props.img;

    const divStyle = {
      backgroundImage: "url(" + bg + ")",
      backgroundRepeat:'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize:'cover',
      height: 700,
      marginTop: -100
    };

    return (
      <LazyLoad height={700} offsetVertical={1000}>
      <div className="text-center" style={divStyle}>
        <div className="home-inner">
          <h1 className="title-home-banner">{this.props.title}</h1>
          <br />
        </div>
      </div>
      </LazyLoad>
    );
  }
}


export default HomeBanner;
