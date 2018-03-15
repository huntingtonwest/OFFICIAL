import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
render() {
    return (
      <Row>
      <Map className="map" google={this.props.google} zoom={14}>
      </Map>
      </Row>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBY0npOTJOTWaOwMcxIJcbcEnlR3CLeDs8')
})(MapContainer)
