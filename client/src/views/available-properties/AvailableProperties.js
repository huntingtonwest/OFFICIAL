import React, {Component} from 'react';
import ConsultationForm from '../../components/ScheduleForm';
import BannerProperties from './BannerProperties';
import MapContainer from '../../components/Map'
import Footer from '../../components/Footer';
import Property from './Property'
import { Grid, Row} from 'react-bootstrap';

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
      maxRent: Number.MAX_SAFE_INTEGER
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);

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

        return (
          <Property
            key={property.property_id}
            id={property.property_id}
            img="http://www.eplans.com/house-plans/media/catalog/product/a/m/ama879-fr-re-co.jpg"
            rent={property.price}
            sqrft={property.area}
            bed={property.beds}
            bath={property.baths}
            desc={property.notes}
            address={addr}
            availability="Available Now"
          />
        )
      })

      this.setState({properties: properties});
      console.log("state", this.state.properties);
    })
  }


  componentWillMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="AvailableProperties" id="search">
        <BannerProperties onClick={this.fetchData} onSelect={this.handleFieldChange} title="AVAILABLE PROPERTIES"/>
        <div className="under-banner">
          <div className="search-map" id="map">
            <MapContainer/>
          </div>
          <Grid>
            <Row className="properties-row">
              {this.state.properties}
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
