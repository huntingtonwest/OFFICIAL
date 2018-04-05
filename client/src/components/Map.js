import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    console.log("map markers", this.props.markers);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: this.props.markers
    }

    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }


render() {

    return (
      <Row>
        <Map className="map" id="google-map"
        google={this.props.google}
        onClick={this.onMapClicked}
        zoom={8}
        initialCenter={{
          lat: 33.750081,
          lng: -116.997621
        }}
        gestureHandling= 'greedy'
        scrollwheel={false}
        zoomControl= {true}
        >
        {this.props.markers}
          <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
        </Map>
      </Row>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBY0npOTJOTWaOwMcxIJcbcEnlR3CLeDs8')
})(MapContainer)
