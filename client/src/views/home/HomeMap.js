import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import {Map, GoogleApiWrapper, InfoWindow, Marker, Polygon} from 'google-maps-react';


export class MapContainer extends Component {

  constructor(props) {
    super(props);
    // binding this to event-handler functions

  }


render() {
  var triangleCoords = [

    {lat: 34.205886, lng: -118.462403},
    {lat: 34.226613, lng: -118.097393},
    {lat: 33.940400, lng: -117.663101},
    {lat: 33.463637, lng: -117.623317},
    {lat: 33.458895, lng: -117.718988},
    {lat: 33.834976, lng: -118.434769}

  ];

    return (
      <Row>
        <Map className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        zoom={9}
        initialCenter={{
          lat: 33.870776,
          lng: -118.041505
        }}
        gestureHandling= 'greedy'
        scrollwheel={false}
        zoomControl= {false}
        streetViewControl= {false}
        mapTypeControl= {false}
        fullscreenControl= {false}
        draggable={false}
        >
        <Polygon
                paths={triangleCoords}
                strokeColor="none"
                strokeOpacity={0.2}
                strokeWeight={0}
                fillColor="blue"
                fillOpacity={0.2} />
        </Map>
      </Row>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBY0npOTJOTWaOwMcxIJcbcEnlR3CLeDs8')
})(MapContainer)
