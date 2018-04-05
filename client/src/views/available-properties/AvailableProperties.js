import React, {Component} from 'react';
import ConsultationForm from '../../components/ScheduleForm';
import BannerProperties from './BannerProperties';
import MapContainer from '../../components/Map'
import Footer from '../../components/Footer';
import PropertyVertical from './PropertyVertical'
import { Grid, Row, Panel, Col} from 'react-bootstrap';
import {Marker} from 'google-maps-react';
import { Collapse } from 'antd';
const google = window.google;

const customPanelStyle = {
  background: 'black',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};


class AvailableProperties extends Component {

  constructor(props) {
    super(props);
    this.state = {
      city: 'all',
      minBed: -1,
      maxBed: Number.MAX_SAFE_INTEGER,
      minBath: -1,
      maxBath: Number.MAX_SAFE_INTEGER,
      properties: [],
      type: 'rent',
      minRent: -1,
      maxRent: Number.MAX_SAFE_INTEGER,
      markers: []
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.fetchMarkers = this.fetchMarkers.bind(this);

  }

  handleFieldChange(fieldId, value) {
    this.setState({ [fieldId] : value});

    this.setState({fieldId: value}, () => {
      if (fieldId == 'type')
        this.fetchData();
    });
  }

  removeCommas(str) {
    return(str.toString().replace(/,/g,''));
  }

  fetchData = () => {
    fetch('https://realhwptest.herokuapp.com/get-properties')
    .then(results => {
      return results.json();
    }).then(data => {
      console.log("Filtering ", this.state);

      let properties = data.properties.filter((property) => {
        if (this.removeCommas(this.state.minRent) > property.price ||
            this.removeCommas(this.state.maxRent) < property.price)
            return false;
        if (this.state.type == 'rent' && !property.for_rent ||
            this.state.type == 'sale' && !property.for_sale)
            return false;
        if (this.state.city != 'all') {
          var citySub = this.state.city.substring(0, this.state.city.length - 4);
          if (citySub != property.city) return false;
        }
        if (this.state.minBed > property.beds ||
            this.state.maxBed < property.beds)
            return false;
        if (this.state.minBath > property.baths ||
            this.state.maxBath < property.baths)
            return false;

        return true;
      }).map((property) => {
        var addr = property.address_l1 + ', ';
        if (property.address_l2 !== '')
          addr += property.address_l2 + ', ';
        addr += property.state + ' ' + property.zipcode;
        var price;
        if (this.state.type == 'rent') price = property.rent_price;
        else price = property.sale_price;

        return (
          <PropertyVertical
            key={property.property_id}
            id={property.property_id}
            img="http://www.eplans.com/house-plans/media/catalog/product/a/m/ama879-fr-re-co.jpg"
            rent={price}
            sqrft={property.area}
            bed={property.beds}
            bath={property.baths}
            desc={property.notes}
            address={addr}
            availability="Available Now"
            type={this.state.type}
          />
        )
      });

      this.setState({properties: properties});
      this.fetchMarkers(properties);
      console.log("state", this.state.properties);
    });
  }

  fetchMarkers = (properties) => {
    console.log("marker func");
    let markers =properties.map((property) => {
      var addr = property.props.address.replace(/ /g,"+");
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=AIzaSyBY0npOTJOTWaOwMcxIJcbcEnlR3CLeDs8';
      fetch(url)
      .then(results => {
        return results.json();
      }).then(data => {
        if (data && data.results) {
          console.log("yo data: ", data);
          var property = data.results[0];
          var loc = data.results[0].geometry.location;
          return (
            <Marker
              title={property.formatted_address}
              key={property.formatted_address}
              name={property.formatted_address}
              position={{lat: property.geometry.location.lat, lng: property.geometry.location.lng}}
              onClick={this.onMarkerClick}
              />
          );
        }
      })
      this.setState({markers: markers});
      console.log("markers", this.state.markers);
    });
    return 'success';
  }


  componentWillMount() {
    this.fetchData();
  }

  // reloadMap() {
  //   console.log("reload");
  //   document.getElementById("google-map").forceUpdate();
  // }

  render() {
    return (
      <div className="AvailableProperties" id="search">
        <BannerProperties onClick={this.fetchData} onSelect={this.handleFieldChange} title="AVAILABLE PROPERTIES"/>
        <div className="under-banner">

<Grid className="property-search-grid">
<Row className="property-search-row">
  <Col xs={12} md={5} className="map-col">
    <div className="search-map">
      <MapContainer lat='33.750081' lng='-116.997621' markers={this.state.markers}/>
    </div>
  </Col>
  <Col xs={12} md={7} className="props-col">
        {this.state.properties}
  </Col>
</Row>
</Grid>



          <div id="consultation">
            <ConsultationForm title="SCHEDULE CONSULTATION"/>
          </div>
        </div>
        <Footer bg="white"/>
      </div>
    );
  }
}

export default AvailableProperties;

// VERTICAL LISTINGS AND COLLAPSIBLE MAP

// <div className="AvailableProperties" id="search">
//   <BannerProperties onClick={this.fetchData} onSelect={this.handleFieldChange} title="AVAILABLE PROPERTIES"/>
//   <div className="under-banner">
//
//     <Panel defaultExpanded={true}>
//       <Panel.Heading>
//         <Panel.Title toggle>
//           VIEW MAP
//         </Panel.Title>
//       </Panel.Heading>
//       <Panel.Collapse>
//         <Panel.Body>
//           <div className="search-map">
//             <MapContainer lat='33.750081' lng='-116.997621' markers={this.state.markers}/>
//           </div>
//         </Panel.Body>
//       </Panel.Collapse>
//     </Panel>
//
//     <Grid className="properties-grid">
//         {this.state.properties}
//     </Grid>
//     <div id="consultation">
//       <ConsultationForm title="SCHEDULE CONSULTATION"/>
//     </div>
//   </div>
//   <Footer bg="white"/>
// </div>
//
