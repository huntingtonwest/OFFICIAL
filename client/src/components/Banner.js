import * as React from 'react';

class Banner extends React.Component {

  render() {
    const bg = this.props.img;

    const divStyle = {
      backgroundImage: "url(" + bg + ")",
      backgroundRepeat:'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize:'cover',
      margin: '0 auto'
    };

    return (
      <div className="go-down">
      <br className="my-br"/><br />
      <br />
      <div className="text-center search-banner" style={divStyle}>
        <div className="ban-inner">
          <h1 className="title-banner title-lower-banner">{this.props.title}</h1>
          <br />
        </div>
      </div>
      </div>
    );
  }
}


export default Banner;
