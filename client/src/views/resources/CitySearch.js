import * as React from 'react';
import { Select } from 'antd';
import { Row, Col } from 'react-bootstrap';

import { Cascader } from 'antd';

function filter(inputValue, path) {
  return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
}

const Option = Select.Option;
class CitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: null,
      options: []
    };
    this.onChange = this.onChange.bind(this);

  }

  onChange(value, selectedOptions) {
    console.log(value, selectedOptions);
    if (value != null) {
      this.props.selectAssociation(value[1]);
    }
  }

  fetchData = () => {
    fetch('https://realhwptest.herokuapp.com/get-associations')
    .then(results => {
      return results.json();
    }).then(data => {
      var cities = [];
      for(var i in data.associations)
          cities.push([i, data.associations [i]]);
      let options = cities.map((city) => {
        // console.log(city);
        return ({
          key: city[0],
          value: city[0],
          label: city[0],
          children: city[1].map((assc) => {
                      return ({
                        value: assc.acn_loc,
                        label: assc.acn_loc
                      });
                    })
        });
      });
      this.setState({options: options});
      console.log(options);
    });
  }

  componentWillMount() {
    this.fetchData();
  }


  render() {

    return (
      <Row className="dropdown-row" style={this.props.style}>
        <Col xs={12} md={12}>
        <Cascader
          size="medium"
          className="cascader-form"
          options={this.state.options}
          onChange={this.onChange}
          placeholder="Please select association*"
          showSearch={{ filter }}
        />
        </Col>
      </Row>
    );
  }
}

export default CitySearch;
