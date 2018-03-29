import * as React from 'react';
import { Select } from 'antd';
import { Row, Col } from 'react-bootstrap';

// import { Cascader } from 'antd';
//
// const options = [{
//   value: 'zhejiang',
//   label: 'Zhejiang',
//   children: [{
//     value: 'hangzhou',
//     label: 'Hangzhou',
//     children: [{
//       value: 'xihu',
//       label: 'West Lake',
//     }, {
//       value: 'xiasha',
//       label: 'Xia Sha',
//       disabled: true,
//     }],
//   }],
// }, {
//   value: 'jiangsu',
//   label: 'Jiangsu',
//   children: [{
//     value: 'nanjing',
//     label: 'Nanjing',
//     children: [{
//       value: 'zhonghuamen',
//       label: 'Zhong Hua men',
//     }],
//   }],
// }];
//
// function onChange(value, selectedOptions) {
//   console.log(value, selectedOptions);
// }
//
// function filter(inputValue, path) {
//   return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
// }
//
// ReactDOM.render(
//   <Cascader
//     options={options}
//     onChange={onChange}
//     placeholder="Please select"
//     showSearch={{ filter }}
//   />
// );
//
//



const Option = Select.Option;
class CitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      val: null,
      associations: []
    };
  }

  handleClick(value) {
    console.log("association selected");
  }

  handleChange(value) {
    console.log(value);

    fetch("https://realhwptest.herokuapp.com/get-associations")
      .then(results => {
        return results.json();
      })
      .then(data => {
        let associations = data.associations.map(association => {
          if (association.acn_loc === value)
            return (
              <Option value={association.acn_name} key={association.acn_name}>
                {association.acn_name}
              </Option>
            );
          return;
        });
        this.setState({ associations: associations, val: value });
      });
  }

  render() {
    return (
      <Row className="dropdown-row" id="areas">
        <Col xs={12} md={6}>
          <Select
            className="city-list"
            showSearch
            style={{ width: 500 }}
            placeholder="CITY"
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Brea">Brea</Option>
            <Option value="Costa Mesa">Costa Mesa</Option>
            <Option value="Huntington Beach">Huntington Beach</Option>
            <Option value="Newport Beach">Newport Beach</Option>
          </Select>
        </Col>
        <Col xs={12} md={6}>
          <Select
            className="city-list"
            showSearch
            style={{ width: 500 }}
            placeholder="ASSOCIATION NAME"
            optionFilterProp="children"
            onChange={this.handleClick}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.associations}
          </Select>
        </Col>
      </Row>
    );
  }
}

export default CitySearch;
