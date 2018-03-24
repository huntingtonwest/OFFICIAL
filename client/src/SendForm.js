import * as React from 'react';
import './index.css';
import Property from './Property'
import { Grid, Row} from 'react-bootstrap';

class SendForm extends React.Component {

  constructor() {
    super();
    this.state = {
      properties: [],
    };
  }

  componentWillMount() {

    fetch('http://127.0.0.1:5000/get-properties')
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
            img="http://via.placeholder.com/400x300"
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


export default SendForm;
