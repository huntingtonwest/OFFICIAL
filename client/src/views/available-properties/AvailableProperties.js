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
      bed: -1,
      bath: -1,
      properties: [],
      type: 'rent'
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

  fetchData = () => {
    fetch('https://realhwptest.herokuapp.com/get-properties')
    .then(results => {
      return results.json();
    }).then(data => {
      let properties = data.properties.filter((property) => {
        if (this.state.type == 'rent' && !property.for_rent ||
            this.state.type == 'sale' && !property.for_sale)
            return false;

        console.log("Filtering city ", this.state);
        if (this.state.city != 'all') {
          var citySub = this.state.city.substring(0, this.state.city.length - 4);
          if (citySub != property.city) return false;
        }
        if (this.state.bed > property.beds) return false;
        if (this.state.bath > property.baths) return false;
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
