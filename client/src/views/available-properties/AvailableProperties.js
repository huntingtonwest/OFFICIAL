import React, {Component} from 'react';
import ConsultationForm from '../../components/ScheduleForm';
import BannerProperties from './BannerProperties';
import MapContainer from '../../components/Map'
import Footer from '../../components/Footer';
import PropertyVertical from './PropertyVertical'
import { Grid, Row, Panel, Col} from 'react-bootstrap';
import {Marker} from 'google-maps-react';
import { Collapse } from 'antd';

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
    this.reset = this.reset.bind(this);

  }

  reset() {
    this.setState({
      city: 'all',
      minBed: -1,
      maxBed: Number.MAX_SAFE_INTEGER,
      minBath: -1,
      maxBath: Number.MAX_SAFE_INTEGER,
      properties: [],
      minRent: -1,
      maxRent: Number.MAX_SAFE_INTEGER
     });
     this.fetchData();
  }


  handleFieldChange(fieldId, value) {
    this.setState({ [fieldId] : value});

    this.setState({fieldId: value}, () => {
      if (fieldId == 'type') {
        this.reset();
      }
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
        if (this.state.type != 'all' && this.state.type == 'rent' && !property.for_rent ||
            this.state.type == 'sale' && !property.for_sale)
            return false;
        var price = this.state.type == 'rent' ? property.rent_price : property.sale_price;
        if (this.state.minRent > price ||
            this.state.maxRent < price)
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
        var price_comma;
        if (this.state.type == 'rent') {
          price = property.rent_price;
          price_comma = property.rent_price_comma;
        }
        else {
          price = property.sale_price;
          price_comma = property.sale_price_comma;
        }

        return (
          <PropertyVertical
            id={property.name}
            name={property.name}
            img={property.images}
            rent={price}
            rentComma={price_comma}
            sqrft={property.area_comma}
            bed={property.beds}
            bath={property.baths}
            desc={property.notes}
            key={property.name}
            address={addr}
            availability="Available Now"
            type={this.state.type}
            date={property.date_posted}
          />
        )
      });

      this.setState({properties: properties});
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
        if (data && data.results != null && data.results.length > 0) {
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
        <BannerProperties reset={this.reset} onClick={this.fetchData} onSelect={this.handleFieldChange} title={"AVAILABLE\nPROPERTIES"}/>
        <div className="under-banner">
          <Grid className="properties-grid">
            {this.state.properties}
          </Grid>
        </div>
      <br/>
        <Footer bg="white" logo="hidden"/>
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
