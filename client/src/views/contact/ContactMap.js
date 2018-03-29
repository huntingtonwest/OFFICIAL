import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    // binding this to event-handler functions

  }


render() {

    return (
      <Row>
        <Map className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        zoom={15}
        initialCenter={{
          lat: 33.7615543,
          lng: -118.0068536
        }}
        gestureHandling= 'greedy'
        >
        <Marker
          title='Huntington West Properties'
          name='Huntington West Properties'
          position={{lat: 33.7615543, lng: -118.0068536}}
          />
        </Map>
      </Row>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBY0npOTJOTWaOwMcxIJcbcEnlR3CLeDs8')
})(MapContainer)
