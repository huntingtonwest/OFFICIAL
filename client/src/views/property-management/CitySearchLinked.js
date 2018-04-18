import * as React from 'react';
import { Select } from 'antd';
import { Row, Col } from 'react-bootstrap';

import { Cascader } from 'antd';


function filter(inputValue, path) {
  return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
}

const Option = Select.Option;
class CitySearchLinked extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: null,
      options: [],
      urls: {}
    };
    this.onChange = this.onChange.bind(this);

  }

  onChange(value, selectedOptions) {
    window.location.assign(this.state.urls[value[1]]);
  }

  fetchData = () => {
    fetch('https://realhwptest.herokuapp.com/get-associations')
    .then(results => {
      return results.json();
    }).then(data => {
      var cities = [];
      var urls = {};
      for(var i in data.associations)
          cities.push([i, data.associations [i]]);
      let options = cities.map((city) => {
        return ({
          key: city[0],
          value: city[0],
          label: city[0],
          children: city[1].map((assc) => {
                      urls[assc.acn_loc] = assc.acn_url;
                      return ({
                        value: assc.acn_loc,
                        label: assc.acn_loc
                      });
                    })
        });
      });
      this.setState({options: options, urls: urls});
      console.log(options);
    });
  }

  componentWillMount() {
    this.fetchData();
  }


  render() {

    return (
      <Row className="dropdown-row" id="areas">
        <Col xs={12} md={12}>
        <Cascader
          size="large"
          className="cascader"
          options={this.state.options}
          onChange={this.onChange}
          placeholder="Please select city / association"
          showSearch={{ filter }}
        />
        </Col>
      </Row>
    );
  }
}

export default CitySearchLinked;
