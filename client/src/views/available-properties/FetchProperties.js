import * as React from 'react';
import Property from './Property'
import { Grid, Row} from 'react-bootstrap';

class FetchProperties extends React.Component {

  constructor() {
    super();
    this.state = {
      properties: [],
    };
  }

  componentWillMount() {

    fetch('https://realhwptest.herokuapp.com/get-properties')
    .then(results => {
      return results.json();
    }).then(data => {
      let properties = data.properties.map((property) => {
        var addr = property.address_l1 + ', ';
        if (property.address_l2 !== '')
          addr += property.address_l2 + ', ';
        addr += property.state + ' ' + property.zipcode;

        return (
          <Property
            key={property.property_id}
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


  render() {
    return (
      <Grid>
        <Row className="properties-row">
          {this.state.properties}
        </Row>
      </Grid>
    );
  }
}


export default FetchProperties;
